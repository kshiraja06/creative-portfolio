// Page transition effect for folder navigation
document.addEventListener("DOMContentLoaded", () => {
    // Add transition listeners to work folder links
    document.querySelectorAll(".works-ref-item").forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && !href.startsWith("http")) {
                e.preventDefault();
                transitionToPage(href);
            }
        });
    });

    // Add transition listeners to category navigation links (on work pages)
    document.querySelectorAll(".category-item").forEach((link) => {
        const href = link.getAttribute("href");
        if (href && !link.classList.contains("active")) {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                transitionToPage(href);
            });
        }
    });
});

function transitionToPage(url) {
    if (typeof gsap === "undefined") {
        window.location.href = url;
        return;
    }

    // Create a fade overlay
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
        opacity: 0;
        z-index: 10000;
        pointer-events: none;
    `;
    document.body.appendChild(overlay);

    // Quick fade to black and navigate
    gsap.to(overlay, {
        opacity: 0.5,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => {
            window.location.href = url;
        }
    });
}

