import { attachHoverEmitters } from "./paneHoverEmitter.js";
export function initSidebarHover() {
    attachHoverEmitters("#left-sidebar .sidebar-header");
}