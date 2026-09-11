import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, FileDown, Sparkles } from 'lucide-react';
import { LRLogo } from './Icons';

export default function Navbar({ darkMode, setDarkMode, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${isScrolled ? 'var(--border-color)' : 'transparent'}`,
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.1)' : 'none'
      }}
    >
      <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
        {/* Brand */}
        <a
          href="#home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: 800,
            fontSize: '1.35rem',
            fontFamily: 'var(--font-sans)'
          }}
        >
          <div
            style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '0.65rem',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px var(--glow-color)',
              padding: '0.3rem'
            }}
          >
            <LRLogo size={22} fill="#ffffff" />
          </div>
          <span>
            Lohith <span className="gradient-text">R</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Resume Quick Download */}
          <a
            href="/Lohith_R_Resume.pdf"
            download
            className="btn-outline"
            style={{
              display: 'none',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem'
            }}
            id="nav-resume-btn"
          >
            <FileDown size={15} />
            <span>Resume</span>
          </a>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Theme"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {darkMode ? <Sun size={18} style={{ color: '#fbbf24' }} /> : <Moon size={18} style={{ color: '#6366f1' }} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            className="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.25rem 1.5rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            animation: 'fadeIn 0.2s ease'
          }}
          className="mobile-drawer"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: activeSection === link.href.substring(1) ? 'var(--accent-primary)' : 'var(--text-primary)',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '0.65rem',
                backgroundColor: activeSection === link.href.substring(1) ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{link.name}</span>
              {activeSection === link.href.substring(1) && <Sparkles size={16} />}
            </a>
          ))}
          <a
            href="/Lohith_R_Resume.pdf"
            download
            className="btn-primary"
            style={{ marginTop: '0.5rem', width: '100%' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <FileDown size={18} />
            <span>Download Resume</span>
          </a>
        </div>
      )}

      {/* Responsive media query styles */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          #nav-resume-btn {
            display: inline-flex !important;
          }
          .mobile-menu-trigger {
            display: none !important;
          }
          .mobile-drawer {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
