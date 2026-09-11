import React from 'react';
import { X, ExternalLink, CheckCircle, Tag, Code, Star, GitFork } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div
          style={{
            padding: '1.75rem 2rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            background: 'var(--bg-secondary)',
            zIndex: 10,
            borderRadius: '1.5rem 1.5rem 0 0'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="tech-pill" style={{ color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}>
                {project.categoryLabel}
              </span>
              {project.language && (
                <span className="tech-pill">
                  <Code size={12} />
                  {project.language}
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              width: '2.5rem',
              height: '2.5rem',
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
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem' }}>
          {/* Optional Project Image */}
          {project.image && (
            <div
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                marginBottom: '2rem',
                border: '1px solid var(--border-color)',
                maxHeight: '320px'
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Overview */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Overview &amp; Purpose
            </h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.98rem' }}>
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Key Technical Highlights
              </h4>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {project.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      background: 'var(--bg-card)',
                      padding: '0.85rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <CheckCircle size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Technologies &amp; Architecture
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="tech-pill"
                  style={{
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.85rem',
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    color: 'var(--accent-primary)',
                    borderColor: 'rgba(99, 102, 241, 0.25)'
                  }}
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Action Links */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ flex: 1, minWidth: '160px' }}
              >
                <ExternalLink size={18} />
                <span>Open Live Demo</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ flex: 1, minWidth: '160px' }}
              >
                <GithubIcon size={18} />
                <span>View on GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
