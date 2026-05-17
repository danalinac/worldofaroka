import { emitHover, onHover } from "./hoverBus.js";

function getPageMeta() {
    const el = document.getElementById("page-meta");
    if (!el) return null;
    try {
        return JSON.parse(el.textContent || "{}");
    } catch {
        return null;
    }
}

function buildTree(index) {
    const { pages, tree } = index;
    return { pages, tree };
}

function renderTreeNode(key, tree, pages) {
    const node = tree[key];
    if (!node) return "";

    const isFolder = !!node.hubpage;
    const hub = isFolder ? pages[node.hubpage] : null;
    const label = hub ? hub.title : node.title;
    const slug = isFolder ? node.hubpage : key;

    const childrenHtml = (node.children || [])
        .slice()
        .sort((a, b) => {
            const ta = (pages[a]?.title || a).toLowerCase();
            const tb = (pages[b]?.title || b).toLowerCase();
            return ta.localeCompare(tb);
        })
        .map(childKey => {
            if (tree[childKey]) {
                return renderTreeNode(childKey, tree, pages);
            }
            const p = pages[childKey];
            if (!p) return "";
            return `
                <div class="sidebar-node leaf" data-slug="${childKey}">
                    <div class="sidebar-header" data-slug="${childKey}">
                        <span class="bullet">•</span>
                        <span class="title">${p.title}</span>
                    </div>
                </div>
            `;
        })
        .join("");

    return `
        <div class="sidebar-node folder" data-slug="${slug}">
            <div class="sidebar-header folder-header" data-slug="${slug}">
                <span class="arrow">▶</span>
                <span class="title">${label}</span>
            </div>
            <div class="sidebar-children">
                ${childrenHtml}
            </div>
        </div>
    `;
}

function renderIndex(index) {
    const { pages, tree } = buildTree(index);
    const indexPane = document.getElementById("index-pane");
    if (!indexPane) return;

<<<<<<< HEAD
    // ⭐ FIX: Exclude __root__ so it does NOT render as an empty folder
    const topLevelKeys = Object.keys(tree)
        .filter(k => k !== "__root__" && !k.includes("/"));

=======
    const topLevelKeys = Object.keys(tree).filter(k => !k.includes("/"));
>>>>>>> 084ad79dce30f7e417d272552f3b62c8ddf01b0c
    const sortedTop = topLevelKeys.sort((a, b) => {
        const ta = (tree[a].title || a).toLowerCase();
        const tb = (tree[b].title || b).toLowerCase();
        return ta.localeCompare(tb);
    });

    indexPane.innerHTML = `
        <div id="sidebar-controls">
            <input type="text" id="sidebar-search" placeholder="Search the Archives…">
            <button id="collapse-all-btn">Collapse All</button>
        </div>
        <div id="sidebar-tree">
            ${sortedTop.map(k => renderTreeNode(k, tree, pages)).join("")}
        </div>
    `;

    wireIndexBehavior(indexPane, pages);
}

function wireIndexBehavior(indexPane, pages) {
    const treeRoot = indexPane.querySelector("#sidebar-tree");
    const searchInput = indexPane.querySelector("#sidebar-search");
    const collapseBtn = indexPane.querySelector("#collapse-all-btn");

    treeRoot.addEventListener("click", e => {
        const header = e.target.closest(".sidebar-header");
        if (!header) return;

        const slug = header.dataset.slug;
        const node = header.closest(".sidebar-node");
        const isFolder = node.classList.contains("folder");

        const clickedArrow = e.target.closest(".arrow");
        const clickedTitle = e.target.closest(".title");

        if (isFolder) {
            if (clickedArrow) {
<<<<<<< HEAD
                node.classList.toggle("open");
            } else if (clickedTitle) {
                window.location.href = `/pages/${slug}/index.html`;
            }
        } else {
=======
                // Arrow click → expand/collapse
                node.classList.toggle("open");
            } else if (clickedTitle) {
                // Title click → navigate to hubpage
                window.location.href = `/pages/${slug}/index.html`;
            }
            // Ignore clicks on the rest of the header
        } else {
            // Leaf → navigate
>>>>>>> 084ad79dce30f7e417d272552f3b62c8ddf01b0c
            window.location.href = `/pages/${slug}/index.html`;
        }
    });

    treeRoot.addEventListener("mouseenter", e => {
        const header = e.target.closest(".sidebar-header");
        if (!header) return;
        const slug = header.dataset.slug;
        emitHover({ slug });
    }, true);

    treeRoot.addEventListener("mouseleave", e => {
        const header = e.target.closest(".sidebar-header");
        if (!header) return;
        emitHover({ slug: null });
    }, true);

<<<<<<< HEAD
=======
    // collapse all
>>>>>>> 084ad79dce30f7e417d272552f3b62c8ddf01b0c
    collapseBtn.addEventListener("click", () => {
        treeRoot.querySelectorAll(".sidebar-node.folder.open").forEach(node => {
            node.classList.remove("open");
        });
    });

<<<<<<< HEAD
=======
    // search behavior with state restore
>>>>>>> 084ad79dce30f7e417d272552f3b62c8ddf01b0c
    let preSearchState = null;
    let preSearchScroll = null;

    function captureState() {
        const nodes = [...treeRoot.querySelectorAll(".sidebar-node")];
        preSearchState = nodes.map(node => ({
            node,
            open: node.classList.contains("open"),
            display: node.style.display || ""
        }));
        preSearchScroll = indexPane.scrollTop;
    }

    function restoreState() {
        if (!preSearchState) return;
        preSearchState.forEach(({ node, open, display }) => {
            node.classList.toggle("open", open);
            node.style.display = display;
        });
        indexPane.scrollTop = preSearchScroll || 0;
        preSearchState = null;
        preSearchScroll = null;
    }

<<<<<<< HEAD
=======
    // ⭐ SECURITY + PERFORMANCE HARDENED SEARCH
>>>>>>> 084ad79dce30f7e417d272552f3b62c8ddf01b0c
    let searchTimer = null;

    searchInput.addEventListener("input", () => {
        clearTimeout(searchTimer);

        searchTimer = setTimeout(() => {
            let q = searchInput.value;

            if (q.length > 50) {
                q = q.slice(0, 50);
                searchInput.value = q;
            }

<<<<<<< HEAD
            q = q.replace(/[<>"'`{}();]/g, "");

=======
            // 2. Strip dangerous characters
            q = q.replace(/[<>"'`{}();]/g, "");

            // 3. Reject obvious code injection attempts
>>>>>>> 084ad79dce30f7e417d272552f3b62c8ddf01b0c
            if (/script|onerror|onload|function|=>|<|>|{|}/i.test(q)) {
                return;
            }

<<<<<<< HEAD
=======
            // 4. Normalize
>>>>>>> 084ad79dce30f7e417d272552f3b62c8ddf01b0c
            q = q.trim().toLowerCase();

            const allNodes = treeRoot.querySelectorAll(".sidebar-node");

            if (!q) {
                restoreState();
                return;
            }

            if (!preSearchState) {
                captureState();
            }

            allNodes.forEach(node => {
                node.style.display = "none";
                node.classList.remove("open");
            });

            allNodes.forEach(node => {
                const titleEl = node.querySelector(".title");
                if (!titleEl) return;
                const title = titleEl.textContent.toLowerCase();
                const match = title.includes(q);
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
<<<<<<< HEAD
        }, 120);
    });

=======
        }, 120); // debounce
    });

    // highlight current page + auto-expand parents
>>>>>>> 084ad79dce30f7e417d272552f3b62c8ddf01b0c
    const meta = getPageMeta();
    const currentSlug = meta?.slug;
    if (currentSlug) {
        const currentHeader = treeRoot.querySelector(`.sidebar-header[data-slug="${currentSlug}"]`);
        if (currentHeader) {
            currentHeader.classList.add("active-page");
            let node = currentHeader.closest(".sidebar-node");
            while (node) {
                node.classList.add("open");
                node = node.parentElement.closest(".sidebar-node");
            }
        }
    }

<<<<<<< HEAD
=======
    // listen for hover from other panes
>>>>>>> 084ad79dce30f7e417d272552f3b62c8ddf01b0c
    onHover(({ slug }) => {
        const headers = treeRoot.querySelectorAll(".sidebar-header");
        headers.forEach(h => {
            const hSlug = h.dataset.slug;
            const match = slug && (hSlug === slug || slug.startsWith(hSlug + "/"));
            h.classList.toggle("hover-linked", !!match);
        });
    });
}

export async function initIndexSidebar() {
    const res = await fetch("/data/index.json");
    const index = await res.json();
    renderIndex(index);
}
