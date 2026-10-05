document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // PARTICULES
    // ==================================================

    const canvas = document.getElementById("particles");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);


    const particles = [];

    for (let i = 0; i < 80; i++) {

        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            size: Math.random() * 2 + 1,

            speedX:
                (Math.random() - 0.5) * 0.5,

            speedY:
                (Math.random() - 0.5) * 0.5
        });

    }


    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach((particle) => {

            particle.x += particle.speedX;
            particle.y += particle.speedY;


            // Revenir de l'autre côté

            if (particle.x < 0) {
                particle.x = canvas.width;
            }

            if (particle.x > canvas.width) {
                particle.x = 0;
            }

            if (particle.y < 0) {
                particle.y = canvas.height;
            }

            if (particle.y > canvas.height) {
                particle.y = 0;
            }


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(255, 255, 255, 0.5)";

            ctx.fill();

        });


        requestAnimationFrame(
            animateParticles
        );

    }


    animateParticles();

});
