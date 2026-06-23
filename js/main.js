// ==========================================================================
// 1. GESTION DU MODE SOMBRE (Vérification et basculement du thème)
// ==========================================================================
document.addEventListener("DOMContentLoaded", function () {
    console.log("JS chargé OK");
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    // Charger le thème sauvegardé dans le navigateur (LocalStorage)
    const savedTheme = localStorage.getItem("theme");

    // Si l'utilisateur était déjà en mode sombre, on lui remet
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        themeToggle.innerHTML = "☀️"; // Icône Soleil pour repasser en clair
    } else {
        themeToggle.innerHTML = "🌙"; // Icône Lune pour passer en sombre
    }

    // Écoute du clic sur le bouton pour changer de mode
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Sauvegarde du choix de l'utilisateur pour sa prochaine visite
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.innerHTML = "🌙";
        }
    });
});

// ==========================================================================
// 2. CONFIGURATION DE COMPATIBILITÉ BOOTSTRAP 5 & EFFETS DE SCROLL
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("themeToggle");
    const navbar = document.querySelector(".navbar");
    const backToTopBtn = document.getElementById("backToTop");

    // Application du thème au format requis par Bootstrap 5 (data-bs-theme)
    const savedTheme = localStorage.getItem("theme") || "light";
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

    // Mise à jour visuelle du bouton (Soleil / Lune)
    function updateToggleIcon(theme) {
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
        }
    }

    // Surveillance du défilement de la page (Scroll)
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;

        // Effet Shrink sur la Navbar (devient plus petite au scroll)
        if (navbar) {
            if (scrollPosition > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        }

        // Apparition / Disparition du bouton de retour en haut
        if (backToTopBtn) {
            if (scrollPosition > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }
    });

    // Action du clic sur le bouton de retour en haut (Remontée fluide)
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

// ==========================================================================
// 3. ANIMATIONS VISUELLES (Apparition progressive & Compteurs)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {

    // --- Animation de fondu au défilement (Fade-In) ---
    const fadeSections = document.querySelectorAll('.animate-fade');
    
    if (fadeSections.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target); // L'animation ne se joue qu'une fois
                }
            });
        }, { threshold: 0.1 }); // Se déclenche dès que 10% de la section est visible

        fadeSections.forEach(section => fadeObserver.observe(section));
    }

    // --- Animation des compteurs de statistiques (.stat-counter) ---
    const counters = document.querySelectorAll('.stat-counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let current = 0;
                    const increment = Math.ceil(target / 50); // Vitesse de l'animation

                    const updateCount = () => {
                        current += increment;
                        if (current < target) {
                            entry.target.innerText = current;
                            setTimeout(updateCount, 20); // Fréquence de mise à jour (ms)
                        } else {
                            // Ajoute un symbole "+" sauf s'il s'agit des 14 régions du Sénégal
                            entry.target.innerText = target + (target === 14 ? "" : "+");
                        }
                    };

                    updateCount();
                    counterObserver.unobserve(entry.target); // Désactive l'écouteur après exécution
                }
            });
        }, { threshold: 0.2 });

        counters.forEach(counter => counterObserver.observe(counter));
    }
});

// --- Animation des compteurs alternatifs (.counter) ---
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        
        const speed = target / 40; // Plus le diviseur est grand, plus c'est fluide

        if (count < target) {
            counter.innerText = Math.ceil(count + speed);
            setTimeout(() => animateCounter(counter), 25);
        } else {
            counter.innerText = target; // Fixe la valeur finale exacte à l'arrivée
        }
    };

    // Déclenchement de l'animation quand le compteur apparaît à l'écran
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // Se déclenche à 30% de visibilité

    counters.forEach(counter => observer.observe(counter));
});

// ==========================================================================
// 4. SYSTÈME DE FILTRAGE DES CARTES DE FREELANCES
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const freelanceCards = document.querySelectorAll('.freelance-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Gestion visuelle des boutons (Bouton actif en jaune plein, les autres vides)
            filterButtons.forEach(btn => {
                btn.classList.remove('btn-warning');
                btn.classList.add('btn-outline-warning', 'text-dark');
            });
            button.classList.remove('btn-outline-warning', 'text-dark');
            button.classList.add('btn-warning');

            // 2. Récupération de la catégorie du filtre sélectionné
            const selectedCategory = button.getAttribute('data-filter');

            // 3. Masquage ou affichage des cartes de freelances
            freelanceCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block'; // Afficher
                } else {
                    card.style.display = 'none';  // Masquer
                }
            });
        });
    });
});

// ==========================================================================
// 5. VALIDATION ET SÉCURISATION DU FORMULAIRE DE CONTACT
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Bloque l'envoi natif pour exécuter la validation JS

            // Récupération des champs du formulaire
            const lastName = document.getElementById('lastName');
            const firstName = document.getElementById('firstName');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const successAlert = document.getElementById('successAlert');

            let isFormValid = true;

            // Masquer la bannière de succès au départ
            successAlert.classList.add('d-none');

            // Vérification du Nom
            if (lastName.value.trim() === '') {
                lastName.classList.add('is-invalid');
                isFormValid = false;
            } else {
                lastName.classList.remove('is-invalid');
                lastName.classList.add('is-valid');
            }

            // Vérification du Prénom
            if (firstName.value.trim() === '') {
                firstName.classList.add('is-invalid');
                isFormValid = false;
            } else {
                firstName.classList.remove('is-invalid');
                firstName.classList.add('is-valid');
            }

            // Vérification de l'Email (Format Regex strict)
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

            // Vérification du Message (Minimum 20 caractères obligatoires)
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

            // Si tous les tests sont passés avec succès
            if (isFormValid) {
                successAlert.classList.remove('d-none'); // On affiche la bannière verte de succès
                contactForm.reset(); // On vide les champs du formulaire

                // Retrait des contours verts 'is-valid' pour remettre les entrées à neuf
                lastName.classList.remove('is-valid');
                firstName.classList.remove('is-valid');
                email.classList.remove('is-valid');
                message.classList.remove('is-valid');
            }
        });
    }
});