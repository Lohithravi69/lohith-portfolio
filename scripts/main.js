// Main site JS - moved from index.html
document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  window.toggleMenu = function() {
    document.getElementById('navMenu').classList.toggle('active');
  };

  window.closeMenu = function() {
    document.getElementById('navMenu').classList.remove('active');
  };

  // Smooth Scroll for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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
