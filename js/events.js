const API_URL = "https://la-communaute-live-bot.onrender.com";

async function loadEvents() {

    const container = document.getElementById("eventsContainer");

    try {

        const response = await fetch(`${API_URL}/events`);
        const events = await response.json();

        if (events.length === 0) {

            container.innerHTML = `
                <div class="feature">
                    <h3>Aucun événement</h3>
                    <p>Il n'y a actuellement aucun événement programmé.</p>
                </div>
            `;

            return;
        }

        container.innerHTML = "";

        events.forEach(event => {

            const date = new Date(event.startTime);

            container.innerHTML += `
                <div class="feature">
                    <h3>🎉 ${event.name}</h3>

                    <p>${event.description || "Aucune description"}</p>

                    <br>

                    <strong>
                        ${date.toLocaleDateString("fr-FR")}
                    </strong>

                    <br>

                    ${date.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </div>
            `;

        });

    } catch (err) {

        console.error(err);

        container.innerHTML = `
            <div class="feature">
                Impossible de charger les événements.
            </div>
        `;

    }

}

loadEvents();
