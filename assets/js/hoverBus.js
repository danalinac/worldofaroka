// Simple global hover bus using CustomEvent
const EVENT_NAME = "link-hover";

export function emitHover(payload) {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: payload }));
}

export function onHover(handler) {
    window.addEventListener(EVENT_NAME, e => handler(e.detail));
}
