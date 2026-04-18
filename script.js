/* ===========================
   Navbar: scroll effect + mobile
=========================== */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  triggerAOS();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// close menu on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ===========================
   Active Nav Link on scroll
=========================== */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ===========================
   Typed text animation
=========================== */
const typedEl = document.getElementById('typed');
const phrases = ['學生', '繪畫愛好者', '創作者', '藝術探索者'];
let phraseIdx = 0;
let charIdx   = 0;
let isDeleting = false;
let typingTimer;

function type() {
  const current = phrases[phraseIdx];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  let speed = isDeleting ? 80 : 140;

  if (!isDeleting && charIdx === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx  = (phraseIdx + 1) % phrases.length;
    speed = 400;
  }

  typingTimer = setTimeout(type, speed);
}

// start typing after hero animation
setTimeout(type, 1400);

/* ===========================
   AOS - simple scroll reveal
=========================== */
function triggerAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('aos-animate');
    }
  });
}

// trigger on load too
window.addEventListener('load', () => {
  triggerAOS();
  updateActiveNav();
});

/* ===========================
   Contact Form
=========================== */
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 發送中...';

    // simulate send
    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.classList.add('show');
    }, 1200);
  });
}

/* ===========================
   Smooth scroll for all anchors
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
