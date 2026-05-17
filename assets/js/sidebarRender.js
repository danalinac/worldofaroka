let routes = {};

function loadRoutes() {
    return fetch("/data/index.json")
        .then(r => r.json())
        .then(json => {
            routes = json;
        });
}

function buildSidebarTree(flatList) {
    const lookup = {};
    const root = [];

    // Prepare nodes
    flatList.forEach(item => {
        item.children = [];
        lookup[item.slug] = item;
    });

    // Attach children based on slug hierarchy
    flatList.forEach(item => {
        const parts = item.slug.split("/");
        if (parts.length === 1) {
            root.push(item);
            return;
        }

        const parentSlug = parts.slice(0, -1).join("/");
        const parent = lookup[parentSlug];

        if (parent) {
            parent.children.push(item);
        } else {
            root.push(item);
        }
    });

    return root;
}

function isFolder(node) {
    return node && node.isFolder === true;
}

function renderNode(node) {
    const folder = isFolder(node);
    const hasChildren = node.children && node.children.length > 0;

    return `
        <div class="sidebar-node" data-folderpath="${node.folderPath}">
            <div class="sidebar-header ${folder ? "clickable" : ""}"
                 data-slug="${node.slug}"
                 data-folderpath="${node.folderPath}">
                ${folder ? `<span class="arrow">▶</span>` : `<span class="bullet">•</span>`}
                <span class="title">${node.title}</span>
            </div>

            ${hasChildren ? `
                <div class="sidebar-children">
                    ${node.children.map(renderNode).join("")}
                </div>
            ` : ""}
        </div>
    `;
}

import { initSidebarHover } from "./sidebarHover.js";

function loadIndexTree() {
    fetch("/data/index.json")
        .then(r => r.json())
        .then(flatList => {
            const tree = buildSidebarTree(flatList);
            const indexPane = document.getElementById("index-pane");

            indexPane.innerHTML = `
                <div id="sidebar-controls">
                    <input type="text" id="sidebar-search" placeholder="Search the Archives…">
                    <button id="collapse-all-btn">Collapse All</button>
                </div>
                <div id="sidebar-tree">
                    ${tree.map(renderNode).join("")}
                </div>
            `;

            document.querySelectorAll(".sidebar-header").forEach(header => {
                header.addEventListener("click", e => {
                    const slug = header.dataset.slug;
                    const node = header.closest(".sidebar-node");
                    const item = flatList.find(p => p.slug === slug);
                    const folder = isFolder(item);

                    // Folder toggle
                    if (e.target.classList.contains("arrow")) {
                        node.classList.toggle("open");
                        return;
                    }

                    if (folder) {
                        node.classList.toggle("open");
                        return;
                    }

                    // Page navigation (slug → real file path)
                    const realPath = routes[slug];

                    if (realPath) {
                        window.location.href = `/pages/${realPath}`;
                    } else {
                        console.error("No route found for slug:", slug);
                    }
                });
            });

            // Arrow click behavior
            document.querySelectorAll(".arrow").forEach(arrow => {
                arrow.addEventListener("click", e => {
                    e.stopPropagation();
                    e.preventDefault();
                    arrow.closest(".sidebar-node").classList.toggle("open");
                });
            });

            document.getElementById("collapse-all-btn").addEventListener("click", () => {
                document.querySelectorAll(".sidebar-node.open").forEach(node => {
                    node.classList.remove("open");
                });
            });

            const currentPath = window.location.pathname.replace(/^\/pages\//, "");
            const currentSlug = Object.keys(routes).find(slug => routes[slug] === currentPath);

            if (currentSlug) {
                const activeHeader = document.querySelector(
                    `.sidebar-header[data-slug="${currentSlug}"]`
                );

                if (activeHeader) {
                    let node = activeHeader.closest(".sidebar-node");
                    while (node) {
                        node.classList.add("open");
                        node = node.parentElement.closest(".sidebar-node");
                    }
                    activeHeader.classList.add("active-page");
                }
            }

            const searchInput = document.getElementById("sidebar-search");
            let preSearchState = null;
            let preSearchScroll = null;

            function captureSidebarState() {
                preSearchScroll = document.getElementById("index-pane").scrollTop;
                preSearchState = [...document.querySelectorAll(".sidebar-node")].map(node => ({
                    node,
                    open: node.classList.contains("open"),
                    display: node.style.display
                }));
            }

            function restoreSidebarState() {
                if (!preSearchState) return;
                preSearchState.forEach(({ node, open, display }) => {
                    node.classList.toggle("open", open);
                    node.style.display = display;
                });
                document.getElementById("index-pane").scrollTop = preSearchScroll;
                preSearchState = null;
                preSearchScroll = null;
            }

            searchInput.addEventListener("input", () => {
                const query = searchInput.value.toLowerCase();
                const allNodes = document.querySelectorAll(".sidebar-node");

                if (!query) {
                    restoreSidebarState();
                    return;
                }

                if (!preSearchState) {
                    captureSidebarState();
                }

                allNodes.forEach(node => {
                    node.style.display = "none";
                    node.classList.remove("open");
                });

                allNodes.forEach(node => {
                    const title = node.querySelector(".title").textContent.toLowerCase();
                    const match = title.includes(query);

                    if (match) {
                        node.style.display = "";
                        let parent = node.parentElement.closest(".sidebar-node");
                        while (parent) {
                            parent.style.display = "";
                            parent.classList.add("open");
                            parent = parent.parentElement.closest(".sidebar-node");
                        }
                    }
                });
            });

            initSidebarHover();
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadRoutes().then(loadIndexTree);
});
