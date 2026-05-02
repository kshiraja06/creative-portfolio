document.addEventListener("DOMContentLoaded", async () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.getElementById("loader")?.remove();
        startTypewriter(false);
        setupAboutReveal(false);
        setupStripReveal(false);
        return;
    }

    await waitForCriticalFonts();
    runLoaderSequence(() => startTypewriter(true));
    setupAboutReveal(true);
    setupStripReveal(true);
    setupSectionTransitions();
    setupWipeNavigation();
});

async function waitForCriticalFonts() {
    if (!("fonts" in document)) {
        return;
    }

    const maxWait = new Promise((resolve) => setTimeout(resolve, 900));
    await Promise.race([document.fonts.ready, maxWait]);
}

function runLoaderSequence(onComplete) {
    const loader = document.getElementById("loader");
    if (!loader || typeof gsap === "undefined") {
        loader?.remove();
        if (typeof onComplete === "function") {
            onComplete();
        }
        return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(".loader-star", { scale: 0.5, opacity: 0, duration: 0.5 })
        .to(".loader-star", { rotation: 360, duration: 0.9, ease: "power2.inOut" })
        .from(".loader-inner p", { y: 14, opacity: 0, duration: 0.45 }, "-=0.75")
        .to(loader, { opacity: 0, duration: 0.65, delay: 0.25 })
        .set(loader, { display: "none" })
        .from(".landing-top p", { y: -20, opacity: 0, stagger: 0.08, duration: 0.6 }, "-=0.2")
        .from(".headline-top", { y: 26, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".headline-words", { y: 20, opacity: 0, duration: 0.7 }, "<")
        .from(".side-scroller-wrap", { x: -40, opacity: 0, duration: 0.7 }, "-=0.6")
        .from(".slot-label", { y: 2, opacity: 0, duration: 0.45 }, "<")
        .from(".star", { scale: 0.6, opacity: 0, stagger: 0.07, duration: 0.65 }, "-=0.7")
        .add(() => {
            if (typeof onComplete === "function") {
                onComplete();
            }
        });
}

function startTypewriter(withGsap) {
    const target = document.getElementById("typed-word");
    if (!target) {
        return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const orderedWords = ["illustrations", "design", "coding"];
    wordIndex = 0;
    target.textContent = "";
    charIndex = 0;

    const tick = () => {
        const full = orderedWords[wordIndex];
        if (isDeleting) {
            charIndex -= 1;
        } else {
            charIndex += 1;
        }

        target.textContent = full.slice(0, charIndex);

        let delay = isDeleting ? 58 : 94;
        if (!isDeleting && charIndex >= full.length) {
            delay = 850;
            isDeleting = true;
        } else if (isDeleting && charIndex <= 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % orderedWords.length;
            delay = 240;
        }

        setTimeout(tick, delay);
    };

    if (withGsap && typeof gsap !== "undefined") {
        gsap.from(target, { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" });
    }

    setTimeout(tick, 900);
}

function setupAboutReveal(withGsap) {
    const aboutSection = document.querySelector(".about-section");
    const aboutItems = document.querySelectorAll(".reveal-about");
    const homeLabel = document.querySelector('[data-nav="home"]');
    const aboutLabel = document.querySelector('[data-nav="about"]');
    let hasRevealed = false;

    if (!aboutSection || !aboutItems.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        aboutItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    if (homeLabel && aboutLabel) {
                        aboutLabel.classList.remove("active");
                        homeLabel.classList.add("active");
                    }
                    return;
                }

                if (homeLabel && aboutLabel) {
                    homeLabel.classList.remove("active");
                    aboutLabel.classList.add("active");
                }

                if (hasRevealed) {
                    return;
                }

                if (withGsap && typeof gsap !== "undefined") {
                    gsap.fromTo(
                        ".about-section",
                        { clipPath: "inset(14% 0 0 0 round 34px)", opacity: 0.78 },
                        { clipPath: "inset(0% 0 0 0 round 0px)", opacity: 1, duration: 0.95, ease: "power2.out" }
                    );
                }

                aboutItems.forEach((item, index) => {
                    if (withGsap && typeof gsap !== "undefined") {
                        gsap.to(item, {
                            opacity: 1,
                            y: 0,
                            duration: 0.75,
                            delay: index * 0.12,
                            ease: "power2.out"
                        });
                    } else {
                        item.classList.add("is-visible");
                    }
                });
                hasRevealed = true;
            });
        },
        { threshold: 0.32 }
    );

    observer.observe(aboutSection);
}

function setupStripReveal(withGsap) {
    const stripSection = document.querySelector(".profile-strip-section");
    const stripItems = document.querySelectorAll(".reveal-strip");

    if (!stripSection || !stripItems.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        stripItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                stripItems.forEach((item, index) => {
                    if (withGsap && typeof gsap !== "undefined") {
                        gsap.to(item, {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            delay: index * 0.1,
                            ease: "power2.out"
                        });
                    } else {
                        item.classList.add("is-visible");
                    }
                });

                if (withGsap && typeof gsap !== "undefined") {
                    gsap.fromTo(
                        ".strip-plate",
                        { rotation: -220, scale: 0.42, filter: "blur(8px)" },
                        {
                            rotation: 0,
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 1.2,
                            ease: "back.out(1.35)"
                        }
                    );
                }

                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.25 }
    );

    observer.observe(stripSection);
}

function setupSectionTransitions() {
    if (typeof gsap === "undefined") {
        return;
    }

    const about = document.querySelector(".about-section");
    const strip = document.querySelector(".profile-strip-section");
    const frame = document.querySelector(".about-image");
    const plate = document.querySelector(".strip-plate");

    if (!about || !strip || !frame || !plate) {
        return;
    }

    const onScroll = () => {
        const y = window.scrollY;
        const h = window.innerHeight;

        // Frame gets a gentle floating tilt on mid-scroll.
        const aboutRect = about.getBoundingClientRect();
        const aboutProgress = Math.max(0, Math.min(1, 1 - (aboutRect.top / h)));
        gsap.to(frame, {
            y: (1 - aboutProgress) * 18,
            rotation: (aboutProgress - 0.5) * 2.2,
            duration: 0.22,
            ease: "none",
            overwrite: "auto"
        });

        // Plate breathes with scroll depth for playful transition.
        const stripRect = strip.getBoundingClientRect();
        const stripProgress = Math.max(0, Math.min(1, 1 - (stripRect.top / h)));
        gsap.to(plate, {
            rotation: stripProgress * 18,
            scale: 1 + stripProgress * 0.045,
            duration: 0.22,
            ease: "none",
            overwrite: "auto"
        });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}

function setupWipeNavigation() {
    const links = document.querySelectorAll(".slot-link");
    if (!links.length || typeof gsap === "undefined") {
        return;
    }

    let wipe = document.getElementById("page-wipe");
    if (!wipe) {
        wipe = document.createElement("div");
        wipe.id = "page-wipe";
        wipe.className = "page-wipe";
        document.body.appendChild(wipe);
    }

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#")) {
                return;
            }

            event.preventDefault();
            gsap.killTweensOf(wipe);
            gsap.set(wipe, { scaleY: 0, transformOrigin: "bottom" });
            gsap.to(wipe, {
                scaleY: 1,
                duration: 0.72,
                ease: "power4.inOut",
                onComplete: () => {
                    window.location.href = href;
                }
            });
        });
    });
}

