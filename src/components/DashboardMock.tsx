import React from 'react';
import type { Project } from '../data/portfolioData';
import { 
  TrendingUp, 
  Maximize2, 
  CheckCircle2, 
  Calendar
} from 'lucide-react';

interface DashboardMockProps {
  project: Project;
  onExpand?: () => void;
  compact?: boolean;
}

export const DashboardMock: React.FC<DashboardMockProps> = ({
  project,
  onExpand,
  compact = false,
}) => {
  const { dashboardPreview, category } = project;

  return (
    <div className="relative w-full rounded-2xl bg-slate-900 text-white border border-slate-700/80 shadow-xl overflow-hidden font-sans group">
      
      {/* Power BI Top Ribbon / Header Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
          <span className="font-semibold text-slate-200 truncate max-w-[200px] sm:max-w-xs">
            {project.title}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
            Power BI Report
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <Calendar className="w-3 h-3 text-cyan-400" />
            <span>Monthly Snapshot</span>
          </div>
          {onExpand && (
            <button
              onClick={onExpand}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Expand Case Study"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Dashboard Body Canvas */}
      <div className={`p-3 sm:p-4 space-y-3 sm:space-y-4 bg-slate-900/95 ${compact ? 'max-h-72 overflow-hidden' : ''}`}>
        
        {/* KPI Scorecards Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {dashboardPreview.kpiCards.map((kpi, idx) => (
            <div
              key={idx}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col justify-between"
            >
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
                {kpi.title}
              </span>
              <div className="my-1 text-base sm:text-lg font-extrabold text-white tracking-tight">
                {kpi.value}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                <TrendingUp className="w-3 h-3 shrink-0" />
                <span className="truncate">{kpi.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dashboardPreview.charts.map((chart, cIdx) => (
            <div
              key={cIdx}
              className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 truncate">
                  {chart.title}
                </span>
                <span className="text-[9px] font-mono text-cyan-400 uppercase">
                  {chart.type}
                </span>
              </div>

              {/* Bar or Line Simulation */}
              <div className="space-y-1.5 pt-1">
                {chart.dataPoints.slice(0, 4).map((pt, pIdx) => {
                  const maxVal = Math.max(...chart.dataPoints.map((d) => d.val1));
                  const pct = Math.round((pt.val1 / (maxVal || 1)) * 100);

                  return (
                    <div key={pIdx} className="space-y-0.5">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span className="truncate">{pt.name}</span>
                        <span className="font-mono text-slate-200 font-medium">
                          {pt.val1}{chart.type === 'donut' || chart.title.includes('%') ? '%' : ''}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-700/70 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Filter / RLS Bottom Indicator */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800 font-mono">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Semantic Model: Validated</span>
          </span>
          <span className="text-cyan-400">Category: {category}</span>
        </div>

      </div>

      {/* Hover Overlay for Quick Action in Compact Mode */}
      {compact && onExpand && (
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <button
            onClick={onExpand}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/40 hover:bg-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <span>View Full Case Study</span>
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
