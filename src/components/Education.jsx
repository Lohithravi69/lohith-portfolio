import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  FileDown,
  Eye,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { EDUCATION_DATA, CERTIFICATIONS_DATA } from '../data/education';
import CertificateModal from './CertificateModal';

export default function Education() {
  const [activeTab, setActiveTab] = useState('certifications'); // 'certifications' | 'academics'
  const [selectedCert, setSelectedCert] = useState(null);

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
      {/* Background glow orb */}
      <div className="glow-orb-cyan" style={{ top: '20%', right: '-8%', opacity: 0.1 }} />

      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <Award size={14} />
            <span>Verified Credentials &amp; Education</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '1rem' }}>
            Certifications &amp; <span className="gradient-text">Milestones</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem' }}>
            Accredited industry certifications, NPTEL IoT credentials, Tata Data Analytics job simulations, and academic engineering timeline.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '9999px',
              padding: '0.35rem',
              gap: '0.4rem'
            }}
          >
            <button
              onClick={() => setActiveTab('certifications')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                backgroundColor: activeTab === 'certifications' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'certifications' ? '#ffffff' : 'var(--text-secondary)',
                boxShadow: activeTab === 'certifications' ? '0 4px 14px var(--glow-color)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <Award size={16} />
              <span>Certifications ({CERTIFICATIONS_DATA.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('academics')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                backgroundColor: activeTab === 'academics' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'academics' ? '#ffffff' : 'var(--text-secondary)',
                boxShadow: activeTab === 'academics' ? '0 4px 14px var(--glow-color)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <GraduationCap size={16} />
              <span>Academia &amp; Hackathons</span>
            </button>
          </div>
        </div>

        {/* CERTIFICATIONS TAB CONTENT */}
        {activeTab === 'certifications' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              maxWidth: '1100px',
              margin: '0 auto'
            }}
          >
            {CERTIFICATIONS_DATA.map((cert) => {
              const badgeStyle = badgeColorMap[cert.badgeColor] || badgeColorMap.blue;
              return (
                <div
                  key={cert.id}
                  className="glass-panel glass-panel-hover"
                  style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    borderRadius: '1.5rem',
                    overflow: 'hidden'
                  }}
                >
                  {/* Decorative top accent line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'var(--accent-gradient)'
                    }}
                  />

                  <div>
                    {/* Thumbnail Image if present */}
                    {cert.imageUrl && (
                      <div
                        onClick={() => setSelectedCert(cert)}
                        style={{
                          borderRadius: '1rem',
                          overflow: 'hidden',
                          marginBottom: '1.25rem',
                          height: '180px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: '#ffffff',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                        className="cert-thumb-wrapper"
                      >
                        <img
                          src={cert.imageUrl}
                          alt={cert.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            transition: 'transform 0.3s ease'
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(15, 23, 42, 0.45)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.25s ease',
                            color: '#ffffff',
                            fontWeight: 600,
                            gap: '0.4rem',
                            fontSize: '0.9rem'
                          }}
                          className="cert-hover-overlay"
                        >
                          <Eye size={18} />
                          <span>View Certificate</span>
                        </div>
                      </div>
                    )}

                    {/* Card Badges Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.65rem',
                          borderRadius: '9999px',
                          backgroundColor: badgeStyle.bg,
                          color: badgeStyle.text,
                          border: `1px solid ${badgeStyle.border}`,
                          textTransform: 'uppercase'
                        }}
                      >
                        {cert.badge}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {cert.issueDate}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                      {cert.title}
                    </h3>
                    <p style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.85rem' }}>
                      {cert.issuer}
                    </p>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {cert.description}
                    </p>

                    {/* Skills pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
                      {cert.skills.slice(0, 3).map((s) => (
                        <span key={s} className="tech-pill" style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.65rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="btn-primary"
                      style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
                    >
                      <Eye size={15} />
                      <span>View</span>
                    </button>

                    {cert.pdfUrl && (
                      <a
                        href={cert.pdfUrl}
                        download
                        className="btn-secondary"
                        style={{ padding: '0.6rem 0.85rem', fontSize: '0.85rem', justifyContent: 'center' }}
                        title="Download PDF Certificate"
                      >
                        <FileDown size={15} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ACADEMICS & HACKATHONS TAB CONTENT */}
        {activeTab === 'academics' && (
          <div style={{ maxWidth: '880px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
            {EDUCATION_DATA.map((item, index) => {
              const badgeStyle = badgeColorMap[item.badgeColor] || badgeColorMap.blue;
              return (
                <div
                  key={index}
                  className="glass-panel glass-panel-hover"
                  style={{
                    padding: '2.25rem',
                    position: 'relative',
                    borderRadius: '1.5rem',
                    overflow: 'hidden'
                  }}
                >
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
        )}

        {/* Certificate Modal */}
        <CertificateModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      </div>
    </section>
  );
}
