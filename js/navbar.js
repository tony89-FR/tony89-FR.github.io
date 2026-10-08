/* =====================================================
   NAVBAR - LA COMMUNAUTÉ LIVE
   Version propre et compatible avec style.css
===================================================== */

(() => {

    "use strict";

    const API_URL =
        "https://la-communaute-live-bot.de.deplexo.com";

    const NAVBAR_ID = "navbar";

    /* =================================================
       UTILITAIRES
    ================================================= */

    function escapeHTML(value) {

        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function getToken() {

        return localStorage.getItem("discord_session");

    }

    function setToken(token) {

        if (token) {

            localStorage.setItem(
                "discord_session",
                token
            );

        }

    }

    function removeToken() {

        localStorage.removeItem(
            "discord_session"
        );

    }

    /* =================================================
       AVATAR DISCORD
    ================================================= */

    function getDiscordAvatar(user) {

        if (
            user &&
            user.avatar &&
            user.id
        ) {

            return (
                `https://cdn.discordapp.com/avatars/` +
                `${user.id}/${user.avatar}.png?size=128`
            );

        }

        return "https://cdn.discordapp.com/embed/avatars/0.png";

    }

    /* =================================================
       RÉCUPÉRATION DU TOKEN OAUTH
    ================================================= */

    function readOAuthToken() {

        const hash =
            window.location.hash.substring(1);

        if (!hash) {
            return;
        }

        const params =
            new URLSearchParams(hash);

        const token =
            params.get("discord_token");

        if (!token) {
            return;
        }

        setToken(token);

        /*
         * On enlève le token de l'URL.
         */
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname +
            window.location.search
        );

    }

    /* =================================================
       HTML NAVBAR
    ================================================= */

    function renderNavbar(user = null) {

        const navbar =
            document.getElementById(NAVBAR_ID);

        if (!navbar) {
            return;
        }

        let accountHTML = "";

        /* =============================================
           UTILISATEUR CONNECTÉ
        ============================================= */

        if (user) {

            const avatar =
                getDiscordAvatar(user);

            const username =
                escapeHTML(
                    user.globalName ||
                    user.username ||
                    "Discord"
                );

            accountHTML = `

                <div class="discord-account">

                    <button
                        type="button"
                        class="discord-btn-nav discord-account-button"
                        id="discordAccountButton"
                        aria-expanded="false"
                        aria-controls="discordAccountMenu"
                    >

                        <img
                            class="discord-nav-avatar"
                            src="${avatar}"
                            alt="Avatar Discord"
                            loading="lazy"
                        >

                        <span class="discord-account-name">
                            ${username}
                        </span>

                        <span
                            class="discord-account-arrow"
                            aria-hidden="true"
                        >
                            ▴
                        </span>

                    </button>


                    <div
                        class="discord-account-menu"
                        id="discordAccountMenu"
                        aria-hidden="true"
                    >

                        <div class="discord-account-header">

                            <img
                                src="${avatar}"
                                alt=""
                                class="discord-menu-avatar"
                            >

                            <div>

                                <strong>
                                    ${username}
                                </strong>

                                <span>
                                    🟢 Connecté avec Discord
                                </span>

                            </div>

                        </div>


                        <div class="discord-account-separator"></div>


                        <a
                            href="membres.html"
                            class="discord-account-link"
                        >
                            👥 Mon espace
                        </a>


                        <button
                            type="button"
                            id="discordLogoutButton"
                            class="discord-account-logout"
                        >
                            🚪 Se déconnecter
                        </button>

                    </div>

                </div>

            `;

        }

        /* =============================================
           UTILISATEUR NON CONNECTÉ
        ============================================= */

        else {

            accountHTML = `

                <a
                    href="${API_URL}/auth/discord"
                    class="discord-btn-nav discord-login-button"
                >
                    🎮 Se connecter avec Discord
                </a>

            `;

        }


        /* =============================================
           NAVBAR
        ============================================= */

        navbar.innerHTML = `

            <a
                href="index.html"
                class="logo-nav"
                aria-label="La communauté live - Accueil"
            >

                <img
                    src="images/logo.png"
                    alt="Logo La communauté live"
                    onerror="this.style.display='none';"
                >

                <span>
                    La communauté live
                </span>

            </a>


            <button
                type="button"
                class="menu-toggle"
                id="menuToggle"
                aria-label="Ouvrir le menu"
                aria-expanded="false"
            >
                ☰
            </button>


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
                    <a href="reglement.html">
                        Règlement
                    </a>
                </li>

                <li class="nav-account">
                    ${accountHTML}
                </li>

            </ul>

        `;


        attachNavbarEvents();

    }

    /* =================================================
       MENU MOBILE + COMPTE
    ================================================= */

    function attachNavbarEvents() {

        const menuToggle =
            document.getElementById(
                "menuToggle"
            );

        const navLinks =
            document.getElementById(
                "navLinks"
            );

        /* =============================================
           MENU MOBILE
        ============================================= */

        if (
            menuToggle &&
            navLinks
        ) {

            menuToggle.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    const opened =
                        navLinks.classList.toggle(
                            "active"
                        );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        String(opened)
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

                            menuToggle.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }
                    );

                });

        }


        /* =============================================
           MENU COMPTE DISCORD
        ============================================= */

        const accountButton =
            document.getElementById(
                "discordAccountButton"
            );

        const accountMenu =
            document.getElementById(
                "discordAccountMenu"
            );

        if (
            accountButton &&
            accountMenu
        ) {

            accountButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    const opened =
                        accountMenu.classList.toggle(
                            "active"
                        );

                    accountButton.setAttribute(
                        "aria-expanded",
                        String(opened)
                    );

                    accountMenu.setAttribute(
                        "aria-hidden",
                        String(!opened)
                    );

                }
            );

        }


        /* =============================================
           DÉCONNEXION
        ============================================= */

        const logoutButton =
            document.getElementById(
                "discordLogoutButton"
            );

        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                () => {

                    removeToken();

                    window.location.href =
                        "index.html";

                }
            );

        }


        /* =============================================
           CLIC EN DEHORS
        ============================================= */

        document.addEventListener(
            "click",
            () => {

                if (navLinks) {

                    navLinks.classList.remove(
                        "active"
                    );

                }

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

                if (accountMenu) {

                    accountMenu.classList.remove(
                        "active"
                    );

                    accountMenu.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

                if (accountButton) {

                    accountButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );


        /* =============================================
           EMPÊCHE LE CLIC DANS LE MENU DE LE FERMER
        ============================================= */

        if (accountMenu) {

            accountMenu.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                }
            );

        }


        if (accountButton) {

            accountButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                }
            );

        }


        /* =============================================
           ÉCHAP
        ============================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key !== "Escape") {
                    return;
                }

                if (navLinks) {

                    navLinks.classList.remove(
                        "active"
                    );

                }

                if (accountMenu) {

                    accountMenu.classList.remove(
                        "active"
                    );

                }

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

                if (accountButton) {

                    accountButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }

    /* =================================================
       RÉCUPÉRATION UTILISATEUR
    ================================================= */

    async function loadUser() {

        const token =
            getToken();

        if (!token) {

            renderNavbar(null);

            return;

        }

        try {

            const response =
                await fetch(
                    `${API_URL}/auth/me`,
                    {
                        method: "GET",
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            if (!response.ok) {

                removeToken();

                renderNavbar(null);

                return;

            }


            const data =
                await response.json();


            if (
                !data ||
                !data.connected ||
                !data.user
            ) {

                removeToken();

                renderNavbar(null);

                return;

            }


            window.LA_COMMUNAUTE_AUTH = data.user;

            renderNavbar(
                data.user
            );

        }

        catch (error) {

            console.error(
                "Erreur authentification Discord :",
                error
            );

            /*
             * On garde le token si le serveur
             * est momentanément indisponible.
             */

            renderNavbar(null);

        }

    }

    /* =================================================
       INITIALISATION
    ================================================= */

    function init() {

        readOAuthToken();

        loadUser();

    }

    /* =================================================
       LANCEMENT
    ================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();
