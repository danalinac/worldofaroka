import { emitHover, emitUnhover } from "./hoverBus.js";
export function attachHoverEmitters(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        const slug = el.dataset.slug;
        if (!slug) return;
        el.addEventListener("mouseenter", () => {
            emitHover(slug);
        });
        el.addEventListener("mouseleave", () => {
            emitUnhover(slug);
        });
    });
}