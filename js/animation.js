document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") {
        return;
    }

    gsap.set(".animation-title, .animation-description, .animation-video", { opacity: 1 });
});
