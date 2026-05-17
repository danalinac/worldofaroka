document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("arcane-sparks");
    if (!container) return;
    const SPARK_COUNT = 120;
    for (let i = 0; i < SPARK_COUNT; i++) {
        const spark = document.createElement("div");
        spark.classList.add("arcane-spark");
        const size = Math.random() * 4 + 2; // 2–6px
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        const opacity = Math.random() * 0.5 + 0.2;
        spark.style.opacity = opacity;
        const hue = 40 + Math.random() * 20;
        const color = `hsla(${hue}, 80%, 65%, ${opacity})`;
        spark.style.background = color;
        spark.style.filter = `drop-shadow(0 0 6px ${color})`;
        const duration = Math.random() * 12 + 8; 
        spark.style.animationDuration = `${duration}s`;
        const delay = Math.random() * 6; // 0–6s
        spark.style.animationDelay = `${delay}s`;
        const drift = Math.random() * 40 - 20; 
        spark.style.setProperty("--drift", `${drift}px`);
        const r = Math.random();
        if (r < 0.12) spark.classList.add("bright-spark");
        else if (r < 0.02) spark.classList.add("supernova");
        spark.style.left = `${Math.random() * 100}vw`;
        container.appendChild(spark);
    }
});