import React from 'react';
import { X, ExternalLink, FileDown, Award, CheckCircle, Tag, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CertificateModal({ certificate, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!certificate) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 100 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '780px',
          maxHeight: '90vh',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-hover)',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5), 0 0 35px var(--glow-color)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-tertiary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '0.65rem',
                background: 'rgba(99, 102, 241, 0.15)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                {certificate.issuer}
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                {certificate.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close certificate modal"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'var(--accent-rose)';
              e.currentTarget.style.borderColor = 'var(--accent-rose)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem 2rem', overflowY: 'auto', flex: 1 }}>
          {/* Certificate Image Preview */}
          {certificate.imageUrl ? (
            <div
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                marginBottom: '1.75rem',
                border: '1px solid var(--border-color)',
                backgroundColor: '#ffffff',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={certificate.imageUrl}
                alt={`${certificate.title} Preview`}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '440px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          ) : (
            <div
              style={{
                padding: '3rem 2rem',
                borderRadius: '1rem',
                marginBottom: '1.75rem',
                background: 'var(--bg-card)',
                border: '1px dashed var(--border-color)',
                textAlign: 'center'
              }}
            >
              <Award size={48} style={{ color: 'var(--accent-primary)', margin: '0 auto 1rem' }} />
              <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {certificate.title}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                Verified institutional completion under {certificate.issuer}.
              </p>
            </div>
          )}

          {/* Details & Verification Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
              padding: '1.25rem',
              borderRadius: '1rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Issuing Organization
              </div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.92rem', marginTop: '0.2rem' }}>
                {certificate.issuer}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Period / Date
              </div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.92rem', marginTop: '0.2rem' }}>
                {certificate.issueDate}
              </div>
            </div>

            {certificate.credentialId && (
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Credential ID / Verification Code
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <code
                    style={{
                      background: 'var(--bg-card)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '0.4rem',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.85rem',
                      color: 'var(--accent-cyan)',
                      fontFamily: 'monospace'
                    }}
                  >
                    {certificate.credentialId}
                  </code>
                  <button
                    onClick={() => handleCopy(certificate.credentialId)}
                    title="Copy Credential ID"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copied ? 'var(--accent-emerald)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.2rem'
                    }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {certificate.description}
            </p>
          </div>

          {/* Skills Verified */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                Skills &amp; Competencies Verified:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="tech-pill"
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.3rem 0.75rem',
                      backgroundColor: 'rgba(99, 102, 241, 0.1)',
                      borderColor: 'rgba(99, 102, 241, 0.25)',
                      color: 'var(--accent-primary)'
                    }}
                  >
                    <CheckCircle size={12} style={{ color: 'var(--accent-emerald)' }} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            {certificate.pdfUrl && (
              <a
                href={certificate.pdfUrl}
                download
                onClick={handleDownload}
                className="btn-primary"
                style={{ flex: 1, minWidth: '160px', justifyContent: 'center' }}
              >
                <FileDown size={17} />
                <span>Download Official PDF</span>
              </a>
            )}

            {certificate.pdfUrl && (
              <a
                href={certificate.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ flex: 1, minWidth: '160px', justifyContent: 'center' }}
              >
                <ExternalLink size={17} />
                <span>Open in Full Tab</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
