document.addEventListener("DOMContentLoaded", () => {

    // Apparition progressive des sections
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll("section").forEach(section => {

        section.classList.add("hidden");
        observer.observe(section);

    });

    // Animation du logo
    const logo = document.querySelector(".hero-logo");

    if (logo) {

        let angle = 0;

        setInterval(() => {

            angle += 0.02;

            logo.style.transform =
                `translateY(${Math.sin(angle) * 8}px)`;

        }, 20);

    }

});
