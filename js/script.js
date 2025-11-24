// ===== Mobile Menu Toggle =====
const toggle = document.querySelector('.toggle-menu');
const links = document.querySelector('.links');

toggle.addEventListener('click', () => {
    links.classList.toggle('open');
});

links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
});


// ===== End Menu Toggle =====

// ===== Start Random Background =====
// Array
const landingBackgrounds = [
    "url('images/hero-bg1.jpg')",
    "url('images/hero-bg2.jpg')",
    "url('images/hero-bg3.jpg')",
    "url('images/hero-bg4.jpg')"
];

const landing = document.getElementById("landing");
const landingBullets = document.querySelectorAll("#landing .bullets li");

let current = 0;

function updateBackground(index) {
    landing.style.backgroundImage = landingBackgrounds[index];

    landingBullets.forEach((bullet, i) => {
        bullet.classList.remove("active");
        if(i === index) bullet.classList.add("active");
    });
}

landingBullets.forEach((bullet, i) => {
    bullet.addEventListener("click", () => {
        current = i;
        updateBackground(current);
        resetInterval(); 
    });
});

updateBackground(current);

let interval = setInterval(() => {
    current++;
    if(current >= landingBackgrounds.length) current = 0;
    updateBackground(current);
}, 8000);


function resetInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
        current++;
        if(current >= landingBackgrounds.length) current = 0;
        updateBackground(current);
    }, 5000);
}

// ===== End Random Background =====

// ===== Scroll Top =====
const scrollTop = document.getElementById('scroll-top');
const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.progress-bar');
window.addEventListener('scroll', () => {
  // Scroll Top
  scrollTop.style.display = window.scrollY > 300 ? 'block' : 'none';
// ===== End Scroll Top =====



  // ====== Start Skills Animation =====
  const sectionPos = skillsSection.getBoundingClientRect().top;
  if (sectionPos < window.innerHeight / 1.3) {
    skillBars.forEach(bar => bar.style.width = bar.dataset.value);
  }
});
scrollTop.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
  // ====== End Skills Animation =====

// ===== Start Preloader =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 300);
});

// ===== End Preloader =====

// ===== Start Portfolio Filter =====
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
// ===== Start Portfolio Filter =====

document.addEventListener("DOMContentLoaded", function() {

  // ===== Settings Box =====
  const settingsBtn = document.getElementById("settings-btn");
const settingsBox = document.getElementById("settings-box");
const darkToggle = document.getElementById("dark-mode-toggle");
const colorSpans = document.querySelectorAll(".colors span");
const fontSelect = document.getElementById("font-family");
const resetBtn = document.getElementById("reset-btn");

settingsBtn.addEventListener("click", () => settingsBox.classList.toggle("active"));

function applyColors(primary, secondary, bg, heading, text, btn, btnText, overlay, headerBg, bgSide) {
    const root = document.documentElement;
    if(primary) root.style.setProperty('--color-primary', primary);
    if(secondary) root.style.setProperty('--color-secondary', secondary);
    if(bg) root.style.setProperty('--color-bg', bg);
    if(heading) root.style.setProperty('--heading-color', heading);
    if(text) root.style.setProperty('--color-text', text);
    if(btn) root.style.setProperty('--color-btn', btn);
    if(btnText) root.style.setProperty('--color-btn-text', btnText);
    if(overlay) root.style.setProperty('--color-overlay', overlay);
    if(headerBg) root.style.setProperty('--color-header-bg', headerBg);
    if(bgSide) root.style.setProperty('--color-bg-side', bgSide);
}

const defaultPalette = {
    primary: "#1B3C73",
    secondary: "#A8C6E8",
    bg: "#f3efef",
    heading: "#ffd580",
    text: "#1E1E1E",
    btn: "#E2EAF4",
    btnText: "#1B3C73",
    overlay: "rgba(27, 59, 115, 0.403)",
    headerBg: "#1B3C73",
    bgSide: "rgba(27, 59, 115, 0.782)"
};

const secondaryPalette = {
    primary: "#156757",            
    secondary: "#A8E6CF",         
    bg: "#F0FFF4",                 
  heading: "#FFD580",           
  text: "#1E1E1E",
  btn: "#CFF5E1", 
    btnText: "#156757",              
    overlay: "rgba(21,103,87,0.4)",
    headerBg: "#156757",            
    bgSide: "rgba(21,103,87,0.7)"    
};

colorSpans.forEach((span, index) => {
    span.addEventListener("click", () => {
        if(index === 0){
            applyColors(
                defaultPalette.primary,
                defaultPalette.secondary,
                defaultPalette.bg,
                defaultPalette.heading,
                defaultPalette.text,
                defaultPalette.btn,
                defaultPalette.btnText,
                defaultPalette.overlay,
                defaultPalette.headerBg,
                defaultPalette.bgSide
            );
        } else {
            applyColors(
                secondaryPalette.primary,
                secondaryPalette.secondary,
                secondaryPalette.bg,
                secondaryPalette.heading,
                secondaryPalette.text,
                secondaryPalette.btn,
                secondaryPalette.btnText,
                secondaryPalette.overlay,
                secondaryPalette.headerBg,
                secondaryPalette.bgSide
            );
        }
    });
});

// --- Dark mode---
darkToggle.addEventListener("change", () => {
    const landingText = document.querySelector(".landing .text");
    if(darkToggle.checked){
        document.body.classList.add("dark");
        applyColors("#000000","#000000","#FFFFFF","#FFFFFF","#000000","#FFFFFF","#000000","rgba(0,0,0,0.7)","#000","#000000");
        if(landingText){
            landingText.style.backgroundColor = "#000000";
            landingText.style.color = "#FFFFFF";
        }
    } else {
        document.body.classList.remove("dark");
        if(landingText){
            landingText.style.backgroundColor = "";
            landingText.style.color = "";
        }
        applyColors(
            defaultPalette.primary,
            defaultPalette.secondary,
            defaultPalette.bg,
            defaultPalette.heading,
            defaultPalette.text,
            defaultPalette.btn,
            defaultPalette.btnText,
            defaultPalette.overlay,
            defaultPalette.headerBg,
            defaultPalette.bgSide
        );
    }
});

// --- Font ---
fontSelect.addEventListener("change", () => { document.body.style.fontFamily = fontSelect.value; });

// --- Reset ---
resetBtn.addEventListener("click", () => {
    darkToggle.checked = false;
    document.body.classList.remove("dark");
    fontSelect.value="'Arial', sans-serif";
    document.body.style.fontFamily = fontSelect.value;
    applyColors(
        defaultPalette.primary,
        defaultPalette.secondary,
        defaultPalette.bg,
        defaultPalette.heading,
        defaultPalette.text,
        defaultPalette.btn,
        defaultPalette.btnText,
        defaultPalette.overlay,
        defaultPalette.headerBg,
        defaultPalette.bgSide
    );
});

  // ===== Portfolio Lightbox =====
  document.querySelectorAll('.preview-link').forEach(link => {
      link.addEventListener('click', e => {
          e.preventDefault();
          const overlay = document.createElement('div');
          overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999';
          const img = document.createElement('img');
          img.src = link.href;
          img.style.cssText='max-width:90%; max-height:90%; border-radius:10px;';
          overlay.appendChild(img);
          overlay.addEventListener('click', ()=>overlay.remove());
          document.addEventListener('keydown', e=>{if(e.key==='Escape') overlay.remove();},{once:true});
          document.body.appendChild(overlay);
      });
  });

    // ===== End Portfolio Lightbox =====
    
// ===== Contact Form =====
 const form = document.getElementById('contact-form');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', e => {
      e.preventDefault();
      const name=form.name.value.trim();
      const email=form.email.value.trim();
      const message=form.message.value.trim();
      const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!name || !email || !message){
          formMessage.textContent="Please fill in all fields.";
          formMessage.className="error";
      } else if(!emailRegex.test(email)){
          formMessage.textContent="Please enter a valid email.";
          formMessage.className="error";
      } else {
          formMessage.textContent="Your message has been sent successfully!";
          formMessage.className="success";
          form.reset();
      }
  });

  // ===== Google Map =====
    function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 15.5007, lng: 32.5599 },
            zoom: 12
        });
    }

});
// =====End contact form =====

// ===== Get nav bullets element =====
document.addEventListener("DOMContentLoaded", () => {
    const navBullets = document.querySelector(".nav-bullets");
    const bullets = document.querySelectorAll(".nav-bullets .bullet");

    if (!navBullets || bullets.length === 0) return;

    navBullets.style.display = "none";

    window.addEventListener("scroll", () => {
        if (window.scrollY > window.innerHeight * 0.5) {
            navBullets.style.display = "block";
        } else {
            navBullets.style.display = "none";
        }

        // Highlight active bullet
        bullets.forEach(bullet => bullet.classList.remove("active")); //  Remove all active classes
        bullets.forEach(bullet => {
            const sectionSelector = bullet.dataset.section;
            const section = document.querySelector(sectionSelector);
            if (!section) return;

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPos = window.scrollY + window.innerHeight / 2;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                bullet.classList.add("active");
            }
        });
    });

    bullets.forEach(bullet => {
        bullet.addEventListener("click", () => {
            const sectionSelector = bullet.dataset.section;
            const section = document.querySelector(sectionSelector);
            if (!section) return;

            section.scrollIntoView({ behavior: "smooth" });
        });
    });
});

// ===== End Get all bullets =====