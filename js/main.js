document.addEventListener("DOMContentLoaded", async () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setupTopNav();
    setupWorksHovers();

    if (reducedMotion) {
        document.getElementById("loader")?.remove();
        revealStaticContent();
        startTypewriter(false);
        setupAboutReveal(false);
        setupStripReveal(false);
        setupWorksReveal(false);
        return;
    }

    await waitForCriticalFonts();
    runLoaderSequence(() => startTypewriter(true));
    setupAboutReveal(true);
    setupStripReveal(true);
    setupWorksReveal(true);
    setupSectionTransitions();
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
        .from(".site-header", { y: -16, opacity: 0, duration: 0.55 }, "-=0.2")
        .from(".top-nav .nav-link", { y: 6, opacity: 0, stagger: 0.06, duration: 0.4 }, "-=0.35")
        .from(".headline-top", { y: 26, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".headline-words", { y: 20, opacity: 0, duration: 0.7 }, "<")
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
    target.textContent = "";

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

function setupTopNav() {
    const navLinks = document.querySelectorAll(".top-nav .nav-link");
    const sections = [...document.querySelectorAll(".page-section")];

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href?.startsWith("#")) {
                return;
            }

            event.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                history.pushState(null, "", href);
            }
        });
    });

    if (!("IntersectionObserver" in window) || !sections.length) {
        return;
    }

    const navByKey = new Map(
        [...navLinks].map((link) => [link.getAttribute("data-nav"), link])
    );

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (!visible.length) {
                return;
            }

            const id = visible[0].target.id;
            const navKey =
                id === "landing"
                    ? "home"
                    : id === "profile-strip"
                      ? "about"
                      : id;

            navLinks.forEach((link) => link.classList.remove("active"));
            const active = navByKey.get(navKey);
            active?.classList.add("active");
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.2, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
}

function setupAboutReveal(withGsap) {
    const aboutSection = document.querySelector(".about-section");
    const aboutItems = document.querySelectorAll(".reveal-about");
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
                if (!entry.isIntersecting || hasRevealed) {
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
                observer.unobserve(entry.target);
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

function setupWorksReveal(withGsap) {
    const worksSection = document.getElementById("works");
    const items = document.querySelectorAll(".reveal-works");

    if (!worksSection || !items.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                items.forEach((item, index) => {
                    if (withGsap && typeof gsap !== "undefined") {
                        gsap.to(item, {
                            opacity: 1,
                            y: 0,
                            duration: 0.75,
                            delay: index * 0.1,
                            ease: "power2.out"
                        });
                    } else {
                        item.classList.add("is-visible");
                    }
                });

                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.2 }
    );

    observer.observe(worksSection);
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
        const h = window.innerHeight;
        const aboutRect = about.getBoundingClientRect();
        const aboutProgress = Math.max(0, Math.min(1, 1 - aboutRect.top / h));
        gsap.to(frame, {
            y: (1 - aboutProgress) * 18,
            rotation: (aboutProgress - 0.5) * 2.2,
            duration: 0.22,
            ease: "none",
            overwrite: "auto"
        });

        const stripRect = strip.getBoundingClientRect();
        const stripProgress = Math.max(0, Math.min(1, 1 - stripRect.top / h));
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

function setupWorksHovers() {
    if (typeof gsap === "undefined") {
        return;
    }

    document.querySelectorAll(".works-ref-item").forEach((item) => {
        const img = item.querySelector("img");
        const folder = item.querySelector(".folder-container");
        if (!img || !folder) {
            return;
        }

        item.addEventListener("mouseenter", () => {
            gsap.to(folder, { scale: 1.1, rotation: 5, duration: 0.3, ease: "power2.out" });
            gsap.to(img, {
                filter: "brightness(1.1) drop-shadow(0 16px 32px rgba(92, 70, 48, 0.3))",
                duration: 0.3
            });
        });

        item.addEventListener("mouseleave", () => {
            gsap.to(folder, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
            gsap.to(img, {
                filter: "brightness(1) drop-shadow(0 8px 16px rgba(92, 70, 48, 0.15))",
                duration: 0.3
            });
        });
    });
}

function revealStaticContent() {
    document
        .querySelectorAll(".reveal-about, .reveal-strip, .reveal-works")
        .forEach((el) => el.classList.add("is-visible"));
}
