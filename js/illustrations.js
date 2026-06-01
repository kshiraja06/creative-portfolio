document.addEventListener("DOMContentLoaded", () => {
    setupGalleryLightbox(".illustration-item img");
    setupIllustrationsReveal();
});

function setupIllustrationsReveal() {
    const items = document.querySelectorAll(".reveal-illustrations");
    
    if (!items.length) return;
    
    // Add is-visible class immediately for now since these are inner pages
    items.forEach((item) => {
        item.classList.add("is-visible");
    });
}
