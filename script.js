/* ================================================
   MACHADO ADVOCACIA — JavaScript
   Estilo Nesi-adv: Interatividade e Animações
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === NAVBAR SCROLL ===
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu
                const mobileMenu = document.getElementById('mobileMenu');
                const hamburger = document.getElementById('hamburgerBtn');
                if (mobileMenu) mobileMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');

                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

    // === MOBILE MENU ===
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // === INTERSECTION OBSERVER — Scroll Animations ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Stagger animation for sibling elements
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.querySelectorAll('.anim')) : [];
                const index = siblings.indexOf(entry.target);
                const delay = index >= 0 ? index * 100 : 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.anim').forEach(el => {
        observer.observe(el);
    });

    // === CONTACT FORM ===
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (formSuccess) {
                formSuccess.classList.add('active');
                setTimeout(() => {
                    formSuccess.classList.remove('active');
                }, 5000);
            }
            form.reset();
        });
    }

    // === ACTIVE NAV LINK ON SCROLL ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    link.style.borderBottomColor = 'transparent';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = '#c8a46c';
                        link.style.borderBottomColor = '#c8a46c';
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', highlightNav);

    // === HERO SLIDER ===
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroNext = document.getElementById('heroNext');
    const heroPrev = document.getElementById('heroPrev');
    let currentSlide = 0;
    
    if (heroSlides.length > 0) {
        const showSlide = (index) => {
            heroSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) slide.classList.add('active');
            });
        };
        
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % heroSlides.length;
            showSlide(currentSlide);
        };
        
        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
            showSlide(currentSlide);
        };
        
        if (heroNext) heroNext.addEventListener('click', nextSlide);
        if (heroPrev) heroPrev.addEventListener('click', prevSlide);
        
        setInterval(nextSlide, 6000);
    }

    // === IG CAROUSEL ===
    const igCarousel = document.getElementById('igCarousel');
    const igNext = document.getElementById('igNext');
    const igPrev = document.getElementById('igPrev');
    
    if (igCarousel && igNext && igPrev) {
        const scrollAmount = 300;
        igNext.addEventListener('click', () => {
            igCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        igPrev.addEventListener('click', () => {
            igCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
});
