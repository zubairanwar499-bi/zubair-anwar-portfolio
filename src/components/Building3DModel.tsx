import React, { useState, useRef } from 'react';
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
  Cpu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoomHotspot {
  id: string;
  name: string;
  badge: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  targetSection: string;
  icon: any;
  color: string;
  bgGlow: string;
  position: { top: string; left: string };
  viewBox: { x: number; y: number; scale: number };
}

const ROOM_HOTSPOTS: RoomHotspot[] = [
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
    bgGlow: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40',
    position: { top: '22%', left: '50%' },
    viewBox: { x: 0, y: 15, scale: 1.15 }
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
    bgGlow: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40',
    position: { top: '28%', left: '80%' },
    viewBox: { x: -20, y: 15, scale: 1.18 }
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
    bgGlow: 'from-blue-500/20 to-cyan-500/10 border-blue-500/40',
    position: { top: '32%', left: '18%' },
    viewBox: { x: 20, y: 15, scale: 1.18 }
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
    bgGlow: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40',
    position: { top: '64%', left: '24%' },
    viewBox: { x: 18, y: -15, scale: 1.18 }
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
    bgGlow: 'from-purple-500/20 to-pink-500/10 border-purple-500/40',
    position: { top: '66%', left: '78%' },
    viewBox: { x: -18, y: -15, scale: 1.18 }
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
    bgGlow: 'from-teal-500/20 to-cyan-500/10 border-teal-500/40',
    position: { top: '84%', left: '52%' },
    viewBox: { x: 0, y: -20, scale: 1.15 }
  },
];

export const Building3DModel: React.FC = () => {
  const [hoveredRoom, setHoveredRoom] = useState<RoomHotspot | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomHotspot | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10 to +10 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16; // -8 to +8 deg
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHoveredRoom(null);
  };

  const handleRoomClick = (room: RoomHotspot) => {
    setSelectedRoom(room);

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
    <div className="relative w-full max-w-2xl lg:max-w-none flex flex-col items-center select-none">
      
      {/* Interactive 3D Model Frame */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-[16/11] rounded-3xl overflow-hidden bg-slate-900/90 dark:bg-navy-950/95 border border-slate-200/80 dark:border-cyan-500/40 shadow-2xl dark:shadow-cyan-950/30 backdrop-blur-2xl transition-all duration-300 group/building cursor-crosshair perspective-1200"
      >
        {/* Subtle Cyber Corner Brackets */}
        <span className="cyber-corner-tl" />
        <span className="cyber-corner-tr" />
        <span className="cyber-corner-bl" />
        <span className="cyber-corner-br" />

        {/* 3D Parallax Image Layer */}
        <motion.div
          animate={{
            rotateY: mousePos.x,
            rotateX: mousePos.y,
            scale: hoveredRoom ? 1.03 : 1.0,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative w-full h-full transform-3d"
        >
          {/* Authentic High-Resolution 3D Cutaway Building Render */}
          <img
            src="/assets/building-3d.jpg"
            alt="Zubair Anwar Data Analyst 3D Building Model"
            className="w-full h-full object-cover object-center pointer-events-none drop-shadow-2xl"
          />

          {/* Dynamic Lighting & Data Conduit Energy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none dark:opacity-80" />

          {/* Interactive Clickable Room Hotspots Over the Building */}
          {ROOM_HOTSPOTS.map((room) => {
            const isHovered = hoveredRoom?.id === room.id;
            const isSelected = selectedRoom?.id === room.id;

            return (
              <div
                key={room.id}
                style={{ top: room.position.top, left: room.position.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                onMouseEnter={() => setHoveredRoom(room)}
                onClick={() => handleRoomClick(room)}
              >
                {/* Pulsing Beacon Marker */}
                <div className="relative flex items-center justify-center group/marker">
                  <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-75 ${
                    isSelected ? 'bg-cyan-400' : isHovered ? 'bg-cyan-400' : 'bg-cyan-500/60'
                  }`} />
                  <span className={`relative inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950/90 dark:bg-navy-950 border-2 transition-transform duration-200 shadow-lg ${
                    isSelected || isHovered
                      ? 'border-cyan-300 scale-125 shadow-cyan-400/50'
                      : 'border-cyan-400/80 hover:scale-110 shadow-cyan-500/30'
                  }`}>
                    <room.icon className={`w-3.5 h-3.5 ${room.color}`} />
                  </span>

                  {/* Room Label Tag on Hover */}
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
                          Click to open {room.category}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Interactive Floating Room Details Card on Click */}
        <AnimatePresence>
          {selectedRoom && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-3 bottom-3 p-3.5 sm:p-4 rounded-2xl bg-slate-950/95 dark:bg-navy-950/98 border border-cyan-500/50 backdrop-blur-2xl shadow-2xl z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                    {selectedRoom.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedRoom.category}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-white">
                  {selectedRoom.name}
                </h4>
                <p className="text-xs text-slate-300 leading-snug max-w-md">
                  {selectedRoom.description}
                </p>

                {/* Metrics Pill Grid */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {selectedRoom.metrics.map((m, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded-md border border-slate-700/60 text-slate-300">
                      <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />
                      <span className="text-slate-400">{m.label}:</span>
                      <strong className="text-cyan-400">{m.value}</strong>
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
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-700/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Clean Interactive Hint Caption */}
      <div className="mt-2.5 flex items-center justify-between w-full px-2 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>Interactive 3D Cutaway HQ • Move mouse to tilt in 3D</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-400">
          <Cpu className="w-3 h-3" />
          <span>Click any room beacon to navigate</span>
        </div>
      </div>

    </div>
  );
};

export default Building3DModel;
