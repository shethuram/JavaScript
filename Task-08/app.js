// ================= LOAD COMPONENT =================
async function loadComponent(id, file) {
    try {
        const res = await fetch(file);
        const data = await res.text();
        document.getElementById(id).innerHTML = data;
    } catch (error) {
        console.error("Error loading component:", file, error);
    }
}

// ================= ROUTER =================
async function router() {
    const app = document.getElementById("app");
    const hash = window.location.hash || "#page-home";

    let page = "";

    if (hash === "#register") {
        page = "pages/register.html";
    } else {
        page = "pages/home.html";
    }

    try {
        const res = await fetch(page);
        const data = await res.text();
        app.innerHTML = data;

        // 🔥 SCROLL LOGIC (correct place)
        if (hash !== "#register") {
            requestAnimationFrame(() => {
                const section = document.querySelector(hash);
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            });
        }

    } catch (error) {
        app.innerHTML = "<h2>Page not found</h2>";
        console.error("Routing error:", error);
    }
}

// ================= INIT =================

// Load header & footer ONCE
window.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "components/header.html");
    loadComponent("footer", "components/footer.html");
});

// Handle routing
window.addEventListener("hashchange", router);
window.addEventListener("load", router);