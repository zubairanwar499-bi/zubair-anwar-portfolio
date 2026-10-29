import React, { useEffect, useRef } from 'react';

export interface FluidConfig {
  SIM_RESOLUTION: number;
  DYE_RESOLUTION: number;
  DENSITY_DISSIPATION: number;
  VELOCITY_DISSIPATION: number;
  PRESSURE: number;
  PRESSURE_ITERATIONS: number;
  CURL: number;
  SPLAT_RADIUS: number;
  SPLAT_FORCE: number;
  SHADING: boolean;
  COLORFUL: boolean;
  TRANSPARENT: boolean;
}

const DEFAULT_CONFIG: FluidConfig = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  DENSITY_DISSIPATION: 3.2, // smoke fades out smoothly after 1.5–2 seconds
  VELOCITY_DISSIPATION: 2.0,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 30, // creates realistic swirling smoke vortices and curls
  SPLAT_RADIUS: 0.25,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLORFUL: true,
  TRANSPARENT: true, // blends seamlessly over dark background #08070f
};

// 4 KeyDevs signature smoke color anchors:
// 1. Smoky Purple (soft violet-magenta)
// 2. Muted Gold / Warm Amber
// 3. Deep Atmospheric Cyan
// 4. Misty Ethereal White
const SMOKE_PALETTE = [
  { r: 0.65, g: 0.38, b: 0.95 }, // Smoky Purple
  { r: 0.92, g: 0.68, b: 0.28 }, // Muted Gold / Amber
  { r: 0.15, g: 0.82, b: 0.94 }, // Deep Cyan
  { r: 0.85, g: 0.88, b: 0.96 }, // Misty White
];

// Multiplier between 0.15 and 0.22 for subtle, translucent, atmospheric smoke
const COLOR_INTENSITY = 0.18;

function getCyclingSmokeColor(t: number) {
  const count = SMOKE_PALETTE.length;
  const cycle = ((t % count) + count) % count;
  const index = Math.floor(cycle);
  const nextIndex = (index + 1) % count;
  const frac = cycle - index;

  // Smooth cosine interpolation
  const smooth = 0.5 - 0.5 * Math.cos(frac * Math.PI);

  const c1 = SMOKE_PALETTE[index];
  const c2 = SMOKE_PALETTE[nextIndex];

  return {
    r: (c1.r + (c2.r - c1.r) * smooth) * COLOR_INTENSITY,
    g: (c1.g + (c2.g - c1.g) * smooth) * COLOR_INTENSITY,
    b: (c1.b + (c2.b - c1.b) * smooth) * COLOR_INTENSITY,
  };
}

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: { r: number; g: number; b: number };
}

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap: () => void;
}

interface ProgramInfo {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation>;
  bind: () => void;
}

export interface FluidCursorProps {
  config?: Partial<FluidConfig>;
  className?: string;
}

export const FluidCursor: React.FC<FluidCursorProps> = ({ config: customConfig, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const config: FluidConfig = { ...DEFAULT_CONFIG, ...customConfig };

    // Request high-performance WebGL context with transparency
    const glParams: WebGLContextAttributes = {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    };

    let gl: WebGLRenderingContext | WebGL2RenderingContext | null =
      (canvas.getContext('webgl2', glParams) as WebGL2RenderingContext | null) ||
      (canvas.getContext('webgl', glParams) as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl', glParams) as WebGLRenderingContext | null);

    if (!gl) {
      console.warn('WebGL is not supported on this browser/hardware.');
      return;
    }

    const isWebGL2 = 'WebGL2RenderingContext' in window && gl instanceof WebGL2RenderingContext;

    // Detect format and extensions
    let extLinear: any = null;
    let halfFloatTexType: number = gl.UNSIGNED_BYTE;
    let rgbaFormat: { internalFormat: number; format: number } = {
      internalFormat: gl.RGBA,
      format: gl.RGBA,
    };
    let rgFormat: { internalFormat: number; format: number } = {
      internalFormat: gl.RGBA,
      format: gl.RGBA,
    };
    let rFormat: { internalFormat: number; format: number } = {
      internalFormat: gl.RGBA,
      format: gl.RGBA,
    };

    if (isWebGL2) {
      const gl2 = gl as WebGL2RenderingContext;
      gl2.getExtension('EXT_color_buffer_float');
      extLinear = gl2.getExtension('OES_texture_float_linear');
      halfFloatTexType = gl2.HALF_FLOAT;

      rgbaFormat = { internalFormat: gl2.RGBA16F, format: gl2.RGBA };
      rgFormat = { internalFormat: gl2.RG16F, format: gl2.RG };
      rFormat = { internalFormat: gl2.R16F, format: gl2.RED };
    } else {
      const extHalfFloat = gl.getExtension('OES_texture_half_float');
      extLinear = gl.getExtension('OES_texture_half_float_linear');
      if (extHalfFloat) {
        halfFloatTexType = extHalfFloat.HALF_FLOAT_OES;
      } else {
        gl.getExtension('OES_texture_float');
        extLinear = gl.getExtension('OES_texture_float_linear');
        halfFloatTexType = gl.FLOAT;
      }
      rgbaFormat = { internalFormat: gl.RGBA, format: gl.RGBA };
      rgFormat = { internalFormat: gl.RGBA, format: gl.RGBA };
      rFormat = { internalFormat: gl.RGBA, format: gl.RGBA };
    }

    const supportLinearFiltering = !!extLinear;

    // Helper: Test renderable FBO format fallback
    function isRenderable(internalFormat: number, format: number, type: number): boolean {
      if (!gl) return false;
      const testTex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, testTex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

      const testFbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, testFbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, testTex, 0);

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.deleteFramebuffer(testFbo);
      gl.deleteTexture(testTex);

      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    // Verify format renderability; fallback to RGBA if R or RG isn't supported
    if (!isRenderable(rgbaFormat.internalFormat, rgbaFormat.format, halfFloatTexType)) {
      rgbaFormat = { internalFormat: gl.RGBA, format: gl.RGBA };
      halfFloatTexType = gl.UNSIGNED_BYTE;
    }
    if (!isRenderable(rgFormat.internalFormat, rgFormat.format, halfFloatTexType)) {
      rgFormat = rgbaFormat;
    }
    if (!isRenderable(rFormat.internalFormat, rFormat.format, halfFloatTexType)) {
      rFormat = rgbaFormat;
    }

    // Shader sources
    const baseVertexShader = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const clearShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;

      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `;

    const splatShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    const advectionShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;

      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);

          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }

      void main () {
      #ifdef MANUAL_FILTERING
          vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
          vec4 result = bilerp(uSource, coord, dyeTexelSize);
      #else
          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
          vec4 result = texture2D(uSource, coord);
      #endif
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
      }
    `;

    const divergenceShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;

          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }

          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const curlShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `;

    const vorticityShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;

      void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;

          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;

          vec2 vel = texture2D(uVelocity, vUv).xy;
          vel += force * dt;
          vel = clamp(vel, -1000.0, 1000.0);
          gl_FragColor = vec4(vel, 0.0, 1.0);
      }
    `;

    const pressureShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float C = texture2D(uPressure, vUv).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    const gradientSubtractShader = `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    const displayShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform vec2 texelSize;

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;

      #ifdef SHADING
          vec3 lc = texture2D(uTexture, vL).rgb;
          vec3 rc = texture2D(uTexture, vR).rgb;
          vec3 tc = texture2D(uTexture, vT).rgb;
          vec3 bc = texture2D(uTexture, vB).rgb;

          float dx = length(rc) - length(lc);
          float dy = length(tc) - length(bc);

          vec3 n = normalize(vec3(dx, dy, length(texelSize)));
          vec3 l = vec3(0.0, 0.0, 1.0);

          float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
          c *= diffuse;
      #endif

          // Translucent smoke density for transparent blending over #08070f
          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `;

    // Helper: Compile Program
    function createProgram(vertexSrc: string, fragmentSrc: string): ProgramInfo {
      if (!gl) throw new Error('GL context lost');

      const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
      gl.shaderSource(vertShader, vertexSrc);
      gl.compileShader(vertShader);

      const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(fragShader, fragmentSrc);
      gl.compileShader(fragShader);

      const program = gl.createProgram()!;
      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);

      // Collect uniforms
      const uniforms: Record<string, WebGLUniformLocation> = {};
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const info = gl.getActiveUniform(program, i);
        if (info) {
          uniforms[info.name] = gl.getUniformLocation(program, info.name)!;
        }
      }

      return {
        program,
        uniforms,
        bind: () => {
          if (gl) gl.useProgram(program);
        },
      };
    }

    // Compile programs
    const clearProgram = createProgram(baseVertexShader, clearShader);
    const splatProgram = createProgram(baseVertexShader, splatShader);
    const advectionProgram = createProgram(
      baseVertexShader,
      (!supportLinearFiltering ? '#define MANUAL_FILTERING\n' : '') + advectionShader
    );
    const divergenceProgram = createProgram(baseVertexShader, divergenceShader);
    const curlProgram = createProgram(baseVertexShader, curlShader);
    const vorticityProgram = createProgram(baseVertexShader, vorticityShader);
    const pressureProgram = createProgram(baseVertexShader, pressureShader);
    const gradSubtractProgram = createProgram(baseVertexShader, gradientSubtractShader);
    const displayProgram = createProgram(
      baseVertexShader,
      (config.SHADING ? '#define SHADING\n' : '') + displayShader
    );

    // Quad geometry (2 triangles covering -1 to 1)
    const quadVbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    const quadIbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, quadIbo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    function blit(target: FBO | null) {
      if (!gl) return;
      if (target === null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    function createFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ): FBO {
      if (!gl) throw new Error('GL context lost');
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const texelSizeX = 1.0 / w;
      const texelSizeY = 1.0 / h;

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach: (id: number) => {
          if (!gl) return id;
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ): DoubleFBO {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(val) {
          fbo1 = val;
        },
        get write() {
          return fbo2;
        },
        set write(val) {
          fbo2 = val;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function getResolution(resolution: number) {
      if (!gl) return { width: resolution, height: resolution };
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);

      if (gl.drawingBufferWidth > gl.drawingBufferHeight) {
        return { width: max, height: min };
      } else {
        return { width: min, height: max };
      }
    }

    let density: DoubleFBO;
    let velocity: DoubleFBO;
    let divergence: FBO;
    let curl: FBO;
    let pressure: DoubleFBO;

    function initFramebuffers() {
      if (!gl) return;
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);

      const texType = halfFloatTexType;
      const filter = supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      density = createDoubleFBO(
        dyeRes.width,
        dyeRes.height,
        rgbaFormat.internalFormat,
        rgbaFormat.format,
        texType,
        filter
      );
      velocity = createDoubleFBO(
        simRes.width,
        simRes.height,
        rgFormat.internalFormat,
        rgFormat.format,
        texType,
        filter
      );
      divergence = createFBO(
        simRes.width,
        simRes.height,
        rFormat.internalFormat,
        rFormat.format,
        texType,
        gl.NEAREST
      );
      curl = createFBO(
        simRes.width,
        simRes.height,
        rFormat.internalFormat,
        rFormat.format,
        texType,
        gl.NEAREST
      );
      pressure = createDoubleFBO(
        simRes.width,
        simRes.height,
        rFormat.internalFormat,
        rFormat.format,
        texType,
        gl.NEAREST
      );
    }

    function correctRadius(radius: number) {
      const aspectRatio = canvas!.width / canvas!.height;
      if (aspectRatio > 1) {
        radius *= aspectRatio;
      }
      return radius;
    }

    function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
      if (!gl) return;

      // Splat into velocity
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas!.width / canvas!.height);
      gl.uniform2f(splatProgram.uniforms.point, x, y);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
      blit(velocity.write);
      velocity.swap();

      // Splat into dye/density
      gl.uniform1i(splatProgram.uniforms.uTarget, density.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(density.write);
      density.swap();
    }

    function step(dt: number) {
      if (!gl) return;
      gl.disable(gl.BLEND);

      // 1. Curl
      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      // 2. Vorticity Confinement
      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      // 3. Divergence
      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      // 4. Clear Pressure
      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      // 5. Pressure (Jacobi solver)
      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      // 6. Gradient Subtraction
      gradSubtractProgram.bind();
      gl.uniform2f(gradSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // 7. Advect Velocity
      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!supportLinearFiltering) {
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      }
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, velocity.read.attach(0));
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      // 8. Advect Dye (Density/Color)
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!supportLinearFiltering) {
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, density.texelSizeX, density.texelSizeY);
      }
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, density.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(density.write);
      density.swap();
    }

    function render() {
      if (!gl) return;
      if (config.TRANSPARENT) {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
      } else {
        gl.disable(gl.BLEND);
      }

      displayProgram.bind();
      gl.uniform2f(displayProgram.uniforms.texelSize, density.texelSizeX, density.texelSizeY);
      gl.uniform1i(displayProgram.uniforms.uTexture, density.read.attach(0));
      blit(null);
    }

    // Pointer state and continuous color progression
    const pointers: Pointer[] = [];
    let colorTimer = 0;

    pointers.push({
      id: -1,
      texcoordX: 0,
      texcoordY: 0,
      prevTexcoordX: 0,
      prevTexcoordY: 0,
      deltaX: 0,
      deltaY: 0,
      down: false,
      moved: false,
      color: getCyclingSmokeColor(0),
    });

    // Resize handling
    function resizeCanvas(): boolean {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);

      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
        return true;
      }
      return false;
    }

    resizeCanvas();
    initFramebuffers();

    // Trigger soft ambient atmospheric splats on load
    function multipleSplats(count: number) {
      for (let i = 0; i < count; i++) {
        const color = getCyclingSmokeColor(Math.random() * 4);
        const x = Math.random();
        const y = Math.random();
        const dx = 1200 * (Math.random() - 0.5);
        const dy = 1200 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
      }
    }

    // Initial ambient smoke
    multipleSplats(3);

    // Event listeners attached to window for whole-page reactivity
    const handleMouseMove = (e: MouseEvent) => {
      const pointer = pointers[0];
      const posX = e.clientX / window.innerWidth;
      const posY = 1.0 - e.clientY / window.innerHeight; // WebGL inverted Y

      if (!pointer.down) {
        pointer.down = true;
        pointer.prevTexcoordX = posX;
        pointer.prevTexcoordY = posY;
      }

      const dx = (posX - pointer.prevTexcoordX) * config.SPLAT_FORCE;
      const dy = (posY - pointer.prevTexcoordY) * config.SPLAT_FORCE;

      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        colorTimer += 0.035;
        const color = getCyclingSmokeColor(colorTimer);
        splat(posX, posY, dx, dy, color);
        pointer.prevTexcoordX = posX;
        pointer.prevTexcoordY = posY;
      }
    };

    const handleMouseDown = () => {
      pointers[0].down = true;
    };

    const handleMouseUp = () => {
      pointers[0].down = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const posX = touch.clientX / window.innerWidth;
        const posY = 1.0 - touch.clientY / window.innerHeight;

        let pointer = pointers.find((p) => p.id === touch.identifier);
        if (!pointer) {
          pointer = {
            id: touch.identifier,
            texcoordX: posX,
            texcoordY: posY,
            prevTexcoordX: posX,
            prevTexcoordY: posY,
            deltaX: 0,
            deltaY: 0,
            down: true,
            moved: false,
            color: getCyclingSmokeColor(colorTimer),
          };
          pointers.push(pointer);
        } else {
          pointer.prevTexcoordX = posX;
          pointer.prevTexcoordY = posY;
          pointer.down = true;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const posX = touch.clientX / window.innerWidth;
        const posY = 1.0 - touch.clientY / window.innerHeight;

        let pointer = pointers.find((p) => p.id === touch.identifier);
        if (!pointer) continue;

        const dx = (posX - pointer.prevTexcoordX) * config.SPLAT_FORCE;
        const dy = (posY - pointer.prevTexcoordY) * config.SPLAT_FORCE;

        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
          colorTimer += 0.035;
          const color = getCyclingSmokeColor(colorTimer);
          splat(posX, posY, dx, dy, color);
          pointer.prevTexcoordX = posX;
          pointer.prevTexcoordY = posY;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        const idx = pointers.findIndex((p) => p.id === touch.identifier);
        if (idx !== -1) {
          pointers.splice(idx, 1);
        }
      }
    };

    const handleResize = () => {
      if (resizeCanvas()) {
        initFramebuffers();
      }
    };

    // Attach listeners with passive: true so scrolling & foreground clicks are never blocked
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Main physics and render loop
    let lastTime = performance.now();
    let rafId: number;

    const updateLoop = () => {
      const now = performance.now();
      let dt = (now - lastTime) / 1000;
      dt = Math.min(dt, 0.0333); // Clamp delta time to avoid physics explosion
      lastTime = now;

      step(dt);
      render();

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    // Context loss handler
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(rafId);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    // Component unmount cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);

      // WebGL resource disposal
      if (gl) {
        const deleteFbo = (fboObj?: FBO) => {
          if (!fboObj || !gl) return;
          if (fboObj.fbo) gl.deleteFramebuffer(fboObj.fbo);
          if (fboObj.texture) gl.deleteTexture(fboObj.texture);
        };
        const deleteDoubleFbo = (doubleFbo?: DoubleFBO) => {
          if (!doubleFbo) return;
          deleteFbo(doubleFbo.read);
          deleteFbo(doubleFbo.write);
        };

        deleteDoubleFbo(density);
        deleteDoubleFbo(velocity);
        deleteDoubleFbo(pressure);
        deleteFbo(divergence);
        deleteFbo(curl);

        if (quadVbo) gl.deleteBuffer(quadVbo);
        if (quadIbo) gl.deleteBuffer(quadIbo);

        const progs = [
          clearProgram,
          splatProgram,
          advectionProgram,
          divergenceProgram,
          curlProgram,
          vorticityProgram,
          pressureProgram,
          gradSubtractProgram,
          displayProgram,
        ];
        progs.forEach((p) => {
          if (p && p.program && gl) gl.deleteProgram(p.program);
        });

        // Trigger context lose if supported to immediately release GPU resources
        const loseCtx = gl.getExtension('WEBGL_lose_context');
        if (loseCtx) {
          loseCtx.loseContext();
        }
      }
    };
  }, [customConfig]);

  return (
    <canvas
      ref={canvasRef}
      id="fluid-canvas"
      className={`fixed inset-0 w-screen h-screen pointer-events-none z-0 ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export const FluidCanvas: React.FC<FluidCursorProps> = FluidCursor;
export default FluidCursor;
