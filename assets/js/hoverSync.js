import { onHover, onUnhover } from "./hoverBus.js";
import { highlightAll, clearAllHighlights } from "./highlightEngine.js";
onHover(slug => highlightAll(slug));
onUnhover(() => clearAllHighlights());
onHover(slug => {
    console.log("GLOBAL HOVER RECEIVED:", slug);
    highlightAll(slug);
});