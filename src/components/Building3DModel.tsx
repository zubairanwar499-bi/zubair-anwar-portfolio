import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Sparkles, 
  RotateCcw, 
  Play, 
  Pause, 
  Layers, 
  Database, 
  BarChart3, 
  Code2, 
  FolderGit2, 
  Mail, 
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoomData {
  id: string;
  name: string;
  category: string;
  description: string;
  targetSection: string;
  icon: any;
  color: string;
  glowColor: string;
  cameraPos: { x: number; y: number; z: number };
  targetPos: { x: number; y: number; z: number };
}

const ROOMS: RoomData[] = [
  {
    id: 'central-analytics',
    name: 'Central Command & Analytics Room',
    category: 'Executive BI & KPIs',
    description: 'Curved ultra-wide dashboard room monitoring enterprise revenue ($4.82M), Net Revenue Retention (118.4%), and real-time operational metrics.',
    targetSection: '#projects',
    icon: BarChart3,
    color: 'text-cyan-400',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    cameraPos: { x: 0, y: 12, z: 14 },
    targetPos: { x: 0, y: 3, z: 0 },
  },
  {
    id: 'powerbi-workspace',
    name: 'Power BI Reporting Studio',
    category: 'DAX & Semantic Modeling',
    description: 'Specialized BI development room featuring interactive Power BI reports, dynamic slicers, matrix visual layouts, and Star Schema modeling.',
    targetSection: '#skills',
    icon: FolderGit2,
    color: 'text-amber-400',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    cameraPos: { x: 9, y: 11, z: 8 },
    targetPos: { x: 6, y: 2.5, z: -4 },
  },
  {
    id: 'data-pipeline',
    name: 'Data Pipeline & Database Vault',
    category: 'Lakehouse & ETL Systems',
    description: 'Server room with cylindrical data warehouses, automated ETL pipelines, and Microsoft Fabric Direct Lake high-speed ingestion.',
    targetSection: '#experience',
    icon: Database,
    color: 'text-blue-400',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    cameraPos: { x: -9, y: 11, z: 8 },
    targetPos: { x: -6, y: 2.5, z: -4 },
  },
  {
    id: 'python-lab',
    name: 'Python Analytics & Machine Learning',
    category: 'Python, Pandas & ML',
    description: 'Data science workstation dedicated to exploratory data analysis, predictive statistical models, regression analysis, and automated script pipelines.',
    targetSection: '#skills',
    icon: Code2,
    color: 'text-emerald-400',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    cameraPos: { x: -8, y: 9, z: 12 },
    targetPos: { x: -5, y: 2, z: 4 },
  },
  {
    id: 'asset-library',
    name: 'Visualization Asset Library',
    category: 'Design & Stakeholder Solutions',
    description: 'Interactive smart conference table projecting global geographic intelligence and reusable corporate visual frameworks.',
    targetSection: '#services',
    icon: Layers,
    color: 'text-purple-400',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    cameraPos: { x: 8, y: 9, z: 12 },
    targetPos: { x: 5, y: 2, z: 4 },
  },
  {
    id: 'entrance-lobby',
    name: 'Executive Entrance & Contact HQ',
    category: 'Consulting & Direct Discovery',
    description: 'Glass architectural foyer providing direct communication channels, discovery scheduling, and WhatsApp consultation access.',
    targetSection: '#contact',
    icon: Mail,
    color: 'text-teal-400',
    glowColor: 'rgba(45, 212, 191, 0.4)',
    cameraPos: { x: 0, y: 8, z: 16 },
    targetPos: { x: 0, y: 1, z: 7 },
  },
];

export const Building3DModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeRoom, setActiveRoom] = useState<RoomData>(ROOMS[0]);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // References for Three.js animation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.5, 0));
  const isUserDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationAngleRef = useRef(0.4);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 580;
    const height = container.clientHeight || 520;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup (Elevated Isometric Perspective)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(15, 17, 19);
    cameraRef.current = camera;

    // 3. Renderer with High-Performance Settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting System (Futuristic Cyber Studio & Neon Accents)
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.2);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0xffffff, 2.0);
    mainSun.position.set(16, 28, 18);
    mainSun.castShadow = true;
    mainSun.shadow.mapSize.width = 1024;
    mainSun.shadow.mapSize.height = 1024;
    mainSun.shadow.camera.near = 0.5;
    mainSun.shadow.camera.far = 60;
    mainSun.shadow.camera.left = -15;
    mainSun.shadow.camera.right = 15;
    mainSun.shadow.camera.top = 15;
    mainSun.shadow.camera.bottom = -15;
    scene.add(mainSun);

    // Cyan Neon Fill Light
    const cyanLight = new THREE.PointLight(0x00f0ff, 3.5, 30);
    cyanLight.position.set(0, 6, 0);
    scene.add(cyanLight);

    // Blue Pipeline Point Light
    const blueLight = new THREE.PointLight(0x3b82f6, 2.5, 25);
    blueLight.position.set(-6, 5, -4);
    scene.add(blueLight);

    // Gold / Amber Power BI Light
    const amberLight = new THREE.PointLight(0xf59e0b, 2.8, 25);
    amberLight.position.set(6, 5, -4);
    scene.add(amberLight);

    // 5. Build 3D Cutaway Architectural Model
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // Base Foundation Platform (Dark Brushed Metal / Carbon Fiber)
    const baseGeo = new THREE.BoxGeometry(18, 0.8, 16);
    const baseMat = new THREE.MeshStandardMaterial({ 
      color: 0x070d1e, 
      roughness: 0.35, 
      metalness: 0.7 
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.4;
    baseMesh.receiveShadow = true;
    buildingGroup.add(baseMesh);

    // Neon Trim Base Ring
    const baseGlowGeo = new THREE.BoxGeometry(18.2, 0.15, 16.2);
    const baseGlowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const baseGlowMesh = new THREE.Mesh(baseGlowGeo, baseGlowMat);
    baseGlowMesh.position.y = 0.02;
    buildingGroup.add(baseGlowMesh);

    // Floor Tile Plane with High-Tech Grid Pattern
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0a1128';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 2;
      for (let i = 0; i <= 512; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }
    }
    const floorTexture = new THREE.CanvasTexture(canvas);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);

    const floorGeo = new THREE.PlaneGeometry(17.8, 15.8);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.2,
      metalness: 0.4,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0.04;
    floorMesh.receiveShadow = true;
    buildingGroup.add(floorMesh);

    // Architectural Cutaway Walls
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x152238,
      roughness: 0.4,
      metalness: 0.3,
    });

    const createWall = (w: number, h: number, d: number, x: number, y: number, z: number) => {
      const wallGeo = new THREE.BoxGeometry(w, h, d);
      const wall = new THREE.Mesh(wallGeo, wallMat);
      wall.position.set(x, y, z);
      wall.castShadow = true;
      wall.receiveShadow = true;
      buildingGroup.add(wall);
      return wall;
    };

    // Outer Back & Side Cutaway Walls
    createWall(18, 4.2, 0.5, 0, 2.1, -7.8);      // Back wall
    createWall(0.5, 4.2, 16, -8.8, 2.1, 0);      // Left wall
    createWall(0.5, 4.2, 16, 8.8, 2.1, 0);       // Right wall
    createWall(5.5, 2.5, 0.5, -6, 1.25, 7.8);    // Front left cut wall
    createWall(5.5, 2.5, 0.5, 6, 1.25, 7.8);     // Front right cut wall

    // Interior Room Partitions
    createWall(0.4, 3.8, 6, -2.5, 1.9, -4.8);   // Pipeline room right wall
    createWall(0.4, 3.8, 6, 2.5, 1.9, -4.8);    // Power BI room left wall
    createWall(6, 3.0, 0.4, -5.8, 1.5, 0.5);    // Python room front wall
    createWall(6, 3.0, 0.4, 5.8, 1.5, 0.5);     // Asset library front wall

    // 6. Architectural 3D Wall Banner: "ZUBAIR ANWAR • DATA ANALYST"
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 1024;
    signCanvas.height = 160;
    const signCtx = signCanvas.getContext('2d');
    if (signCtx) {
      signCtx.fillStyle = '#050a17';
      signCtx.fillRect(0, 0, 1024, 160);
      signCtx.strokeStyle = '#00f0ff';
      signCtx.lineWidth = 6;
      signCtx.strokeRect(8, 8, 1008, 144);
      
      signCtx.font = 'bold 54px monospace';
      signCtx.fillStyle = '#ffffff';
      signCtx.textAlign = 'center';
      signCtx.textBaseline = 'middle';
      signCtx.fillText('ZUBAIR ANWAR  •  DATA ANALYST', 512, 60);

      signCtx.font = 'bold 30px monospace';
      signCtx.fillStyle = '#00f0ff';
      signCtx.fillText('ENTERPRISE BI & FABRIC ARCHITECTURE HQ', 512, 115);
    }
    const signTexture = new THREE.CanvasTexture(signCanvas);
    const signGeo = new THREE.PlaneGeometry(8.5, 1.3);
    const signMat = new THREE.MeshBasicMaterial({ 
      map: signTexture, 
      transparent: true,
      side: THREE.DoubleSide
    });
    const signMesh = new THREE.Mesh(signGeo, signMat);
    signMesh.position.set(0, 3.8, -7.5);
    buildingGroup.add(signMesh);

    // 7. Central Command Room: Curved Ultra-Wide Dashboard Screen
    const curveGeo = new THREE.CylinderGeometry(5.2, 5.2, 2.6, 32, 1, true, -Math.PI * 0.4, Math.PI * 0.8);
    const dashCanvas = document.createElement('canvas');
    dashCanvas.width = 1024;
    dashCanvas.height = 512;
    const dCtx = dashCanvas.getContext('2d');
    if (dCtx) {
      dCtx.fillStyle = '#030712';
      dCtx.fillRect(0, 0, 1024, 512);

      // KPI Metric Cards at top
      dCtx.fillStyle = '#0f172a';
      dCtx.fillRect(40, 30, 200, 80);
      dCtx.fillRect(280, 30, 200, 80);
      dCtx.fillRect(520, 30, 200, 80);
      dCtx.fillRect(760, 30, 200, 80);

      dCtx.font = 'bold 24px monospace';
      dCtx.fillStyle = '#00f0ff';
      dCtx.fillText('12.4M ARR', 55, 75);
      dCtx.fillStyle = '#10b981';
      dCtx.fillText('+18.4% NRR', 295, 75);
      dCtx.fillStyle = '#f59e0b';
      dCtx.fillText('4,230 ACCOUNTS', 535, 75);
      dCtx.fillStyle = '#8b5cf6';
      dCtx.fillText('99.9% UPTIME', 775, 75);

      // Animated Wave Graph
      dCtx.strokeStyle = '#00f0ff';
      dCtx.lineWidth = 4;
      dCtx.beginPath();
      for (let x = 40; x <= 480; x += 15) {
        const y = 240 + Math.sin(x * 0.03) * 50;
        if (x === 40) dCtx.moveTo(x, y);
        else dCtx.lineTo(x, y);
      }
      dCtx.stroke();

      // Bar Chart Mock
      const bars = [40, 65, 85, 110, 95, 140, 160, 130];
      bars.forEach((val, i) => {
        dCtx.fillStyle = i % 2 === 0 ? '#3b82f6' : '#00f0ff';
        dCtx.fillRect(540 + i * 50, 320 - val, 36, val);
      });

      // World Map Dots Grid
      dCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        const mx = 60 + (i * 23) % 400;
        const my = 350 + (i * 17) % 120;
        dCtx.beginPath();
        dCtx.arc(mx, my, 3, 0, Math.PI * 2);
        dCtx.fill();
      }
    }
    const dashTexture = new THREE.CanvasTexture(dashCanvas);
    const curveMat = new THREE.MeshBasicMaterial({ 
      map: dashTexture, 
      side: THREE.BackSide 
    });
    const curvedScreen = new THREE.Mesh(curveGeo, curveMat);
    curvedScreen.position.set(0, 2.2, -4.5);
    buildingGroup.add(curvedScreen);

    // Central Circular Console Desk
    const consoleGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.5, 32, 1, true, 0, Math.PI);
    const consoleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 });
    const consoleDesk = new THREE.Mesh(consoleGeo, consoleMat);
    consoleDesk.position.set(0, 0.6, -1.2);
    consoleDesk.rotation.y = Math.PI;
    buildingGroup.add(consoleDesk);

    // Central Glowing Holographic Data Core Cube
    const coreGeo = new THREE.BoxGeometry(1.1, 1.1, 1.1);
    const coreMat = new THREE.MeshStandardMaterial({ 
      color: 0x00f0ff, 
      emissive: 0x00f0ff,
      emissiveIntensity: 0.8,
      wireframe: true 
    });
    const coreCube = new THREE.Mesh(coreGeo, coreMat);
    coreCube.position.set(0, 1.2, 2.2);
    buildingGroup.add(coreCube);

    // 8. Room 3: Database Tanks & Server Racks
    const tankGeo = new THREE.CylinderGeometry(0.7, 0.7, 2.2, 24);
    const tankMat = new THREE.MeshStandardMaterial({ 
      color: 0x0f172a, 
      metalness: 0.85, 
      roughness: 0.2 
    });
    const tank1 = new THREE.Mesh(tankGeo, tankMat);
    tank1.position.set(-6.2, 1.1, -4.8);
    buildingGroup.add(tank1);

    const tank2 = new THREE.Mesh(tankGeo, tankMat);
    tank2.position.set(-4.5, 1.1, -4.8);
    buildingGroup.add(tank2);

    // Glowing Tank Level Rings
    const ringGeo = new THREE.TorusGeometry(0.72, 0.04, 12, 24);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const r1 = new THREE.Mesh(ringGeo, ringMat);
    r1.rotation.x = Math.PI / 2;
    r1.position.set(-6.2, 1.4, -4.8);
    buildingGroup.add(r1);

    const r2 = new THREE.Mesh(ringGeo, ringMat);
    r2.rotation.x = Math.PI / 2;
    r2.position.set(-4.5, 1.7, -4.8);
    buildingGroup.add(r2);

    // Server Racks with Blinking LED Textures
    const rackGeo = new THREE.BoxGeometry(0.8, 3.2, 2.2);
    const rackMat = new THREE.MeshStandardMaterial({ color: 0x090d16, metalness: 0.9, roughness: 0.3 });
    const rack1 = new THREE.Mesh(rackGeo, rackMat);
    rack1.position.set(-7.8, 1.6, -4.8);
    buildingGroup.add(rack1);

    // 9. Room 2: Power BI Workspace Displays & Desks
    const pbiDeskGeo = new THREE.BoxGeometry(4.2, 0.6, 1.2);
    const pbiDeskMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.5 });
    const pbiDesk = new THREE.Mesh(pbiDeskGeo, pbiDeskMat);
    pbiDesk.position.set(5.8, 0.6, -5.2);
    buildingGroup.add(pbiDesk);

    // Power BI Big Wall Screen with Yellow Accent
    const pbiScreenGeo = new THREE.PlaneGeometry(3.6, 2.2);
    const pbiScreenMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
    const pbiScreen = new THREE.Mesh(pbiScreenGeo, pbiScreenMat);
    pbiScreen.position.set(5.8, 2.5, -7.45);
    buildingGroup.add(pbiScreen);

    // 10. Room 4: Python Analytics Room (Symbol on wall)
    const pyDeskGeo = new THREE.BoxGeometry(3.6, 0.6, 1.2);
    const pyDesk = new THREE.Mesh(pyDeskGeo, pbiDeskMat);
    pyDesk.position.set(-5.5, 0.6, 4.2);
    buildingGroup.add(pyDesk);

    const pySignGeo = new THREE.BoxGeometry(1.2, 1.2, 0.1);
    const pySignMat = new THREE.MeshStandardMaterial({ 
      color: 0x38bdf8, 
      emissive: 0x38bdf8, 
      emissiveIntensity: 0.4 
    });
    const pySign = new THREE.Mesh(pySignGeo, pySignMat);
    pySign.position.set(-8.6, 2.4, 4.2);
    pySign.rotation.y = Math.PI / 2;
    buildingGroup.add(pySign);

    // 11. Room 5: Asset Library Smart Conference Table
    const confTableGeo = new THREE.BoxGeometry(3.2, 0.6, 2.2);
    const confTableMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
    const confTable = new THREE.Mesh(confTableGeo, confTableMat);
    confTable.position.set(5.5, 0.6, 4.2);
    buildingGroup.add(confTable);

    const confDisplayGeo = new THREE.PlaneGeometry(2.8, 1.8);
    const confDisplayMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const confDisplay = new THREE.Mesh(confDisplayGeo, confDisplayMat);
    confDisplay.rotation.x = -Math.PI / 2;
    confDisplay.position.set(5.5, 0.91, 4.2);
    buildingGroup.add(confDisplay);

    // 12. Glowing Data Pipe / Conduits Connecting All Rooms
    const pipePoints = [
      new THREE.Vector3(-6, 0.2, -4.5),
      new THREE.Vector3(-4, 0.2, -1),
      new THREE.Vector3(0, 0.2, 2.2),
      new THREE.Vector3(4, 0.2, -1),
      new THREE.Vector3(6, 0.2, -4.5),
    ];
    const curve = new THREE.CatmullRomCurve3(pipePoints);
    const pipeGeo = new THREE.TubeGeometry(curve, 64, 0.18, 12, false);
    const pipeMat = new THREE.MeshStandardMaterial({ 
      color: 0x00f0ff, 
      emissive: 0x00f0ff,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.85
    });
    const pipeMesh = new THREE.Mesh(pipeGeo, pipeMat);
    buildingGroup.add(pipeMesh);

    // 13. Orbit Drag Controls
    const handleMouseDown = (e: MouseEvent) => {
      isUserDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isUserDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      rotationAngleRef.current += deltaX * 0.008;
      camera.position.y = Math.max(6, Math.min(25, camera.position.y - deltaY * 0.04));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isUserDraggingRef.current = false;
    };

    // Touch Support for Mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isUserDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isUserDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      rotationAngleRef.current += deltaX * 0.01;
      camera.position.y = Math.max(6, Math.min(25, camera.position.y - deltaY * 0.05));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // 14. Smooth Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto-rotation if enabled and user not dragging
      if (isAutoRotate && !isUserDraggingRef.current && !isHovered) {
        rotationAngleRef.current += 0.003;
      }

      // Rotate camera smoothly around target
      const radius = 24;
      camera.position.x = Math.sin(rotationAngleRef.current) * radius;
      camera.position.z = Math.cos(rotationAngleRef.current) * radius;
      camera.lookAt(controlsTargetRef.current);

      // Pulse Core Cube
      if (coreCube) {
        coreCube.rotation.x = elapsedTime * 0.8;
        coreCube.rotation.y = elapsedTime * 1.2;
        const s = 1 + Math.sin(elapsedTime * 3) * 0.08;
        coreCube.scale.set(s, s, s);
      }

      // Pulse Cyan Lights
      cyanLight.intensity = 3.0 + Math.sin(elapsedTime * 4) * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    // 15. Responsive Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [isAutoRotate, isHovered]);

  const selectRoom = (room: RoomData) => {
    setActiveRoom(room);
    setShowInfoCard(true);

    // Smooth programmatic scroll directly to that section
    const targetId = room.targetSection.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition > 0 ? offsetPosition : 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-2xl lg:max-w-none flex flex-col items-center select-none"
    >
      
      {/* 3D Model Frame Container with Dynamic Cyber Neon Border */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-slate-950/90 dark:bg-navy-950/95 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 backdrop-blur-2xl">
        
        {/* Subtle Cyber Corner Brackets */}
        <span className="cyber-corner-tl" />
        <span className="cyber-corner-tr" />
        <span className="cyber-corner-bl" />
        <span className="cyber-corner-br" />

        {/* 3D WebGL Canvas Mount */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top Floating HUD Status Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
          
          {/* Active Room Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-navy-900/95 border border-cyan-500/40 backdrop-blur-md shadow-lg pointer-events-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-xs font-mono font-bold text-white tracking-wide">
              3D BI Model: <span className="text-cyan-400">{activeRoom.name}</span>
            </span>
          </div>

          {/* Interactive Mode & Rotate Controls */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className="p-2 rounded-xl bg-slate-900/90 dark:bg-navy-900/95 border border-slate-700/80 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 transition-colors shadow-md cursor-pointer"
              title={isAutoRotate ? 'Pause 360° Rotation' : 'Resume 360° Rotation'}
            >
              {isAutoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                rotationAngleRef.current = 0.4;
                if (cameraRef.current) cameraRef.current.position.set(15, 17, 19);
              }}
              className="p-2 rounded-xl bg-slate-900/90 dark:bg-navy-900/95 border border-slate-700/80 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 transition-colors shadow-md cursor-pointer"
              title="Reset Isometric Angle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Floating Interactive Room Hotspots */}
        <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-center gap-1.5 z-20 pointer-events-auto">
          {ROOMS.map((room) => {
            const isSelected = activeRoom.id === room.id;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => selectRoom(room)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all duration-200 cursor-pointer backdrop-blur-md shadow-md ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-cyan-500/40 scale-105 border border-cyan-300'
                    : 'bg-slate-900/85 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-700/70'
                }`}
              >
                <room.icon className="w-3 h-3" />
                <span>{room.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Real-time Room Detail Card */}
      <AnimatePresence>
        {showInfoCard && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="w-full mt-3 p-4 rounded-2xl bg-slate-900/95 dark:bg-navy-900/95 border border-cyan-500/40 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <activeRoom.icon className={`w-4 h-4 ${activeRoom.color}`} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  {activeRoom.category}
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">
                {activeRoom.name}
              </h4>
              <p className="text-xs text-slate-300 leading-snug max-w-lg">
                {activeRoom.description}
              </p>
            </div>

            <a
              href={activeRoom.targetSection}
              onClick={(e) => {
                e.preventDefault();
                selectRoom(activeRoom);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/25 transition-all duration-200 cursor-pointer shrink-0"
            >
              <span>Explore Section</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction Caption */}
      <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400">
        <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span>Drag to rotate 360° in 3D • Click any room to navigate directly</span>
      </div>

    </div>
  );
};
