import React from 'react';
import { GraduationCap, Award, CheckCircle2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { EDUCATION_DATA } from '../data/education';

export default function Education() {
  const badgeColorMap = {
    blue: { bg: 'rgba(99, 102, 241, 0.12)', text: 'var(--accent-primary)', border: 'rgba(99, 102, 241, 0.3)' },
    orange: { bg: 'rgba(245, 158, 11, 0.12)', text: 'var(--accent-amber)', border: 'rgba(245, 158, 11, 0.3)' },
    green: { bg: 'rgba(16, 185, 129, 0.12)', text: 'var(--accent-emerald)', border: 'rgba(16, 185, 129, 0.3)' }
  };

  return (
    <section
      id="education"
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative'
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-badge">
            <GraduationCap size={14} />
            <span>Academic &amp; Hackathons</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '1rem' }}>
            Education &amp; <span className="gradient-text">Milestones</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            My engineering foundation, technical hackathon ventures, and specialized industry certifications.
          </p>
        </div>

        {/* Timeline List */}
        <div style={{ maxWidth: '850px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
          {EDUCATION_DATA.map((item, index) => {
            const badgeStyle = badgeColorMap[item.badgeColor] || badgeColorMap.blue;
            return (
              <div
                key={index}
                className="glass-panel glass-panel-hover"
                style={{
                  padding: '2.25rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decorative accent top bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: item.badgeColor === 'orange' ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'var(--accent-gradient)'
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        backgroundColor: badgeStyle.bg,
                        color: badgeStyle.text,
                        border: `1px solid ${badgeStyle.border}`,
                        marginBottom: '0.65rem'
                      }}
                    >
                      {item.badge}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.98rem' }}>
                      {item.institution}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      background: 'var(--bg-tertiary)',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <Calendar size={14} />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  {item.description}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {item.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
