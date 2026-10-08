/* =====================================================
   NAVBAR - LA COMMUNAUTÉ LIVE
===================================================== */

(() => {

    "use strict";


    /* =================================================
       CONFIGURATION
    ================================================= */

    const API_URL =
        "https://la-communaute-live-bot.de.deplexo.com";

    const FRONTEND_URL =
        "https://tony89-fr.github.io";


    /* =================================================
       ÉLÉMENTS
    ================================================= */

    const navbar =
        document.getElementById("navbar");

    if (!navbar) {
        return;
    }


    /* =================================================
       UTILITAIRES
    ================================================= */

    function getSessionToken() {

        return localStorage.getItem(
            "discord_session"
        );

    }


    function logout() {

        localStorage.removeItem(
            "discord_session"
        );

        window.location.href =
            FRONTEND_URL;

    }


    function getAvatarUrl(user) {

        if (
            user &&
            user.id &&
            user.avatar
        ) {

            return (
                "https://cdn.discordapp.com/avatars/" +
                user.id +
                "/" +
                user.avatar +
                ".png?size=128"
            );

        }

        return (
            "https://cdn.discordapp.com/embed/avatars/0.png"
        );

    }


    function getCurrentPage() {

        const path =
            window.location.pathname
                .split("/")
                .pop();

        return path || "index.html";

    }


    /* =================================================
       RÉCUPÉRER L'UTILISATEUR
    ================================================= */

    async function getCurrentUser() {

        const token =
            getSessionToken();

        if (!token) {
            return null;
        }


        try {

            const response =
                await fetch(
                    `${API_URL}/auth/me`,
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        },

                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                localStorage.removeItem(
                    "discord_session"
                );

                return null;

            }


            const data =
                await response.json();


            if (
                !data.connected ||
                !data.user
            ) {

                localStorage.removeItem(
                    "discord_session"
                );

                return null;

            }


            return data.user;

        } catch (error) {

            console.error(
                "Erreur récupération compte Discord :",
                error
            );

            return null;

        }

    }


    /* =================================================
       GÉNÉRER LA NAVBAR
    ================================================= */

    function renderNavbar(user) {

        const currentPage =
            getCurrentPage();


        const isActive = (page) => {

            return currentPage === page
                ? "active"
                : "";

        };


        /* ---------------------------------------------
           COMPTE NON CONNECTÉ
        --------------------------------------------- */

        let accountHTML = `
            <li class="nav-account">
                <a
                    href="${API_URL}/auth/discord"
                    class="discord-btn-nav"
                >
                    🎮 Connexion Discord
                </a>
            </li>
        `;


        /* ---------------------------------------------
           COMPTE CONNECTÉ
        --------------------------------------------- */

        if (user) {

            const avatar =
                getAvatarUrl(user);

            const displayName =
                user.globalName ||
                user.username ||
                "Discord";


            accountHTML = `
                <li class="nav-account discord-account">

                    <button
                        type="button"
                        class="discord-account-button"
                        id="discordAccountButton"
                        aria-expanded="false"
                        aria-controls="discordAccountMenu"
                    >

                        <img
                            src="${avatar}"
                            alt="Avatar Discord"
                            class="discord-nav-avatar"
                        >

                        <span
                            class="discord-account-name"
                        >
                            ${escapeHTML(displayName)}
                        </span>

                        <span
                            class="discord-account-arrow"
                        >
                            ▴
                        </span>

                    </button>


                    <div
                        class="discord-account-menu"
                        id="discordAccountMenu"
                    >

                        <div
                            class="discord-account-header"
                        >

                            <img
                                src="${avatar}"
                                alt="Avatar Discord"
                                class="discord-menu-avatar"
                            >

                            <div>

                                <strong>
                                    ${escapeHTML(displayName)}
                                </strong>

                                <span>
                                    🟢 Connecté avec Discord
                                </span>

                            </div>

                        </div>


                        <div
                            class="discord-account-separator"
                        ></div>


                        <a
                            href="dashboard.html"
                            class="discord-account-link"
                        >
                            📊 Tableau de bord
                        </a>


                        <button
                            type="button"
                            class="discord-account-logout"
                            id="discordLogoutButton"
                        >
                            🚪 Se déconnecter
                        </button>

                    </div>

                </li>
            `;

        }


        /* ---------------------------------------------
           HTML NAVBAR
        --------------------------------------------- */

        navbar.innerHTML = `

            <a
                href="index.html"
                class="logo-nav"
            >

                <img
                    src="images/logo.png"
                    alt="Logo"
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
                    <a
                        href="index.html"
                        class="${isActive("index.html")}"
                    >
                        Accueil
                    </a>
                </li>

                <li>
                    <a
                        href="annonces.html"
                        class="${isActive("annonces.html")}"
                    >
                        Annonces
                    </a>
                </li>

                <li>
                    <a
                        href="staff.html"
                        class="${isActive("staff.html")}"
                    >
                        Staff
                    </a>
                </li>

                <li>
                    <a
                        href="evenements.html"
                        class="${isActive("evenements.html")}"
                    >
                        Événements
                    </a>
                </li>

                <li>
                    <a
                        href="regles.html"
                        class="${isActive("regles.html")}"
                    >
                        Règlement
                    </a>
                </li>

                ${accountHTML}

            </ul>

        `;


        setupEvents();

    }


    /* =================================================
       ÉCHAPPEMENT HTML
    ================================================= */

    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =================================================
       ÉVÉNEMENTS
    ================================================= */

    function setupEvents() {

        const menuToggle =
            document.getElementById(
                "menuToggle"
            );

        const navLinks =
            document.getElementById(
                "navLinks"
            );


        /* ---------------------------------------------
           MENU MOBILE
        --------------------------------------------- */

        if (
            menuToggle &&
            navLinks
        ) {

            menuToggle.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    const active =
                        navLinks.classList.toggle(
                            "active"
                        );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        active
                            ? "true"
                            : "false"
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


        /* ---------------------------------------------
           COMPTE DISCORD
        --------------------------------------------- */

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

                    const active =
                        accountMenu.classList.toggle(
                            "active"
                        );

                    accountButton.setAttribute(
                        "aria-expanded",
                        active
                            ? "true"
                            : "false"
                    );

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

                }
            );

        }


        /* ---------------------------------------------
           DÉCONNEXION
        --------------------------------------------- */

        const logoutButton =
            document.getElementById(
                "discordLogoutButton"
            );


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                logout
            );

        }

    }


    /* =================================================
       TOKEN OAUTH DANS L'URL
    ================================================= */

    function handleOAuthToken() {

        const hash =
            window.location.hash;


        if (
            !hash ||
            !hash.includes(
                "discord_token="
            )
        ) {

            return;

        }


        const params =
            new URLSearchParams(
                hash.substring(1)
            );


        const token =
            params.get(
                "discord_token"
            );


        if (token) {

            localStorage.setItem(
                "discord_session",
                token
            );

        }


        /* Nettoyer le token de l'URL */

        window.history.replaceState(
            {},
            document.title,
            window.location.pathname +
            window.location.search
        );

    }


    /* =================================================
       INITIALISATION
    ================================================= */

    async function init() {

        handleOAuthToken();


        /* Navbar temporaire */

        renderNavbar(null);


        /* Vérification session */

        const user =
            await getCurrentUser();


        renderNavbar(user);

    }


    init();

})();
