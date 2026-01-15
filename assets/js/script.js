// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Animate skills on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }
    });
});

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

    // Attendre que tout soit complètement chargé
    window.addEventListener('load', function() {
        const competencesImage = document.getElementById('competences-image');
        const projectCards = document.querySelectorAll('#competences .project-card');
        const competencesColumns = document.querySelectorAll('.competences-column');
        const defaultImage = '../assets/img/Rendu_2_reduced.png';
        let lastHoveredImage = null;
        
        if (competencesImage && projectCards.length > 0) {
            // Gestion du hover sur les cartes
            projectCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const newImage = this.getAttribute('data-image');
                    if (newImage) {
                        lastHoveredImage = newImage;
                        competencesImage.style.opacity = '0';
                        setTimeout(() => {
                            competencesImage.src = newImage;
                            competencesImage.style.opacity = '1';
                        }, 200);
                    }
                });
            });
            
            // Gestion du survol des colonnes (pour maintenir l'image)
            competencesColumns.forEach(column => {
                column.addEventListener('mouseleave', function() {
                    // Retour à l'image par défaut seulement en sortant de la colonne
                    competencesImage.style.opacity = '0';
                    setTimeout(() => {
                        competencesImage.src = defaultImage;
                        competencesImage.style.opacity = '1';
                        lastHoveredImage = null;
                    }, 200);
                });
                
                column.addEventListener('mouseenter', function() {
                    // Si on rentre dans une colonne et qu'il y avait une image, on la garde
                    if (lastHoveredImage) {
                        competencesImage.src = lastHoveredImage;
                    }
                });
            });
        }
    });