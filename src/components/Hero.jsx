import React, { useEffect, useRef, useState } from 'react';
import { Eye, FileDown, Mail, Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, HackerRankIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function Hero() {
  const canvasRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Full-Stack Developer',
    'AI & ML Enthusiast',
    'NLP Classifier Builder',
    'Smart India Hackathon 2025 Participant',
    'Algorithmic Problem Solver'
  ];

  // Typing effect animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const updateSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentRole.substring(0, typedText.length + 1));
        if (typedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypedText(currentRole.substring(0, typedText.length - 1));
        if (typedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, updateSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  // Particle network canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle links
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 120) * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleResumeDownload = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 4.5rem)',
        display: 'flex',
        alignItems: 'center',
        padding: '3rem 0 5rem',
        overflow: 'hidden'
      }}
    >
      {/* Background canvas */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Radial Glow Elements */}
      <div className="glow-orb-primary" style={{ top: '-10%', left: '-10%' }} />
      <div className="glow-orb-cyan" style={{ bottom: '10%', right: '-5%' }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          {/* Hero Left Content */}
          <div>
            <div className="section-badge animate-float">
              <Sparkles size={14} />
              <span>Available for Full-Time &amp; Intern Roles</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                color: 'var(--text-primary)'
              }}
            >
              Hi, I'm <span className="gradient-text">Lohith R</span>
            </h1>

            {/* Dynamic typed role */}
            <div
              style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontWeight: 600,
                color: 'var(--accent-cyan)',
                minHeight: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginBottom: '1.25rem'
              }}
            >
              <span>{typedText}</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '1.4em',
                  backgroundColor: 'var(--accent-primary)',
                  animation: 'pulseGlow 0.8s infinite'
                }}
              />
            </div>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '2rem',
                maxWidth: '560px'
              }}
            >
              Computer Science &amp; Engineering undergraduate at PPG Institute of Technology.
              Crafting intelligent AI/ML applications, full-stack web platforms, and disaster tech solutions.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <a href="#projects" className="btn-primary">
                <Eye size={18} />
                <span>View Projects</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="./Lohith_R_Resume.pdf"
                download
                onClick={handleResumeDownload}
                className="btn-secondary"
              >
                <FileDown size={18} style={{ color: 'var(--accent-emerald)' }} />
                <span>Download Resume</span>
              </a>

              <a href="#contact" className="btn-outline">
                <Mail size={18} />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Proof & Quick Highlights */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} style={{ color: 'var(--accent-emerald)' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  Smart India Hackathon '25
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} style={{ color: 'var(--accent-amber)' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  Naan Mudhalvan Certified
                </span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card with Rotating Conic Gradient Border */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="card-rotating-border card-rotating-border-featured"
              style={{
                maxWidth: '420px',
                width: '100%',
                position: 'relative'
              }}
            >
              <div
                className="card-rotating-border-inner"
                style={{
                  padding: '2.5rem 2rem',
                  textAlign: 'center'
                }}
              >
                {/* Avatar with dynamic rotating aura ring - Click to scroll to Profile Showcase */}
                <div
                  className="avatar-rotating-ring"
                  onClick={() => {
                    const el = document.getElementById('profile-showcase');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                  title="Click to view full profile in About Me"
                >
                  <img
                    src="./assets/profile.png?v=5"
                    alt="Lohith R"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fb = document.getElementById('hero-avatar-fallback');
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                  <div
                    id="hero-avatar-fallback"
                    className="avatar-fallback"
                    style={{
                      display: 'none',
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'var(--accent-gradient)',
                      color: '#ffffff',
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid var(--bg-secondary)'
                    }}
                  >
                    LR
                  </div>
                </div>

                <div
                  onClick={() => {
                    const el = document.getElementById('profile-showcase');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                  title="Click to view full profile in About Me"
                >
                  <h3 style={{ fontSize: '1.45rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                    Lohith R
                  </h3>
                  <p style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                    B.E. Computer Science (2023–2027)
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                    PPG Institute of Technology • Coimbatore, India
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--accent-cyan)',
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      marginBottom: '1.5rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>View Full Profile</span>
                    <span>↓</span>
                  </div>
                </div>

                {/* Social & Coding Links */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.65rem',
                    width: '100%',
                    maxWidth: '320px',
                    margin: '0 auto'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href="https://github.com/Lohithravi69"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.85rem', justifyContent: 'center' }}
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon size={16} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/lohith-ravi-22b9a32a0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.85rem', justifyContent: 'center' }}
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon size={16} style={{ color: '#0a66c2' }} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://leetcode.com/u/1FhDezcHg0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.85rem', justifyContent: 'center' }}
                    aria-label="LeetCode Profile"
                  >
                    <LeetCodeIcon size={16} style={{ color: '#f59e0b' }} />
                    <span>LeetCode</span>
                  </a>
                  <a
                    href="https://www.hackerrank.com/profile/lohithravi69"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ padding: '0.6rem 0.85rem', fontSize: '0.85rem', justifyContent: 'center' }}
                    aria-label="HackerRank Profile"
                  >
                    <HackerRankIcon size={16} style={{ color: '#10b981' }} />
                    <span>HackerRank</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
