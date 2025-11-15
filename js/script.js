// ===== Mobile Menu Toggle =====
const toggle = document.querySelector('.toggle-menu');
const links = document.querySelector('.links');
toggle.addEventListener('click', () => links.classList.toggle('open'));

// ===== Scroll Top =====
const scrollTop = document.getElementById('scroll-top');
const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.progress-bar');

window.addEventListener('scroll', () => {
  // Scroll Top
  scrollTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  
  // Skills Animation
  const sectionPos = skillsSection.getBoundingClientRect().top;
  if (sectionPos < window.innerHeight / 1.3) {
    skillBars.forEach(bar => bar.style.width = bar.dataset.value);
  }
});

scrollTop.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Preloader =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = 0;
  setTimeout(() => preloader.style.display = 'none', 500);
});

// ===== Portfolio Filter =====
const filterBtns = document.querySelectorAll('.portfolio-filters li');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(el => el.classList.remove('filter-active'));
    btn.classList.add('filter-active');

    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      item.style.display = (filter === '*' || item.classList.contains(filter)) ? 'block' : 'none';
    });
  });
});

// ===== Lightbox =====
document.querySelectorAll('.preview-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; top:0; left:0; width:100%; height:100%;
      background: rgba(0,0,0,0.9); display:flex; align-items:center;
      justify-content:center; z-index:9999;
    `;
    const img = document.createElement('img');
    img.src = link.href;
    img.style.cssText = 'max-width:90%; max-height:90%; border-radius:10px;';
    overlay.appendChild(img);
    
    // Close with click or ESC
    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', e => { if(e.key === 'Escape') overlay.remove(); }, {once:true});
    document.body.appendChild(overlay);
  });
});

// ===== Contact Form Validation =====
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.className = "error";
  } else if (!emailRegex.test(email)) {
    formMessage.textContent = "Please enter a valid email.";
    formMessage.className = "error";
  } else {
    formMessage.textContent = "Your message has been sent successfully!";
    formMessage.className = "success";
    form.reset();
  }
});

// ===== Settings Box =====
const settingsBtn = document.getElementById("settings-btn");
const settingsBox = document.getElementById("settings-box");
const darkToggle = document.getElementById("dark-mode-toggle");
const fontFamily = document.getElementById("font-family");
const resetBtn = document.getElementById("reset-btn");
const colors = document.querySelectorAll(".colors span");

settingsBtn.onclick = () => settingsBox.classList.toggle("active");

// Load settings
window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    darkToggle.checked = true;
  }
  const color = localStorage.getItem('themeColor');
  if(color) document.documentElement.style.setProperty('--color-primary', color);

  const font = localStorage.getItem('fontFamily');
  if(font) { document.body.style.fontFamily = font; fontFamily.value = font; }
});

// Dark Mode
darkToggle.onchange = () => {
  document.body.classList.toggle('dark', darkToggle.checked);
  localStorage.setItem('darkMode', darkToggle.checked);
};

// Theme Color
colors.forEach(c => c.onclick = () => {
  const color = c.dataset.color;
  document.documentElement.style.setProperty('--color-primary', color);
  localStorage.setItem('themeColor', color);
});

// Font Family
fontFamily.onchange = () => {
  document.body.style.fontFamily = fontFamily.value;
  localStorage.setItem('fontFamily', fontFamily.value);
};

// Reset
resetBtn.onclick = () => { localStorage.clear(); location.reload(); };
