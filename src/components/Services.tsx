import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  BarChart3, 
  LineChart, 
  Database, 
  Layers, 
  Zap, 
  Network, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Services: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    BarChart3,
    LineChart,
    Database,
    Layers,
    Zap,
    Network,
  };

  return (
    <section id="services" className="py-24 bg-white dark:bg-navy-950 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold tracking-wide uppercase mb-3">
            Client Solutions & Consulting
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How I Can Help Your Organization
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-base">
            From single executive Power BI dashboards to end-to-end Microsoft Fabric data lakehouse architectures.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {portfolioData.services.map((service, idx) => {
            const Icon = iconMap[service.icon] || BarChart3;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="p-7 sm:p-8 rounded-3xl bg-slate-50 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-md hover:shadow-2xl hover:border-cyan-500/60 dark:shadow-navy-950/40 transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-default"
              >
                <div className="space-y-4">
                  
                  {/* Service Icon with Framer Spring */}
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 transition-transform"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Best For & Quick Action */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-navy-800 space-y-3">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 not-italic">Ideal for:</span> {service.suitableFor}
                  </div>

                  <motion.a
                    whileHover={{ x: 4 }}
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 cursor-pointer"
                  >
                    <span>Discuss this service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
