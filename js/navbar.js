/* =========================================================
   NAVBAR - LA COMMUNAUTÉ LIVE
   ========================================================= */

(() => {

    const API_URL =
        "https://la-communaute-live-bot.de.deplexo.com";

    const navbar = document.getElementById("navbar");

    if (!navbar) {
        console.warn("Navbar introuvable.");
        return;
    }

    /* =====================================================
       NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const links = [
        {
            name: "Accueil",
            url: "index.html"
        },
        {
            name: "Annonces",
            url: "annonces.html"
        },
        {
            name: "Staff",
            url: "staff.html"
        },
        {
            name: "Événements",
            url: "evenements.html"
        },
        {
            name: "Règlement",
            url: "regles.html"
        }
    ];

    /* =====================================================
       HTML DE BASE
       ===================================================== */

    navbar.innerHTML = `
        <a
            class="logo-nav"
            href="index.html"
            aria-label="La communauté live"
        >
            <img
                src="images/logo.png"
                alt="Logo La communauté live"
            >

            <span>
                La communauté live
            </span>
        </a>

        <ul class="nav-links">
            ${links.map(link => `
                <li>
                    <a
                        href="${link.url}"
                        class="${currentPage === link.url ? "active" : ""}"
                    >
                        ${link.name}
                    </a>
                </li>
            `).join("")}
        </ul>

        <div
            class="nav-account"
            id="nav-account"
        >
            <a
                class="discord-btn-nav"
                href="${API_URL}/auth/discord"
            >
                🎮 Connexion Discord
            </a>
        </div>

        <button
            class="menu-toggle"
            id="menu-toggle"
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded="false"
        >
            ☰
        </button>
    `;

    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navLinks =
        navbar.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const active =
                navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(active)
            );

            menuToggle.textContent =
                active ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";
            });

        });
    }

    /* =====================================================
       OAUTH DISCORD
       ===================================================== */

    function handleOAuthToken() {

        const hash =
            window.location.hash;

        if (!hash.includes("discord_token=")) {
            return;
        }

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

            window.history.replaceState(
                {},
                document.title,
                window.location.pathname +
                window.location.search
            );
        }
    }

    handleOAuthToken();

    /* =====================================================
       RÉCUPÉRATION DU TOKEN
       ===================================================== */

    function getToken() {

        return localStorage.getItem(
            "discord_session"
        );
    }

    /* =====================================================
       CHARGEMENT UTILISATEUR
       ===================================================== */

    async function loadAccount() {

        const token = getToken();

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
                !data ||
                !data.connected ||
                !data.user
            ) {
                return;
            }

            renderConnectedAccount(
                data.user
            );

        } catch (error) {

            console.error(
                "Erreur chargement compte Discord :",
                error
            );
        }
    }

    /* =====================================================
       COMPTE CONNECTÉ
       ===================================================== */

    function renderConnectedAccount(user) {

        const account =
            document.getElementById("nav-account");

        if (!account) {
            return;
        }

        const avatar =
            user.avatar
                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
                : `https://cdn.discordapp.com/embed/avatars/0.png`;

        account.innerHTML = `
            <div class="discord-account">

                <button
                    class="discord-account-button"
                    id="discord-account-button"
                    type="button"
                    aria-expanded="false"
                >

                    <img
                        class="discord-nav-avatar"
                        src="${avatar}"
                        alt="Avatar Discord"
                    >

                    <span class="discord-account-name">
                        ${escapeHtml(
                            user.global_name ||
                            user.username ||
                            "Utilisateur"
                        )}
                    </span>

                    <span
                        class="discord-account-arrow"
                    >
                        ▴
                    </span>

                </button>

                <div
                    class="discord-account-menu"
                    id="discord-account-menu"
                >

                    <div
                        class="discord-account-header"
                    >

                        <img
                            class="discord-menu-avatar"
                            src="${avatar}"
                            alt="Avatar Discord"
                        >

                        <div>

                            <strong>
                                ${escapeHtml(
                                    user.global_name ||
                                    user.username ||
                                    "Utilisateur"
                                )}
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
                        class="discord-account-link"
                        href="dashboard.html"
                    >
                        📊 Tableau de bord
                    </a>

                    <a
                        class="discord-account-link"
                        href="membres.html"
                    >
                        👥 Membres
                    </a>

                    <div
                        class="discord-account-separator"
                    ></div>

                    <button
                        class="discord-account-logout"
                        id="discord-logout"
                        type="button"
                    >
                        🚪 Se déconnecter
                    </button>

                </div>

            </div>
        `;

        setupAccountMenu();
    }

    /* =====================================================
       MENU COMPTE
       ===================================================== */

    function setupAccountMenu() {

        const button =
            document.getElementById(
                "discord-account-button"
            );

        const menu =
            document.getElementById(
                "discord-account-menu"
            );

        const logout =
            document.getElementById(
                "discord-logout"
            );

        if (!button || !menu) {
            return;
        }

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const active =
                    menu.classList.toggle(
                        "active"
                    );

                button.setAttribute(
                    "aria-expanded",
                    String(active)
                );
            }
        );

        document.addEventListener(
            "click",
            event => {

                if (
                    !menu.contains(event.target) &&
                    !button.contains(event.target)
                ) {

                    menu.classList.remove(
                        "active"
                    );

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }
        );

        if (logout) {

            logout.addEventListener(
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

    /* =====================================================
       PROTECTION HTML
       ===================================================== */

    function escapeHtml(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    /* =====================================================
       LANCEMENT
       ===================================================== */

    loadAccount();

})();
