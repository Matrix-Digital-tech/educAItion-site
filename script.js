/* ========== EducAItion — Main JS ========== */

(function () {
  "use strict";

  /* ---- Mobile Nav Toggle ---- */
  var toggle = document.querySelector(".nav__toggle");
  var list = document.querySelector(".nav__list");
  if (toggle && list) {
    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    /* Close nav when a link is clicked (mobile) */
    list.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        list.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Intersection Observer fade-in ---- */
  var faders = document.querySelectorAll(".fade");
  if ("IntersectionObserver" in window && faders.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    faders.forEach(function (el) { observer.observe(el); });
  } else {
    /* Fallback: show everything */
    faders.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Active nav item ---- */
  var currentPage = location.pathname.split("/").pop() || "index.html";
  var navItems = document.querySelectorAll(".nav__item");
  navItems.forEach(function (item) {
    var link = item.querySelector("a");
    if (link) {
      var href = link.getAttribute("href");
      if (href === currentPage || (href === "index.html" && currentPage === "")) {
        item.classList.add("nav__item--active");
      }
    }
  });
})();
