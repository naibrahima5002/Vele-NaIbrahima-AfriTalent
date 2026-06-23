document.addEventListener("DOMContentLoaded", function () {
    console.log("JS chargé OK");
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    // Charger thème sauvegardé
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        themeToggle.innerHTML = "☀️";
    } else {
        themeToggle.innerHTML = "🌙";
    }

    // Toggle
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.innerHTML = "🌙";
        }
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("themeToggle");
    const navbar = document.querySelector(".navbar");
    const backToTopBtn = document.getElementById("backToTop");

    // ==========================================
    // GESTION DU THEME (Bootstrap 5 data-bs-theme)
    // ==========================================
    const savedTheme = localStorage.getItem("theme") || "light";
    
    // On applique l'attribut compatible avec Bootstrap 5
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
    updateToggleIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-bs-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";

            document.documentElement.setAttribute("data-bs-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateToggleIcon(newTheme);
        });
    }

    function updateToggleIcon(theme) {
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
        }
    }

    // ==========================================
    // GESTION DU SCROLL
    // ==========================================
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;

        if (navbar) {
            if (scrollPosition > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        }

        if (backToTopBtn) {
            if (scrollPosition > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    // 1. ANIMATION DES SECTIONS EN FONDU (Fade-In)
    const fadeSections = document.querySelectorAll('.animate-fade');
    
    if (fadeSections.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target); // S'arrête une fois visible
                }
            });
        }, { threshold: 0.1 }); // Se déclenche quand 10% de la section apparaît

        fadeSections.forEach(section => fadeObserver.observe(section));
    }


    // 2. ANIMATION DES COMPTEURS DE STATISTIQUES
    const counters = document.querySelectorAll('.stat-counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let current = 0;
                    const increment = Math.ceil(target / 50); // Ajuste la vitesse ici

                    const updateCount = () => {
                        current += increment;
                        if (current < target) {
                            entry.target.innerText = current;
                            setTimeout(updateCount, 20); // Vitesse de rafraîchissement
                        } else {
                            // Ajoute le "+" sauf pour le chiffre 14 des régions
                            entry.target.innerText = target + (target === 14 ? "" : "+");
                        }
                    };

                    updateCount();
                    counterObserver.unobserve(entry.target); // S'active une seule fois
                }
            });
        }, { threshold: 0.2 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

});

// ==================== ANIMATION DES COMPTEURS ====================
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        
        // Ajuste la vitesse : plus le diviseur est grand, plus l'animation est fluide
        const speed = target / 40; 

        if (count < target) {
            counter.innerText = Math.ceil(count + speed);
            setTimeout(() => animateCounter(counter), 25);
        } else {
            counter.innerText = target; // Fixe la valeur finale exacte
        }
    };

    // Utilisation de l'IntersectionObserver pour lancer l'animation au scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // L'animation ne se joue qu'une seule fois
            }
        });
    }, { threshold: 0.3 }); // Se déclenche quand 30% de l'élément est visible à l'écran

    counters.forEach(counter => observer.observe(counter));
});

// Filtrage des Freelances par catégorie
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const freelanceCards = document.querySelectorAll('.freelance-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Gestion des styles des boutons (Actif / Inactif)
            filterButtons.forEach(btn => {
                btn.classList.remove('btn-warning');
                btn.classList.add('btn-outline-warning', 'text-dark');
            });
            button.classList.remove('btn-outline-warning', 'text-dark');
            button.classList.add('btn-warning');

            // 2. Récupération du filtre sélectionné
            const selectedCategory = button.getAttribute('data-filter');

            // 3. Filtrage des cartes
            freelanceCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Validation complète du formulaire de contact (Page contact.html)
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stoppe le rechargement de la page

            // Récupération des éléments du formulaire
            const lastName = document.getElementById('lastName');
            const firstName = document.getElementById('firstName');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const successAlert = document.getElementById('successAlert');

            let isFormValid = true;

            // Cacher l'alerte de succès si elle était affichée
            successAlert.classList.add('d-none');

            // 1. Validation du Nom
            if (lastName.value.trim() === '') {
                lastName.classList.add('is-invalid');
                isFormValid = false;
            } else {
                lastName.classList.remove('is-invalid');
                lastName.classList.add('is-valid');
            }

            // 2. Validation du Prénom
            if (firstName.value.trim() === '') {
                firstName.classList.add('is-invalid');
                isFormValid = false;
            } else {
                firstName.classList.remove('is-invalid');
                firstName.classList.add('is-valid');
            }

            // 3. Validation de l'Email (Format Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                email.classList.add('is-invalid');
                document.getElementById('emailError').innerText = "L'adresse email est requise.";
                isFormValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                email.classList.add('is-invalid');
                document.getElementById('emailError').innerText = "Veuillez entrer une adresse email valide.";
                isFormValid = false;
            } else {
                email.classList.remove('is-invalid');
                email.classList.add('is-valid');
            }

            // 4. Validation du Message (20 caractères min)
            if (message.value.trim() === '') {
                message.classList.add('is-invalid');
                document.getElementById('messageError').innerText = "Le message est requis.";
                isFormValid = false;
            } else if (message.value.trim().length < 20) {
                message.classList.add('is-invalid');
                document.getElementById('messageError').innerText = "Le message doit contenir au moins 20 caractères.";
                isFormValid = false;
            } else {
                message.classList.remove('is-invalid');
                message.classList.add('is-valid');
            }

            // Affichage du succès si tout est valide
            if (isFormValid) {
                successAlert.classList.remove('d-none');
                contactForm.reset(); // Réinitialise les champs

                // Nettoyage des bordures vertes de succès après réinitialisation
                lastName.classList.remove('is-valid');
                firstName.classList.remove('is-valid');
                email.classList.remove('is-valid');
                message.classList.remove('is-valid');
            }
        });
    }
});