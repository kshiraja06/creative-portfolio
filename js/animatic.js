document.addEventListener("DOMContentLoaded", () => {
    setupAnimationReveal();
});

function setupAnimationReveal() {
    const items = document.querySelectorAll(".reveal-animatic");
    
    if (!items.length) return;
    
    // Add is-visible class immediately for now since these are inner pages
    items.forEach((item) => {
        item.classList.add("is-visible");
    });
}

