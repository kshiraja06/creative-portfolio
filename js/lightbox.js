function createLightbox(src, alt) {
    document.querySelector(".lightbox")?.remove();

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button type="button" class="lightbox-close" aria-label="Close">×</button>
        </div>
    `;

    document.body.appendChild(lightbox);
    lightbox.addEventListener("click", () => lightbox.remove());

    if (typeof gsap !== "undefined") {
        gsap.from(lightbox, { opacity: 0, duration: 0.3 });
        gsap.from(".lightbox-content img", { scale: 0.8, duration: 0.3 });
    }
}

function setupGalleryLightbox(selector) {
    document.querySelectorAll(selector).forEach((img) => {
        img.addEventListener("click", () => createLightbox(img.src, img.alt));
    });
}
