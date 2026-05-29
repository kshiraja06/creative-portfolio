document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") {
        return;
    }

    gsap.set(".interactions-title, .interactions-description, .interactions-buttons", {
        opacity: 1
    });
});
