/* ============================================================
   HIZLI ÇİFTLİK — script.js
   ============================================================ */

// ── Navbar scroll effect ─────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile menu toggle ────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  // Animate hamburger → X
  const spans = menuToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Scroll-reveal animation ───────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ── App screen tabs (in "Uygulama" section) ───────────────────
const screenTabs    = document.querySelectorAll('.screen-tab');
const screenDetails = document.querySelectorAll('.screen-detail');
const appScreens    = document.querySelectorAll('.app-screen');

screenTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Update tabs
    screenTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Update description panels
    screenDetails.forEach(d => d.classList.remove('active'));
    const activeDetail = document.querySelector(`.screen-detail[data-content="${target}"]`);
    if (activeDetail) activeDetail.classList.add('active');

    // Update phone screens
    appScreens.forEach(s => s.classList.remove('active'));
    const activeScreen = document.querySelector(`.app-screen[data-screen="${target}"]`);
    if (activeScreen) activeScreen.classList.add('active');
  });
});

// ── Auto-cycle app screen tabs every 4 seconds when in viewport ─
let tabIndex   = 0;
let tabTimer   = null;
const tabKeys  = ['dashboard', 'sira', 'odeme', 'sms'];

function cycleTab() {
  tabIndex = (tabIndex + 1) % tabKeys.length;
  const nextTab = document.querySelector(`.screen-tab[data-tab="${tabKeys[tabIndex]}"]`);
  if (nextTab) nextTab.click();
}

const screensSection = document.getElementById('ekranlar');
const cycleObserver  = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      tabTimer = setInterval(cycleTab, 4000);
    } else {
      clearInterval(tabTimer);
    }
  },
  { threshold: 0.3 }
);
if (screensSection) cycleObserver.observe(screensSection);

// Pause auto-cycle when user clicks a tab manually
screenTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    clearInterval(tabTimer);
    tabIndex = tabKeys.indexOf(tab.dataset.tab);
    // Restart after 6s of inactivity
    clearTimeout(window._tabRestartTimer);
    window._tabRestartTimer = setTimeout(() => {
      tabTimer = setInterval(cycleTab, 4000);
    }, 6000);
  });
});

// ── Contact form ──────────────────────────────────────────────
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name  = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !phone) {
      // Shake invalid fields
      [document.getElementById('name'), document.getElementById('phone')].forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#f87171';
          input.animate(
            [{ transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
            { duration: 300, iterations: 2 }
          );
          setTimeout(() => { input.style.borderColor = ''; }, 1500);
        }
      });
      return;
    }

    // Simulate form send (replace with real API endpoint)
    const btn = document.getElementById('submitFormBtn');
    btn.disabled = true;
    btn.textContent = 'Gönderiliyor...';

    setTimeout(() => {
      formSuccess.classList.add('visible');
      contactForm.reset();
      btn.disabled = false;
      btn.innerHTML = 'Gönder — Demo İste';
    }, 1200);
  });
}

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Counter animation for hero stats ─────────────────────────
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const text = counter.textContent.trim();
    const numMatch = text.match(/[\d,]+/);
    if (!numMatch) return;

    const raw    = parseInt(numMatch[0].replace(/,/g, ''), 10);
    const prefix = text.replace(numMatch[0], '').replace(/\d/g, '').trim().split(/\d/)[0] || '';
    const suffix = text.replace(prefix, '').replace(/[\d,]+/, '').trim();

    let start     = 0;
    const duration = 1800;
    const step      = Math.ceil(raw / (duration / 16));
    const timer     = setInterval(() => {
      start += step;
      if (start >= raw) {
        start = raw;
        clearInterval(timer);
      }
      counter.textContent = prefix + start.toLocaleString('tr-TR') + suffix;
    }, 16);
  });
}

// Trigger counters when hero stats are visible
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const counterObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    },
    { threshold: 0.5 }
  );
  counterObserver.observe(heroStats);
}

// ── Parallax on hero bg shapes (subtle) ──────────────────────
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const s1 = document.querySelector('.shape-1');
  const s2 = document.querySelector('.shape-2');
  if (s1) s1.style.transform = `translateY(${y * 0.12}px)`;
  if (s2) s2.style.transform = `translateY(${y * -0.08}px)`;
}, { passive: true });
