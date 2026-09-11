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
  Play,
  Pause,
  LayoutGrid,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { SKILL_CATEGORIES, CORE_PILLARS } from '../data/skills';

export default function Skills() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'grid'
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  const totalSlides = SKILL_CATEGORIES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // 3-second Auto-slide for skills
  useEffect(() => {
    if (!isAutoPlay || isHovered || viewMode === 'grid') return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, viewMode]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
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
        position: 'relative'
      }}
    >
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

        {/* View Mode & Slide Tabs Navigation */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Slide Category Jump Tabs */}
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
              const isSelected = viewMode === 'slider' ? currentSlide === idx : false;
              return (
                <button
                  key={cat.title}
                  onClick={() => {
                    setViewMode('slider');
                    setCurrentSlide(idx);
                  }}
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

            {/* Toggle All Grid View */}
            <button
              onClick={() => setViewMode(viewMode === 'slider' ? 'grid' : 'slider')}
              className="btn-secondary"
              style={{
                padding: '0.6rem 1.25rem',
                fontSize: '0.88rem',
                borderRadius: '9999px',
                backgroundColor: viewMode === 'grid' ? 'var(--accent-primary)' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : 'var(--text-secondary)',
                borderColor: viewMode === 'grid' ? 'var(--accent-primary)' : 'var(--border-color)'
              }}
              title={viewMode === 'slider' ? 'View all domains side-by-side' : 'Switch to carousel slide view'}
            >
              {viewMode === 'slider' ? <LayoutGrid size={15} /> : <Sliders size={15} />}
              <span>{viewMode === 'slider' ? 'View All Grid' : 'Slide View'}</span>
            </button>
          </div>
        </div>

        {/* SLIDER VIEW WITH CENTER-CORNER SIDE BUTTONS */}
        {viewMode === 'slider' && (
          <div
            style={{ position: 'relative', width: '100%', maxWidth: '920px', margin: '0 auto' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left Center-Corner Floating Arrow Button */}
            <button
              onClick={prevSlide}
              aria-label="Previous skill domain"
              style={{
                position: 'absolute',
                left: '-22px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 30,
                width: '3.25rem',
                height: '3.25rem',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-hover)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.35), 0 0 20px var(--glow-color)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)';
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Center-Corner Floating Arrow Button */}
            <button
              onClick={nextSlide}
              aria-label="Next skill domain"
              style={{
                position: 'absolute',
                right: '-22px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 30,
                width: '3.25rem',
                height: '3.25rem',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-hover)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.35), 0 0 20px var(--glow-color)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)';
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Slider Viewport Container */}
            <div
              className="skills-slider-wrapper"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="skills-slider-track"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`
                }}
              >
                {SKILL_CATEGORIES.map((cat, index) => {
                  const effectClass = borderEffectClasses[index % borderEffectClasses.length];
                  const Icon = iconMap[cat.icon] || Code2;

                  return (
                    <div key={cat.title} className="skills-slide-item">
                      <div
                        className={`${effectClass}`}
                        style={{
                          padding: '2.5rem',
                          borderRadius: '1.5rem',
                          background: 'var(--bg-secondary)',
                          minHeight: '430px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        {/* Slide Card Header */}
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: '2rem',
                              gap: '1rem'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <div
                                style={{
                                  width: '3.25rem',
                                  height: '3.25rem',
                                  borderRadius: '1rem',
                                  background: 'var(--accent-gradient)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#ffffff',
                                  flexShrink: 0
                                }}
                              >
                                <Icon size={24} />
                              </div>
                              <div>
                                <h3 style={{ fontSize: '1.45rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                                  {cat.title}
                                </h3>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                  {cat.skills.length} Specialized competencies
                                </span>
                              </div>
                            </div>

                            <span className="tech-pill" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                              <Zap size={13} style={{ color: 'var(--accent-amber)' }} />
                              Verified Proficiency
                            </span>
                          </div>

                          {/* Slide Skills List */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                            {cat.skills.map((skill) => {
                              const badgeStyle = getBadgeStyle(skill.badge);
                              return (
                                <div key={skill.name} className="skill-item-flex">
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      marginBottom: '0.35rem'
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                      <span style={{ fontSize: '1.25rem' }}>{skill.icon}</span>
                                      <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>
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
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination Indicator Dots */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1.5rem'
              }}
            >
              {SKILL_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.title}
                  onClick={() => setCurrentSlide(idx)}
                  className={`skills-dot ${currentSlide === idx ? 'active' : ''}`}
                  aria-label={`Jump to slide ${idx + 1}: ${cat.title}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* GRID VIEW (When toggled to see all side-by-side) */}
        {viewMode === 'grid' && (
          <div className="skills-flex-container">
            {SKILL_CATEGORIES.map((cat, index) => {
              const effectClass = borderEffectClasses[index % borderEffectClasses.length];
              const Icon = iconMap[cat.icon] || Code2;

              return (
                <div
                  key={cat.title}
                  className={`${effectClass} skill-category-flex-card`}
                >
                  <div>
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
                            width: '2.85rem',
                            height: '2.85rem',
                            borderRadius: '0.85rem',
                            background: 'var(--accent-gradient)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            flexShrink: 0
                          }}
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                            {cat.title}
                          </h3>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {cat.skills.length} Specialized competencies
                          </span>
                        </div>
                      </div>

                      <span className="tech-pill" style={{ fontSize: '0.75rem', flexShrink: 0 }}>
                        <Zap size={12} style={{ color: 'var(--accent-amber)' }} />
                        Verified
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                                  fontSize: '0.75rem',
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
        )}

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
