// ======================================================
// NAVBAR CENTRALE — LA COMMUNAUTÉ LIVE
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    const navbarContainer = document.getElementById("navbar");

    if (!navbarContainer) {
        console.error("❌ Conteneur #navbar introuvable.");
        return;
    }

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

            <li>

                <a
                    class="discord-btn-nav"
                    href="https://discord.gg/HkcC9Kj29Z"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Rejoindre
                </a>

            </li>

        </ul>

    `;

});
