// ======================================================
// NAVBAR CENTRALE — LA COMMUNAUTÉ LIVE
// + CONNEXION DISCORD
// + MENU MOBILE
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const navbarContainer =
        document.getElementById("navbar");

    if (!navbarContainer) {
        console.error("❌ Conteneur #navbar introuvable.");
        return;
    }

    const API_URL =
        "https://la-communaute-live-bot.de.deplexo.com";


    // ==================================================
    // ÉCHAPPER LE HTML
    // ==================================================

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }


    // ==================================================
    // AVATAR DISCORD
    // ==================================================

    function getAvatarURL(user) {

        if (!user || !user.avatar) {
            return "images/logo.png";
        }

        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
    }


    // ==================================================
    // AFFICHER LA NAVBAR
    // ==================================================

    function renderNavbar(user = null) {

        let accountHTML = "";

        // ----------------------------------------------
        // UTILISATEUR CONNECTÉ
        // ----------------------------------------------

        if (user) {

            const avatarURL =
                getAvatarURL(user);

            const displayName =
                user.globalName ||
                user.username;

            accountHTML = `
                <li class="discord-account">

                    <button
                        class="discord-account-btn"
                        id="discordAccountBtn"
                        type="button"
                        aria-expanded="false"
                    >

                        <img
                            src="${avatarURL}"
                            alt="Avatar Discord"
                            class="discord-avatar"
                        >

                        <span class="discord-account-name">
                            ${escapeHTML(displayName)}
                        </span>

                        <span
                            class="account-arrow"
                            id="accountArrow"
                        >
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
                                ${escapeHTML(displayName)}
                            </strong>

                            <small>
                                🟢 Connecté avec Discord
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

        }

        // ----------------------------------------------
        // UTILISATEUR NON CONNECTÉ
        // ----------------------------------------------

        else {

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
        // HTML NAVBAR
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


            <!-- BOUTON MOBILE -->

            <button
                class="menu-toggle"
                id="menuToggle"
                type="button"
                aria-label="Ouvrir le menu"
                aria-expanded="false"
            >
                ☰
            </button>


            <!-- NAVIGATION -->

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
        // MENU MOBILE
        // ==================================================

        setupMobileMenu();


        // ==================================================
        // MENU COMPTE DISCORD
        // ==================================================

        setupAccountMenu();
    }


    // ==================================================
    // MENU MOBILE
    // ==================================================

    function setupMobileMenu() {

        const menuToggle =
            document.getElementById("menuToggle");

        const navLinks =
            document.getElementById("navLinks");


        if (!menuToggle || !navLinks) {
            return;
        }


        menuToggle.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                const isOpen =
                    navLinks.classList.toggle("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );


        // Fermer après clic sur un lien

        navLinks
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });
    }


    // ==================================================
    // MENU COMPTE DISCORD
    // ==================================================

    function setupAccountMenu() {

        const accountButton =
            document.getElementById(
                "discordAccountBtn"
            );

        const accountMenu =
            document.getElementById(
                "discordAccountMenu"
            );

        const accountArrow =
            document.getElementById(
                "accountArrow"
            );


        if (accountButton && accountMenu) {

            accountButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    const isOpen =
                        accountMenu.classList.toggle(
                            "active"
                        );


                    accountButton.setAttribute(
                        "aria-expanded",
                        isOpen ? "true" : "false"
                    );


                    if (accountArrow) {

                        accountArrow.textContent =
                            isOpen ? "▴" : "▾";

                    }

                }
            );


            accountMenu.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                }
            );


            document.addEventListener(
                "click",
                () => {

                    accountMenu.classList.remove(
                        "active"
                    );

                    accountButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    if (accountArrow) {

                        accountArrow.textContent = "▾";

                    }

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
    }


    // ==================================================
    // 1. AFFICHER IMMÉDIATEMENT LA NAVBAR
    // ==================================================
    //
    // C'est important :
    // le menu mobile existe immédiatement.
    //

    renderNavbar();


    // ==================================================
    // 2. RÉCUPÉRER LE TOKEN APRÈS OAUTH2
    // ==================================================

    const hash =
        window.location.hash;


    if (hash.includes("discord_token=")) {

        const params =
            new URLSearchParams(
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


        // Nettoyer l'URL

        history.replaceState(
            null,
            "",
            window.location.pathname +
            window.location.search
        );
    }


    // ==================================================
    // 3. VÉRIFIER LA SESSION DISCORD
    // ==================================================

    const token =
        localStorage.getItem(
            "discord_session"
        );


    if (!token) {

        // Pas connecté :
        // la navbar est déjà fonctionnelle.

        return;
    }


    fetch(
        `${API_URL}/auth/me`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    )

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Session invalide"
                );
            }

            return response.json();

        })

        .then((data) => {

            if (data.connected && data.user) {

                // Remplacer uniquement
                // la navbar par sa version connectée.

                renderNavbar(
                    data.user
                );

            }

        })

        .catch((error) => {

            console.warn(
                "⚠️ Session Discord invalide ou expirée."
            );

            localStorage.removeItem(
                "discord_session"
            );

        });

});
