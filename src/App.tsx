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
import { MoodDock } from './components/MoodDock';
import { FluidCursor } from './components/FluidCursor';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-[#08070f] text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans selection:bg-cyan-500 selection:text-white">
        
        {/* Full-Screen WebGL 2D Navier-Stokes Fluid & Smoke Simulation Background */}
        <FluidCursor />

        {/* Sticky Top Navigation */}
        <Navbar />

        {/* Floating 5-Mood Atmosphere Dock */}
        <MoodDock />

        {/* Main Content Sections with Direct Anchor Targets */}
        <main className="relative z-10">
          <Hero />
          <TrustBar />
          <LifecycleSection />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Services />
          <Credibility />
          <Education />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </ThemeProvider>
  );
};

export default App;
