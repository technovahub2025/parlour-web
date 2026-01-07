// Preloader
window.addEventListener('load', () => {
    // Artificial delay to ensure fonts/images load and to show off the loader
    setTimeout(() => {
        document.body.classList.add('loaded');
        document.body.classList.remove('loading');
    }, 1500);
});

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverElements = document.querySelectorAll('a, button, .service-item, input, select');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 400, fill: "forwards" });
});

// Cursor Hover States
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
});

// Magnetic Button Effect
const magneticBtns = document.querySelectorAll('.magnetic-btn, .magnetic-btn-submit');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Move the button slightly
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        // If it has a text span, move it more for parallax
        const text = btn.querySelector('.btn-text');
        if (text) {
            text.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        }
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        const text = btn.querySelector('.btn-text');
        if (text) {
            text.style.transform = 'translate(0, 0)';
        }
    });
});

// Hover Reveal for Services
const serviceItems = document.querySelectorAll('.service-item');
const serviceBgs = document.querySelectorAll('.service-bg');

serviceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Remove active from all bgs
        serviceBgs.forEach(bg => bg.classList.remove('active'));

        // Find matching bg
        const target = item.getAttribute('data-target');
        const activeBg = document.querySelector(`.service-bg[data-bg="${target}"]`);

        if (activeBg) {
            activeBg.classList.add('active');
        }
    });

    // Optional: Reset to default when leaving the entire list? 
    // Usually easier to just leave the last hovered one active as it feels more persistent.
    // Or we reset when mouse leaves the UL
});

const serviceList = document.querySelector('.service-list');
serviceList.addEventListener('mouseleave', () => {
    // Reset to default (first one)
    serviceBgs.forEach(bg => bg.classList.remove('active'));
    document.querySelector('.service-bg').classList.add('active'); // The first one has no data-bg, act as default
});


// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-right, .fade-in-up');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translate(0,0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    // Set initial state via JS if not fully handled by CSS to avoid FOUC
    // But our CSS handles it well with classes.
    // Let's just add a class 'in-view' used by CSS
    el.classList.add('scroll-anim-ready'); // marker
    observer.observe(el);
});

// Parallax for editorial image
const editorialImg = document.querySelector('.parallax-el');
const editorialSection = document.querySelector('.experience-editorial');

window.addEventListener('scroll', () => {
    if (!editorialSection) return;
    const rect = editorialSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * 0.05;
        editorialImg.style.transform = `translateY(${offset}px) scale(1.1)`;
    }
});

// Navbar blending
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '1rem 4rem';
        navbar.style.background = 'rgba(5,5,5,0.8)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.padding = '2rem 4rem';
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
    }
});
