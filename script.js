const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }));
}
document.querySelector("#year").textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -40px" });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const parallaxItems = document.querySelectorAll("[data-parallax]");
if (!reduceMotion && parallaxItems.length) {
  let ticking = false;
  const updateParallax = () => {
    const viewport = window.innerHeight;
    parallaxItems.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      const speed = Number(item.dataset.parallax) || 0.1;
      const distance = (viewport / 2 - (bounds.top + bounds.height / 2)) * speed;
      item.style.setProperty("--parallax-offset", `${distance.toFixed(1)}px`);
    });
    ticking = false;
  };
  const requestParallax = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
  requestParallax();
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#primary-nav a:not(.nav-cta)");
if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}
