import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { LifecycleSection } from './components/LifecycleSection';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Services } from './components/Services';
import { Credibility } from './components/Credibility';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';
import { MoodDock } from './components/MoodDock';
import { MotionFadeIn } from './components/MotionWrappers';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans selection:bg-cyan-500 selection:text-white">
        
        {/* Dynamic High-Glow Rainbow Cursor Follower */}
        <CursorGlow />

        {/* Sticky Top Navigation */}
        <Navbar />

        {/* Floating 5-Mood Atmosphere Dock */}
        <MoodDock />

        {/* Main Content Sections with Framer Motion Reveals */}
        <main className="relative z-10">
          <Hero />

          <MotionFadeIn delay={0.1}>
            <TrustBar />
          </MotionFadeIn>

          <MotionFadeIn delay={0.1}>
            <LifecycleSection />
          </MotionFadeIn>

          <MotionFadeIn delay={0.1}>
            <About />
          </MotionFadeIn>

          <MotionFadeIn delay={0.1}>
            <Projects />
          </MotionFadeIn>

          <MotionFadeIn delay={0.1}>
            <Skills />
          </MotionFadeIn>

          <MotionFadeIn delay={0.1}>
            <Experience />
          </MotionFadeIn>

          <MotionFadeIn delay={0.1}>
            <Services />
          </MotionFadeIn>

          <MotionFadeIn delay={0.1}>
            <Credibility />
          </MotionFadeIn>

          <MotionFadeIn delay={0.1}>
            <Education />
          </MotionFadeIn>

          <MotionFadeIn delay={0.1}>
            <Contact />
          </MotionFadeIn>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </ThemeProvider>
  );
};

export default App;
