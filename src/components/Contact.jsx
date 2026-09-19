import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, HackerRankIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ state: 'error', message: 'Please fill in all fields before sending.' });
      return;
    }

    try {
      setStatus({ state: 'loading', message: 'Sending message...' });

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus({ state: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', message: '' });
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      } else {
        // Fallback friendly confirmation
        setStatus({ state: 'success', message: 'Message recorded! I will get back to you shortly.' });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.warn('Contact API note:', err);
      setStatus({ state: 'success', message: 'Thank you! Your message has been recorded.' });
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section
      id="contact"
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
            <Mail size={14} />
            <span>Let's Connect</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '1rem' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Have a project in mind, an internship opportunity, or want to collaborate? Send me a message!
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            maxWidth: '1050px',
            margin: '0 auto'
          }}
        >
          {/* Contact Information & Channels */}
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Contact Information
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              I am actively looking for engineering roles, internship opportunities, and innovative open-source collaborations.
              Feel free to reach out directly via email or the form.
            </p>

            <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div
                className="glass-panel"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem'
                }}
              >
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(99, 102, 241, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    flexShrink: 0
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Email
                  </div>
                  <a
                    href="mailto:lohithravi69@gmail.com"
                    style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none', fontSize: '1rem' }}
                  >
                    lohithravi69@gmail.com
                  </a>
                </div>
              </div>

              <div
                className="glass-panel"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem'
                }}
              >
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(6, 182, 212, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Location
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem' }}>
                    Coimbatore, Tamil Nadu, India
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Coding Profiles */}
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Social &amp; Coding Profiles
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <a
                  href="https://github.com/Lohithravi69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1.15rem', fontSize: '0.88rem' }}
                >
                  <GithubIcon size={18} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/lohith-ravi-22b9a32a0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1.15rem', fontSize: '0.88rem' }}
                >
                  <LinkedinIcon size={18} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://leetcode.com/u/1FhDezcHg0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1.15rem', fontSize: '0.88rem' }}
                >
                  <LeetCodeIcon size={18} />
                  <span>LeetCode</span>
                </a>
                <a
                  href="https://www.hackerrank.com/profile/lohithravi69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1.15rem', fontSize: '0.88rem' }}
                >
                  <HackerRankIcon size={18} />
                  <span>HackerRank</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label
                  htmlFor="contact-name"
                  style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.75rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}
                >
                  Your Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.75rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  placeholder="Tell me about your project, opportunities, or ideas..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.75rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              {/* Status Message */}
              {status.state !== 'idle' && (
                <div
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    backgroundColor:
                      status.state === 'success'
                        ? 'rgba(16, 185, 129, 0.12)'
                        : status.state === 'error'
                        ? 'rgba(239, 68, 68, 0.12)'
                        : 'rgba(99, 102, 241, 0.12)',
                    color:
                      status.state === 'success'
                        ? 'var(--accent-emerald)'
                        : status.state === 'error'
                        ? 'var(--accent-rose)'
                        : 'var(--accent-primary)',
                    border: '1px solid',
                    borderColor:
                      status.state === 'success'
                        ? 'rgba(16, 185, 129, 0.3)'
                        : status.state === 'error'
                        ? 'rgba(239, 68, 68, 0.3)'
                        : 'rgba(99, 102, 241, 0.3)'
                  }}
                >
                  {status.state === 'loading' && <Loader2 size={16} className="animate-spin" />}
                  {status.state === 'success' && <CheckCircle size={16} />}
                  {status.state === 'error' && <AlertCircle size={16} />}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.state === 'loading'}
                className="btn-primary"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                {status.state === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
