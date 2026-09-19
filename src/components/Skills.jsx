import React, { useState, useEffect, useRef } from 'react';
import {
  Wrench,
  Code2,
  Layout,
  Brain,
  Terminal,
  Layers,
  Cpu,
  ShieldAlert,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { SKILL_CATEGORIES, CORE_PILLARS } from '../data/skills';

export default function Skills() {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const sliderRef = useRef(null);
  const cardRefs = useRef([]);

  const iconMap = {
    Code2: Code2,
    Layout: Layout,
    Brain: Brain,
    Terminal: Terminal,
    Layers: Layers,
    Cpu: Cpu,
    ShieldAlert: ShieldAlert,
    Sparkles: Sparkles
  };

  const borderEffectClasses = [
    'card-effect-spotlight', // Programming Languages
    'card-effect-aurora',    // Frontend & UI
    'card-effect-prism',     // AI, ML & Backend
    'card-effect-cyber'      // Cloud & DevOps
  ];

  const slideLeft = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollLeft <= 20) {
        sliderRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: -420, behavior: 'smooth' });
      }
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollLeft >= scrollWidth - clientWidth - 25) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: 420, behavior: 'smooth' });
      }
    }
  };

  // 3-second Auto-slide for skills carousel
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;
    const timer = setInterval(() => {
      slideRight();
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered]);

  // Scroll to specific category card when tab is clicked
  const scrollToCategory = (index) => {
    setActiveTab(index);
    setTimeout(() => {
      if (sliderRef.current && cardRefs.current[index]) {
        const container = sliderRef.current;
        const card = cardRefs.current[index];
        const targetLeft = card.offsetLeft - container.offsetLeft - 16;
        container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
      }
    }, 50);
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Expert':
        return {
          background: 'rgba(16, 185, 129, 0.12)',
          color: 'var(--accent-emerald)',
          borderColor: 'rgba(16, 185, 129, 0.3)'
        };
      case 'Specialized':
        return {
          background: 'rgba(236, 72, 153, 0.12)',
          color: '#ec4899',
          borderColor: 'rgba(236, 72, 153, 0.3)'
        };
      case 'Advanced':
        return {
          background: 'rgba(99, 102, 241, 0.12)',
          color: 'var(--accent-primary)',
          borderColor: 'rgba(99, 102, 241, 0.3)'
        };
      default:
        return {
          background: 'rgba(56, 189, 248, 0.12)',
          color: 'var(--accent-cyan)',
          borderColor: 'rgba(56, 189, 248, 0.3)'
        };
    }
  };

  return (
    <section
      id="skills"
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow orb */}
      <div className="glow-orb-primary" style={{ top: '25%', left: '-8%', opacity: 0.1 }} />

      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-badge">
            <Wrench size={14} />
            <span>Technical Toolkit</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '1rem' }}>
            Skills &amp; <span className="gradient-text">Competencies</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem' }}>
            Core programming languages, frameworks, AI architectures, and developer tooling mastered through real-world projects and algorithmic challenges.
          </p>
        </div>

        {/* Category Jump Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2.5rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            {SKILL_CATEGORIES.map((cat, idx) => {
              const Icon = iconMap[cat.icon] || Code2;
              const isSelected = activeTab === idx;
              return (
                <button
                  key={cat.title}
                  onClick={() => scrollToCategory(idx)}
                  className="btn-secondary"
                  style={{
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.88rem',
                    borderRadius: '9999px',
                    backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-card)',
                    color: isSelected ? '#ffffff' : 'var(--text-primary)',
                    borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                    boxShadow: isSelected ? '0 6px 18px -3px var(--glow-color)' : 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <Icon size={16} />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FLEXBOX CAROUSEL CONTAINER (Nav buttons show only on hover) */}
        <div
          className="carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Floating Arrow Button (Shown only on hover) */}
          <button
            onClick={slideLeft}
            aria-label="Previous skill domain"
            className="carousel-nav-btn prev-btn"
            style={{
              opacity: isHovered ? 1 : 0,
              pointerEvents: isHovered ? 'auto' : 'none',
              transform: isHovered ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.85)'
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Floating Arrow Button (Shown only on hover) */}
          <button
            onClick={slideRight}
            aria-label="Next skill domain"
            className="carousel-nav-btn next-btn"
            style={{
              opacity: isHovered ? 1 : 0,
              pointerEvents: isHovered ? 'auto' : 'none',
              transform: isHovered ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.85)'
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Flexbox Carousel for Skills */}
          <div
            ref={sliderRef}
            style={{
              display: 'flex',
              gap: '1.75rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              padding: '1rem 0.5rem 1.5rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {SKILL_CATEGORIES.map((cat, index) => {
              const effectClass = borderEffectClasses[index % borderEffectClasses.length];
              const Icon = iconMap[cat.icon] || Code2;

              return (
                <div
                  key={cat.title}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`${effectClass} skill-domain-card`}
                  style={{
                    flex: '0 0 calc(50% - 0.875rem)',
                    minWidth: '360px',
                    maxWidth: '520px',
                    scrollSnapAlign: 'start',
                    padding: '2.25rem',
                    borderRadius: '1.5rem',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box'
                  }}
                >
                  <div>
                    {/* Domain Card Header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1.75rem',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div
                          style={{
                            width: '3rem',
                            height: '3rem',
                            borderRadius: '0.85rem',
                            background: 'var(--accent-gradient)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            flexShrink: 0
                          }}
                        >
                          <Icon size={22} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                            {cat.title}
                          </h3>
                          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                            {cat.skills.length} Specialized competencies
                          </span>
                        </div>
                      </div>

                      <span className="tech-pill" style={{ fontSize: '0.78rem', flexShrink: 0 }}>
                        <Zap size={13} style={{ color: 'var(--accent-amber)' }} />
                        Verified
                      </span>
                    </div>

                    {/* Skill Items List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {cat.skills.map((skill) => {
                        const badgeStyle = getBadgeStyle(skill.badge);
                        return (
                          <div key={skill.name} className="skill-item-flex">
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.25rem'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                                <span style={{ fontSize: '1.15rem' }}>{skill.icon}</span>
                                <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                                  {skill.name}
                                </span>
                              </div>
                              <span
                                style={{
                                  fontSize: '0.725rem',
                                  fontWeight: 700,
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '9999px',
                                  border: `1px solid ${badgeStyle.borderColor}`,
                                  backgroundColor: badgeStyle.background,
                                  color: badgeStyle.color,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.04em'
                                }}
                              >
                                {skill.badge}
                              </span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                              {skill.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Pillars Flexbox Grid */}
        <div style={{ marginTop: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <div className="section-badge">
              <Sparkles size={14} />
              <span>Core Disciplines</span>
            </div>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Engineering <span className="gradient-text">Pillars</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto' }}>
              Key technical domains driving end-to-end software delivery, AI algorithms, and mission-critical engineering.
            </p>
          </div>

          <div className="pillars-flex-container">
            {CORE_PILLARS.map((pillar) => {
              const PillarIcon = iconMap[pillar.icon] || Layers;
              return (
                <div key={pillar.title} className="stat-card-modern pillar-flex-card">
                  <div
                    style={{
                      width: '3.25rem',
                      height: '3.25rem',
                      borderRadius: '1rem',
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-primary)',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <PillarIcon size={24} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.65rem', color: 'var(--text-primary)' }}>
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Tag Cloud (Flexbox) */}
        <div
          style={{
            marginTop: '3.5rem',
            padding: '1.5rem 2rem',
            borderRadius: '1.25rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem'
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.5rem' }}>
            Quick Stack:
          </span>
          {[
            'Java',
            'Python',
            'React.js',
            'Tailwind CSS',
            'Flask',
            'Machine Learning',
            'NLP',
            'SQL',
            'MySQL',
            'Docker',
            'Git & GitHub',
            'Vite',
            'Vercel',
            'Smart India Hackathon 2025'
          ].map((tag) => (
            <span key={tag} className="tech-pill" style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}>
              <CheckCircle2 size={13} style={{ color: 'var(--accent-emerald)' }} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
