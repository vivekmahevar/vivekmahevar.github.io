document.addEventListener("DOMContentLoaded", async () => {

    /* =========================================
       DETERMINE PAGE DEPTH
    ========================================== */

    const path = window.location.pathname;

    const pathParts = path
        .split("/")
        .filter(Boolean);

    let directoryDepth = 0;

    /*
        Examples:

        /index.html
        → depth 0

        /pages/projects.html
        → depth 1

        /experience/prym-aerospace.html
        → depth 1

        /projects/prym-aerospace/uav-structural-analysis.html
        → depth 2
    */

    if (
        pathParts.length > 0 &&
        pathParts[pathParts.length - 1].includes(".")
    ) {
        directoryDepth = pathParts.length - 1;
    }

    const basePath = "../".repeat(directoryDepth);
    const componentPath = `${basePath}components/`;


    /* =========================================
       NAVBAR
    ========================================== */

    const navbar = document.getElementById("navbar");

    if (navbar) {

        try {

            const response = await fetch(
                `${componentPath}navbar.html`
            );

            if (!response.ok) {
                throw new Error("Navbar could not be loaded.");
            }

            const html = await response.text();

            navbar.innerHTML = html;


            /* ---------------------------------
               HOME LINK
            --------------------------------- */

            const logo = navbar.querySelector("[data-home]");

            if (logo) {
                logo.href = `${basePath}index.html`;
            }


            /* ---------------------------------
               NAVIGATION LINKS
            --------------------------------- */

            const navLinks =
                navbar.querySelectorAll("[data-nav]");

            navLinks.forEach((link) => {

                const page = link.dataset.nav;

                link.href =
                    `${basePath}pages/${page}.html`;

            });


            /* ---------------------------------
               ACTIVE PAGE
            --------------------------------- */

            const currentPath =
                window.location.pathname;

            navLinks.forEach((link) => {

                const page = link.dataset.nav;

                if (
                    currentPath.includes(
                        `/pages/${page}.html`
                    )
                ) {
                    link.classList.add("active");
                }


                /* Project detail pages */

                if (
                    page === "projects" &&
                    currentPath.includes("/projects/")
                ) {
                    link.classList.add("active");
                }


                /* Experience detail pages */

                if (
                    page === "experience" &&
                    currentPath.includes("/experience/")
                ) {
                    link.classList.add("active");
                }

            });

        } catch (error) {

            console.error(
                "Navbar loading error:",
                error
            );

        }

    }


    /* =========================================
       CONTACT
    ========================================== */

    const contact =
        document.getElementById("contact");

    if (contact) {

        try {

            const response = await fetch(
                `${componentPath}contact.html`
            );

            if (!response.ok) {
                throw new Error("Contact could not be loaded.");
            }

            const html = await response.text();

            contact.innerHTML = html;

        } catch (error) {

            console.error(
                "Contact loading error:",
                error
            );

        }

    }


    /* =========================================
       FOOTER
    ========================================== */

    const footer =
        document.getElementById("footer");

    if (footer) {

        try {

            const response = await fetch(
                `${componentPath}footer.html`
            );

            if (!response.ok) {
                throw new Error("Footer could not be loaded.");
            }

            const html = await response.text();

            footer.innerHTML = html;

        } catch (error) {

            console.error(
                "Footer loading error:",
                error
            );

        }

    }


    /* =========================================
       COMPONENTS LOADED
    ========================================== */

    document.dispatchEvent(
        new Event("componentsLoaded")
    );

});