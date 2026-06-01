document.addEventListener("DOMContentLoaded", () => {
    initializeCardsAnimation();
    setupPackagingLightbox();
    setupGraphicDesignReveal();
});

function setupGraphicDesignReveal() {
    const items = document.querySelectorAll(".reveal-graphic-design");
    
    if (!items.length) return;
    
    // Add is-visible class immediately for now since these are inner pages
    items.forEach((item) => {
        item.classList.add("is-visible");
    });
}

function initializeCardsAnimation() {
    const cardsSpread = document.getElementById("cards-spread");
    if (!cardsSpread || typeof gsap === "undefined") {
        return;
    }

    const cards = cardsSpread.querySelectorAll(".card-back");
    cards.forEach((card, index) => {
        const angle = (index - 1.5) * 15;
        const x = (index - 1.5) * 40;
        const y = Math.abs(index - 1.5) * 20;

        gsap.set(card, {
            rotation: angle,
            x,
            y,
            scale: 0.9,
            scaleX: -1,
            transformOrigin: "center center",
            cursor: "pointer"
        });
    });

    cardsSpread.addEventListener("mouseenter", expandCards);
    cardsSpread.addEventListener("mouseleave", collapseCards);
}

function expandCards() {
    const cards = document.querySelectorAll(".card-back");
    cards.forEach((card, index) => {
        card.src = `../assets/works/graphic design/front ${index + 1}.png`;
        gsap.to(card, {
            rotation: 0,
            x: index * 280 - 420,
            y: 0,
            scale: 1,
            scaleX: -1,
            duration: 1,
            ease: "none"
        });
    });
}

function collapseCards() {
    const cards = document.querySelectorAll(".card-back");
    cards.forEach((card, index) => {
        card.src = `../assets/works/graphic design/back ${index + 1}.png`;
        const angle = (index - 1.5) * 15;
        const x = (index - 1.5) * 40;
        const y = Math.abs(index - 1.5) * 20;

        gsap.to(card, {
            rotation: angle,
            x,
            y,
            scale: 0.9,
            scaleX: -1,
            duration: 1,
            ease: "none"
        });
    });
}

function setupPackagingLightbox() {
    const packagingImg = document.getElementById("packaging-img");
    if (!packagingImg) {
        return;
    }

    packagingImg.style.cursor = "pointer";
    packagingImg.addEventListener("click", () => {
        createLightbox(packagingImg.src, "Packaging Design");
    });
}
