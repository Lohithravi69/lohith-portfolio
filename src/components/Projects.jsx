import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  FolderGit2,
  Search,
  ExternalLink,
  Star,
  GitFork,
  Sparkles,
  Layers,
  Code,
  Info,
  ArrowUpRight,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS_DATA, CATEGORIES } from '../data/projects';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [githubReposList, setGithubReposList] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fetch live repo data from GitHub API
  const fetchGitHubData = async () => {
    try {
      setIsSyncing(true);
      const res = await fetch('https://api.github.com/users/Lohithravi69/repos?per_page=100&sort=updated');
      if (res.ok) {
        const data = await res.json();
        setGithubReposList(data);
        setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.warn('GitHub API sync fallback to static data:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  // Merge static project metadata with live GitHub stats + append any newly created repos
  const enrichedProjects = useMemo(() => {
    const repoMap = {};
    githubReposList.forEach((r) => {
      repoMap[r.name.toLowerCase()] = r;
    });

    const knownRepoNames = new Set();

    // 1. Process curated project list with live stats
    const curated = PROJECTS_DATA.map((proj) => {
      const live = repoMap[proj.repoName?.toLowerCase()];
      if (proj.repoName) knownRepoNames.add(proj.repoName.toLowerCase());
      if (live) knownRepoNames.add(live.name.toLowerCase());

      return {
        ...proj,
        stars: live?.stargazers_count !== undefined ? live.stargazers_count : proj.stars,
        forks: live?.forks_count !== undefined ? live.forks_count : proj.forks,
        githubUrl: live?.html_url || proj.githubUrl,
        language: live?.language || proj.language,
        pushedAt: live?.pushed_at
      };
    });

    // 2. Discover and append any unlisted repositories from GitHub
    const dynamicExtras = githubReposList
      .filter((r) => !knownRepoNames.has(r.name.toLowerCase()) && !r.fork)
      .map((r) => ({
        id: `gh-${r.id}`,
        title: r.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        repoName: r.name,
        featured: false,
        category: 'tools',
        categoryLabel: r.language ? `${r.language} Project` : 'Open Source Repo',
        description: r.description || `Open-source repository created by Lohith R: ${r.name}`,
        longDescription: r.description || `Public GitHub repository ${r.name} developed with ${r.language || 'modern developer technologies'}.`,
        highlights: [
          `Primary Language: ${r.language || 'Multi-language'}`,
          `Default branch: ${r.default_branch}`,
          `Last updated: ${new Date(r.pushed_at).toLocaleDateString()}`
        ],
        tags: [r.language, 'GitHub', 'Open Source'].filter(Boolean),
        language: r.language || 'Code',
        image: null,
        liveUrl: r.homepage || null,
        githubUrl: r.html_url,
        stars: r.stargazers_count,
        forks: r.forks_count,
        pushedAt: r.pushed_at
      }));

    return [...curated, ...dynamicExtras];
  }, [githubReposList]);

  // Filter projects by category & search query
  const filteredProjects = useMemo(() => {
    return enrichedProjects.filter((p) => {
      const matchCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'featured'
          ? p.featured
          : p.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.language && p.language.toLowerCase().includes(q)) ||
        (p.repoName && p.repoName.toLowerCase().includes(q));

      return matchCategory && matchQuery;
    });
  }, [enrichedProjects, activeCategory, searchQuery]);

  // Check scroll positions for slider buttons
  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [filteredProjects]);

  // 3-second auto-slide for projects carousel
  useEffect(() => {
    if (!isAutoPlay || isHovered || filteredProjects.length <= 1) return;
    const timer = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 25) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: 390, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, filteredProjects]);

  const slideLeft = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollLeft <= 15) {
        sliderRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: -390, behavior: 'smooth' });
      }
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollLeft >= scrollWidth - clientWidth - 25) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: 390, behavior: 'smooth' });
      }
    }
  };

  // Map project categories to distinct modern card effects
  const getCardEffectClass = (project) => {
    if (project.featured) {
      return 'card-rotating-border card-rotating-border-featured';
    }
    switch (project.category) {
      case 'ai-ml':
        return 'card-effect-aurora';
      case 'web':
        return 'card-effect-spotlight';
      case 'cloud':
      case 'tools':
        return 'card-effect-cyber';
      case 'algorithms':
      default:
        return 'card-effect-prism';
    }
  };

  // Language dot color mapping
  const getLanguageColor = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'python': return '#3572A5';
      case 'java': return '#b07219';
      case 'javascript': return '#f1e05a';
      case 'html': return '#e34c26';
      case 'css': return '#563d7c';
      case 'shell': return '#89e051';
      default: return 'var(--accent-primary)';
    }
  };

  return (
    <section
      id="projects"
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow orb */}
      <div className="glow-orb-primary" style={{ top: '20%', right: '-10%', opacity: 0.12 }} />

      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <FolderGit2 size={14} />
            <span>GitHub Project Repositories</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '1rem' }}>
            Featured &amp; Open Source <span className="gradient-text">Repositories</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem' }}>
            Interactive showcase of all {enrichedProjects.length} GitHub repositories spanning AI/ML diagnostic engines, disaster tech systems, web applications, and algorithmic vaults.
          </p>

          {/* GitHub Live Sync status indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              onClick={fetchGitHubData}
              disabled={isSyncing}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                padding: '0.4rem 0.95rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'all 0.2s ease'
              }}
            >
              <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} style={{ color: 'var(--accent-primary)' }} />
              <span>{isSyncing ? 'Syncing GitHub...' : lastSynced ? `Synced live with GitHub (${lastSynced})` : 'Live GitHub Sync'}</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Top Row: Search Input */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}
          >
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: '280px', maxWidth: '640px', position: 'relative' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                type="text"
                placeholder="Search all 15 repositories (e.g. Skin Cancer, SafeNet, Java, NLP, LeetCode)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 3.25rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '9999px',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(12px)'
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '1.25rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.45rem'
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? enrichedProjects.length
                  : cat.id === 'featured'
                  ? enrichedProjects.filter((p) => p.featured).length
                  : enrichedProjects.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '0.45rem 1.15rem',
                    borderRadius: '9999px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid',
                    backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-card)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)',
                    boxShadow: isActive ? '0 6px 16px -3px var(--glow-color)' : 'none'
                  }}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div
            className="glass-panel"
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              maxWidth: '500px',
              margin: '0 auto'
            }}
          >
            <Layers size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              No repositories found
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              No projects matched "{searchQuery}". Try searching for another keyword.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Flexbox Carousel Container (Nav buttons show only on hover) */
          <div
            className="carousel-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left Floating Arrow Button (Shown only on hover) */}
            {filteredProjects.length > 1 && (
              <button
                onClick={slideLeft}
                aria-label="Previous Projects"
                className="carousel-nav-btn prev-btn"
                style={{
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: isHovered ? 'auto' : 'none',
                  transform: isHovered ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.85)'
                }}
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Right Floating Arrow Button (Shown only on hover) */}
            {filteredProjects.length > 1 && (
              <button
                onClick={slideRight}
                aria-label="Next Projects"
                className="carousel-nav-btn next-btn"
                style={{
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: isHovered ? 'auto' : 'none',
                  transform: isHovered ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.85)'
                }}
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Projects Flexbox Carousel */}
            <div
              ref={sliderRef}
              style={{
                display: 'flex',
                gap: '1.75rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                padding: '1rem 0.5rem 1.5rem',
                scrollbarWidth: 'thin'
              }}
            >
              {filteredProjects.map((project) => {
                const isFeatured = project.featured;
                const effectClass = getCardEffectClass(project);

                const cardInner = (
                  <>
                    {/* Project Image or Stylized Gradient Header */}
                    {project.image ? (
                      <div
                        style={{
                          height: '190px',
                          overflow: 'hidden',
                          position: 'relative',
                          backgroundColor: 'var(--bg-tertiary)'
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                        {project.featured && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '0.85rem',
                              right: '0.85rem',
                              background: 'rgba(15, 23, 42, 0.85)',
                              backdropFilter: 'blur(8px)',
                              color: '#fbbf24',
                              border: '1px solid rgba(251, 191, 36, 0.4)',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                          >
                            <Sparkles size={12} />
                            Featured
                          </span>
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          height: '130px',
                          background: 'linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(6,182,212,0.14) 100%)',
                          borderBottom: '1px solid var(--border-color)',
                          padding: '1.25rem 1.5rem',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div
                          style={{
                            width: '2.75rem',
                            height: '2.75rem',
                            borderRadius: '0.75rem',
                            background: 'var(--accent-gradient)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            boxShadow: '0 4px 12px var(--glow-color)'
                          }}
                        >
                          <FolderGit2 size={20} />
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {project.language && (
                            <span
                              className="tech-pill"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                background: 'var(--bg-secondary)'
                              }}
                            >
                              <span
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: getLanguageColor(project.language)
                                }}
                              />
                              <span>{project.language}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Card Content */}
                    <div
                      style={{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
                      }}
                    >
                      {/* Category & Stats */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '0.65rem'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: 'var(--accent-primary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          {project.categoryLabel}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          {project.stars > 0 && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Star size={13} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                              {project.stars}
                            </span>
                          )}
                          {project.forks > 0 && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <GitFork size={13} />
                              {project.forks}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          marginBottom: '0.65rem',
                          color: 'var(--text-primary)',
                          lineHeight: 1.35
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* Summary */}
                      <p
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.88rem',
                          lineHeight: 1.6,
                          marginBottom: '1.25rem',
                          flex: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.35rem',
                          marginBottom: '1.25rem'
                        }}
                      >
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tech-pill" style={{ fontSize: '0.75rem' }}>
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="tech-pill" style={{ opacity: 0.8, fontSize: '0.75rem' }}>
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                        {/* Action Buttons */}
                        <div
                          style={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginTop: 'auto',
                            paddingTop: '0.85rem',
                            borderTop: '1px solid var(--border-color)',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="btn-primary"
                                style={{
                                  padding: '0.45rem 0.85rem',
                                  fontSize: '0.82rem',
                                  flex: 1
                                }}
                              >
                                <ExternalLink size={14} />
                                <span>Live Demo</span>
                              </a>
                            )}

                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="btn-secondary"
                              style={{
                                padding: '0.45rem 0.85rem',
                                fontSize: '0.82rem',
                                flex: project.liveUrl ? 'none' : 1
                              }}
                              aria-label="View on GitHub"
                            >
                              <GithubIcon size={14} />
                              <span>{project.liveUrl ? 'Code' : 'GitHub'}</span>
                            </a>
                          </div>

                          <span
                            style={{
                              fontSize: '0.75rem',
                              color: 'var(--accent-primary)',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}
                          >
                            Details <ArrowUpRight size={13} />
                          </span>
                        </div>
                      </div>
                    </>
                  );

                  const cardBoxStyle = {
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    flex: '0 0 360px',
                    scrollSnapAlign: 'start',
                    minWidth: '340px',
                    maxWidth: '380px',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  };

                  if (isFeatured) {
                    return (
                      <div
                        key={project.id}
                        className={effectClass}
                        style={cardBoxStyle}
                        onClick={() => setSelectedProject(project)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedProject(project);
                          }
                        }}
                      >
                        <div className="card-rotating-border-inner">{cardInner}</div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={project.id}
                      className={effectClass}
                      style={cardBoxStyle}
                      onClick={() => setSelectedProject(project)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedProject(project);
                        }
                      }}
                    >
                      {cardInner}
                    </div>
                  );
                })}
              </div>
            </div>
        )}

        {/* GitHub Direct Link Banner */}
        <div
          className="glass-panel"
          style={{
            marginTop: '3.5rem',
            padding: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(56, 189, 248, 0.08) 100%)',
            borderColor: 'rgba(99, 102, 241, 0.25)'
          }}
        >
          <div style={{ maxWidth: '650px' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Explore all 15 repositories &amp; open-source projects on GitHub
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Follow my GitHub for daily algorithmic commits, AI model architectures, hackathon repositories, and active open-source initiatives.
            </p>
          </div>

          <a
            href="https://github.com/Lohithravi69"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '0.85rem 1.75rem' }}
          >
            <GithubIcon size={18} />
            <span>Visit @Lohithravi69 on GitHub</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Project Deep-dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
