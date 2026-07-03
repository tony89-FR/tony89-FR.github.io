const STAFF_API = "https://la-communaute-live-bot.onrender.com";

async function loadStaff() {

    const container = document.getElementById("staffContainer");

    try {

        const response = await fetchfetch(`${STAFF_API}/staff`);
        const staff = await response.json();

        container.innerHTML = "";

        staff.forEach(role => {

            if (role.members.length === 0) return;

            let membersHTML = "";

            role.members.forEach(member => {

                membersHTML += `

                    <div class="staff-member">

                        <img src="${member.avatar}" alt="${member.username}">

                        <h4>${member.displayName}</h4>

                        <a href="${member.profile}" target="_blank">

                            Voir le profil

                        </a>

                    </div>

                `;

            });

            container.innerHTML += `

                <div class="staff-role">

                    <h2 style="color:${role.color}">
                        ${role.role}
                    </h2>

                    <div class="staff-grid">

                        ${membersHTML}

                    </div>

                </div>

            `;

        });

    } catch (err) {

        console.error(err);

        container.innerHTML = "<p>Impossible de charger le staff.</p>";

    }

}

loadStaff();
