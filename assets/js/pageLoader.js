import { renderReferencePane } from "./referencePane.js";
import { initContentHover } from "./contentHover.js";
import { initReferenceHover } from "./referenceHover.js";

async function loadIndex() {
    const res = await fetch("/data/index.json");
    return await res.json();
}

async function loadRoutes() {
    const res = await fetch("/data/routes.json");
    return await res.json();
}

function getCurrentPath() {
    const path = window.location.pathname;
    if (!path.startsWith("/pages/")) return null;
    return path.replace(/^\/pages\//, "");
}

document.addEventListener("DOMContentLoaded", async () => {
    const [index, routes] = await Promise.all([loadIndex(), loadRoutes()]);

    const currentPath = getCurrentPath();
    console.log("URL pathname:", window.location.pathname);
    console.log("Current path (relative to /pages):", currentPath);

    // Find the slug whose real path matches the current path
    const slug = Object.keys(routes).find(s => routes[s] === currentPath);
    console.log("Resolved slug from routes:", slug);

    const page = index.find(p => p.slug === slug) || null;
    console.log("Page found:", page);

    renderReferencePane(page);
    initContentHover();
    initReferenceHover();
});
