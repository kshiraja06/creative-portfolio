document.addEventListener("DOMContentLoaded", () => {
    setupSiteHeader();
    setupCustomCursor();
    // Show header on work pages
    const header = document.querySelector(".site-header");
    if (header && !document.getElementById("landing")) {
        header.classList.add("visible");
    }
});

function setupCustomCursor() {
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
            
            cursor.classList.remove("on-blue-bg", "on-pink", "on-blue", "on-cream", "on-brown");
            
            if (hexColor) {
                if (hexColor === "#84abcc" || hexColor === "#d4e8f7") {
                    cursor.classList.add("on-blue-bg");
                } else if (hexColor === "#e6a2a1") {
                    cursor.classList.add("on-pink");
                } else if (hexColor === "#e6e1c1") {
                    cursor.classList.add("on-cream");
                }
            }
        }
    });

    const interactiveElements = document.querySelectorAll("a, button, .illustration-item, .works-ref-item, .toggle-tab, .design-category, .gallery-item img");
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
    });
}

function setupSiteHeader() {
    const isHomePage = Boolean(document.getElementById("landing"));

    document.querySelectorAll(".top-nav .nav-link").forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            
            // If on work page and clicking contact, use local anchor
            if (!isHomePage && href?.includes("#contact")) {
                event.preventDefault();
                const contactSection = document.querySelector("#contact");
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.pushState(null, "", "#contact");
                }
                return;
            }
            
            if (!href?.includes("#") || !isHomePage) {
                return;
            }

            const hash = href.slice(href.indexOf("#"));
            const target = document.querySelector(hash);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, "", hash);
        });
    });
}
