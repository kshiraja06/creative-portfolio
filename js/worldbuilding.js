document.addEventListener("DOMContentLoaded", () => {
    setupGalleryLightbox(".gallery-item img");
    setupWorldbuildingReveal();
});

function setupWorldbuildingReveal() {
    const items = document.querySelectorAll(".reveal-worldbuilding");
    
    if (!items.length) return;
    
    // Add is-visible class immediately for now since these are inner pages
    items.forEach((item) => {
        item.classList.add("is-visible");
    });
}
