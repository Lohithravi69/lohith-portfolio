// Lightweight StarField helper
// Usage: window.createStarField(sectionElement, options)
// Options: palette (array of colors), maxParticles, fps
(function () {
  function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  function hexToRgba(hex, a) {
    if (!hex) return `rgba(255,255,255,${a})`;
    const h = hex.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  window.createStarField = function (sectionEl, opts = {}) {
    // respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return { start: () => {}, stop: () => {}, destroy: () => {} };
    }

    const palette = opts.palette || ['#9AE6B4', '#FDE68A', '#FBCFE8', '#7AFCFF'];
    const maxParticles = opts.maxParticles || (isMobile() ? 30 : 90);
    const fps = opts.fps || (isMobile() ? 30 : 60);
    const canvas = document.createElement('canvas');
    canvas.className = 'section-starfield';
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2';
    canvas.style.mixBlendMode = 'screen';
    // small safety backdrop blend to keep contrast
    sectionEl.style.position = sectionEl.style.position || 'relative';
    sectionEl.appendChild(canvas);

    const ctx = canvas.getContext('2d', { alpha: true });
    let DPR = Math.max(1, window.devicePixelRatio || 1);
    let W = 0, H = 0;
    let raf = null, running = false;

    function resize() {
      DPR = Math.max(1, window.devicePixelRatio || 1);
      const w = sectionEl.clientWidth;
      const h = sectionEl.clientHeight;
      canvas.width = Math.max(1, Math.round(w * DPR));
      canvas.height = Math.max(1, Math.round(h * DPR));
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      W = w; H = h;
    }

    let particles = [];

    function spawnStar() {
      if (particles.length > maxParticles) return;
      const x = Math.random() * W;
      const y = -8;
      const color = palette[Math.floor(Math.random() * palette.length)];
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 2 + Math.random() * 3.2,
        life: 1.0,
        color,
        trail: []
      });
    }

    let last = performance.now();

    function step(now) {
      const dt = Math.min(1 / 30, (now - last) / 1000);
      last = now;

      // occasional spawn (tuned probability)
      if (Math.random() < 0.03 && particles.length < maxParticles) spawnStar();

      ctx.clearRect(0, 0, W, H);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.vy += 0.02 * 60 * dt; // gravity-like acceleration

        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > 12) p.trail.pop();

        // draw trail
        for (let t = 0; t < p.trail.length; t++) {
          const alpha = (1 - t / p.trail.length) * 0.9;
          ctx.fillStyle = hexToRgba(p.color, alpha * 0.9);
          const s = (1 - t / p.trail.length) * 4;
          ctx.fillRect(p.trail[t].x - s / 2, p.trail[t].y - s / 2, s, s);
        }

        // sparkle
        if (Math.random() < 0.12) {
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
        }

        if (p.y > H + 20) particles.splice(i, 1);
      }

      if (running) raf = window.setTimeout(() => requestAnimationFrame(step), 1000 / fps);
    }

    function start() {
      if (running) return;
      running = true;
      last = performance.now();
      requestAnimationFrame(step);
    }

    function stop() {
      running = false;
      if (raf) { window.clearTimeout(raf); raf = null; }
      // clear canvas
      ctx.clearRect(0, 0, W, H);
      particles.length = 0;
    }

    // IntersectionObserver: start when visible, stop when not
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) start(); else stop();
      });
    }, { threshold: 0.25 });
    io.observe(sectionEl);

    // Hover support: start on mouseenter, stop after short delay on mouseleave
    let hoverTimeout = null;
    const onMouseEnter = () => { start(); if (hoverTimeout) { clearTimeout(hoverTimeout); hoverTimeout = null; } };
    const onMouseLeave = () => { hoverTimeout = setTimeout(() => { stop(); hoverTimeout = null; }, 800); };
    sectionEl.addEventListener('mouseenter', onMouseEnter);
    sectionEl.addEventListener('mouseleave', onMouseLeave);

    // resize observer
    const ro = new ResizeObserver(resize);
    ro.observe(sectionEl);
    resize();

    // add burst functionality to create an immediate set of particles
    function burst(countBurst = 18) {
      for (let i = 0; i < countBurst; i++) {
        if (particles.length > maxParticles) break;
        const x = (sectionEl.clientWidth * 0.5) + (Math.random() - 0.5) * 80;
        const y = (sectionEl.clientHeight * 0.25) + (Math.random() - 0.5) * 40;
        const color = palette[Math.floor(Math.random() * palette.length)];
        const p = {
          x, y,
          vx: (Math.random() - 0.5) * 4,
          vy: 2 + Math.random() * 6,
          life: 1.0 + Math.random() * 0.8,
          color,
          trail: []
        };
        particles.push(p);
      }
    }

    // expose API
    return {
      start,
      stop,
      burst,
      destroy() {
        stop();
        io.disconnect();
        ro.disconnect();
        sectionEl.removeEventListener('mouseenter', onMouseEnter);
        sectionEl.removeEventListener('mouseleave', onMouseLeave);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };
  };
})();
