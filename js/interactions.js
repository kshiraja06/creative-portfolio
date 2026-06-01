document.addEventListener("DOMContentLoaded", () => {
    setupInteractionsReveal();
});

function setupInteractionsReveal() {
    const items = document.querySelectorAll(".reveal-interactions");
    
    if (!items.length) return;
    
    // Add is-visible class immediately for now since these are inner pages
    items.forEach((item) => {
        item.classList.add("is-visible");
    });
}
