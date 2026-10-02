// ======================================================
// NAVBAR CENTRALE — LA COMMUNAUTÉ LIVE
// + CONNEXION DISCORD
// ======================================================

document.addEventListener("DOMContentLoaded", async () => {

    const navbarContainer = document.getElementById("navbar");

    if (!navbarContainer) {
        console.error("❌ Conteneur #navbar introuvable.");
        return;
    }

    const API_URL =
        "https://la-communaute-live-bot.de.deplexo.com";

    // ==================================================
    // RÉCUPÉRER LE TOKEN APRÈS LA CONNEXION DISCORD
    // ==================================================

    const hash = window.location.hash;

    if (hash.includes("discord_token=")) {

        const params = new URLSearchParams(
            hash.substring(1)
        );

        const token =
            params.get("discord_token");

        if (token) {
            localStorage.setItem(
                "discord_session",
                token
            );
        }

        // Nettoyer le token de l'adresse
        history.replaceState(
            null,
            "",
            window.location.pathname +
            window.location.search
        );
    }

    // ==================================================
    // RÉCUPÉRER LA SESSION
    // ==================================================

    const token =
        localStorage.getItem("discord_session");

    let user = null;

    if (token) {

        try {

            const response = await fetch(
                `${API_URL}/auth/me`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {

                const data =
                    await response.json();

                if (data.connected) {
                    user = data.user;
                }

            } else {

                // Session expirée / invalide
                localStorage.removeItem(
                    "discord_session"
                );

            }

        } catch (error) {

            console.error(
                "❌ Impossible de vérifier la connexion Discord :",
                error
            );

        }
    }

    // ==================================================
    // CONSTRUIRE LA PARTIE COMPTE
    // ==================================================

    let accountHTML = "";

    if (user) {

        let avatarURL =
            "images/logo.png";

        if (user.avatar) {

            avatarURL =
                `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`;

        }

        accountHTML = `
            <li class="discord-account">
                <button
                    class="discord-account-btn"
                    id="discordAccountBtn"
                    type="button"
                >
                    <img
                        src="${avatarURL}"
                        alt="Avatar Discord"
                        class="discord-avatar"
                    >

                    <span>
                        ${escapeHTML(
                            user.globalName ||
                            user.username
                        )}
                    </span>

                    <span class="account-arrow">
                        ▾
                    </span>
                </button>

                <div
                    class="discord-account-menu"
                    id="discordAccountMenu"
                >
                    <div class="account-info">

                        <img
                            src="${avatarURL}"
                            alt="Avatar Discord"
                            class="discord-avatar-large"
                        >

                        <strong>
                            ${escapeHTML(
                                user.globalName ||
                                user.username
                            )}
                        </strong>

                        <small>
                            Connecté avec Discord
                        </small>

                    </div>

                    <button
                        id="discordLogout"
                        class="logout-btn"
                        type="button"
                    >
                        🚪 Se déconnecter
                    </button>
                </div>
            </li>
        `;

    } else {

        accountHTML = `
            <li>
                <a
                    class="discord-btn-nav"
                    href="${API_URL}/auth/discord"
                >
                    🎮 Se connecter
                </a>
            </li>
        `;
    }

    // ==================================================
    // AFFICHER LA NAVBAR
    // ==================================================

    navbarContainer.innerHTML = `

        <div class="logo-nav">

            <a href="index.html">

                <img
                    src="images/logo.png"
                    alt="Logo La communauté live"
                >

            </a>

            <span>
                La communauté live
            </span>

        </div>


        <!-- BOUTON MENU MOBILE -->

        <button
            class="menu-toggle"
            id="menuToggle"
            aria-label="Ouvrir le menu"
        >
            ☰
        </button>


        <!-- LIENS DE NAVIGATION -->

        <ul
            class="nav-links"
            id="navLinks"
        >

            <li>
                <a href="index.html">
                    Accueil
                </a>
            </li>

            <li>
                <a href="annonces.html">
                    Annonces
                </a>
            </li>

            <li>
                <a href="staff.html">
                    Staff
                </a>
            </li>

            <li>
                <a href="evenements.html">
                    Événements
                </a>
            </li>

            <li>
                <a href="regles.html">
                    Règlement
                </a>
            </li>

            ${accountHTML}

        </ul>

    `;

    // ==================================================
    // COMPTE DISCORD
    // ==================================================

    const accountButton =
        document.getElementById(
            "discordAccountBtn"
        );

    const accountMenu =
        document.getElementById(
            "discordAccountMenu"
        );

    if (accountButton && accountMenu) {

        accountButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                accountMenu.classList.toggle(
                    "active"
                );

            }
        );

        document.addEventListener(
            "click",
            () => {

                accountMenu.classList.remove(
                    "active"
                );

            }
        );
    }

    // ==================================================
    // DÉCONNEXION
    // ==================================================

    const logoutButton =
        document.getElementById(
            "discordLogout"
        );

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "discord_session"
                );

                window.location.reload();

            }
        );

    }

    // ==================================================
    // MENU MOBILE
    // ==================================================

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const navLinks =
        document.getElementById(
            "navLinks"
        );

    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle(
                    "active"
                );

            }
        );

        navLinks
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "active"
                        );

                    }
                );

            });
    }

});

// ======================================================
// PROTECTION DU TEXTE AFFICHÉ
// ======================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
