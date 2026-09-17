import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, HackerRankIcon, LRLogo } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        padding: '4.5rem 0 2.5rem',
        position: 'relative'
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand & Bio */}
          <div style={{ maxWidth: '340px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontWeight: 800,
                fontSize: '1.35rem',
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}
            >
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '0.5rem',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  padding: '0.25rem'
                }}
              >
                <LRLogo size={18} fill="#ffffff" />
              </div>
              <span>Lohith <span className="gradient-text">R</span></span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Full-Stack Developer &amp; AI Enthusiast building modern, intelligent, and scalable web solutions.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              <a
                href="https://github.com/Lohithravi69"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.5rem',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://linkedin.com/in/lohith-ravi-22b9a32a0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.5rem',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#0a66c2')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://leetcode.com/u/1FhDezcHg0/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.5rem',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#f59e0b')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <LeetCodeIcon size={18} />
              </a>
              <a
                href="https://www.hackerrank.com/profile/lohithravi69"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HackerRank"
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.5rem',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#10b981')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <HackerRankIcon size={18} />
              </a>
              <a
                href="mailto:lohithravi69@gmail.com"
                aria-label="Email"
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.5rem',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.65rem' }}>
              {['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Projects Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Top Highlights
            </h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.65rem' }}>
              <li>
                <a
                  href="https://safenetsos-app.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  SafeNet SOS App (SIH 2025)
                </a>
              </li>
              <li>
                <a
                  href="https://fake-news-detection-tau.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Fake News Detection (NLP)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Lohithravi69/perfume"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Lumoro E-Commerce
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Lohithravi69/leetcode"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.92rem' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  LeetCode Algorithm Vault
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to top */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.875rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Lohith R. Built with React 18, Vite &amp; Vanilla CSS.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '0.45rem 0.95rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.color = 'var(--accent-primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
