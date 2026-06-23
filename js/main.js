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