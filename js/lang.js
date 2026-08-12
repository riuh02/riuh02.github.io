/* GSLE language switch (v7) — Korean / English.
 *
 * Why this does not use the cookie-and-reload approach any more:
 * Chromium blocks document.cookie on file:// URLs. Opening a page by
 * double-clicking it therefore silently dropped the googtrans cookie, the
 * reload found nothing, and the page came back Korean. That is exactly what
 * the user hit.
 *
 * So: drive Google's own hidden <select class="goog-te-combo"> directly.
 * That translates in place, with no cookie and no reload, and works from
 * file://, http:// and https:// alike. The cookie is still written when it
 * can be, so the choice survives navigation on a real server, and
 * localStorage covers the file:// case.
 */
(function () {
  "use strict";

  var PAGE = window.gslePageLang || "ko";
  var LANGS = ["ko", "en"];
  var KEY = "gsleLang";

  /* ---------- persistence (best effort on every scheme) ---------- */
  function readSaved() {
    var m = document.cookie.match(/(?:^|; )googtrans=([^;]+)/);
    if (m) {
      var t = decodeURIComponent(m[1]).split("/")[2];
      if (LANGS.indexOf(t) >= 0) return t;
    }
    try {
      var v = localStorage.getItem(KEY);
      if (LANGS.indexOf(v) >= 0) return v;
    } catch (e) { /* file:// or privacy mode */ }
    return PAGE;
  }

  function save(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    if (lang === PAGE) {
      document.cookie = "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = "googtrans=;path=/;domain=." + location.hostname +
                        ";expires=Thu, 01 Jan 1970 00:00:00 UTC";
    } else {
      /* one scope only — writing host+domain creates two competing cookies */
      document.cookie = "googtrans=/auto/" + lang + ";path=/";
    }
  }

  /* ---------- hand-written labels for nav / brand / page titles ---------- */
  function applyLabels(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    var els = document.querySelectorAll("[data-en]");
    Array.prototype.forEach.call(els, function (el) {
      if (!el.hasAttribute("data-ko")) el.setAttribute("data-ko", el.textContent);
      el.textContent = (lang === "en")
        ? el.getAttribute("data-en")
        : el.getAttribute("data-ko");
    });
  }

  /* ---------- drive Google's widget ----------
     Two things had to be right here:
     1. The gadget must be rendered OFF-SCREEN, not display:none, and
        autoDisplay must NOT be false — otherwise Google hides its own gadget
        and never populates the language list, leaving .goog-te-combo present
        but with zero <option>s. Setting .value on it then silently no-ops.
     2. So we poll for the OPTIONS, not merely for the element.            */
  function translateTo(lang, tries) {
    tries = tries || 0;
    var combo = document.querySelector(".goog-te-combo");
    if (!combo || !combo.options.length) {
      if (tries < 120) {
        setTimeout(function () { translateTo(lang, tries + 1); }, 120);
      }
      return;
    }
    /* the page's own language is the empty "show original" option */
    var want = (lang === PAGE) ? "" : lang;
    if (combo.value === want) return;
    combo.value = want;
    combo.dispatchEvent(new Event("change"));
  }

  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      { pageLanguage: PAGE, includedLanguages: LANGS.join(",") },
      "google_translate_element");
  };

  document.addEventListener("DOMContentLoaded", function () {
    var sel = document.getElementById("gsle_lang");
    if (!sel) return;

    var cur = readSaved();
    sel.value = cur;
    applyLabels(cur);
    if (cur !== PAGE) translateTo(cur);

    sel.addEventListener("change", function () {
      var v = sel.value;
      save(v);
      if (v === PAGE) {
        /* Returning to the original language: a reload restores the untouched
           DOM far more reliably than asking Google to undo its own rewrite. */
        location.reload();
      } else {
        applyLabels(v);
        translateTo(v);
      }
    });
  });
})();
