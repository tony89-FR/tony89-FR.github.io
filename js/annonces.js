const API_ANNONCES = "https://la-communaute-live-bot.onrender.com";

async function loadAnnouncements() {

    const container = document.getElementById("announcementsContainer");

    try {

        const response = await fetch(`${API_ANNONCES}/annonces`);

        const announcements = await response.json();

        if (announcements.length === 0) {

            container.innerHTML = `
                <div class="feature">
                    <h3>📢 Aucune annonce</h3>
                    <p>Il n'y a actuellement aucune annonce.</p>
                </div>
            `;

            return;
        }

        container.innerHTML = "";

        announcements.forEach(announcement => {

            const date = new Date(announcement.createdAt);

            let attachmentsHTML = "";

            announcement.attachments.forEach(file => {

                attachmentsHTML += `
                    <img
                        src="${file}"
                        class="announcement-attachment"
                        alt="Pièce jointe"
                    >
                `;

            });

            container.innerHTML += `
                <div class="announcement-card">

                    <div class="announcement-header">

                        <img
                            src="${announcement.avatar}"
                            class="announcement-avatar"
                            alt="Avatar"
                        >

                        <div>

                            <strong>${announcement.author}</strong>

                            <div class="announcement-date">
                                ${date.toLocaleDateString("fr-FR")}
                                à
                                ${date.toLocaleTimeString("fr-FR", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </div>

                        </div>

                    </div>

                    <div class="announcement-content">

                        ${announcement.content
                            ? announcement.content.replace(/\n/g, "<br>")
                            : ""
                        }

                    </div>

                    <div class="announcement-attachments">

                        ${attachmentsHTML}

                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.error("Erreur annonces :", error);

        container.innerHTML = `
            <div class="feature">

                <h3>⚠️ Impossible de charger les annonces</h3>

                <p>Une erreur est survenue lors du chargement.</p>

            </div>
        `;

    }

}

loadAnnouncements();
