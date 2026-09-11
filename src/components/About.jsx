import React from 'react';
import { User, Layers, Cpu, ShieldAlert, Sparkles, CheckCircle2, GraduationCap, MapPin, Mail, Award } from 'lucide-react';
import { CORE_PILLARS } from '../data/skills';
import { HIGHLIGHT_STATS } from '../data/education';

export default function About() {
  const iconMap = {
    Layers: Layers,
    Cpu: Cpu,
    ShieldAlert: ShieldAlert,
    Sparkles: Sparkles
  };

  return (
    <section
      id="about"
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative'
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-badge">
            <User size={14} />
            <span>About Me</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '1rem' }}>
            Innovating Through <span className="gradient-text">Code &amp; AI</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Passionate Computer Science student dedicated to solving real-world challenges with cutting-edge web and AI architectures.
          </p>
        </div>

        {/* Top Story: Portrait + Biography Split Grid (Perfect Alignment) */}
        <div id="profile-showcase" className="profile-showcase-grid">
          {/* Left: Enhanced Full Portrait Card with Cyber Tech Corner Frame */}
          <div style={{ display: 'flex', width: '100%' }}>
            <div className="corner-bracket-frame">
              <div
                style={{
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '100%',
                  minHeight: '480px',
                  backgroundColor: 'var(--bg-tertiary)',
                  boxShadow: '0 15px 35px -10px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <img
                  src="/assets/profile-portrait.png?v=2"
                  alt="Lohith R - Full Portrait"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    transition: 'transform 0.5s ease',
                    flex: 1
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '2rem 1.25rem 1.25rem',
                    background: 'linear-gradient(to top, rgba(11, 15, 25, 0.95) 0%, rgba(11, 15, 25, 0.6) 60%, transparent 100%)',
                    color: '#ffffff'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.2rem' }}>Lohith R</div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.65rem' }}>
                    Computer Science &amp; Engineering • PPG Tech
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px',
                        background: 'rgba(99, 102, 241, 0.25)',
                        border: '1px solid rgba(99, 102, 241, 0.5)',
                        color: '#a5b4fc'
                      }}
                    >
                      SIH 2025
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px',
                        background: 'rgba(16, 185, 129, 0.25)',
                        border: '1px solid rgba(16, 185, 129, 0.5)',
                        color: '#6ee7b7'
                      }}
                    >
                      Naan Mudhalvan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Biography & Quick Details (Matching Height) */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                Engineering High-Impact Solutions
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                I am a Computer Science &amp; Engineering undergraduate at <strong>PPG Institute of Technology</strong> with a deep focus on 
                artificial intelligence, full-stack web applications, and cybersecurity.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                From architecting emergency response platforms with real-time flood monitoring for <strong>Smart India Hackathon 2025</strong> to 
                engineering NLP-driven fake news classifiers and credit fraud engines, I thrive on translating theoretical logic into robust, user-centric software.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <MapPin size={18} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Coimbatore, Tamil Nadu</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <GraduationCap size={18} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>B.E. CSE (2023–2027)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={18} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>lohithravi69@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Open for Opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            marginBottom: '4rem'
          }}
        >
          {HIGHLIGHT_STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-card-modern"
            >
              <div
                className="gradient-text"
                style={{
                  fontSize: '2.75rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  marginBottom: '0.6rem'
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 600 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Core Pillars */}
        <div>
          <h3 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            What I Focus On
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {CORE_PILLARS.map((pillar, i) => {
              const IconComponent = iconMap[pillar.icon] || Sparkles;
              return (
                <div
                  key={i}
                  className="glass-panel glass-panel-hover"
                  style={{
                    padding: '2rem 1.75rem',
                    borderRadius: '1.25rem'
                  }}
                >
                  <div
                    style={{
                      width: '3.25rem',
                      height: '3.25rem',
                      borderRadius: '0.85rem',
                      background: 'rgba(99, 102, 241, 0.12)',
                      border: '1px solid rgba(99, 102, 241, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-primary)',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <IconComponent size={24} />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    {pillar.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
