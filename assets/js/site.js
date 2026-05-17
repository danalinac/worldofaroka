// assets/js/site.js
import { initIndexSidebar } from "./indexSidebar.js";
import { initReferenceSidebar } from "./referenceSidebar.js";
import { initContentHover } from "./contentHover.js";

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const mapToggle = document.getElementById("map-toggle");
    const webToggle = document.getElementById("web-toggle");
    const indexToggle = document.getElementById("toggle-index");
    const referenceToggle = document.getElementById("toggle-references");

    const leftSidebar = document.getElementById("left-sidebar");
    const rightSidebar = document.getElementById("right-sidebar");

    if (!mapToggle || !webToggle || !indexToggle || !referenceToggle || !leftSidebar || !rightSidebar) {
        console.error("One or more required elements are missing from the DOM.");
        return;
    }

    // MAP PANE TOGGLE
    mapToggle.addEventListener("click", () => {
        const isOpen = body.classList.contains("map-open");
        body.classList.remove("web-open");
        body.classList.toggle("map-open", !isOpen);

        // Option C behavior: close sidebars when map opens
        if (!isOpen) {
            body.classList.remove("index-open");
            body.classList.remove("reference-open");
        }
    });

    // WEB PANE TOGGLE
    webToggle.addEventListener("click", () => {
        const isOpen = body.classList.contains("web-open");
        body.classList.remove("map-open");
        body.classList.toggle("web-open", !isOpen);

        // Option C behavior: close sidebars when web opens
        if (!isOpen) {
            body.classList.remove("index-open");
            body.classList.remove("reference-open");
        }
    });

    // INDEX SIDEBAR TOGGLE
    indexToggle.addEventListener("click", () => {
        const isOpen = body.classList.contains("index-open");
        body.classList.toggle("index-open", !isOpen);

        // Option C behavior: close map/web when index opens
        if (!isOpen) {
            body.classList.remove("map-open");
            body.classList.remove("web-open");
        }
    });

    // REFERENCE SIDEBAR TOGGLE
    referenceToggle.addEventListener("click", () => {
        const isOpen = body.classList.contains("reference-open");
        body.classList.toggle("reference-open", !isOpen);

        // Option C behavior: close map/web when references open
        if (!isOpen) {
            body.classList.remove("map-open");
            body.classList.remove("web-open");
        }
    });

    // Initialize new frontend systems
    initIndexSidebar();
    initReferenceSidebar();
    initContentHover();
});

// TITLE RESIZING
function updateTitleSize() {
    const title = document.getElementById('site-title');
    if (!title) return;

    const w = window.innerWidth;
    let size = 4;

    if (w < 800) size = 3.7;
    if (w < 750) size = 3.4;
    if (w < 700) size = 3.1;
    if (w < 650) size = 2.8;
    if (w < 600) size = 2.5;
    if (w < 550) size = 2.2;

    title.style.fontSize = size + 'rem';
}

window.addEventListener('load', updateTitleSize);
window.addEventListener('resize', updateTitleSize);
window.addEventListener("dragover", e => e.preventDefault());
window.addEventListener("drop", e => e.preventDefault());
document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if (!a) return;
    if (a.href && a.href.startsWith("javascript:")) {
        e.preventDefault();
    }
});
