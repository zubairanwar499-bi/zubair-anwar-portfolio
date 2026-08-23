import React, { useState } from 'react';
import { 
  TrendingUp, 
  Database, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Activity, 
  ArrowUpRight, 
  Filter,
  CheckCircle2,
  Sparkles,
  Cpu,
  Copy,
  Check
} from 'lucide-react';
import { TiltCard } from './TiltCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const AnalyticsVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kpis' | 'dax' | 'pipeline'>('kpis');
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'North' | 'Global'>('All');
  const [daxFormula, setDaxFormula] = useState<'nrr' | 'yoy'>('nrr');
  const [copied, setCopied] = useState(false);

  const { getTransitionVariants, pageEffect } = useTheme();

  const tabs = [
    { id: 'kpis', label: 'Executive BI' },
    { id: 'dax', label: 'DAX Engine' },
    { id: 'pipeline', label: 'Data Flow' },
  ] as const;

  const nrrCode = `Net Revenue Retention % = 
VAR StartPeriod = MIN('Dim_Date'[Date])
VAR EndPeriod = MAX('Dim_Date'[Date])
VAR BaseMRR = 
    CALCULATE(
        [Total MRR],
        FILTER(
            ALL('Dim_Date'),
            'Dim_Date'[Date] = EDATE(EndPeriod, -12)
        )
    )
VAR RetainedAndExpandedMRR = 
    CALCULATE(
        [Total MRR],
        FILTER(
            ALL(Dim_Account),
            [HadActiveSubscription_12MonthsAgo] = TRUE()
        )
    )
RETURN
    DIVIDE(RetainedAndExpandedMRR, BaseMRR, 0)`;

  const yoyCode = `Revenue YoY Growth % = 
VAR CurrentRev = [Total Revenue]
VAR PriorRev = 
    CALCULATE(
        [Total Revenue],
        SAMEPERIODLASTYEAR('Dim_Date'[Date])
    )
RETURN
    DIVIDE(CurrentRev - PriorRev, PriorRev, 0)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(daxFormula === 'nrr' ? nrrCode : yoyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const variants = getTransitionVariants();

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none perspective-1200">
      
      {/* Dynamic 3D Floating KPI Badge - Top Left */}
      <motion.div
        animate={{ y: [-4, 6, -4], rotate: [-1, 1, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden sm:flex absolute -top-6 -left-6 z-20 items-center gap-2 p-3 rounded-2xl bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border border-cyan-500/30 shadow-xl shadow-cyan-500/20"
      >
        <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Query Latency</div>
          <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">&lt; 120ms (Direct Lake)</div>
        </div>
      </motion.div>

      {/* Dynamic 3D Floating DAX Badge - Bottom Right */}
      <motion.div
        animate={{ y: [6, -4, 6], rotate: [1, -1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden sm:flex absolute -bottom-6 -right-6 z-20 items-center gap-2.5 p-3 rounded-2xl bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border border-purple-500/30 shadow-xl shadow-purple-500/20"
      >
        <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-md">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">3D Motion Active</div>
          <div className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400 font-mono capitalize">{pageEffect} Turn</div>
        </div>
      </motion.div>

      {/* Main 3D Frame */}
      <TiltCard
        maxTilt={6}
        scale={1.01}
        glowColor="var(--border-glow)"
        className="w-full"
      >
        <div className="relative rounded-3xl bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-navy-700/90 shadow-2xl p-5 sm:p-6 overflow-hidden dynamic-mood-glow">
          
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-navy-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-sm shadow-rose-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-sm shadow-amber-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm shadow-emerald-500/50"></span>
              </div>
              <span className="ml-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                Microsoft Fabric // Power BI Semantic Model
              </span>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-navy-850 p-1 rounded-xl border border-slate-200/60 dark:border-navy-750">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeVisualTabPill"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 shadow-md -z-10"
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated 3D Tab Content using Selected 3D Page Turn Effect */}
          <div className="relative min-h-[310px]">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Executive KPI & Chart View */}
              {activeTab === 'kpis' && (
                <motion.div
                  key="kpis"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4"
                >
                  
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
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
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
                      <span className="text-[10px] font-mono text-cyan-500 font-bold">Direct Lake Sub-second</span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { name: 'Enterprise Cloud Analytics', val: 94, gradient: 'from-blue-500 via-cyan-400 to-teal-300' },
                        { name: 'Data Engineering & Modeling', val: 88, gradient: 'from-purple-500 via-indigo-400 to-cyan-400' },
                        { name: 'Power BI Executive Reporting', val: 82, gradient: 'from-pink-500 via-rose-400 to-amber-300' },
                        { name: 'SQL Data Mart Automation', val: 76, gradient: 'from-emerald-500 via-teal-400 to-cyan-400' },
                      ].map((bar, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                            <span className="font-medium">{bar.name}</span>
                            <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{bar.val}% of Target</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 dark:bg-navy-700/80 rounded-full overflow-hidden flex shadow-inner">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${bar.val}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                              className={`h-full bg-gradient-to-r ${bar.gradient} rounded-full shadow-sm`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Ribbon */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 font-mono">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Dynamic RLS Active
                    </span>
                    <span className="text-cyan-500 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                      Live Sync
                    </span>
                  </div>

                </motion.div>
              )}

              {/* Tab 2: Interactive DAX Code Viewer with NRR % & YoY Formula Switcher */}
              {activeTab === 'dax' && (
                <motion.div
                  key="dax"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDaxFormula('nrr')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          daxFormula === 'nrr'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-xs'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Net Revenue Retention (NRR) %
                      </button>
                      <button
                        onClick={() => setDaxFormula('yoy')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          daxFormula === 'yoy'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-xs'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        YoY Growth %
                      </button>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:text-cyan-400 text-xs font-mono transition-colors cursor-pointer"
                      title="Copy DAX to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto border border-navy-700 shadow-inner max-h-[190px]">
                    {daxFormula === 'nrr' ? (
                      <div className="space-y-0.5">
                        <p className="text-cyan-400 font-semibold">// 12-Month Cohort Expansion & Attrition Measure</p>
                        <p className="text-purple-300 font-bold">Net Revenue Retention % =</p>
                        <p className="pl-3 text-amber-300">VAR <span className="text-slate-200">StartPeriod = MIN('Dim_Date'[Date])</span></p>
                        <p className="pl-3 text-amber-300">VAR <span className="text-slate-200">EndPeriod = MAX('Dim_Date'[Date])</span></p>
                        <p className="pl-3 text-amber-300">VAR <span className="text-slate-200">BaseMRR =</span></p>
                        <p className="pl-6 text-blue-300">CALCULATE<span className="text-slate-100">(</span></p>
                        <p className="pl-9 text-slate-200">[Total MRR],</p>
                        <p className="pl-9 text-emerald-300">FILTER<span className="text-slate-100">(ALL('Dim_Date'), 'Dim_Date'[Date] = EDATE(EndPeriod, -12))</span></p>
                        <p className="pl-6 text-slate-100">)</p>
                        <p className="pl-3 text-amber-300">VAR <span className="text-slate-200">RetainedAndExpandedMRR =</span></p>
                        <p className="pl-6 text-blue-300">CALCULATE<span className="text-slate-100">(</span></p>
                        <p className="pl-9 text-slate-200">[Total MRR],</p>
                        <p className="pl-9 text-emerald-300">FILTER<span className="text-slate-100">(ALL(Dim_Account), [HadActiveSubscription_12MonthsAgo] = TRUE())</span></p>
                        <p className="pl-6 text-slate-100">)</p>
                        <p className="pl-3 text-purple-300 font-bold">RETURN</p>
                        <p className="pl-6 text-blue-300">DIVIDE<span className="text-slate-100">(RetainedAndExpandedMRR, BaseMRR, 0)</span></p>
                      </div>
                    ) : (
                      <div className="space-y-0.5">
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
                    )}
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                    <span>Engineered for sub-second VertiPaq evaluation with defensive null handling and single-direction filter propagation.</span>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: End-to-End Data Pipeline Flow */}
              {activeTab === 'pipeline' && (
                <motion.div
                  key="pipeline"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-3"
                >
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-teal-400" />
                    <span>Modern Data Flow & Lakehouse Architecture</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                    {[
                      { stage: '1. Ingestion', desc: 'Excel / SQL / REST APIs / Data Lakes', icon: Database, color: 'text-blue-400 bg-blue-500/15 border-blue-500/30' },
                      { stage: '2. Lakehouse / Warehouse', desc: 'Cleansing & Star Schema Modeling', icon: Layers, color: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30' },
                      { stage: '3. Semantic Model & DAX', desc: 'Dynamic Measures & RLS Security', icon: Zap, color: 'text-purple-400 bg-purple-500/15 border-purple-500/30' },
                      { stage: '4. Executive Action', desc: 'Interactive Dashboards & Stories', icon: ArrowUpRight, color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200/80 dark:border-navy-750 shadow-xs"
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
                          Active
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </TiltCard>
    </div>
  );
};
