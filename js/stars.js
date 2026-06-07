document.addEventListener("DOMContentLoaded", () => {
    setupCustomCursor();
    setupGalleryLightbox(".gallery-item img");
});

function setupCustomCursor() {
    // Create custom cursor element
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    function getBackgroundColor(el) {
        let current = el;
        while (current && current !== document.body) {
            const bg = window.getComputedStyle(current).backgroundColor;
            if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
                return bg;
            }
            current = current.parentElement;
        }
        return window.getComputedStyle(document.body).backgroundColor;
    }

    function rgbToHex(rgb) {
        const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return null;
        const hex = "#" + [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('')
            .toLowerCase();
        return hex;
    }

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element) {
            const bgColor = getBackgroundColor(element);
            const hexColor = rgbToHex(bgColor);
            
            cursor.classList.remove("on-blue-bg");
            
            if (hexColor) {
                if (hexColor === "#84abcc" || hexColor === "#d4e8f7") {
                    cursor.classList.add("on-blue-bg");
                }
            }
        }
    });

    const interactiveElements = document.querySelectorAll("a, button, .illustration-item, .works-ref-item, .toggle-tab");
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
    });
}
