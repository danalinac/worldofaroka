import { attachHoverEmitters } from "./paneHoverEmitter.js";
export function initWebHover() {
    attachHoverEmitters("#web-pane [data-slug]");
}