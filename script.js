/* ===================================================
   Pizza Rakat Timur — Premium Landing Page Script
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== Loader ===== */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 800);
  });

  /* ===== Custom Cursor ===== */
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Smooth follower
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects
    document.querySelectorAll('a, button, .menu-card, .service-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        follower.style.transform = 'translate(-50%, -50%) scale(1.4)';
        follower.style.opacity = '0.3';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.opacity = '0.5';
      });
    });
  }

  /* ===== Sticky Header ===== */
  const header = document.getElementById('header');
  function handleScroll() {
    header.classList.toggle('scrolled', window.scrollY > 60);
    // Back to top visibility
    backTop.classList.toggle('visible', window.scrollY > 400);
    // Active nav highlight
    updateActiveNav();
  }
  window.addEventListener('scroll', handleScroll);

  /* ===== Mobile Menu ===== */
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.getElementById('navbar');
  let menuOpen = false;

  menuIcon.addEventListener('click', () => {
    menuOpen = !menuOpen;
    navbar.classList.toggle('open', menuOpen);
    menuIcon.className = menuOpen ? 'bx bx-x' : 'bx bx-menu';
  });

  // Close on nav link click
  navbar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      navbar.classList.remove('open');
      menuIcon.className = 'bx bx-menu';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (menuOpen && !navbar.contains(e.target) && e.target !== menuIcon) {
      menuOpen = false;
      navbar.classList.remove('open');
      menuIcon.className = 'bx bx-menu';
    }
  });

  /* ===== Active Nav Link on Scroll ===== */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
      }
    });
  }

  /* ===== Dark Mode ===== */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('i');
  const savedTheme = localStorage.getItem('pizzaTheme') || 'light';

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (themeIcon) themeIcon.className = 'bx bx-sun';
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    themeIcon.className = isDark ? 'bx bx-sun' : 'bx bx-moon';
    localStorage.setItem('pizzaTheme', isDark ? 'dark' : 'light');
  });

  /* ===== Back to Top ===== */
  const backTop = document.getElementById('backTop');
  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== Scroll Reveal (via IntersectionObserver) ===== */
  const revealElements = document.querySelectorAll(
    '.home-content, .home-visual, .about-img-wrap, .about-text, .menu-card, .service-card, .cta-content, .footer-brand, .footer-links, .footer-contact'
  );

  revealElements.forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    // Stagger delay based on siblings
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  /* ===== Add-to-cart Button Feedback ===== */
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const original = this.innerHTML;
      this.innerHTML = '<i class="bx bx-check"></i>';
      this.style.background = '#22c55e';
      setTimeout(() => {
        this.innerHTML = original;
        this.style.background = '';
      }, 1500);
    });
  });

  /* ===== Smooth Parallax on Hero ===== */
  const heroImg = document.querySelector('.home-img-wrap');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrolled * 0.06}px)`;
      }
    });
  }

  /* ===== Stats Counter Animation ===== */
  const stats = document.querySelectorAll('.stat strong');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const number = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[0-9.]/g, '');
        if (isNaN(number)) return;

        let start = 0;
        const duration = 1800;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = (Math.floor(ease * number * 10) / 10) + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = text;
        };
        requestAnimationFrame(step);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => statsObserver.observe(stat));

  /* ===== Init scroll state ===== */
  handleScroll();

});
