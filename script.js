document.addEventListener('DOMContentLoaded', () => {

    // 1. HERO VIDEO SLOW-MOTION (0.5 = 50 % Geschwindigkeit)
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        // Stellt sicher, dass das Video stumm bleibt (Voraussetzung für Autoplay auf Handys)
        heroVideo.muted = true;
        heroVideo.playbackRate = 0.5;

        // Startet das Video sicher, fängt eventuelle Browser-Blockaden ab
        heroVideo.play().catch(error => {
            console.log("Autoplay wurde vom Browser verzögert:", error);
        });
    }

    // 2. MOBILES MENÜ SCHLIESSEN BEI KLICK
    const navLinks = document.querySelectorAll('nav ul li a');
    const navToggle = document.getElementById('nav-toggle');

    if (navToggle && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.checked = false;
            });
        });
    }

    // 3. SCROLL-ANIMATION FÜR REVEAL-ELEMENTE (.reveal-element)
    const targets = document.querySelectorAll('.reveal-element');

    if (targets.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.08
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Animiert nur einmal beim ersten Hinscrollen
                }
            });
        }, observerOptions);

        targets.forEach(target => {
            revealObserver.observe(target);
        });
    } else {
        // Fallback für ältere Browser: Elemente direkt sichtbar schalten
        targets.forEach(target => target.classList.add('active'));
    }

    // 4. NETLIFY IDENTITY (ADMIN LOGIN)
    if (window.netlifyIdentity) {
        window.netlifyIdentity.on("init", user => {
            if (!user) {
                window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                });
            }
        });
    }
// 5. SLIDER-DOTS MIT SCROLL-POSITION SYNCHRONISIEREN
    const gallery = document.querySelector('.image-gallery');
    const dots = document.querySelectorAll('.gallery-dots .dot');

    if (gallery && dots.length > 0) {
        gallery.addEventListener('scroll', () => {
            // Berechnet das aktuell sichtbare Bild anhand der horizontalen Scroll-Position
            const scrollLeft = gallery.scrollLeft;
            const itemWidth = gallery.querySelector('.gallery-item')?.offsetWidth || gallery.offsetWidth;
            const activeIndex = Math.round(scrollLeft / itemWidth);

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });

        // Optional: Beim Klick/Tippen auf einen Punkt direkt zum Bild scrollen
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const items = gallery.querySelectorAll('.gallery-item');
                if (items[index]) {
                    items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        });
    }

});