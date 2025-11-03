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

  // Rocket animation for download button
  const downloadBtn = document.querySelector('a[href="/Lohith_R_Resume.pdf"][download]');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
      e.preventDefault();

      // small helpers
      function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
      function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

      // Build rocket element and flame
      const rocket = document.createElement('div');
      rocket.className = 'site-rocket';
      rocket.setAttribute('aria-hidden', 'true');
      rocket.style.position = 'fixed';
      rocket.style.width = '28px';
      rocket.style.height = '28px';
      rocket.style.zIndex = '9999';
      rocket.style.pointerEvents = 'none';

      const icon = document.createElement('div');
      icon.className = 'site-rocket-icon';
      // Inline SVG rocket (avoids external FontAwesome dependency)
      icon.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M2 21s4-1 6-3 6-6 6-6 2 4 1 6-3 6-3 6-3-2-6-3S2 21 2 21z" fill="#10B981" opacity="0.12"/>
          <path d="M14.5 9.5c.5-1 .9-2.3 1.1-3.5.1-.7-.3-1.4-1-1.5-1.2-.2-2.5.1-3.5.6l-.9.6-3 3 3 .9.6-.9c.6-1 1-2.3 1.2-3.5.1-.7.8-1.1 1.5-1 1.2.1 2.5.6 3.5 1.2.6.4.7 1.2.3 1.8-.4.6-1.2.7-1.8.3-.6-.3-1.2-.6-1.7-1l-.4.7c-.6 1-1.5 2-2.6 3.1l2.8 2.8c1.1-1.1 2.1-2 3.1-2.6l.7-.4c-.4-.5-.7-1.1-1-1.7-.4-.6-.3-1.4.3-1.8.6-.4 1.4-.3 1.8.3.6.9 1 2.3 1.2 3.5.1.7-.3 1.4-1 1.5-1.2.2-2.5-.1-3.5-.6l-.9-.6-3 3 .9 3c.2 1.1.9 2.1 1.9 2.6l.6.3c.4.2 1 .1 1.3-.2l4-4c.3-.3.4-.9.2-1.3l-.3-.6c-.6-1-1.5-1.7-2.6-1.9l-3-.9 3-3 .6-.9c.5-.5.7-1.1.3-1.8-.4-.6-1.2-.7-1.8-.3-.6.3-1.2.6-1.7 1l-.4.7z" fill="#10B981"/>
        </svg>`;
      icon.style.width = '100%';
      icon.style.height = '100%';
      icon.style.display = 'flex';
      icon.style.alignItems = 'center';
      icon.style.justifyContent = 'center';
      rocket.appendChild(icon);

      const flame = document.createElement('div');
      flame.className = 'site-rocket-flame';
      flame.innerHTML = '<span aria-hidden="true">🔥</span>';
      flame.style.position = 'absolute';
      flame.style.left = '50%';
      flame.style.transform = 'translateX(-50%)';
      flame.style.bottom = '-16px';
      rocket.appendChild(flame);

      // Starting centre
      const rect = downloadBtn.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;
      rocket.style.left = (startX - 14) + 'px';
      rocket.style.top = (startY - 14) + 'px';
      document.body.appendChild(rocket);

      // Determine target: prefer #projects or #education top-center, else fallback to bottom-right (downloads area) or top-center
      let targetX, targetY;
      const preferSelectors = [
        '#projects .project-card',
        '#projects h2',
        '#projects',
        '#education .project-card',
        '#education h2',
        '#education'
      ];

      let targetEl = null;
      for (const sel of preferSelectors) {
        const el = document.querySelector(sel);
        if (el) { targetEl = el; break; }
      }

      if (window.innerWidth < 640) {
        // Mobile: small screen — keep rocket short and go to top-right so it stays visible
        targetX = window.innerWidth - 60;
        targetY = 28;
      } else if (targetEl) {
        // Desktop: go to the top-center of the projects/education block (feel like landing on the section header)
        const tr = targetEl.getBoundingClientRect();
        targetX = tr.left + tr.width / 2;
        // Aim slightly below the top edge so the rocket lands visually on the section
        targetY = tr.top + Math.max(20, Math.min(80, tr.height * 0.08));
      } else {
        // Last fallback: bottom-right (downloads area) so it's still intuitive
        targetX = window.innerWidth - 80;
        targetY = window.innerHeight - 80;
      }

      // Control point - lift is larger on wide screens; help the arc clear content between start and target
      const midX = (startX + targetX) / 2;
      const baseLift = clamp(Math.abs(startY - targetY) + 120, 120, 600);
      const lift = Math.max(baseLift, window.innerWidth / 8);
      const ctrlX = midX;
      const ctrlY = Math.min(startY, targetY) - lift;

      // animation using single loop
      const duration = 1000; // ms
      let started = null;

      function qbez(p0, p1, p2, t) {
        const u = 1 - t;
        return u * u * p0 + 2 * u * t * p1 + t * t * p2;
      }

      function step(ts) {
        if (!started) started = ts;
        const elapsed = ts - started;
        const raw = clamp(elapsed / duration, 0, 1);
        const t = easeInOutCubic(raw);

        const x = qbez(startX, ctrlX, targetX, t);
        const y = qbez(startY, ctrlY, targetY, t);

        // Position rocket
        rocket.style.left = (x - 14) + 'px';
        rocket.style.top = (y - 14) + 'px';

        // derivative for angle
        const dx = 2 * (1 - t) * (ctrlX - startX) + 2 * t * (targetX - ctrlX);
        const dy = 2 * (1 - t) * (ctrlY - startY) + 2 * t * (targetY - ctrlY);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        rocket.style.transform = `rotate(${angle}deg)`;

  // Rotate rocket to follow the tangent. Use transform-origin so rotation happens around the center.
  rocket.style.transformOrigin = '14px 14px';
  rocket.style.transform = `rotate(${angle}deg)`;

  // Keep flame positioned as a child element under the rocket; rotate the flame so it matches rocket orientation.
  flame.style.left = '50%';
  flame.style.bottom = '-14px';
  flame.style.transform = `translateX(-50%) rotate(${angle}deg)`;

        if (raw < 1) {
          requestAnimationFrame(step);
        } else {
          // arrival - replace icon with inline explosion SVG
          rocket.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="#FFB86B" opacity="0.95" />
              <g fill="#fff">
                <path d="M12 7l1.2 2.9L16 11l-2.5 1.5L13.5 15 12 13.3 10.5 15l-.1-2.5L8 11l2.8-.9L12 7z" />
              </g>
            </svg>`;
          rocket.style.transform = 'scale(1.4)';

          // spawn nicer particles (small circles)
          for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'site-rocket-particle';
            p.style.left = (x) + 'px';
            p.style.top = (y) + 'px';
            document.body.appendChild(p);

            const randX = (Math.random() - 0.5) * 300;
            const randY = -Math.random() * 600 - 60;
            setTimeout(() => {
              p.style.transform = `translate(${randX}px, ${randY}px) scale(0.6)`;
              p.style.opacity = '0';
            }, Math.random() * 200);

            setTimeout(() => { if (p.parentNode) p.parentNode.removeChild(p); }, 2000 + Math.random() * 600);
          }

          // attempt download, then cleanup
          setTimeout(() => {
            fetch('/Lohith_R_Resume.pdf', { method: 'HEAD' }).then(res => {
              if (res.ok) {
                const a = document.createElement('a');
                a.href = '/Lohith_R_Resume.pdf';
                a.download = 'Lohith_R_Resume.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
              } else {
                rocket.textContent = '😢';
              }
            }).catch(() => { rocket.textContent = '😢'; });

            setTimeout(() => { if (rocket.parentNode) rocket.parentNode.removeChild(rocket); }, 1200);
          }, 240);
        }
      }

      requestAnimationFrame(step);
    });
  }

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
      } else if (name === 'theme-b') {
        document.body.classList.add('theme-b');
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

  // Skills visualization with Chart.js
  if (window.Chart) {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const skillsGrid = skillsSection.querySelector('.grid');

      // Create canvas for skills chart
      const chartContainer = document.createElement('div');
      chartContainer.className = 'mb-12';
      chartContainer.innerHTML = `
        <h3 class="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Skills Proficiency</h3>
        <div class="max-w-2xl mx-auto">
          <canvas id="skillsChart" width="400" height="400"></canvas>
        </div>
      `;

      // Insert chart before the skills grid
      if (skillsGrid && skillsGrid.parentNode) {
        skillsGrid.parentNode.insertBefore(chartContainer, skillsGrid);
      }

      // Skills data
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

      const ctx = document.getElementById('skillsChart');
      if (ctx) {
        new Chart(ctx.getContext('2d'), {
          type: 'radar',
          data: skillsData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  stepSize: 20,
                  callback: function(value) {
                    return value + '%';
                  }
                },
                grid: {
                  color: function(context) {
                    if (context.tick.value === 0) return 'rgba(156, 163, 175, 0.5)';
                    return 'rgba(156, 163, 175, 0.2)';
                  }
                },
                angleLines: {
                  color: 'rgba(156, 163, 175, 0.2)'
                },
                pointLabels: {
                  color: function() {
                    return document.body.classList.contains('theme-a') ? '#ffffff' : '#374151';
                  },
                  font: {
                    size: 12,
                    weight: 'bold'
                  }
                }
              }
            }
          }
        });
      }
    }
  }
});
