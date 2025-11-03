// Main site JS - moved from index.html
document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  window.toggleMenu = function() {
    document.getElementById('navMenu').classList.toggle('active');
  };

  window.closeMenu = function() {
    document.getElementById('navMenu').classList.remove('active');
  };

  // Smooth Scroll for navigation links and hero buttons
  document.querySelectorAll('nav a[href^="#"], a[href^="#projects"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Ensure project cards are visible to assistive tech by default
  projectCards.forEach(card => {
    card.setAttribute('aria-hidden', 'false');
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active classes and aria-pressed for accessibility
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 10);
          // Make visible to assistive tech
          card.setAttribute('aria-hidden', 'false');
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
          // Hide from assistive tech while filtered out
          card.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });

  // Scroll Animations (IntersectionObserver)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Initialize AOS (Animate On Scroll)
  if (window.AOS) {
    AOS.init({ duration: 800, once: true });
  }
  
  // Lazy-load Spline 3D embed: insert an iframe only when the hero enters viewport
  (function() {
    const container = document.getElementById('spline-embed');
    if (!container) return;
    const sceneUrl = container.dataset.scene && container.dataset.scene.trim();
    if (!sceneUrl) return;

    let loaded = false;
    const createIframe = () => {
      if (loaded) return;
      try {
        const iframe = document.createElement('iframe');
        iframe.src = sceneUrl;
        iframe.title = 'Decorative 3D background';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.loading = 'lazy';
  iframe.className = 'spline-iframe';
  // initial pointer-events are none (decorative). If container requests interactive mode, enable after load.
  iframe.style.pointerEvents = 'none';
  // ensure iframe sits behind content
  iframe.style.zIndex = '0';
  // ensure container stacking is low as well
  try { container.style.zIndex = '0'; } catch(e) {}
        iframe.setAttribute('aria-hidden', 'true');

        // ensure container is positioned to hold absolute iframe
        const prevPos = window.getComputedStyle(container).position;
        if (!prevPos || prevPos === 'static') container.style.position = 'relative';

        // add a load handler to transition in smoothly and optionally enable interactions
        iframe.addEventListener('load', () => {
          try {
            iframe.classList.add('loaded');
            // if the container explicitly opts-in to interactive mode, enable pointer events
            if (container.dataset.interactive === 'true') {
              iframe.style.pointerEvents = 'auto';
              iframe.removeAttribute('aria-hidden');
            }
          } catch (err) {
            // ignore failures here
            console.warn('Spline iframe load handler error', err);
          }
        }, { passive: true });

        container.appendChild(iframe);
        container.classList.add('spline-loaded');
        loaded = true;
      } catch (e) {
        // silently ignore any iframe injection failure
        console.warn('Could not load spline iframe', e);
      }
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            createIframe();
            obs.disconnect();
          }
        });
      }, { rootMargin: '200px' });

      io.observe(container);
    } else {
      // fallback for older browsers
      setTimeout(createIframe, 1000);
    }

    // Wire up the toggle button so users can opt into interactive mode
    const toggle = document.getElementById('spline-toggle');
    if (toggle) {
      // initialize state from dataset or saved preference
      const saved = localStorage.getItem('spline-interactive');
      if (saved === 'true') {
        container.dataset.interactive = 'true';
        toggle.setAttribute('aria-pressed', 'true');
        toggle.textContent = '3D: On';
      }

      toggle.addEventListener('click', () => {
        const current = container.dataset.interactive === 'true';
        const next = !current;

        // If enabling interactive mode, confirm with the user first (security & perf notice)
        if (next) {
          const msg = 'Enabling interactive 3D will load external content and may affect performance. Continue to enable interactive mode?';
          const ok = window.confirm(msg);
          if (!ok) return; // user cancelled
        }

        container.dataset.interactive = next ? 'true' : 'false';
        toggle.setAttribute('aria-pressed', next ? 'true' : 'false');
        toggle.textContent = next ? '3D: On' : 'Enable 3D';
        localStorage.setItem('spline-interactive', next ? 'true' : 'false');

        // If iframe already exists, enable/disable pointer events and adjust sandbox/allow attributes
        const iframe = container.querySelector('iframe.spline-iframe');
        if (iframe) {
          if (next) {
            // enable interactions and set cautious permissions
            iframe.style.pointerEvents = 'auto';
            iframe.removeAttribute('aria-hidden');
            try {
              // add a permissive but reasonable feature policy and sandbox attributes for interactive mode
              iframe.setAttribute('allow', 'fullscreen; autoplay; accelerometer; gyroscope; picture-in-picture');
              // Add sandbox flags that allow scripts & same-origin so the scene can run while keeping some restrictions
              iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
            } catch (e) { console.warn('Failed to set iframe permissions', e); }
          } else {
            // disable direct interactions but keep iframe loaded
            iframe.style.pointerEvents = 'none';
            iframe.setAttribute('aria-hidden', 'true');
            try {
              // remove potentially permissive attributes to reduce privileges when not interactive
              iframe.removeAttribute('allow');
              // keep sandbox present but restrictive when not interactive
              iframe.setAttribute('sandbox', '');
            } catch (e) { console.warn('Failed to adjust iframe permissions', e); }
          }
        }
      });

      // Also allow keyboard activation (space/enter)
      toggle.addEventListener('keydown', (ev) => {
        if (ev.key === ' ' || ev.key === 'Enter') {
          ev.preventDefault();
          toggle.click();
        }
      });
    }
  })();

  // Three.js 3D Background for Hero Section
  (function() {
    const heroSection = document.getElementById('home');
    if (!heroSection || !window.THREE) return;

    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Position canvas behind hero content
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';
    heroSection.style.position = 'relative';
    heroSection.appendChild(renderer.domElement);

    // Create particles
    const particleCount = window.innerWidth < 768 ? 50 : 100; // Fewer particles on mobile
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      colors[i * 3] = Math.random() * 0.5 + 0.5; // R
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5; // G
      colors[i * 3 + 2] = Math.random() * 0.5 + 0.5; // B
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      particleSystem.rotation.x += 0.001;
      particleSystem.rotation.y += 0.002;

      // Subtle mouse interaction
      particleSystem.rotation.x += mouseY * 0.0005;
      particleSystem.rotation.y += mouseX * 0.0005;

      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  })();

  // Typed.js animated headline
  try {
    const typed = new Typed('#typed', {
      strings: ['Lohith R', 'Full-Stack Developer', 'AI Enthusiast'],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1800,
      loop: true,
    });
  } catch (e) {
    // Typed.js failed to initialize — silently continue
  }

  // Rocket animation for download buttons
  const downloadBtns = document.querySelectorAll('a[href="/Lohith_R_Resume.pdf"][download]');
  downloadBtns.forEach(downloadBtn => {
    downloadBtn.addEventListener('click', function (e) {
      e.preventDefault();

      // Hold for 0.5s before starting
      setTimeout(() => {
        startRocketAnimation();
      }, 500);

      function startRocketAnimation() {
        // small helpers
        function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
        function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

        // Make downloads folder visible
        const downloadsFolder = document.getElementById('downloads-folder');
        if (downloadsFolder) {
          downloadsFolder.style.opacity = '1';
        }

        // Starting centre
        const rect = downloadBtn.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;

        // Get downloads folder position
        const folderRect = downloadsFolder.getBoundingClientRect();
        const targetX = folderRect.left + folderRect.width / 2 - startX;
        const targetY = folderRect.top + folderRect.height / 2 - startY;

        // Add CSS animation for flying to folder
        const style = document.createElement('style');
        style.textContent = `
          @keyframes fly {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(${targetX * 0.5}px, ${targetY * 0.5}px) rotate(10deg); }
            100% { transform: translate(${targetX}px, ${targetY}px) rotate(0deg); }
          }
        `;
        document.head.appendChild(style);

        // Build spinning element
        const spinner = document.createElement('div');
        spinner.className = 'site-spinner';
        spinner.setAttribute('aria-hidden', 'true');
        spinner.style.position = 'fixed';
        spinner.style.width = '32px';
        spinner.style.height = '32px';
        spinner.style.zIndex = '9999';
        spinner.style.pointerEvents = 'none';
        spinner.style.left = (startX - 16) + 'px';
        spinner.style.top = (startY - 16) + 'px';

        const icon = document.createElement('div');
        icon.className = 'site-spinner-icon';
        icon.innerHTML = '<span style="font-size: 24px;">🚀</span>';
        icon.style.width = '100%';
        icon.style.height = '100%';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.animation = 'fly 1.5s ease-in-out forwards';
        spinner.appendChild(icon);

        document.body.appendChild(spinner);

        // Simple spinner animation - spin for 1.5 seconds then download
        setTimeout(() => {
          // Start download
          fetch('/Lohith_R_Resume.pdf', { method: 'HEAD' }).then(res => {
            if (res.ok) {
              const a = document.createElement('a');
              a.href = '/Lohith_R_Resume.pdf';
              a.download = 'Lohith_R_Resume.pdf';
              document.body.appendChild(a);
              a.click();
              a.remove();

              // Show success emoji
              spinner.innerHTML = '<span style="font-size: 24px;">✅</span>';
              setTimeout(() => {
                spinner.style.transform = 'scale(0)';
                setTimeout(() => { if (spinner.parentNode) spinner.parentNode.removeChild(spinner); }, 500);
              }, 1000);
            } else {
              spinner.innerHTML = '<span style="font-size: 24px;">❌</span>';
              setTimeout(() => { if (spinner.parentNode) spinner.parentNode.removeChild(spinner); }, 1200);
            }
          }).catch(() => {
            spinner.innerHTML = '<span style="font-size: 24px;">❌</span>';
            setTimeout(() => { if (spinner.parentNode) spinner.parentNode.removeChild(spinner); }, 1200);
          });
        }, 1500);
      }
    });
  });

  // Contact Form Handling with enhanced validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formStatus = document.getElementById('formStatus');
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Clear previous status
      formStatus.style.display = 'none';
      formStatus.className = '';

      // Validation
      if (!name) {
        showFormMessage('Please enter your name.', 'error');
        return;
      }

      if (!email || !isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }

      if (!message) {
        showFormMessage('Please enter your message.', 'error');
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // If a real endpoint is configured on the form (e.g., Formspree), POST to it.
      const endpoint = this.dataset.endpoint && this.dataset.endpoint.trim();
      if (endpoint) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        }).then(res => {
          if (res.ok) return res.json().catch(() => ({}));
          throw new Error('Failed to send message');
        }).then(() => {
          showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
          contactForm.reset();
        }).catch(err => {
          console.error(err);
          showFormMessage('There was an error sending your message. Please try again later.', 'error');
        }).finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });

        return;
      }

      // Simulate form submission
      setTimeout(() => {
        showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  function showFormMessage(message, type) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.className = type === 'success' ? 'form-status success' : 'form-status error';
    formStatus.style.display = 'block';

    // show a toast if Toastify is available
    if (window.Toastify) {
      Toastify({
        text: message,
        duration: 5000,
        gravity: 'top',
        position: 'right',
        style: {
          background: type === 'success' ? 'linear-gradient(90deg,#00b09b,#96c93d)' : 'linear-gradient(90deg,#ff416c,#ff4b2b)'
        }
      }).showToast();
    }

    if (type === 'success') {
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Active Navigation Highlight
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Theme toggle (persist in localStorage)
  (function() {
    const toggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem('theme');

    function applyTheme(name) {
      document.body.classList.remove('theme-a', 'theme-b');
      if (name === 'theme-a') {
        document.body.classList.add('theme-a');
        document.body.classList.add('dark');
      } else if (name === 'theme-b') {
        document.body.classList.add('theme-b');
        document.body.classList.remove('dark');
      }
    }

    // initial - default to theme-b (light), or theme-a if prefers dark
    applyTheme(stored || (prefersDark ? 'theme-a' : 'theme-b'));

    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.body.classList.contains('theme-a') ? 'theme-a' : 'theme-b';
        const next = current === 'theme-a' ? 'theme-b' : 'theme-a';
        applyTheme(next);
        localStorage.setItem('theme', next);
      });
    }
  })();

  // Falling stars functionality for dark theme
  (function() {
    function createFallingStar(section) {
      const star = document.createElement('div');
      star.classList.add('falling-star');
      star.style.left = Math.random() * 100 + '%';
      star.style.top = '-10px';
      star.style.animationDuration = (Math.random() * 2 + 3) + 's'; // 3-5 seconds
      section.appendChild(star);

      // Remove star after animation
      setTimeout(() => {
        if (star.parentNode) {
          star.parentNode.removeChild(star);
        }
      }, 5000);
    }

    // Intersection Observer for triggering falling stars on scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && document.body.classList.contains('theme-a')) {
          // Trigger 3-5 falling stars when section enters viewport
          const numStars = Math.floor(Math.random() * 3) + 3;
          for (let i = 0; i < numStars; i++) {
            setTimeout(() => createFallingStar(entry.target), i * 200);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
      observer.observe(section);
    });

    // Hover event listeners for triggering falling stars on mouse hover
    sections.forEach(section => {
      section.addEventListener('mouseenter', () => {
        if (document.body.classList.contains('theme-a')) {
          // Trigger 2-4 falling stars on hover
          const numStars = Math.floor(Math.random() * 3) + 2;
          for (let i = 0; i < numStars; i++) {
            setTimeout(() => createFallingStar(section), i * 150);
          }
        }
      });
    });
  })();

  // Insert current year into footer copyright dynamically
  (function() {
    try {
      const yearEl = document.querySelector('footer .border-t p');
      if (yearEl) {
        const year = new Date().getFullYear();
        yearEl.innerHTML = `&copy; ${year} Lohith R. All rights reserved. Built with care using modern web technologies.`;
      }
    } catch (e) {
      // ignore
    }
  })();

  // --- Night-sky starfields for dark theme sections ---
  // Initialize per-section starfields when the section has `data-sky` attribute or `.section-sky` class.
  (function() {
    // ensure helper is available
    if (!window.createStarField) {
      // try to load script dynamically
      try {
        const s = document.createElement('script');
        s.src = '/scripts/starfield.js';
        s.onload = initStarFields;
        document.head.appendChild(s);
      } catch (e) { console.warn('Could not load starfield helper', e); }
    } else {
      initStarFields();
    }

    function initStarFields() {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const sections = document.querySelectorAll('[data-sky], .section-sky');
      sections.forEach((sec, i) => {
        // choose per-section palette or use a rotated default palette set
        const defaultPalettes = [
          ['#9AE6B4', '#8EE7FF', '#D6BCFA'],
          ['#FDE68A', '#FFD2A8', '#FFB3B3'],
          ['#FBCFE8', '#FDE68A', '#7AFCCF'],
          ['#7AFCFF', '#C7B3FF', '#FFDADA']
        ];

        const paletteAttr = sec.dataset.skyPalette;
        const palette = paletteAttr ? paletteAttr.split(',').map(s => s.trim()) : defaultPalettes[i % defaultPalettes.length];
        const max = sec.dataset.maxParticles ? parseInt(sec.dataset.maxParticles, 10) : (window.innerWidth < 640 ? 28 : 90);

        try {
          const sf = window.createStarField(sec, { palette, maxParticles: max });
          // store reference for future control if needed
          sec._starfield = sf;
        } catch (e) {
          // non-fatal
          console.warn('Starfield init failed for section', sec, e);
        }
      });
    }
  })();

  // Advanced GSAP Animations
  (function() {
    if (!window.gsap) return; // Ensure GSAP is loaded

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Register Custom Easing
    gsap.registerEase('customBounce', 'M0,0 C0.68,0 0.265,1.55 1,1');

    // Performance optimizations
    gsap.set('body', { force3D: true });

    // Hero section entrance animation with timeline
    const heroTl = gsap.timeline();
    const heroElements = document.querySelectorAll('#home h1, #home p, #home .btn');
    if (heroElements.length) {
      heroTl.set(heroElements, { opacity: 0, y: 50, transformOrigin: 'center' })
        .to(heroElements, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'customBounce',
          delay: 0.5
        });
    }

    // Scroll-Triggered Morphing SVGs (assuming SVG elements exist in HTML)
    const morphingSVGs = document.querySelectorAll('.morph-svg');
    morphingSVGs.forEach(svg => {
      gsap.to(svg, {
        morphSVG: svg.dataset.morphTo || 'M0,0 L100,0 L100,100 L0,100 Z',
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: svg,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true
        }
      });
    });

    // Advanced Timeline Sequences for Project Cards
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length) {
      const projectTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      projectTl.set(projectCards, { opacity: 0, y: 30, rotationY: -90 })
        .to(projectCards, {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: {
            amount: 1,
            from: 'start',
            ease: 'power2.out'
          },
          ease: 'back.out(1.7)'
        })
        .to(projectCards, {
          scale: 1.02,
          duration: 0.3,
          stagger: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        }, '-=0.5');
    }

    // Skills section with advanced stagger (diagonal wave)
    const skillsItems = document.querySelectorAll('#skills .grid > div');
    if (skillsItems.length) {
      gsap.set(skillsItems, { opacity: 0, scale: 0.8, transformOrigin: 'center' });
      gsap.to(skillsItems, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 1.5,
          from: 'start',
          grid: 'auto',
          axis: 'x',
          ease: 'power2.out'
        },
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Interactive Particle Systems (enhance Three.js)
    if (window.THREE) {
      const particles = document.querySelector('#home canvas');
      if (particles) {
        gsap.to(particles, {
          scale: 1.1,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }

    // Scroll-Based Parallax Effects
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    parallaxElements.forEach((el, i) => {
      gsap.to(el, {
        y: -100 * (i + 1),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Enhanced Button hover animations with timeline
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(btn => {
      const btnTl = gsap.timeline({ paused: true });
      btnTl.to(btn, { scale: 1.05, duration: 0.2, ease: 'power2.out' })
        .to(btn, { boxShadow: '0 10px 20px rgba(0,0,0,0.2)', duration: 0.2 }, 0);

      btn.addEventListener('mouseenter', () => btnTl.play());
      btn.addEventListener('mouseleave', () => btnTl.reverse());
    });

    // Contact form elements with advanced animation
    const contactElements = document.querySelectorAll('#contact input, #contact textarea, #contact button');
    if (contactElements.length) {
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      contactTl.set(contactElements, { opacity: 0, x: -30, transformOrigin: 'left' })
        .to(contactElements, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out'
        });
    }

    // Footer animation with parallax
    const footer = document.querySelector('footer');
    if (footer) {
      gsap.set(footer, { opacity: 0, y: 50 });
      gsap.to(footer, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Intersection Observer + GSAP Integration for enhanced animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-enhanced').forEach(el => observer.observe(el));
  })();

  // Skills visualization with Chart.js (lazy-load + reduced-motion aware)
  (function() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const loadChartAndInit = () => {
      try {
        const skillsGrid = skillsSection.querySelector('.grid');

        // Create canvas for skills chart with accessible fallback, legend and download control
        const chartContainer = document.createElement('div');
        chartContainer.className = 'mb-12';
        chartContainer.innerHTML = `
          <h3 class="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">Skills Proficiency</h3>
          <div class="max-w-2xl mx-auto text-center mb-3">
            <button id="downloadSkillsChart" class="btn-primary" aria-label="Download skills chart as PNG">Download Chart</button>
          </div>
          <div class="max-w-2xl mx-auto">
            <canvas id="skillsChart" width="600" height="600" role="img" aria-label="Radar chart showing skills proficiency"></canvas>
          </div>

          <!-- Accessible data fallback for screen readers -->
          <table id="skillsTable" class="sr-only" aria-hidden="false">
            <caption>Skills proficiency table</caption>
            <thead><tr><th>Skill</th><th>Proficiency (%)</th></tr></thead>
            <tbody>
              <tr><td>Java</td><td>85</td></tr>
              <tr><td>Web Development</td><td>90</td></tr>
              <tr><td>Database</td><td>80</td></tr>
              <tr><td>AI &amp; ML</td><td>88</td></tr>
              <tr><td>Tools &amp; Platforms</td><td>85</td></tr>
              <tr><td>Soft Skills</td><td>92</td></tr>
            </tbody>
          </table>

          <!-- Small interactive legend (keyboard accessible) -->
          <div class="max-w-2xl mx-auto mt-4 text-center" aria-hidden="false">
            <ul id="skillsLegend" style="list-style:none;display:flex;gap:0.5rem;justify-content:center;padding:0;margin:0">
              <li><button class="legend-btn" data-skill="Java">Java</button></li>
              <li><button class="legend-btn" data-skill="Web Development">Web Dev</button></li>
              <li><button class="legend-btn" data-skill="Database">Database</button></li>
              <li><button class="legend-btn" data-skill="AI & ML">AI & ML</button></li>
              <li><button class="legend-btn" data-skill="Tools & Platforms">Tools</button></li>
              <li><button class="legend-btn" data-skill="Soft Skills">Soft</button></li>
            </ul>
          </div>
        `;

        if (skillsGrid && skillsGrid.parentNode) skillsGrid.parentNode.insertBefore(chartContainer, skillsGrid);

        const skillsData = {
          labels: ['Java', 'Web Development', 'Database', 'AI & ML', 'Tools & Platforms', 'Soft Skills'],
          datasets: [{
            label: 'Proficiency Level',
            data: [85, 90, 80, 88, 85, 92],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)',
              'rgba(6, 182, 212, 0.8)'
            ],
            borderColor: [
              'rgba(59, 130, 246, 1)',
              'rgba(16, 185, 129, 1)',
              'rgba(245, 158, 11, 1)',
              'rgba(139, 92, 246, 1)',
              'rgba(236, 72, 153, 1)',
              'rgba(6, 182, 212, 1)'
            ],
            borderWidth: 2
          }]
        };

        const ctxEl = document.getElementById('skillsChart');
        if (!ctxEl) return;

        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const chartOpts = {
          type: 'radar',
          data: skillsData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: prefersReducedMotion ? false : undefined,
            plugins: { legend: { display: false } },
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
                ticks: { stepSize: 20, callback: function(value) { return value + '%'; } },
                grid: { color: function(context) { if (context.tick.value === 0) return 'rgba(156, 163, 175, 0.5)'; return 'rgba(156, 163, 175, 0.2)'; } },
                angleLines: { color: 'rgba(156, 163, 175, 0.2)' },
                pointLabels: { color: function() { return document.body.classList.contains('theme-a') ? '#ffffff' : '#374151'; }, font: { size: 12, weight: 'bold' } }
              }
            }
          }
        };

        const skillsChart = new Chart(ctxEl.getContext('2d'), chartOpts);

        const skillMap = { Java: 'fullstack', 'Web Development': 'web', Database: 'web', 'AI & ML': 'ai', 'Tools & Platforms': 'fullstack', 'Soft Skills': 'all' };

        ctxEl.addEventListener('click', function (evt) {
          try {
            const points = skillsChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
            if (points && points.length) {
              const idx = points[0].index;
              const label = skillsChart.data.labels[idx];
              const target = skillMap[label] || 'all';
              applyProjectFilter(target);
            }
          } catch (e) { console.warn('Skills chart click handler error', e); }
        });

        const legendBtns = chartContainer.querySelectorAll('.legend-btn');
        legendBtns.forEach(btn => btn.addEventListener('click', () => {
          const label = btn.dataset.skill;
          const target = skillMap[label] || 'all';
          applyProjectFilter(target);
        }));

        const dl = chartContainer.querySelector('#downloadSkillsChart');
        if (dl) dl.addEventListener('click', () => {
          try { const url = skillsChart.toBase64Image(); const a = document.createElement('a'); a.href = url; a.download = 'skills-chart.png'; document.body.appendChild(a); a.click(); a.remove(); } catch (e) { console.warn('Download failed', e); }
        });

        function applyProjectFilter(filter) {
          if (filter === 'all') {
            const allBtn = Array.from(document.querySelectorAll('.filter-btn')).find(b => b.dataset.filter === 'all');
            if (allBtn) { allBtn.click(); return; }
          }
          const btn = Array.from(document.querySelectorAll('.filter-btn')).find(b => b.dataset.filter === filter);
          if (btn) { btn.click(); return; }

          document.querySelectorAll('.project-card').forEach(card => {
            if (card.dataset.category && card.dataset.category.includes(filter)) { card.style.display = 'block'; card.setAttribute('aria-hidden','false'); setTimeout(() => card.style.opacity = '1', 10); }
            else { card.style.opacity = '0'; setTimeout(() => card.style.display = 'none', 300); card.setAttribute('aria-hidden','true'); }
          });
        }

      } catch (e) { console.warn('Skills chart init failed', e); }
    };

    // Load Chart.js only if missing
    if (window.Chart) loadChartAndInit();
    else {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      s.async = true;
      s.onload = () => { try { loadChartAndInit(); } catch (e) { console.warn('Chart load callback failed', e); } };
      s.onerror = () => console.warn('Failed to load Chart.js from CDN');
      document.head.appendChild(s);
    }
  })();
});
