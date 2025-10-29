// Main site JS - moved from index.html
document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  window.toggleMenu = function() {
    document.getElementById('navMenu').classList.toggle('active');
  };

  window.closeMenu = function() {
    document.getElementById('navMenu').classList.remove('active');
  };

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
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

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formStatus = document.getElementById('formStatus');
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Simulate form submission
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Thank you for your message! I will get back to you soon.';

      // Reset form
      this.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    });
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
      if (name === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }

    // initial
    applyTheme(stored || (prefersDark ? 'dark' : 'light'));

    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
      });
    }
  })();
});
