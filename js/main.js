/* ==========================================================================
   DALEKO.TRAVEL — Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Header scroll behavior ---
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile burger ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            burger.classList.toggle('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close on link click
        nav.querySelectorAll('.header__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                burger.classList.remove('active');
                nav.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Scroll-triggered animations ---
    // Use lower threshold on mobile for earlier triggering
    const isMobile = window.innerWidth < 768;
    const observerOptions = {
        threshold: isMobile ? 0.05 : 0.15,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe section headers
    document.querySelectorAll('.section__header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Observe grids with stagger effect
    document.querySelectorAll('.tours__grid, .camps__grid, .usps__grid, .highlights__grid').forEach(el => {
        el.classList.add('stagger');
        observer.observe(el);
    });

    // Observe individual elements
    document.querySelectorAll('.about__inner, .contact__inner, .tour-sidebar').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // On mobile, observe itinerary days individually for nicer scroll reveal
    document.querySelectorAll('.itinerary-day').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                // Close mobile menu if open
                if (nav && nav.classList.contains('open')) {
                    burger.classList.remove('active');
                    nav.classList.remove('open');
                    document.body.style.overflow = '';
                }
                const offset = header.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Mobile video optimization ---
    // Removed - now using static image instead of video
});
