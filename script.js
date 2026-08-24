// ======================================
// CATHOLIC SPIRITUAL LIBRARY
// Main JavaScript
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------
    // MOBILE MENU
    // -------------------------------

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        // Close menu after clicking a link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }


    // -------------------------------
    // SEARCH
    // -------------------------------

    const searchInput = document.querySelector("#searchInput");
    const searchButton = document.querySelector("#searchButton");

    if (searchInput && searchButton) {

        searchButton.addEventListener("click", performSearch);

        searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                performSearch();
            }
        });
    }

    function performSearch() {

        const searchTerm = searchInput.value
            .toLowerCase()
            .trim();

        if (searchTerm === "") {
            alert("Please enter something to search.");
            return;
        }

        const cards = document.querySelectorAll(
            ".card, .saint-card"
        );

        let found = false;

        cards.forEach(card => {

            const text = card.textContent.toLowerCase();

            if (text.includes(searchTerm)) {
                card.style.display = "";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (!found) {
            alert(
                "No results found for: " + searchTerm
            );
        }
    }


    // -------------------------------
    // SCROLL TO TOP
    // -------------------------------

    const scrollTop = document.querySelector("#scrollTop");

    if (scrollTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {
                scrollTop.classList.add("show");
            } else {
                scrollTop.classList.remove("show");
            }

        });

        scrollTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    // -------------------------------
    // CURRENT YEAR
    // -------------------------------

    const yearElement = document.querySelector("#year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    // -------------------------------
    // FADE-IN ANIMATION
    // -------------------------------

    const animatedElements =
        document.querySelectorAll(
            ".card, .saint-card, .feature, .prayer-box"
        );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform =
            "translateY(30px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(element);
    });


    // -------------------------------
    // WELCOME MESSAGE
    // -------------------------------

    console.log(
        "✝️ Welcome to the Catholic Spiritual Library"
    );

});