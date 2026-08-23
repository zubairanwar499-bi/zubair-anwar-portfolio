import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MoodSwitcher } from './MoodSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { portfolioData } from '../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Credibility', href: '#credibility', id: 'credibility' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section observer
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'services', 'credibility', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const navHeight = 75;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({
          top: offsetPosition > 0 ? offsetPosition : 0,
          behavior: 'smooth',
        });
      }
    }, 120);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-navy-950/90 backdrop-blur-xl shadow-lg border-b border-slate-200/80 dark:border-navy-800/80 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-xl p-1"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden ring-2 ring-cyan-500/50 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img
                src={portfolioData.personalInfo.avatarUrl || '/assets/profile.png'}
                alt={portfolioData.personalInfo.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-extrabold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg leading-tight">
                <span>{portfolioData.personalInfo.name}</span>
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00f0ff]"></span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono font-medium text-cyan-600 dark:text-cyan-400/90 uppercase tracking-wider block">
                Data Analyst & BI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Theme Toggle + Mood Switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <MoodSwitcher />
            <motion.a
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:via-cyan-400 hover:to-teal-300 shadow-md shadow-cyan-500/25 transition-all duration-200 cursor-pointer"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-rose-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl border-b border-slate-200 dark:border-navy-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-navy-800">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`px-3.5 py-3 rounded-xl text-sm font-semibold text-left transition-all cursor-pointer ${
                    activeSection === link.id
                      ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/15 dark:bg-cyan-950/60 font-bold border border-cyan-500/30'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-850'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="pt-1">
              <button
                onClick={(e) => scrollToSection(e, 'contact')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 shadow-md shadow-cyan-500/25 cursor-pointer"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
