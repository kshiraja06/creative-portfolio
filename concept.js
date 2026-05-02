document.addEventListener("DOMContentLoaded", () => {
    setupPageEntryTransition();
    setupConceptIntro();
    setupWipeNavigation();
});

function setupPageEntryTransition() {
    const wipe = document.getElementById("page-wipe");
    if (!wipe || typeof gsap === "undefined") {
        return;
    }

    // Simple fade out
    gsap.set(wipe, { opacity: 1 });
    gsap.to(wipe, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    });
}

function setupConceptIntro() {
    if (typeof gsap === "undefined") {
        return;
    }

    // Make all elements visible simultaneously after page transition
    gsap.delayedCall(0.2, () => {
        gsap.to(".side-scroller-wrap, .slot-label, .category-nav, .concept-title, .concept-description, .concept-gallery .gallery-item", {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    // Add click-to-enlarge functionality
    const galleryItems = document.querySelectorAll(".gallery-item img");
    galleryItems.forEach(img => {
        img.addEventListener("click", () => {
            createLightbox(img.src, img.alt);
        });
    });
}

function createLightbox(src, alt) {
    // Remove existing lightbox if any
    const existing = document.querySelector(".lightbox");
    if (existing) {
        existing.remove();
    }

    // Create lightbox
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">×</button>
        </div>
    `;

    document.body.appendChild(lightbox);

    // Add click to close
    lightbox.addEventListener("click", () => {
        lightbox.remove();
    });

    // Animate in
    gsap.from(lightbox, { opacity: 0, duration: 0.3 });
    gsap.from(".lightbox-content img", { scale: 0.8, duration: 0.3 });
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
            gsap.killTweensOf(wipe);
            
            // Simple fade in and navigate
            gsap.set(wipe, { opacity: 0 });
            gsap.to(wipe, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    window.location.href = href;
                }
            });
        });
    });
}
