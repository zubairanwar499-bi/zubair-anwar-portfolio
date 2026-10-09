import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  BarChart3, 
  Code2, 
  Database, 
  FolderGit2, 
  Layers, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move3D
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoomData {
  id: string;
  name: string;
  badge: string;
  category: string;
  description: string;
  targetSection: string;
  icon: any;
  color: string;
  metrics: { label: string; value: string }[];
  worldPos: THREE.Vector3;
}

const ROOMS: RoomData[] = [
  {
    id: 'central-analytics',
    name: 'Central Command & Analytics Room',
    badge: 'Executive BI & Metrics',
    category: 'Central Analytics Dashboard',
    description: 'Curved ultra-wide command display monitoring enterprise revenue ($12.4M ARR), Net Revenue Retention (118.4%), and real-time business performance.',
    metrics: [
      { label: 'Enterprise ARR', value: '$12.4M' },
      { label: 'NRR %', value: '+18.4%' },
      { label: 'Active Accounts', value: '4,230' }
    ],
    targetSection: '#projects',
    icon: BarChart3,
    color: 'text-cyan-400',
    worldPos: new THREE.Vector3(0, 2.8, -1.8),
  },
  {
    id: 'powerbi-workspace',
    name: 'Power BI Reporting Studio',
    badge: 'DAX & Semantic Modeling',
    category: 'Power BI & Microsoft Fabric',
    description: 'Specialized BI development room featuring interactive Power BI reports, Star Schema dimensional models, dynamic slicers, and executive matrix tables.',
    metrics: [
      { label: 'Models Built', value: '15+' },
      { label: 'VertiPaq Speed', value: '< 120ms' },
      { label: 'DAX Measures', value: '120+' }
    ],
    targetSection: '#skills',
    icon: FolderGit2,
    color: 'text-amber-400',
    worldPos: new THREE.Vector3(5.8, 2.5, -4.5),
  },
  {
    id: 'data-pipeline',
    name: 'Data Pipeline & Database Vault',
    badge: 'Lakehouse & ETL Systems',
    category: 'SQL, Fabric & Data Marts',
    description: 'Technical server room with cylindrical data storage, automated ETL extraction, and Microsoft Fabric Direct Lake pipelines powering instant dashboards.',
    metrics: [
      { label: 'Data Latency', value: 'Sub-second' },
      { label: 'ETL Pipelines', value: '25+' },
      { label: 'SQL Automation', value: '100%' }
    ],
    targetSection: '#experience',
    icon: Database,
    color: 'text-blue-400',
    worldPos: new THREE.Vector3(-5.8, 2.5, -4.5),
  },
  {
    id: 'python-lab',
    name: 'Python Analytics & ML Lab',
    badge: 'Python & Statistical Modeling',
    category: 'Pandas, NumPy & Machine Learning',
    description: 'Programming workstation dedicated to exploratory data analysis, predictive statistical models, customer churn forecasting, and script automation.',
    metrics: [
      { label: 'Model Accuracy', value: '94.2%' },
      { label: 'Libraries', value: 'Pandas/SciPy' },
      { label: 'Automated Scripts', value: '40+' }
    ],
    targetSection: '#skills',
    icon: Code2,
    color: 'text-emerald-400',
    worldPos: new THREE.Vector3(-5.5, 2.2, 4.0),
  },
  {
    id: 'asset-library',
    name: 'Visualization Asset Library',
    badge: 'Design & Stakeholder Solutions',
    category: 'Smart Meeting & Strategy Room',
    description: 'Interactive smart conference table projecting global geographic intelligence, reusable dashboard design patterns, and cross-functional reporting.',
    metrics: [
      { label: 'Chart Frameworks', value: '30+' },
      { label: 'Adoption Rate', value: '98%' },
      { label: 'Stakeholders', value: 'Global' }
    ],
    targetSection: '#services',
    icon: Layers,
    color: 'text-purple-400',
    worldPos: new THREE.Vector3(5.5, 2.2, 4.0),
  },
  {
    id: 'entrance-lobby',
    name: 'Executive Entrance & Contact HQ',
    badge: 'Consulting & Direct Discovery',
    category: 'Zubair Anwar BI Headquarters',
    description: 'Architectural entrance providing direct communication channels, discovery call scheduling, and direct WhatsApp consultation access.',
    metrics: [
      { label: 'Response Time', value: '< 2 Hours' },
      { label: 'Availability', value: 'Open for Roles' },
      { label: 'Location', value: 'Worldwide' }
    ],
    targetSection: '#contact',
    icon: Mail,
    color: 'text-teal-400',
    worldPos: new THREE.Vector3(0, 1.4, 7.5),
  },
];

export const Building3DModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<RoomData | null>(null);
  const [hotspotPositions, setHotspotPositions] = useState<{ [id: string]: { x: number; y: number; visible: boolean } }>({});
  const [isDragging, setIsDragging] = useState(false);

  // Three.js State Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  // Manual 360-Degree Cursor Drag & Zoom State (Auto-Rotate Permanently OFF)
  const rotationYRef = useRef(0.45);
  const rotationXRef = useRef(0.55);
  const targetRotationYRef = useRef(0.45);
  const targetRotationXRef = useRef(0.55);
  const zoomDistanceRef = useRef(24);
  const targetZoomDistanceRef = useRef(24);
  const isPointerDownRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const touchDistanceStartRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 480;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup (Perspective Orbit Camera)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 16, 24);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer with High Quality
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

    // 4. Lighting Rig (Adapts to Light & Dark Moods)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(16, 32, 22);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 4.0, 40);
    cyanPoint.position.set(0, 6, 0);
    scene.add(cyanPoint);

    const bluePoint = new THREE.PointLight(0x3b82f6, 3.0, 30);
    bluePoint.position.set(-6, 4, -4);
    scene.add(bluePoint);

    const amberPoint = new THREE.PointLight(0xf59e0b, 3.2, 30);
    amberPoint.position.set(6, 4, -4);
    scene.add(amberPoint);

    // 5. 3D Architectural Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Foundation Base
    const baseGeo = new THREE.BoxGeometry(18, 0.8, 16);
    const baseMat = new THREE.MeshStandardMaterial({ 
      color: 0x080f22, 
      roughness: 0.25, 
      metalness: 0.85 
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.4;
    baseMesh.receiveShadow = true;
    modelGroup.add(baseMesh);

    // Glowing Neon Base Ring
    const trimGeo = new THREE.BoxGeometry(18.25, 0.12, 16.25);
    const trimMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.position.y = 0.01;
    modelGroup.add(trimMesh);

    // Polished Floor with Cyber Grid Texture
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 512;
    floorCanvas.height = 512;
    const fCtx = floorCanvas.getContext('2d');
    if (fCtx) {
      fCtx.fillStyle = '#060c1e';
      fCtx.fillRect(0, 0, 512, 512);
      fCtx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      fCtx.lineWidth = 2;
      for (let i = 0; i <= 512; i += 32) {
        fCtx.beginPath();
        fCtx.moveTo(i, 0);
        fCtx.lineTo(i, 512);
        fCtx.stroke();
        fCtx.beginPath();
        fCtx.moveTo(0, i);
        fCtx.lineTo(512, i);
        fCtx.stroke();
      }
    }
    const floorTexture = new THREE.CanvasTexture(floorCanvas);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);

    const floorGeo = new THREE.PlaneGeometry(17.8, 15.8);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.2,
      metalness: 0.6,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0.03;
    floorMesh.receiveShadow = true;
    modelGroup.add(floorMesh);

    // Cutaway Architectural Walls
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x141e33,
      roughness: 0.4,
      metalness: 0.4,
    });

    const addWall = (w: number, h: number, d: number, x: number, y: number, z: number) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, wallMat);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      modelGroup.add(mesh);
      return mesh;
    };

    // Outer Back & Side Cutaway Walls
    addWall(18, 4.4, 0.5, 0, 2.2, -7.8);      // Back wall
    addWall(0.5, 4.4, 16, -8.8, 2.2, 0);      // Left wall
    addWall(0.5, 4.4, 16, 8.8, 2.2, 0);       // Right wall
    addWall(5.5, 2.4, 0.5, -6, 1.2, 7.8);     // Front left cut wall
    addWall(5.5, 2.4, 0.5, 6, 1.2, 7.8);      // Front right cut wall

    // Interior Room Partitions
    addWall(0.4, 3.8, 6, -2.5, 1.9, -4.8);   // Pipeline room right wall
    addWall(0.4, 3.8, 6, 2.5, 1.9, -4.8);    // Power BI room left wall
    addWall(6, 3.0, 0.4, -5.8, 1.5, 0.5);    // Python room front wall
    addWall(6, 3.0, 0.4, 5.8, 1.5, 0.5);     // Asset library front wall

    // Glowing Holographic Wall Banner: "ZUBAIR ANWAR • DATA ANALYST"
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 1024;
    signCanvas.height = 160;
    const sCtx = signCanvas.getContext('2d');
    if (sCtx) {
      sCtx.fillStyle = '#020614';
      sCtx.fillRect(0, 0, 1024, 160);
      sCtx.strokeStyle = '#00f0ff';
      sCtx.lineWidth = 6;
      sCtx.strokeRect(8, 8, 1008, 144);
      
      sCtx.font = 'bold 52px monospace';
      sCtx.fillStyle = '#ffffff';
      sCtx.textAlign = 'center';
      sCtx.textBaseline = 'middle';
      sCtx.fillText('ZUBAIR ANWAR  •  DATA ANALYST', 512, 60);

      sCtx.font = 'bold 28px monospace';
      sCtx.fillStyle = '#00f0ff';
      sCtx.fillText('ENTERPRISE BI & FABRIC ARCHITECTURE HQ', 512, 115);
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
    modelGroup.add(signMesh);

    // Central Command Room: Curved Ultra-Wide Dashboard Screen
    const curveGeo = new THREE.CylinderGeometry(5.2, 5.2, 2.6, 32, 1, true, -Math.PI * 0.4, Math.PI * 0.8);
    const dashCanvas = document.createElement('canvas');
    dashCanvas.width = 1024;
    dashCanvas.height = 512;
    const dCtx = dashCanvas.getContext('2d');
    if (dCtx) {
      dCtx.fillStyle = '#020614';
      dCtx.fillRect(0, 0, 1024, 512);

      // Top KPI Cards
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

      // Line Chart
      dCtx.strokeStyle = '#00f0ff';
      dCtx.lineWidth = 4;
      dCtx.beginPath();
      for (let x = 40; x <= 480; x += 15) {
        const y = 240 + Math.sin(x * 0.03) * 50;
        if (x === 40) dCtx.moveTo(x, y);
        else dCtx.lineTo(x, y);
      }
      dCtx.stroke();

      // Bar Chart
      const bars = [40, 65, 85, 110, 95, 140, 160, 130];
      bars.forEach((val, i) => {
        dCtx.fillStyle = i % 2 === 0 ? '#3b82f6' : '#00f0ff';
        dCtx.fillRect(540 + i * 50, 320 - val, 36, val);
      });
    }
    const dashTexture = new THREE.CanvasTexture(dashCanvas);
    const curveMat = new THREE.MeshBasicMaterial({ 
      map: dashTexture, 
      side: THREE.BackSide 
    });
    const curvedScreen = new THREE.Mesh(curveGeo, curveMat);
    curvedScreen.position.set(0, 2.2, -4.5);
    modelGroup.add(curvedScreen);

    // Central Circular Console Desk & Core Cube
    const consoleGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.5, 32, 1, true, 0, Math.PI);
    const consoleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 });
    const consoleDesk = new THREE.Mesh(consoleGeo, consoleMat);
    consoleDesk.position.set(0, 0.6, -1.2);
    consoleDesk.rotation.y = Math.PI;
    modelGroup.add(consoleDesk);

    const coreGeo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
    const coreMat = new THREE.MeshStandardMaterial({ 
      color: 0x00f0ff, 
      emissive: 0x00f0ff,
      emissiveIntensity: 0.9,
      wireframe: true 
    });
    const coreCube = new THREE.Mesh(coreGeo, coreMat);
    coreCube.position.set(0, 1.1, 2.2);
    modelGroup.add(coreCube);

    // Database Cylinders & Server Racks
    const tankGeo = new THREE.CylinderGeometry(0.7, 0.7, 2.2, 24);
    const tankMat = new THREE.MeshStandardMaterial({ color: 0x0e1726, metalness: 0.9, roughness: 0.2 });
    const tank1 = new THREE.Mesh(tankGeo, tankMat);
    tank1.position.set(-6.2, 1.1, -4.8);
    modelGroup.add(tank1);

    const tank2 = new THREE.Mesh(tankGeo, tankMat);
    tank2.position.set(-4.5, 1.1, -4.8);
    modelGroup.add(tank2);

    const ringGeo = new THREE.TorusGeometry(0.72, 0.04, 12, 24);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const r1 = new THREE.Mesh(ringGeo, ringMat);
    r1.rotation.x = Math.PI / 2;
    r1.position.set(-6.2, 1.4, -4.8);
    modelGroup.add(r1);

    const r2 = new THREE.Mesh(ringGeo, ringMat);
    r2.rotation.x = Math.PI / 2;
    r2.position.set(-4.5, 1.7, -4.8);
    modelGroup.add(r2);

    const rackGeo = new THREE.BoxGeometry(0.8, 3.2, 2.2);
    const rackMat = new THREE.MeshStandardMaterial({ color: 0x080d1a, metalness: 0.9, roughness: 0.3 });
    const rack1 = new THREE.Mesh(rackGeo, rackMat);
    rack1.position.set(-7.8, 1.6, -4.8);
    modelGroup.add(rack1);

    // Power BI Workspace Screen
    const pbiDeskGeo = new THREE.BoxGeometry(4.2, 0.6, 1.2);
    const pbiDeskMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.5 });
    const pbiDesk = new THREE.Mesh(pbiDeskGeo, pbiDeskMat);
    pbiDesk.position.set(5.8, 0.6, -5.2);
    modelGroup.add(pbiDesk);

    const pbiScreenGeo = new THREE.PlaneGeometry(3.6, 2.2);
    const pbiScreenMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
    const pbiScreen = new THREE.Mesh(pbiScreenGeo, pbiScreenMat);
    pbiScreen.position.set(5.8, 2.5, -7.45);
    modelGroup.add(pbiScreen);

    // Python Lab Insignia
    const pyDeskGeo = new THREE.BoxGeometry(3.6, 0.6, 1.2);
    const pyDesk = new THREE.Mesh(pyDeskGeo, pbiDeskMat);
    pyDesk.position.set(-5.5, 0.6, 4.2);
    modelGroup.add(pyDesk);

    const pySignGeo = new THREE.BoxGeometry(1.2, 1.2, 0.1);
    const pySignMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.6 });
    const pySign = new THREE.Mesh(pySignGeo, pySignMat);
    pySign.position.set(-8.6, 2.4, 4.2);
    pySign.rotation.y = Math.PI / 2;
    modelGroup.add(pySign);

    // Asset Library Smart Table
    const confTableGeo = new THREE.BoxGeometry(3.2, 0.6, 2.2);
    const confTableMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
    const confTable = new THREE.Mesh(confTableGeo, confTableMat);
    confTable.position.set(5.5, 0.6, 4.2);
    modelGroup.add(confTable);

    const confDisplayGeo = new THREE.PlaneGeometry(2.8, 1.8);
    const confDisplayMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const confDisplay = new THREE.Mesh(confDisplayGeo, confDisplayMat);
    confDisplay.rotation.x = -Math.PI / 2;
    confDisplay.position.set(5.5, 0.91, 4.2);
    modelGroup.add(confDisplay);

    // Glowing Neon Pipeline Conduits
    const pipePoints = [
      new THREE.Vector3(-6, 0.2, -4.5),
      new THREE.Vector3(-4, 0.2, -1),
      new THREE.Vector3(0, 0.2, 2.2),
      new THREE.Vector3(4, 0.2, -1),
      new THREE.Vector3(6, 0.2, -4.5),
    ];
    const pipeCurve = new THREE.CatmullRomCurve3(pipePoints);
    const pipeGeo = new THREE.TubeGeometry(pipeCurve, 64, 0.18, 12, false);
    const pipeMat = new THREE.MeshStandardMaterial({ 
      color: 0x00f0ff, 
      emissive: 0x00f0ff,
      emissiveIntensity: 0.85,
      transparent: true,
      opacity: 0.9
    });
    const pipeMesh = new THREE.Mesh(pipeGeo, pipeMat);
    modelGroup.add(pipeMesh);

    // 6. Interactive 360-Degree Cursor Drag & Zoom Controls
    const handlePointerDown = (clientX: number, clientY: number) => {
      isPointerDownRef.current = true;
      setIsDragging(true);
      pointerStartRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!isPointerDownRef.current) return;
      const deltaX = clientX - pointerStartRef.current.x;
      const deltaY = clientY - pointerStartRef.current.y;

      targetRotationYRef.current += deltaX * 0.009;
      targetRotationXRef.current = Math.max(0.1, Math.min(1.25, targetRotationXRef.current + deltaY * 0.007));

      pointerStartRef.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isPointerDownRef.current = false;
      setIsDragging(false);
      touchDistanceStartRef.current = null;
    };

    // Mouse Wheel Zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.02;
      targetZoomDistanceRef.current = Math.max(12, Math.min(42, targetZoomDistanceRef.current + zoomFactor));
    };

    // DOM Event Bindings
    const dom = renderer.domElement;

    const onMouseDown = (e: MouseEvent) => handlePointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        // Pinch to zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchDistanceStartRef.current = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2 && touchDistanceStartRef.current !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const delta = (touchDistanceStartRef.current - dist) * 0.05;
        targetZoomDistanceRef.current = Math.max(12, Math.min(42, targetZoomDistanceRef.current + delta));
        touchDistanceStartRef.current = dist;
      }
    };

    const onTouchEnd = () => handlePointerUp();

    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 7. Smooth Render & Projection Loop (Auto-Rotate Permanently OFF)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damping for rotation & zoom
      rotationYRef.current += (targetRotationYRef.current - rotationYRef.current) * 0.08;
      rotationXRef.current += (targetRotationXRef.current - rotationXRef.current) * 0.08;
      zoomDistanceRef.current += (targetZoomDistanceRef.current - zoomDistanceRef.current) * 0.08;

      if (modelGroupRef.current) {
        modelGroupRef.current.rotation.y = rotationYRef.current;
        modelGroupRef.current.rotation.x = rotationXRef.current - 0.55;
      }

      if (cameraRef.current) {
        cameraRef.current.position.set(0, zoomDistanceRef.current * 0.65, zoomDistanceRef.current);
        cameraRef.current.lookAt(0, 0, 0);
      }

      // Pulse Core
      if (coreCube) {
        coreCube.rotation.x = elapsedTime * 0.8;
        coreCube.rotation.y = elapsedTime * 1.2;
      }

      // Project 3D Room Hotspots to 2D Screen Space
      if (container && cameraRef.current && modelGroupRef.current) {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const newPositions: { [id: string]: { x: number; y: number; visible: boolean } } = {};

        ROOMS.forEach((room) => {
          const worldPoint = room.worldPos.clone();
          worldPoint.applyMatrix4(modelGroupRef.current!.matrixWorld);
          worldPoint.project(cameraRef.current!);

          const isVisible = worldPoint.z < 1.0;
          const screenX = ((worldPoint.x + 1) * w) / 2;
          const screenY = ((-worldPoint.y + 1) * h) / 2;

          newPositions[room.id] = {
            x: screenX,
            y: screenY,
            visible: isVisible && screenX > 20 && screenX < w - 20 && screenY > 20 && screenY < h - 20,
          };
        });

        setHotspotPositions(newPositions);
      }

      renderer.render(scene, camera);
    };

    render();

    // 8. Responsive Resize
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
    };
  }, []);

  const handleRoomClick = (room: RoomData) => {
    setSelectedRoom(room);

    // Smooth programmatic scroll directly to target section
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

  const adjustZoom = (delta: number) => {
    targetZoomDistanceRef.current = Math.max(12, Math.min(42, targetZoomDistanceRef.current + delta));
  };

  const resetView = () => {
    targetRotationYRef.current = 0.45;
    targetRotationXRef.current = 0.55;
    targetZoomDistanceRef.current = 24;
  };

  return (
    <div className="relative w-full max-w-2xl lg:max-w-none flex flex-col items-center select-none">
      
      {/* 3D WebGL Model Canvas Frame */}
      <div 
        className="relative w-full aspect-[16/11] rounded-3xl overflow-hidden bg-slate-100/90 dark:bg-navy-950/95 border border-slate-200/90 dark:border-cyan-500/40 shadow-2xl dark:shadow-cyan-950/40 backdrop-blur-2xl transition-all duration-300 group/building"
      >
        {/* Subtle Cyber Corner Brackets */}
        <span className="cyber-corner-tl" />
        <span className="cyber-corner-tr" />
        <span className="cyber-corner-bl" />
        <span className="cyber-corner-br" />

        {/* WebGL Canvas Mount */}
        <div 
          ref={mountRef} 
          className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          title="Drag to rotate 360° • Scroll to Zoom"
        />

        {/* Floating Zoom & Reset Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20 pointer-events-auto">
          <button
            type="button"
            onClick={() => adjustZoom(-3)}
            className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-500 shadow-md backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => adjustZoom(3)}
            className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-500 shadow-md backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={resetView}
            className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-500 shadow-md backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Reset 3D Angle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3D Dynamic Interactive Room Hotspot Badges (Positioned in 3D Space) */}
        {ROOMS.map((room) => {
          const pos = hotspotPositions[room.id];
          if (!pos || !pos.visible) return null;

          const isSelected = selectedRoom?.id === room.id;
          const isHovered = hoveredRoom?.id === room.id;

          return (
            <div
              key={room.id}
              style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) translate(-50%, -50%)`,
              }}
              className="absolute top-0 left-0 z-20 cursor-pointer pointer-events-auto"
              onMouseEnter={() => setHoveredRoom(room)}
              onMouseLeave={() => setHoveredRoom(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleRoomClick(room);
              }}
            >
              {/* Pulsing 3D Hotspot Beacon */}
              <div className="relative flex items-center justify-center group/marker">
                <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-75 ${
                  isSelected || isHovered ? 'bg-cyan-400' : 'bg-cyan-500/50'
                }`} />
                <span className={`relative inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-navy-950 border-2 transition-all duration-200 shadow-xl ${
                  isSelected || isHovered
                    ? 'border-cyan-400 scale-125 shadow-cyan-400/60 ring-2 ring-cyan-400/40'
                    : 'border-cyan-500/80 hover:scale-110 shadow-cyan-500/30'
                }`}>
                  <room.icon className={`w-3.5 h-3.5 ${room.color}`} />
                </span>

                {/* Floating Room Tooltip on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-slate-950/95 dark:bg-navy-950/98 border border-cyan-500/50 backdrop-blur-md shadow-2xl whitespace-nowrap z-30 pointer-events-none"
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-cyan-400">
                        <span>{room.name}</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono">
                        Click to open {room.badge}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}

        {/* Selected Room Details Drawer Card on Click */}
        <AnimatePresence>
          {selectedRoom && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-3 bottom-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-navy-950/98 border border-slate-200 dark:border-cyan-500/50 backdrop-blur-2xl shadow-2xl z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40">
                    {selectedRoom.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {selectedRoom.category}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  {selectedRoom.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug max-w-md">
                  {selectedRoom.description}
                </p>

                {/* Metrics Pill Grid */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {selectedRoom.metrics.map((m, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-mono bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-2.5 h-2.5 text-cyan-500" />
                      <span className="text-slate-500 dark:text-slate-400">{m.label}:</span>
                      <strong className="text-cyan-600 dark:text-cyan-400">{m.value}</strong>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={selectedRoom.targetSection}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRoomClick(selectedRoom);
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-lg shadow-cyan-500/25 transition-all duration-150 cursor-pointer shrink-0"
                >
                  <span>Open Section</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedRoom(null)}
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Clean Interactive Hint Caption */}
      <div className="mt-2.5 flex items-center justify-between w-full px-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Move3D className="w-3.5 h-3.5 text-cyan-500" />
          <span>Full 3D WebGL Model • Drag to rotate 360° • Scroll / Pinch to Zoom</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
          <Sparkles className="w-3 h-3" />
          <span>Click any room beacon to explore</span>
        </div>
      </div>

    </div>
  );
};

export default Building3DModel;
