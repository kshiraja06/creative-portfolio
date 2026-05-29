document.addEventListener("DOMContentLoaded", () => {
    setupSiteHeader();
});

function setupSiteHeader() {
    const isHomePage = Boolean(document.getElementById("landing"));

    document.querySelectorAll(".top-nav .nav-link").forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href?.includes("#") || !isHomePage) {
                return;
            }

            const hash = href.slice(href.indexOf("#"));
            const target = document.querySelector(hash);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, "", hash);
        });
    });
}
