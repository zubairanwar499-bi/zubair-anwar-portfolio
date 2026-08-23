import React, { useState, useMemo } from 'react';
import type { Project } from '../data/portfolioData';
import { portfolioData } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';
import { CaseStudyModal } from './CaseStudyModal';
import { FolderGit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  // Calculate project counts by category slug
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = { all: portfolioData.projects.length };
    portfolioData.projects.forEach((p) => {
      counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return portfolioData.projects;
    return portfolioData.projects.filter((p) => p.categorySlug === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="py-24 bg-slate-50/70 dark:bg-navy-950/70 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold tracking-wide uppercase mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Featured Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Real Analytics Projects Solving Real Business Problems
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-base max-w-2xl">
              Explore in-depth case studies showcasing business problem framing, dimensional modeling, DAX calculations, and validated business impact.
            </p>
          </div>
        </div>

        {/* Project Filters */}
        <ProjectFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          projectCounts={projectCounts}
        />

        {/* Project Grid with Framer Motion Layout animations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard
                  project={project}
                  onOpenCaseStudy={(p) => setSelectedCaseStudy(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Deep Case Study Modal View */}
        <AnimatePresence>
          {selectedCaseStudy && (
            <CaseStudyModal
              project={selectedCaseStudy}
              onClose={() => setSelectedCaseStudy(null)}
              onSelectProject={(p) => setSelectedCaseStudy(p)}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
