import React from 'react';
import { User, ShieldCheck, Code, Rocket, CheckCircle2, GraduationCap, MapPin, Mail, Sparkles, Terminal, Flame } from 'lucide-react';
import { HIGHLIGHT_STATS } from '../data/education';

export default function About() {
  const focusAreas = [
    {
      icon: Code,
      title: "Clean Architecture & Scalability",
      description: "Writing maintainable, modular, and performant code across React frontends and Python/Node backend microservices."
    },
    {
      icon: Sparkles,
      title: "Practical AI & Machine Learning",
      description: "Developing practical NLP text classifiers, computer vision diagnostic pipelines, and real-time inference tools."
    },
    {
      icon: ShieldCheck,
      title: "Security-First & Defensive Mindset",
      description: "Trained in ethical hacking, vulnerability assessments, secure REST endpoints, and resilient error-handling."
    },
    {
      icon: Rocket,
      title: "High-Impact Real-Time Solutions",
      description: "Smart India Hackathon 2025 finalist engineering emergency SOS dispatch platforms and real-time telemetry systems."
    }
  ];

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

        {/* Top Story: Portrait + Biography Split Grid */}
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
                  src="./assets/profile-portrait.png?v=3"
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
                      KreupAI Intern
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
                I am a Computer Science &amp; Engineering undergraduate at <strong>PPG Institute of Technology</strong> with hands-on experience in 
                full-stack development, artificial intelligence, and ethical hacking.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                From architecting emergency response platforms with real-time flood monitoring for <strong>Smart India Hackathon 2025</strong> to 
                building enterprise web applications during my internship at <strong>KreupAI Technologies</strong> and security assessments at <strong>Appin Technology</strong>, 
                I thrive on translating complex engineering problems into clean, robust products.
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
            margin: '3.5rem 0'
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

        {/* Mentorship & Peer Endorsements */}
        <div style={{ marginTop: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="section-badge">
              <Sparkles size={14} />
              <span>Recommendations &amp; Mentorship</span>
            </div>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Endorsements &amp; <span className="gradient-text">Feedback</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
              Feedback from internship engineering leads, hackathon guides, and mentors.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {[
              {
                quote: "Lohith showed exceptional proficiency in modern React and modular API integration during his internship. His ability to turn complex design specifications into high-performance web components was a standout.",
                author: "Engineering Lead",
                role: "Full-Stack Development Mentor",
                organization: "KreupAI Technologies LLC",
                badge: "Internship Mentor"
              },
              {
                quote: "In Smart India Hackathon 2025, Lohith spearheaded the real-time emergency dispatch telemetry and SOS user flow under intense deadlines. He demonstrated relentless grit and solid algorithmic problem solving.",
                author: "SIH Faculty Guide",
                role: "Project Mentor & CSE Faculty",
                organization: "PPG Institute of Technology",
                badge: "Hackathon Guide"
              },
              {
                quote: "Demonstrated strong foundational knowledge of network vulnerability scanning, defensive security patterns, and ethical hacking protocols during his specialized cybersecurity training.",
                author: "Security Instructor",
                role: "Cybersecurity & Ethical Hacking Lead",
                organization: "Appin Technology Coimbatore",
                badge: "Security Lead"
              }
            ].map((endorsement, i) => (
              <div
                key={i}
                className="glass-panel glass-panel-hover"
                style={{
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '1.25rem',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="tech-pill" style={{ fontSize: '0.75rem' }}>
                      {endorsement.badge}
                    </span>
                    <span style={{ fontSize: '1.5rem', color: 'var(--accent-primary)', opacity: 0.6, lineHeight: 1 }}>
                      “
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                    "{endorsement.quote}"
                  </p>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {endorsement.author}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                    {endorsement.role}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {endorsement.organization}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
