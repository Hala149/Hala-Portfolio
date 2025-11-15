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
// ===== عناصر الإعدادات =====
const settingsBtn = document.getElementById("settings-btn");
const settingsBox = document.getElementById("settings-box");
const darkToggle = document.getElementById("dark-mode-toggle");
const colorSpans = document.querySelectorAll(".colors span");
const fontSelect = document.getElementById("font-family");
const resetBtn = document.getElementById("reset-btn");

// ===== فتح/إغلاق صندوق الإعدادات =====
settingsBtn.addEventListener("click", () => {
    settingsBox.classList.toggle("active");
});

// ===== دالة لتطبيق الألوان =====
function applyColors(primary, secondary, bg, text, btn, btnText, overlay, headerBg) {
    const root = document.documentElement;
    if(primary) root.style.setProperty('--color-primary', primary);
    if(secondary) root.style.setProperty('--color-secondary', secondary);
    if(bg) root.style.setProperty('--color-bg', bg);
    if(text) root.style.setProperty('--color-text', text);
    if(btn) root.style.setProperty('--color-btn', btn);
    if(btnText) root.style.setProperty('--color-btn-text', btnText);
    if(overlay) root.style.setProperty('--color-overlay', overlay);
    if(headerBg) root.style.setProperty('--color-header-bg', headerBg);
}

// ===== Dark Mode Toggle =====
darkToggle.addEventListener("change", () => {
    if(darkToggle.checked){
        document.body.classList.add("dark");
        applyColors(
            "#7FBCD2",        // primary
            "#D49FA1",        // secondary
            "#1c1c1c",        // bg
            "#f2f2f2",        // text
            "#333333",        // btn
            "#ffffff",        // btnText
            "rgba(0,0,0,0.7)",// overlay
            "#0a2a40"         // header-bg
        );
    } else {
        resetColors();
    }
});

// ===== Theme Color Selection =====
colorSpans.forEach(span => {
    span.addEventListener("click", () => {
        const primaryColor = span.dataset.color;
        // Overlay يعتمد على اللون الأساسي
        applyColors(
            primaryColor,                    // primary
            undefined,                       // secondary
            undefined,                       // bg
            undefined,                       // text
            undefined,                       // btn
            undefined,                       // btnText
            `rgba(${hexToRgb(primaryColor)},0.7)`, // overlay
            primaryColor                     // header-bg
        );
    });
});
// ===== تحويل Hex إلى RGB =====
function hexToRgb(hex) {
    hex = hex.replace('#','');
    let r = parseInt(hex.substring(0,2),16);
    let g = parseInt(hex.substring(2,4),16);
    let b = parseInt(hex.substring(4,6),16);
    return `${r},${g},${b}`;
}
// ===== Font Family =====
fontSelect.addEventListener("change", () => {
    document.body.style.fontFamily = fontSelect.value;
});

// ===== Reset Colors =====
resetBtn.addEventListener("click", () => {
    darkToggle.checked = false;
    resetColors();
    fontSelect.value = "Arial, sans-serif";
    document.body.style.fontFamily = fontSelect.value;
});

function resetColors() {
    applyColors(
        "rgb(7 40 86)",     // primary
        "rgb(254 178 178)", // secondary
        "#F9F9F9",          // bg
        "#333333",          // text
        "#DDD8BC",          // btn
        "rgb(14 122 173)",  // btnText
        "rgba(0,0,0,0.5)",  // overlay
        "rgb(7 40 86)"      // header-bg
    );
}


// ===== Get all bullets =====
const bullets = document.querySelectorAll(".nav-bullets .bullet");

// ===== Loop through each bullet =====
bullets.forEach(bullet => {
  bullet.addEventListener("click", () => {
    const sectionSelector = bullet.dataset.section; // ".landing", ".about", إلخ
    const section = document.querySelector(sectionSelector);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== Optional: highlight bullet on scroll =====
const sections = document.querySelectorAll("section"); // تأكدي الأقسام كلها tags section أو عدلي selector

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + window.innerHeight / 2;

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      bullets.forEach(b => b.classList.remove("active"));
      if (bullets[index]) bullets[index].classList.add("active");
    }
  });
});
