document.addEventListener("DOMContentLoaded", () => {
  setupPageEntryTransition();
  setupInteractionsIntro();
  setupWipeNavigation();
  setupContactScrollBehavior();
});

function setupPageEntryTransition() {
  const wipe = document.getElementById("page-wipe");
  if (!wipe || typeof gsap === "undefined") return;

  gsap.set(wipe, { opacity: 0 });
}

function setupInteractionsIntro() {
  if (typeof gsap === "undefined") return;

  gsap.delayedCall(0.2, () => {
    gsap.to(
      ".side-scroller-wrap, .slot-label, .interactions-title, .interactions-description, .interactions-buttons",
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  });
}

function setupWipeNavigation() {
  const links = document.querySelectorAll(".slot-link");
  const wipe = document.getElementById("page-wipe");
  if (!links.length || !wipe || typeof gsap === "undefined") return;

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      event.preventDefault();
      window.location.href = href;
    });
  });
}

function setupContactScrollBehavior() {
  const contactSection = document.getElementById("contact");
  const contactLabel =
    document.querySelector('.slot-label[data-nav="contact"]') ||
    document.querySelectorAll(".slot-label")[3];

  if (!contactSection || !contactLabel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          contactLabel.classList.add("active");
        } else {
          contactLabel.classList.remove("active");
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(contactSection);
}
