document.addEventListener("DOMContentLoaded", () => {
    setupPageEntryTransition();
    setupIllustrationsIntro();
    setupWipeNavigation();
    preloadImages();
});

// Image preloading system
const imageCache = new Map();

function preloadImages() {
    const criticalImages = [
        './assets/works/personal/blue.jpg',
        './assets/works/personal/zuko.jpg',
        './assets/works/personal/earring.jpg',
        './assets/works/personal/horror poster.jpg',
        './assets/works/personal/car poster.jpg',
        './assets/works/personal/vent.jpg',
        './assets/works/personal/gartic dosts 2.png'
    ];

    // Preload first 3 images immediately (above the fold)
    const immediatePreload = criticalImages.slice(0, 3);
    immediatePreload.forEach(src => {
        if (!imageCache.has(src)) {
            const img = new Image();
            img.onload = () => {
                imageCache.set(src, img);
                console.log(`Immediate preload: ${src}`);
            };
            img.src = src;
        }
    });

    // Preload remaining images with slight delay
    setTimeout(() => {
        const delayedPreload = criticalImages.slice(3);
        delayedPreload.forEach(src => {
            if (!imageCache.has(src)) {
                const img = new Image();
                img.onload = () => {
                    imageCache.set(src, img);
                    console.log(`Delayed preload: ${src}`);
                };
                img.src = src;
            }
        });
    }, 1000);
}

function getCachedImage(src) {
    return imageCache.get(src);
}

function setupPageEntryTransition() {
    const wipe = document.getElementById("page-wipe");
    if (!wipe || typeof gsap === "undefined") {
        return;
    }

    // Hide wipe immediately to prevent any flash
    gsap.set(wipe, { opacity: 0 });
}

function setupIllustrationsIntro() {
    if (typeof gsap === "undefined") {
        return;
    }

    // Make elements visible immediately for better performance
    gsap.set(".side-scroller-wrap, .slot-label, .illustrations-title, .illustrations-grid", {
        opacity: 1
    });

    // Add click-to-enlarge functionality for images
    const illustrationItems = document.querySelectorAll(".illustration-item img");
    illustrationItems.forEach(img => {
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
            // Navigate immediately without transition to prevent glitches
            window.location.href = href;
        });
    });
}
