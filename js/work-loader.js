document.addEventListener("DOMContentLoaded", async () => {
    const loader = document.getElementById("loader");
    const header = document.querySelector(".site-header");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!loader) {
        if (header) header.classList.add("visible");
        return;
    }

    // Set loading text based on page
    const body = document.body;
    const pageTitle = document.title.replace("Kshiraja | ", "").toLowerCase();
    const loaderText = loader.querySelector(".loader-inner p");
    if (loaderText) {
        loaderText.textContent = `loading ${pageTitle}`;
    }

    if (reducedMotion) {
        loader.remove();
        if (header) header.classList.add("visible");
        revealContent();
        return;
    }

    // Wait for all images to load
    await waitForImages();
    
    // Run loader sequence
    runLoaderSequence(() => {
        revealContent();
    });
});

async function waitForImages() {
    const images = document.querySelectorAll("img");
    const imagePromises = Array.from(images).map(img => {
        if (img.complete) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            img.addEventListener("load", resolve);
            img.addEventListener("error", resolve);
        });
    });

    await Promise.all(imagePromises);

    // Special handling for stars page with PDF rendering
    if (document.body.classList.contains("stars-page")) {
        await waitForPDFRendering();
    }
}

async function waitForPDFRendering() {
    // Trigger PDF loading if the function is available
    if (typeof window.loadStarsPDF === "function") {
        await window.loadStarsPDF();
    }

    const container = document.getElementById("pdf-container");
    if (!container) return;

    // Wait for at least 3 pages to render before showing content
    const checkInterval = setInterval(() => {
        const canvases = container.querySelectorAll("canvas.pdf-page");
        
        // Show content after at least 3 pages are rendered
        if (canvases.length >= 3) {
            clearInterval(checkInterval);
        }
    }, 100);

    // Timeout after 5 seconds to prevent infinite wait
    await new Promise(resolve => {
        setTimeout(() => {
            clearInterval(checkInterval);
            resolve();
        }, 5000);
    });
}

function runLoaderSequence(onComplete) {
    if (typeof gsap === "undefined") {
        document.getElementById("loader")?.remove();
        if (typeof onComplete === "function") {
            onComplete();
        }
        return;
    }

    const loader = document.getElementById("loader");
    const header = document.querySelector(".site-header");

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(".loader-star", { scale: 0.5, opacity: 0, duration: 0.5 })
        .to(".loader-star", { rotation: 360, duration: 0.9, ease: "power2.inOut" })
        .from(".loader-inner p", { y: 14, opacity: 0, duration: 0.45 }, "-=0.75")
        .to(loader, { opacity: 0, duration: 0.65, delay: 0.25 })
        .set(loader, { display: "none" })
        .add(() => {
            if (header) header.classList.add("visible");
        })
        .add(() => {
            if (typeof onComplete === "function") {
                onComplete();
            }
        });
}

function revealContent() {
    // Reveal elements based on page type
    const revealClasses = [
        ".reveal-worldbuilding",
        ".reveal-visual-design",
        ".reveal-interactions",
        ".reveal-illustrations",
        ".reveal-concept",
        ".reveal-graphic-design",
        ".reveal-animatic"
    ];

    revealClasses.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            if (typeof gsap !== "undefined") {
                gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            } else {
                elements.forEach(el => el.classList.add("is-visible"));
            }
        }
    });
}
