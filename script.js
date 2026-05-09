// ==========================================
// INSERISCI QUI I TUOI DATI
// ==========================================

const myLanguages = [
    { name: "Italiano", level: "Madrelingua" },
    { name: "Tedesco", level: "Livello Avanzato" },
    { name: "Inglese", level: "Livello Intermedio" }
];

const myInterests = [
    "Pianoforte", "Nuoto", "Biotecnologie", "Attività Scout", "Lettura", "Tecnologia"
];

const myExperiences = [
    {
        date: "2024 - Attuale",
        title: "Nome del Progetto 1",
        description: "Breve descrizione di cosa hai fatto in questo progetto. Usa poche parole ma efficaci."
    },
    {
        date: "2023 - 2024",
        title: "Nome di un'Attività o Progetto 2",
        description: "Breve descrizione del ruolo o dell'attività svolta."
    },
    {
        date: "2021 - 2022",
        title: "Nome del Progetto 3",
        description: "Un'altra descrizione di un'esperienza passata, scolastica o extrascolastica."
    }
];

// ==========================================
// LOGICA DEL SITO (Non serve modificare)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Popola le Lingue
    const languagesList = document.getElementById('languages-list');
    myLanguages.forEach(lang => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${lang.name}</span> <span style="color: var(--text-muted); font-size: 0.9rem;">${lang.level}</span>`;
        languagesList.appendChild(li);
    });

    // Popola gli Interessi
    const interestsContainer = document.getElementById('interests-tags');
    myInterests.forEach(interest => {
        const span = document.createElement('span');
        span.classList.add('tag');
        span.textContent = interest;
        interestsContainer.appendChild(span);
    });

    // Popola i Progetti / Esperienze
    const timelineContainer = document.getElementById('projects-timeline');
    myExperiences.forEach(exp => {
        const item = document.createElement('div');
        item.classList.add('timeline-item');
        item.innerHTML = `
            <div class="timeline-date">${exp.date}</div>
            <div class="timeline-content">
                <h4>${exp.title}</h4>
                <p>${exp.description}</p>
            </div>
        `;
        timelineContainer.appendChild(item);
    });

    // Anno corrente per il footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Animazioni allo scorrimento morbidissime
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 }); // Parte un po' più tardi per un effetto più elegante

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});