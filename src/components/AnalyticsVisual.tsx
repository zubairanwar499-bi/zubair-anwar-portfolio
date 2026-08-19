import React, { useState } from 'react';
import { 
  TrendingUp, 
  Database, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Activity, 
  ArrowUpRight, 
  Code2, 
  Filter,
  CheckCircle2,
  Sparkles,
  Cpu
} from 'lucide-react';
import { TiltCard } from './TiltCard';

export const AnalyticsVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kpis' | 'dax' | 'pipeline'>('kpis');
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'North' | 'Global'>('All');

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none perspective-1000">
      
      {/* Dynamic 3D Floating KPI Badge - Top Left */}
      <div className="hidden sm:flex absolute -top-6 -left-6 z-20 items-center gap-2 p-3 rounded-2xl bg-white/90 dark:bg-navy-900/90 backdrop-blur-xl border border-cyan-500/30 shadow-xl shadow-cyan-500/20 animate-float-smooth">
        <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Query Latency</div>
          <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">&lt; 120ms (Direct Lake)</div>
        </div>
      </div>

      {/* Dynamic 3D Floating DAX Badge - Bottom Right */}
      <div className="hidden sm:flex absolute -bottom-6 -right-6 z-20 items-center gap-2.5 p-3 rounded-2xl bg-white/90 dark:bg-navy-900/90 backdrop-blur-xl border border-purple-500/30 shadow-xl shadow-purple-500/20 animate-float-opposite">
        <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-md">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Data Model Status</div>
          <div className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">100% Star Schema</div>
        </div>
      </div>

      {/* Main 3D Tilt Frame */}
      <TiltCard
        maxTilt={8}
        scale={1.01}
        glowColor="rgba(0, 240, 255, 0.35)"
        className="w-full"
      >
        <div className="relative rounded-3xl bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-navy-700/90 shadow-2xl p-5 sm:p-6 overflow-hidden rainbow-glow">
          
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-navy-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-sm shadow-rose-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-sm shadow-amber-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm shadow-emerald-500/50"></span>
              </div>
              <span className="ml-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                Microsoft Fabric Lakehouse // Power BI Direct Lake
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-navy-850 p-1 rounded-xl border border-slate-200/60 dark:border-navy-750">
              <button
                onClick={() => setActiveTab('kpis')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'kpis'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Executive BI
              </button>
              <button
                onClick={() => setActiveTab('dax')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'dax'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                DAX Engine
              </button>
              <button
                onClick={() => setActiveTab('pipeline')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'pipeline'
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Data Flow
              </button>
            </div>
          </div>

          {/* Tab 1: Executive KPI & Chart View */}
          {activeTab === 'kpis' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Filter Bar */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono">
                  <Filter className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Segment Slicer:</span>
                </div>
                <div className="flex gap-1.5">
                  {(['All', 'North', 'Global'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRegion(r)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        selectedRegion === r
                          ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/50 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-navy-850 dark:to-navy-800 border border-slate-200/80 dark:border-navy-750 shadow-sm hover:border-cyan-500/50 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span>Net Revenue (YTD)</span>
                    <span className="inline-flex items-center text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded-md">
                      +18.4% YoY
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {selectedRegion === 'All' ? '$4,824,500' : selectedRegion === 'North' ? '$2,140,000' : '$2,684,500'}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Target: $4.50M</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-cyan-50/50 dark:from-navy-850 dark:to-navy-800 border border-slate-200/80 dark:border-navy-750 shadow-sm hover:border-cyan-500/50 transition-all">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span>Gross Margin %</span>
                    <span className="inline-flex items-center text-[10px] text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/15 px-2 py-0.5 rounded-md">
                      +3.2%
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    38.6%
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                    <Zap className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Optimized pricing</span>
                  </div>
                </div>
              </div>

              {/* Animated Glowing Progress Bar Visuals */}
              <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-navy-850/80 border border-slate-200/70 dark:border-navy-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
                    <span>Revenue Performance by Solution Category</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-500 font-bold">Sub-second Direct Lake</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: 'Enterprise Cloud Analytics', val: 94, gradient: 'from-blue-500 via-cyan-400 to-teal-300' },
                    { name: 'Data Engineering & Fabric', val: 88, gradient: 'from-purple-500 via-indigo-400 to-cyan-400' },
                    { name: 'Power BI Executive Reporting', val: 82, gradient: 'from-pink-500 via-rose-400 to-amber-300' },
                    { name: 'SQL Data Mart Automation', val: 76, gradient: 'from-emerald-500 via-teal-400 to-cyan-400' },
                  ].map((bar, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                        <span className="font-medium">{bar.name}</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{bar.val}% of Target</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 dark:bg-navy-700/80 rounded-full overflow-hidden flex shadow-inner">
                        <div
                          className={`h-full bg-gradient-to-r ${bar.gradient} rounded-full transition-all duration-700 shadow-sm`}
                          style={{ width: `${bar.val}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Ribbon */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 font-mono">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Dynamic RLS Active: [UserPrincipalName]
                </span>
                <span className="text-cyan-500 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  Live Sync
                </span>
              </div>

            </div>
          )}

          {/* Tab 2: DAX Code Viewer */}
          {activeTab === 'dax' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-purple-400 font-bold">
                  <Code2 className="w-4 h-4" />
                  <span>Time Intelligence Engine</span>
                </span>
                <span className="text-[10px] bg-purple-500/15 border border-purple-500/30 text-purple-400 px-2 py-0.5 rounded-md font-bold">
                  Optimized DAX
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto border border-navy-700 shadow-inner">
                <p className="text-cyan-400 font-semibold">// Time-Intelligence YoY Growth Measure</p>
                <p className="text-purple-300 font-bold">Revenue YoY Growth % =</p>
                <p className="pl-3 text-amber-300">VAR <span className="text-slate-200">CurrentRev = [Total Revenue]</span></p>
                <p className="pl-3 text-amber-300">VAR <span className="text-slate-200">PriorRev =</span></p>
                <p className="pl-6 text-blue-300">CALCULATE<span className="text-slate-100">(</span></p>
                <p className="pl-9 text-slate-200">[Total Revenue],</p>
                <p className="pl-9 text-emerald-300">SAMEPERIODLASTYEAR<span className="text-slate-100">('Dim_Date'[Date])</span></p>
                <p className="pl-6 text-slate-100">)</p>
                <p className="pl-3 text-purple-300 font-bold">RETURN</p>
                <p className="pl-6 text-blue-300">DIVIDE<span className="text-slate-100">(CurrentRev - PriorRev, PriorRev, 0)</span></p>
              </div>

              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>Engineered for sub-second VertiPaq evaluation with defensive null handling and single-direction filter propagation.</span>
              </div>
            </div>
          )}

          {/* Tab 3: End-to-End Data Pipeline Flow */}
          {activeTab === 'pipeline' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal-400" />
                <span>Microsoft Fabric Modern Analytics Flow</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 text-xs font-mono">
                {[
                  { stage: '1. Ingestion', desc: 'ERP / SQL Databases / REST APIs', icon: Database, color: 'text-blue-400 bg-blue-500/15 border-blue-500/30' },
                  { stage: '2. Lakehouse Medallion', desc: 'Bronze → Silver → Gold (Delta Parquet)', icon: Layers, color: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30' },
                  { stage: '3. Semantic Model', desc: 'Star Schema & Direct Lake in Power BI', icon: Zap, color: 'text-purple-400 bg-purple-500/15 border-purple-500/30' },
                  { stage: '4. Executive Decision', desc: 'Automated Scorecards & Mobile Alerts', icon: ArrowUpRight, color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200/80 dark:border-navy-750 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${item.color}`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{item.stage}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                      Stream Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </TiltCard>
    </div>
  );
};
