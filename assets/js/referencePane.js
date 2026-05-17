import { initReferenceHover } from "./referenceHover.js";

export function renderReferencePane() {
    const list = document.getElementById("reference-list");
    if (!list) return;

    // Read embedded reference data
    const dataEl = document.getElementById("page-reference-data");
    if (!dataEl) {
        list.innerHTML = `<div class="empty">No references</div>`;
        return;
    }

    const references = JSON.parse(dataEl.textContent);
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

        div.onclick = () => {
            window.location.href = `/pages/${ref.slug}/index.html`;
        };

        list.appendChild(div);
    }

    initReferenceHover();
}
