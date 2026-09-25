document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PARTICULES
    ========================= */

    const canvas = document.getElementById("particles");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        function resize() {

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

        }

        resize();

        window.addEventListener("resize", resize);

        const particles = [];

        for (let i = 0; i < 80; i++) {

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 2 + 1
            });

        }

        function animate() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            particles.forEach(p => {

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) {
                    p.vx *= -1;
                }

                if (p.y < 0 || p.y > canvas.height) {
                    p.vy *= -1;
                }

                ctx.beginPath();

                ctx.arc(
                    p.x,
                    p.y,
                    p.r,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = "#00d9ff";

                ctx.fill();

            });

            requestAnimationFrame(animate);

        }

        animate();

    }


    /* =========================
       MENU MOBILE
    ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

        });


        /* Fermer le menu après avoir cliqué
           sur un lien */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

            });

        });

    }

});
