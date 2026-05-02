document.addEventListener("DOMContentLoaded", () => {
    setupPageEntryTransition();
    setupAnimationIntro();
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

function setupAnimationIntro() {
    if (typeof gsap === "undefined") {
        return;
    }

    // Make all elements visible simultaneously after page transition
    gsap.delayedCall(0.2, () => {
        gsap.to(".side-scroller-wrap, .slot-label, .category-nav, .animation-title, .animation-description, .animation-video", {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
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
