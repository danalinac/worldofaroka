import { emitHover, onHover } from "./hoverBus.js";

export function initReferenceSidebar() {
    const list = document.getElementById("reference-list");
    if (!list) return;

    const dataEl = document.getElementById("page-reference-data");
    if (!dataEl) {
        list.innerHTML = `<div class="empty">No references</div>`;
        return;
    }

    const references = JSON.parse(dataEl.textContent || "[]");
    if (!references || references.length === 0) {
        list.innerHTML = `<div class="empty">No references</div>`;
        return;
    }

    list.innerHTML = "";
    for (const ref of references) {
        const div = document.createElement("div");
        div.className = "reference-item";
        div.dataset.slug = ref.slug;
        div.textContent = ref.title;

        div.addEventListener("click", () => {
            window.location.href = `/pages/${ref.slug}/index.html`;
        });

        div.addEventListener("mouseenter", () => {
            emitHover({ slug: ref.slug });
        });
        div.addEventListener("mouseleave", () => {
            emitHover({ slug: null });
        });

        list.appendChild(div);
    }

    // listen for hover events from other panes
    onHover(({ slug }) => {
        const items = list.querySelectorAll(".reference-item");
        items.forEach(item => {
            item.classList.toggle("hover-linked", slug && item.dataset.slug === slug);
        });
    });
}
