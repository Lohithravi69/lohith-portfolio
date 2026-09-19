import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  // Theme state: initialized from system/browser preference or saved user preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      // Default to Browser/System Theme
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches !== undefined) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    return true;
  });

  const [activeSection, setActiveSection] = useState('home');

  // Listen to live system / browser theme changes (e.g. OS switching day/night mode)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e) => {
      const saved = localStorage.getItem('portfolio-theme');
      // If user hasn't explicitly set a preference, dynamically follow system
      if (!saved) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Sync DOM classes and meta theme-color with active theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  const toggleTheme = (explicitPreference) => {
    const nextMode = explicitPreference !== undefined ? explicitPreference : !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem('portfolio-theme', nextMode ? 'dark' : 'light');
  };

  // Track active section for navigation highlighting
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const handleScroll = () => {
      const scrollY = window.scrollY + 150;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar
        darkMode={darkMode}
        setDarkMode={toggleTheme}
        activeSection={activeSection}
      />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
