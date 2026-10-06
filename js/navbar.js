/* =========================================================
   LA COMMUNAUTÉ LIVE
   NAVBAR + CONNEXION DISCORD
   ========================================================= */

const API_URL =
    "https://la-communaute-live-bot.de.deplexo.com";

const FRONTEND_URL =
    "https://tony89-fr.github.io";


/* =========================================================
   CSS DE SÉCURITÉ DE LA NAVBAR

   Ce CSS est injecté directement par navbar.js.
   Ainsi, même si le CSS principal est mal chargé,
   la navbar garde son apparence correcte.
   ========================================================= */

(function injectNavbarCSS() {

    if (document.getElementById("navbar-runtime-style")) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "navbar-runtime-style";

    style.textContent = `

        /* ================================
           RESET NAVBAR
        ================================= */

        .navbar,
        .navbar * {
            box-sizing: border-box;
        }


        .navbar ul,
        .navbar ol {
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }


        .navbar li {
            list-style: none !important;
            margin: 0;
            padding: 0;
        }


        .navbar a {
            text-decoration: none;
        }


        /* ================================
           NAVBAR
        ================================= */

        .navbar {
            position: fixed;

            top: 0;
            left: 0;

            width: 100%;
            min-height: 82px;

            display: flex;

            align-items: center;

            justify-content: space-between;

            padding: 12px 4%;

            z-index: 1000;

            background:
                linear-gradient(
                    90deg,
                    rgba(8, 14, 30, .96),
                    rgba(18, 8, 35, .96)
                );

            border-bottom:
                1px solid
                rgba(0, 217, 255, .12);

            box-shadow:
                0 8px 30px
                rgba(0, 0, 0, .25);

            backdrop-filter:
                blur(20px);

            -webkit-backdrop-filter:
                blur(20px);

        }


        /* ================================
           LOGO
        ================================= */

        .navbar .logo-nav {

            display:
                flex !important;

            align-items:
                center;

            gap:
                12px;

            color:
                #ffffff;

            font-weight:
                700;

            font-size:
                1.3rem;

            white-space:
                nowrap;

            flex-shrink:
                0;

        }


        .navbar .logo-nav img {

            width:
                45px;

            height:
                45px;

            border-radius:
                50%;

            object-fit:
                cover;

            flex-shrink:
                0;

        }


        /* ================================
           LIENS
        ================================= */

        .navbar .nav-links {

            display:
                flex !important;

            align-items:
                center;

            justify-content:
                center;

            gap:
                25px;

            margin:
                0 25px !important;

            padding:
                0 !important;

            list-style:
                none !important;

            flex:
                1;

        }


        .navbar .nav-links li {

            display:
                block;

            list-style:
                none !important;

        }


        .navbar .nav-links a {

            position:
                relative;

            display:
                inline-flex;

            align-items:
                center;

            justify-content:
                center;

            padding:
                8px 2px;

            color:
                #e6e6e6;

            font-size:
                .95rem;

            font-weight:
                500;

            white-space:
                nowrap;

            transition:
                color .25s ease,
                transform .25s ease;

        }


        .navbar .nav-links a:hover {

            color:
                #ffffff;

            transform:
                translateY(-2px);

        }


        .navbar .nav-links
        a:not(.discord-btn-nav)::after {

            content:
                "";

            position:
                absolute;

            left:
                0;

            bottom:
                0;

            width:
                0;

            height:
                2px;

            border-radius:
                999px;

            background:
                linear-gradient(
                    90deg,
                    #00d9ff,
                    #8b5cf6
                );

            transition:
                width .25s ease;

        }


        .navbar .nav-links
        a:not(.discord-btn-nav):hover::after {

            width:
                100%;

        }


        /* ================================
           BOUTON DISCORD
        ================================= */

        .navbar .discord-btn-nav {

            padding:
                11px 19px !important;

            border-radius:
                12px;

            background:
                linear-gradient(
                    135deg,
                    #5865f2,
                    #8b5cf6
                );

            color:
                #ffffff !important;

            font-weight:
                700;

            box-shadow:
                0 0 15px
                rgba(88, 101, 242, .35);

            transition:
                transform .25s ease,
                box-shadow .25s ease;

        }


        .navbar .discord-btn-nav:hover {

            transform:
                translateY(-2px) scale(1.02);

            box-shadow:
                0 0 25px
                rgba(88, 101, 242, .55);

        }


        /* ================================
           COMPTE DISCORD
        ================================= */

        .discord-account-nav {

            position:
                relative;

            flex-shrink:
                0;

        }


        .discord-account-button {

            display:
                flex;

            align-items:
                center;

            gap:
                9px;

            padding:
                6px 10px 6px 6px;

            border:
                1px solid
                rgba(255,255,255,.10);

            border-radius:
                12px;

            background:
                rgba(255,255,255,.05);

            color:
                #ffffff;

            cursor:
                pointer;

            transition:
                .2s ease;

        }


        .discord-account-button:hover {

            background:
                rgba(255,255,255,.10);

        }


        .discord-avatar-nav {

            width:
                38px;

            height:
                38px;

            border-radius:
                50%;

            object-fit:
                cover;

        }


        .discord-account-text {

            display:
                flex;

            flex-direction:
                column;

            align-items:
                flex-start;

            line-height:
                1.1;

        }


        .discord-account-name {

            color:
                #ffffff;

            font-size:
                .85rem;

            font-weight:
                700;

        }


        .discord-status-nav {

            margin-top:
                3px;

            color:
                #86efac;

            font-size:
                .68rem;

        }


        .discord-chevron {

            font-size:
                .75rem;

            color:
                #94a3b8;

            transition:
                transform .2s ease;

        }


        .discord-account-nav.open
        .discord-chevron {

            transform:
                rotate(180deg);

        }


        /* ================================
           MENU COMPTE
        ================================= */

        .discord-account-menu {

            position:
                absolute;

            top:
                calc(100% + 10px);

            right:
                0;

            width:
                250px;

            padding:
                10px;

            border:
                1px solid
                rgba(255,255,255,.10);

            border-radius:
                14px;

            background:
                rgba(10,15,28,.98);

            box-shadow:
                0 20px 50px
                rgba(0,0,0,.45);

            backdrop-filter:
                blur(18px);

            -webkit-backdrop-filter:
                blur(18px);

            display:
                none;

            z-index:
                1100;

        }


        .discord-account-nav.open
        .discord-account-menu {

            display:
                block;

        }


        .discord-menu-profile {

            display:
                flex;

            align-items:
                center;

            gap:
                10px;

            padding:
                10px;

            border-radius:
                10px;

            background:
                rgba(255,255,255,.04);

            margin-bottom:
                8px;

        }


        .discord-menu-profile img {

            width:
                42px;

            height:
                42px;

            border-radius:
                50%;

        }


        .discord-menu-profile strong {

            display:
                block;

            color:
                #ffffff;

            font-size:
                .85rem;

        }


        .discord-menu-profile span {

            display:
                block;

            margin-top:
                3px;

            color:
                #86efac;

            font-size:
                .7rem;

        }


        .discord-menu-item {

            display:
                flex !important;

            align-items:
                center;

            width:
                100%;

            padding:
                10px 12px;

            border:
                0;

            border-radius:
                9px;

            background:
                transparent;

            color:
                #e2e8f0;

            text-align:
                left;

            font-size:
                .85rem;

            cursor:
                pointer;

            text-decoration:
                none;

        }


        .discord-menu-item:hover {

            background:
                rgba(88,101,242,.16);

            color:
                #ffffff;

        }


        .discord-menu-logout {

            color:
                #fca5a5;

        }


        .discord-menu-logout:hover {

            background:
                rgba(248,113,113,.12);

        }


        /* ================================
           MOBILE
        ================================= */

        .navbar .menu-toggle {

            display:
                none;

            border:
                0;

            background:
                transparent;

            color:
                #ffffff;

            font-size:
                28px;

            cursor:
                pointer;

            padding:
                5px 10px;

        }


        @media (max-width: 900px) {

            .navbar {

                min-height:
                    70px;

                padding:
                    12px 5%;

                flex-wrap:
                    wrap;

            }


            .navbar .menu-toggle {

                display:
                    block;

                order:
                    3;

            }


            .navbar .discord-account-nav {

                margin-left:
                    auto;

                margin-right:
                    8px;

            }


            .navbar .discord-account-text {

                display:
                    none;

            }


            .navbar .nav-links {

                display:
                    none !important;

                flex-direction:
                    column;

                width:
                    100%;

                flex:
                    none;

                gap:
                    4px;

                margin:
                    10px 0 0 !important;

                padding:
                    10px 0 !important;

            }


            .navbar .nav-links.active {

                display:
                    flex !important;

            }


            .navbar .nav-links li {

                width:
                    100%;

                text-align:
                    center;

            }


            .navbar .nav-links a {

                display:
                    flex;

                width:
                    100%;

                justify-content:
                    center;

                padding:
                    12px;

            }


            .navbar .discord-btn-nav {

                display:
                    inline-flex !important;

                width:
                    auto !important;

            }

        }


        @media (max-width: 500px) {

            .navbar .logo-nav span {

                font-size:
                    1rem;

            }


            .navbar .logo-nav img {

                width:
                    40px;

                height:
                    40px;

            }


            .navbar .discord-account-nav {

                margin-left:
                    auto;

            }


            .discord-account-menu {

                position:
                    fixed;

                top:
                    70px;

                right:
                    10px;

                width:
                    min(250px, calc(100vw - 20px));

            }

        }

    `;

    document.head.appendChild(style);

})();


/* =========================================================
   OUTILS
   ========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function getDefaultAvatar() {

    return "https://cdn.discordapp.com/embed/avatars/0.png";

}


function getAvatarURL(user) {

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

    return getDefaultAvatar();

}


/* =========================================================
   CONSTRUCTION DE LA NAVBAR
   ========================================================= */

function createNavbar() {

    const navbar =
        document.getElementById("navbar");


    if (!navbar) {

        console.error(
            "❌ #navbar introuvable."
        );

        return null;

    }


    navbar.innerHTML = `

        <a
            href="${FRONTEND_URL}/index.html"
            class="logo-nav"
        >

            <img
                src="${FRONTEND_URL}/assets/logo.png"
                alt="Logo"
                onerror="
                    this.src='${getDefaultAvatar()}'
                "
            >

            <span>
                La communauté live
            </span>

        </a>


        <ul
            class="nav-links"
            id="mainNavLinks"
        >

            <li>
                <a href="${FRONTEND_URL}/index.html">
                    Accueil
                </a>
            </li>

            <li>
                <a href="${FRONTEND_URL}/annonces.html">
                    Annonces
                </a>
            </li>

            <li>
                <a href="${FRONTEND_URL}/staff.html">
                    Staff
                </a>
            </li>

            <li>
                <a href="${FRONTEND_URL}/evenements.html">
                    Événements
                </a>
            </li>

            <li>
                <a href="${FRONTEND_URL}/reglement.html">
                    Règlement
                </a>
            </li>

        </ul>


        <div
            id="discordAccountContainer"
            class="discord-account-nav"
        >

            <a
                href="${API_URL}/auth/discord"
                id="discordLoginButton"
                class="discord-btn-nav"
            >

                💬 Se connecter

            </a>

        </div>


        <button
            type="button"
            id="navbarMenuToggle"
            class="menu-toggle"
            aria-label="Ouvrir le menu"
            aria-expanded="false"
        >

            ☰

        </button>

    `;


    setupMobileMenu();

    setupDiscordAccount();

    return navbar;

}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function setupMobileMenu() {

    const button =
        document.getElementById(
            "navbarMenuToggle"
        );


    const links =
        document.getElementById(
            "mainNavLinks"
        );


    if (!button || !links) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            const isOpen =
                links.classList.toggle(
                    "active"
                );


            button.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            button.textContent =
                isOpen
                    ? "✕"
                    : "☰";

        }
    );


    links
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        links.classList.remove(
                            "active"
                        );

                        button.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        button.textContent =
                            "☰";

                    }
                );

            }
        );

}


/* =========================================================
   COMPTE DISCORD
   ========================================================= */

async function setupDiscordAccount() {

    const container =
        document.getElementById(
            "discordAccountContainer"
        );


    if (!container) {
        return;
    }


    const token =
        localStorage.getItem(
            "discord_session"
        );


    if (!token) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/auth/me`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        if (!response.ok) {

            localStorage.removeItem(
                "discord_session"
            );

            return;

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

            return;

        }


        const user =
            data.user;


        const avatar =
            getAvatarURL(user);


        const displayName =
            user.globalName ||
            user.username ||
            "Discord";


        container.innerHTML = `

            <button
                type="button"
                class="discord-account-button"
                id="discordAccountButton"
                aria-expanded="false"
            >

                <img
                    class="discord-avatar-nav"
                    src="${escapeHTML(avatar)}"
                    alt="Avatar"
                    onerror="
                        this.src='${getDefaultAvatar()}'
                    "
                >


                <span
                    class="discord-account-text"
                >

                    <span
                        class="discord-account-name"
                    >

                        ${escapeHTML(
                            displayName
                        )}

                    </span>


                    <span
                        class="discord-status-nav"
                    >

                        🟢 Connecté

                    </span>

                </span>


                <span
                    class="discord-chevron"
                >

                    ▾

                </span>

            </button>


            <div
                class="discord-account-menu"
                id="discordAccountMenu"
            >

                <div
                    class="discord-menu-profile"
                >

                    <img
                        src="${escapeHTML(avatar)}"
                        alt="Avatar"
                        onerror="
                            this.src='${getDefaultAvatar()}'
                        "
                    >


                    <div>

                        <strong>
                            ${escapeHTML(
                                displayName
                            )}
                        </strong>

                        <span>
                            🟢 Connecté avec Discord
                        </span>

                    </div>

                </div>


                <a
                    href="${FRONTEND_URL}/dashboard.html"
                    class="discord-menu-item"
                >

                    📊 Tableau de bord

                </a>


                <a
                    href="${FRONTEND_URL}/membres.html"
                    class="discord-menu-item"
                >

                    👥 Membres

                </a>


                <button
                    type="button"
                    id="discordLogout"
                    class="
                        discord-menu-item
                        discord-menu-logout
                    "
                >

                    🚪 Se déconnecter

                </button>

            </div>

        `;


        const accountButton =
            document.getElementById(
                "discordAccountButton"
            );


        const accountMenu =
            document.getElementById(
                "discordAccountMenu"
            );


        accountButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const open =
                    container.classList.toggle(
                        "open"
                    );


                accountButton.setAttribute(
                    "aria-expanded",
                    String(open)
                );

            }
        );


        accountMenu.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );


        document.addEventListener(
            "click",
            () => {

                container.classList.remove(
                    "open"
                );

                accountButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );


        const logout =
            document.getElementById(
                "discordLogout"
            );


        logout.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "discord_session"
                );


                window.location.href =
                    `${FRONTEND_URL}/index.html`;

            }
        );


    } catch (error) {

        console.error(
            "❌ Erreur compte Discord :",
            error
        );

    }

}


/* =========================================================
   RÉCUPÉRATION DU TOKEN APRÈS OAUTH
   ========================================================= */

function handleDiscordToken() {

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


    if (!token) {

        return;

    }


    localStorage.setItem(
        "discord_session",
        token
    );


    history.replaceState(
        null,
        "",
        window.location.pathname +
        window.location.search
    );

}


/* =========================================================
   INITIALISATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        handleDiscordToken();

        createNavbar();

    }
);
