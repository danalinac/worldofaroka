import { emitHover, onHover } from "./hoverBus.js";

function extractSlug(href) {
    try {
        href = new URL(href, window.location.origin).pathname;
    } catch {
        return null;
    }

    const m = href.match(/^\/pages\/(.+?)(?:\/index\.html)?\/?$/);
    return m ? m[1] : null;
}

export function initContentHover() {
    // IMPORTANT: use scroll-wrapper, not content-pane
    const root = document.getElementById("scroll-wrapper");
    if (!root) return;

    const links = root.querySelectorAll("a[href]");

    links.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        const slug = extractSlug(href);
        if (!slug) return;

        link.dataset.slug = slug;

        link.addEventListener("mouseenter", () => emitHover({ slug }));
        link.addEventListener("mouseleave", () => emitHover({ slug: null }));
    });

    onHover(({ slug }) => {
        links.forEach(link => {
            link.classList.toggle("hover-linked", slug && link.dataset.slug === slug);
        });
    });
}
