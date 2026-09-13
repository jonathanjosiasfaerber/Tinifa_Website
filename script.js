document.addEventListener('DOMContentLoaded', () => {

    // 1. HERO VIDEO SLOW-MOTION (0.5 = 50 % Geschwindigkeit)
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
      
        heroVideo.muted = true;
        heroVideo.playbackRate = 0.8;


        heroVideo.play().catch(error => {
            console.log("Autoplay wurde vom Browser verzögert:", error);
        });
    }


    const navLinks = document.querySelectorAll('nav ul li a');
    const navToggle = document.getElementById('nav-toggle');

    if (navToggle && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.checked = false;
            });
        });
    }


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
        
        targets.forEach(target => target.classList.add('active'));
    }

    
    if (window.netlifyIdentity) {
        window.netlifyIdentity.on("init", user => {
            if (!user) {
                window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                });
            }
        });
    }

    const gallery = document.querySelector('.image-gallery');
    const dots = document.querySelectorAll('.gallery-dots .dot');

    if (gallery && dots.length > 0) {
        gallery.addEventListener('scroll', () => {
            
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