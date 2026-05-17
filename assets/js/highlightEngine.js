export function clearAllHighlights() {
    document.querySelectorAll(".hover-highlight").forEach(el =>
        el.classList.remove("hover-highlight")
    );
    document.querySelectorAll(".hover-ancestor").forEach(el =>
        el.classList.remove("hover-ancestor")
    );
}
function highlightSidebarAncestors(header) {
    let node = header.closest(".sidebar-node")?.parentElement?.closest(".sidebar-node");
    while (node) {
        node.classList.add("hover-ancestor");
        node = node.parentElement?.closest(".sidebar-node");
    }
}
export function highlightAll(slug) {
    clearAllHighlights();
    const matches = document.querySelectorAll(`[data-slug="${slug}"]`);
    matches.forEach(el => {
        if (el.classList.contains("sidebar-header")) {
            el.classList.add("hover-highlight");
            highlightSidebarAncestors(el);
            return;
        }
        const header = el.closest(".sidebar-node")?.querySelector(".sidebar-header");
        if (header) {
            header.classList.add("hover-highlight");
            highlightSidebarAncestors(header);
        }
        el.classList.add("hover-highlight");
    });
}