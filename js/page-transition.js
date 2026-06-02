// Page transition effect for folder navigation
document.addEventListener("DOMContentLoaded", () => {
    // Add transition listeners to work folder links
    document.querySelectorAll(".works-ref-item").forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && !href.startsWith("http")) {
                e.preventDefault();
                transitionToPage(href);
            }
        });
    });

    // Add transition listeners to category navigation links (on work pages)
    document.querySelectorAll(".category-item").forEach((link) => {
        const href = link.getAttribute("href");
        if (href && !link.classList.contains("active")) {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                transitionToPage(href);
            });
        }
    });
});

function transitionToPage(url) {
    window.location.href = url;
}

