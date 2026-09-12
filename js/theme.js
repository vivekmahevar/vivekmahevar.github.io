function initializeTheme() {
    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) {
        return;
    }

    // Prevent initialization more than once
    if (themeToggle.dataset.themeInitialized === "true") {
        return;
    }

    themeToggle.dataset.themeInitialized = "true";

    const themeIcon = themeToggle.querySelector("i");
    const savedTheme = localStorage.getItem("theme");

    // Apply saved theme
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");

        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    }

    // Toggle theme
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDarkMode =
            document.body.classList.contains("dark-mode");

        if (isDarkMode) {
            localStorage.setItem("theme", "dark");

            if (themeIcon) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }
        } else {
            localStorage.setItem("theme", "light");

            if (themeIcon) {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }
        }
    });
}

// Try when the page loads
document.addEventListener("DOMContentLoaded", initializeTheme);

// Try again after universal components are loaded
document.addEventListener("componentsLoaded", initializeTheme);