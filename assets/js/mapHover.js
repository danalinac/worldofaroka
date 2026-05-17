import { attachHoverEmitters } from "./paneHoverEmitter.js";
export function initMapHover() {
    attachHoverEmitters("#map-pane [data-slug]");
}