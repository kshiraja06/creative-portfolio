document.addEventListener("DOMContentLoaded", () => {
    setupPageEntryTransition();
    setupWorksIntro();
    setupWipeNavigation();
});

function setupPageEntryTransition() {
    const wipe = document.getElementById("page-wipe");
    if (!wipe || typeof gsap === "undefined") {
        return;
    }

    // Hide wipe immediately to prevent any flash
    gsap.set(wipe, { opacity: 0 });
}

function setupWorksIntro() {
    // Make all elements visible immediately to prevent loading issues
    const revealElements = document.querySelectorAll(".reveal-works");
    revealElements.forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "none";
    });

    if (typeof gsap === "undefined") {
        return;
    }

    // Simple fade in animation for all elements
    gsap.delayedCall(0.1, () => {
        gsap.to(".side-scroller-wrap, .slot-label, .works-ref-title, .works-ref-item", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    // Add hover effects
    const workItems = document.querySelectorAll(".works-ref-item");
    workItems.forEach(item => {
        const img = item.querySelector("img");
        const folder = item.querySelector(".folder-container");
        
        item.addEventListener("mouseenter", () => {
            gsap.to(folder, { scale: 1.1, rotation: 5, duration: 0.3, ease: "power2.out" });
            gsap.to(img, { filter: "brightness(1.1) drop-shadow(0 16px 32px rgba(92, 70, 48, 0.3))", duration: 0.3 });
        });
        
        item.addEventListener("mouseleave", () => {
            gsap.to(folder, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
            gsap.to(img, { filter: "brightness(1) drop-shadow(0 8px 16px rgba(92, 70, 48, 0.15))", duration: 0.3 });
        });
    });
}

function setupWipeNavigation() {
    const links = document.querySelectorAll(".slot-link");
    const wipe = document.getElementById("page-wipe");
    if (!links.length || !wipe || typeof gsap === "undefined") {
        return;
    }

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#")) {
                return;
            }

            event.preventDefault();
            // Navigate immediately without transition to prevent glitches
            window.location.href = href;
        });
    });
}
