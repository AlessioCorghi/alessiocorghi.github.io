document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Gestione Preloader
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
        // Dopo che il preloader scompare, innesca le animazioni della Hero
        setTimeout(() => {
            document.querySelectorAll('.hero .reveal-text, .hero .fade-up').forEach(el => {
                el.classList.add('is-visible');
            });
        }, 500);
    }, 1500); // 1.5 secondi di caricamento scenico

    // 2. Cursore Personalizzato
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Controlla se siamo su desktop (il cursore personalizzato su mobile dà problemi)
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Il punto segue istantaneamente
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // L'outline segue con un leggero ritardo tramite animazione
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover Effect del Cursore su link e pulsanti
        const interactables = document.querySelectorAll('a, [data-cursor="hover"], [data-cursor="project"]');
        
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if(el.dataset.cursor === "project") {
                    cursorOutline.style.width = "80px";
                    cursorOutline.style.height = "80px";
                    cursorOutline.style.backgroundColor = "rgba(255,255,255,0.1)";
                } else {
                    cursorOutline.style.width = "60px";
                    cursorOutline.style.height = "60px";
                }
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = "40px";
                cursorOutline.style.height = "40px";
                cursorOutline.style.backgroundColor = "transparent";
            });
        });
    }

    // 3. Scroll Reveal (Intersection Observer)
    // Mostra gli elementi quando entrano nell'area visibile dello schermo
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Ferma l'osservazione per farla apparire una sola volta
            }
        });
    }, observerOptions);

    // Seleziona tutto ciò che deve animarsi tranne quelli nella hero
    const elementsToReveal = document.querySelectorAll('.about .reveal-text, .projects .reveal-text, .footer .reveal-text, .fade-up:not(.hero .fade-up), .image-reveal');
    
    elementsToReveal.forEach(el => {
        scrollObserver.observe(el);
    });

    // 4. Semplice Parallasse sulle immagini allo scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.parallax-img').forEach(img => {
            const speed = 0.05; // Velocità della parallasse
            img.style.transform = `scale(1.1) translateY(${scrolled * speed}px)`;
        });
    });
});