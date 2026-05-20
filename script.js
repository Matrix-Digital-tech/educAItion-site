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

  /* ---- Registration Form: conditional children section ---- */
  var whoReg = document.getElementById("who-reg");
  var childrenSection = document.getElementById("children-section");
  var childrenContainer = document.getElementById("children-container");
  var addChildBtn = document.getElementById("add-child");
  var childrenSummary = document.getElementById("children-summary");

  if (whoReg && childrenSection && childrenContainer && addChildBtn) {
    var childCount = 1;

    function updateChildrenVisibility() {
      if (whoReg.value === "adult") {
        childrenSection.style.display = "none";
      } else {
        childrenSection.style.display = "block";
      }
    }

    addChildBtn.addEventListener("click", function () {
      childCount++;
      var entry = document.createElement("div");
      entry.className = "child-entry";
      entry.setAttribute("data-child-index", String(childCount));
      entry.innerHTML =
        '<label class="form-label" for="child-name-' + childCount + '">Child\'s Name</label>' +
        '<input class="form-input" type="text" id="child-name-' + childCount + '" name="child-name" placeholder="Your child\'s name" required>' +
        '<label class="form-label" style="margin-top:var(--space-md);">Child\'s Age</label>' +
        '<select class="form-input child-age" name="child-age" required>' +
        '<option value="" disabled selected>Select your child\'s age</option>' +
        '<option value="8">8 years old</option>' +
        '<option value="9">9 years old</option>' +
        '<option value="10">10 years old</option>' +
        '<option value="11">11 years old</option>' +
        '<option value="12">12 years old</option>' +
        '</select>' +
        '<button type="button" class="remove-child" style="margin-top:var(--space-sm);background:none;border:none;color:var(--color-text-light);font-size:0.875rem;cursor:pointer;text-decoration:underline;">Remove</button>';

      childrenContainer.appendChild(entry);
      entry.querySelector(".remove-child").addEventListener("click", function () {
        childrenContainer.removeChild(entry);
        childCount--;
      });
    });

    whoReg.addEventListener("change", updateChildrenVisibility);

    var form = document.querySelector('form[name="registration"]');
    if (form) {
      form.addEventListener("submit", function () {
        var entries = childrenContainer.querySelectorAll(".child-entry");
        var summary = [];
        entries.forEach(function (entry) {
          var name = entry.querySelector('input[name="child-name"]').value;
          var age = entry.querySelector('select[name="child-age"]').value;
          summary.push(name + " (" + age + " years old)");
        });
        childrenSummary.value = summary.join(", ");
      });
    }

    updateChildrenVisibility();
  }
})();
