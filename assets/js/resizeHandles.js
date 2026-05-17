(function() {
  let activeHandle = null;
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;
  function setVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }
  function startResize(e, handle) {
    activeHandle = handle;
    const isTouch = e.type.startsWith("touch");
    const point = isTouch ? e.touches[0] : e;
    startX = point.clientX;
    startY = point.clientY;
    const styles = getComputedStyle(document.documentElement);
    if (handle === "left") {
      startWidth = parseInt(styles.getPropertyValue("--left-sidebar-width"));
    }
    if (handle === "right") {
      startWidth = parseInt(styles.getPropertyValue("--right-sidebar-width"));
    }
    if (handle === "map") {
      startHeight = parseInt(styles.getPropertyValue("--map-pane-height"));
    }
    if (handle === "web") {
      startHeight = parseInt(styles.getPropertyValue("--web-pane-height"));
    }
    document.body.classList.add("resizing");
    window.addEventListener("mousemove", onResize);
    window.addEventListener("touchmove", onResize, { passive: false });
    window.addEventListener("mouseup", stopResize);
    window.addEventListener("touchend", stopResize);
  }
  function onResize(e) {
    if (!activeHandle) return;
    const isTouch = e.type.startsWith("touch");
    const point = isTouch ? e.touches[0] : e;
    if (activeHandle === "left") {
      const delta = point.clientX - startX;
      const newWidth = Math.max(150, startWidth + delta);
      setVar("--left-sidebar-width", `${newWidth}px`);
    }
    if (activeHandle === "right") {
      const delta = startX - point.clientX;
      const newWidth = Math.max(150, startWidth + delta);
      setVar("--right-sidebar-width", `${newWidth}px`);
    }
    if (activeHandle === "map") {
      const delta = startY - point.clientY;
      const newHeight = Math.max(150, startHeight + delta);
      setVar("--map-pane-height", `${newHeight}px`);
    }
    if (activeHandle === "web") {
      const delta = startY - point.clientY;
      const newHeight = Math.max(150, startHeight + delta);
      setVar("--web-pane-height", `${newHeight}px`);
    }
    e.preventDefault();
  }
  function stopResize() {
    activeHandle = null;
    document.body.classList.remove("resizing");
    window.removeEventListener("mousemove", onResize);
    window.removeEventListener("touchmove", onResize);
    window.removeEventListener("mouseup", stopResize);
    window.removeEventListener("touchend", stopResize);
  }
  function init() {
    const left = document.getElementById("left-resize-handle");
    const right = document.getElementById("right-resize-handle");
    const map = document.getElementById("map-resize-handle");
    const web = document.getElementById("web-resize-handle");
    if (left) {
      left.addEventListener("mousedown", e => startResize(e, "left"));
      left.addEventListener("touchstart", e => startResize(e, "left"));
    }
    if (right) {
      right.addEventListener("mousedown", e => startResize(e, "right"));
      right.addEventListener("touchstart", e => startResize(e, "right"));
    }
    if (map) {
      map.addEventListener("mousedown", e => startResize(e, "map"));
      map.addEventListener("touchstart", e => startResize(e, "map"));
    }
    if (web) {
      web.addEventListener("mousedown", e => startResize(e, "web"));
      web.addEventListener("touchstart", e => startResize(e, "web"));
    }
  }
  document.addEventListener("DOMContentLoaded", init);
})();