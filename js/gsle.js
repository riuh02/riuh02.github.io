/* GSLE 2026 — interaction layer. No jQuery, no plugins. */
(function () {
  "use strict";

  /* Language handling (including the hand-written data-en labels) lives in
     js/lang.js — it must survive file:// where cookies are blocked. */

  /* ---- mega-menu: hover is CSS; JS adds keyboard + touch support ---- */
  var items = document.querySelectorAll(".nav-item");
  Array.prototype.forEach.call(items, function (item) {
    var close = function () { item.classList.remove("is-open"); };
    item.addEventListener("focusin", function () { item.classList.add("is-open"); });
    item.addEventListener("focusout", function (e) {
      if (!item.contains(e.relatedTarget)) close();
    });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); item.querySelector(".nav-top").focus(); }
    });
  });

  /* ---- mobile drawer ---- */
  var drawer = document.getElementById("drawer");
  var openBtn = document.querySelector(".burger");
  var closeBtn = document.querySelector(".drawer-close");

  function setDrawer(on) {
    drawer.classList.toggle("is-open", on);
    document.body.style.overflow = on ? "hidden" : "";
    (on ? closeBtn : openBtn).focus();
  }
  if (openBtn) openBtn.addEventListener("click", function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) setDrawer(false);
  });

  /* accordion inside the drawer */
  Array.prototype.forEach.call(document.querySelectorAll(".drawer-sec > button"), function (b) {
    b.addEventListener("click", function () {
      var sec = b.parentNode;
      var on = sec.classList.toggle("is-open");
      b.setAttribute("aria-expanded", on ? "true" : "false");
    });
  });

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  var showAll = function () {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add("is-in"); });
  };
  /* ?static=1 renders everything up front — used for full-page screenshots,
     where nothing below the fold ever intersects the viewport. */
  if (/[?&]static=1/.test(location.search)) {
    showAll();
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  } else {
    showAll();
  }

  /* ---- back to top ---- */
  var top = document.querySelector(".to-top");
  var onScroll = function () { top.classList.toggle("is-on", window.scrollY > 600); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  top.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
