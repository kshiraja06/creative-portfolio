document.addEventListener("DOMContentLoaded", () => {
    setupPageEntryTransition();
    setupConceptIntro();
    setupWipeNavigation();
    preloadImages();
});

// Image preloading system
const imageCache = new Map();

function preloadImages() {
    const criticalImages = [
        './assets/works/concept art/city.jpg',
        './assets/works/concept art/heaven.jpg',
        './assets/works/concept art/take 3.jpg'
    ];

    // Preload all images in parallel
    criticalImages.forEach(src => {
        if (!imageCache.has(src)) {
            const img = new Image();
            img.onload = () => {
                imageCache.set(src, img);
                console.log(`Preloaded: ${src}`);
            };
            img.onerror = () => {
                console.error(`Failed to preload: ${src}`);
            };
            img.src = src;
        }
    });
}

function getCachedImage(src) {
    return imageCache.get(src);
}

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

    // Make elements visible immediately for better performance
    gsap.set(".side-scroller-wrap, .slot-label, .concept-title, .concept-gallery", {
        opacity: 1
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
