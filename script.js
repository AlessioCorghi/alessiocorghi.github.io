// --- CONFIGURAZIONE DATI (Modifica qui per personalizzare il sito) ---

const skills = [
    "JavaScript (ES6+)", "TypeScript", "React", "Node.js", 
    "Python", "HTML5 & CSS3", "Git", "Docker", "SQL / NoSQL"
];

const projectsData = [
    {
        title: "E-Commerce Platform",
        description: "Una piattaforma di e-commerce completa con carrello dinamico, integrazione pagamenti e pannello di amministrazione.",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "https://github.com",
        live: "https://example.com"
    },
    {
        title: "AI Chat Application",
        description: "Applicazione di messaggistica in tempo reale con intelligenza artificiale integrata per traduzioni e suggerimenti di risposta.",
        tech: ["TypeScript", "Socket.io", "OpenAI API"],
        github: "https://github.com",
        live: "" // Lascia vuoto se non c'è un link live
    },
    {
        title: "Data Visualization Dashboard",
        description: "Dashboard interattiva per l'analisi di dati finanziari con grafici aggiornati in tempo reale.",
        tech: ["Vue.js", "D3.js", "Express"],
        github: "https://github.com",
        live: "https://example.com"
    },
    {
        title: "Task Management API",
        description: "API RESTful scalabile per la gestione dei task aziendali, con autenticazione JWT e rate limiting.",
        tech: ["Python", "Django REST", "PostgreSQL"],
        github: "https://github.com",
        live: ""
    }
];

const typewriterPhrases = [
    "Sviluppatore Full Stack.",
    "Appassionato di UI/UX.",
    "Risolutore di problemi.",
    "Costruttore di architetture solide."
];

// --- LOGICA DELL'APPLICAZIONE (Non è necessario modificare sotto questa linea) ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Popolamento Dinamico Skills
    const skillsContainer = document.getElementById('skills-container');
    skills.forEach(skill => {
        const span = document.createElement('span');
        span.classList.add('skill-tag');
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });

    // 2. Popolamento Dinamico Progetti
    const projectsContainer = document.getElementById('projects-container');
    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card', 'animate-on-scroll');
        
        let linksHTML = '';
        if (project.github) linksHTML += `<a href="${project.github}" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>`;
        if (project.live) linksHTML += `<a href="${project.live}" target="_blank" aria-label="Live Site"><i class="fas fa-external-link-alt"></i></a>`;

        const techHTML = project.tech.map(t => `<span>${t}</span>`).join('');

        card.innerHTML = `
            <div class="project-content">
                <div class="project-header">
                    <i class="far fa-folder"></i>
                    <div class="project-links">${linksHTML}</div>
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
            <div class="project-tech">${techHTML}</div>
        `;
        projectsContainer.appendChild(card);
    });

    // 3. Effetto Typewriter (Macchina da scrivere)
    const typeElement = document.querySelector('.typewriter');
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = typewriterPhrases[phraseIndex];
        
        if (isDeleting) {
            typeElement.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            typeElement.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && letterIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pausa a fine frase
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
            typeSpeed = 500; // Pausa prima della nuova frase
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 4. Animazioni allo scorrimento (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Decommenta se vuoi che l'animazione avvenga solo 1 volta
            } else {
                entry.target.classList.remove('visible'); // Rimuovi per ripetere l'animazione scorrendo su e giù
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // 5. Toggle Tema Chiaro/Scuro
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('i');
    
    // Controlla preferenza di sistema o salvata
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.body.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });

    // 6. Aggiorna l'anno nel footer
    document.getElementById('year').textContent = new Date().getFullYear();
});