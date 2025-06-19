document.addEventListener("DOMContentLoaded", () => {
    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            // Handle cases where the href is just '#' which might scroll to top
            const targetId = this.getAttribute("href");
            if (targetId === "#") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                });
            }

            // Close mobile nav after clicking a link
            if (window.innerWidth <= 768) {
                const navLinks = document.querySelector(".nav-links");
                if (navLinks) {
                    navLinks.classList.remove("nav-open");
                }
            }
        });
    });

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("nav-open");
        });
        // Close nav if clicking outside on mobile (optional)
        document.addEventListener("click", (event) => {
            if (
                !navLinks.contains(event.target) &&
                !navToggle.contains(event.target) &&
                navLinks.classList.contains("nav-open")
            ) {
                navLinks.classList.remove("nav-open");
            }
        });
    }

    // --- Scroll-Reveal Animation ---
    const animateOnScrollElements =
        document.querySelectorAll(".animate-on-scroll");

    const observerOptions = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1, // percentage of element visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach((el) => {
        observer.observe(el);
    });

    // --- Skill Progress Bar Animation on Scroll ---
    const progressBars = document.querySelectorAll(".progress-bar");

    const progressBarObserverOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the progress bar is visible
    };

    const progressBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.dataset.progress; // Get percentage from data-progress attribute
                progressBar.style.width = progress + "%";
                observer.unobserve(progressBar); // Stop observing once animated
            }
        });
    }, progressBarObserverOptions);

    progressBars.forEach((bar) => {
        progressBarObserver.observe(bar);
    });

    // --- Active navigation link on scroll ---
    const sections = document.querySelectorAll("section[id]");
    const navLinksList = document.querySelectorAll(".main-nav .nav-links li a");

    function highlightNavLink() {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                // Adjust offset as needed
                current = section.getAttribute("id");
            }
        });

        navLinksList.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", highlightNavLink);
    window.addEventListener("resize", highlightNavLink);
    highlightNavLink(); // Call on load

    // You can add more interactive elements here if desired.
    // E.g., form submission handling (requires backend), image carousels, etc.
});
