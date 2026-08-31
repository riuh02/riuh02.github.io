/* GSLE redesign preview — drawer + to-top */
(function () {
  'use strict';

  var drawer = document.getElementById('drawer');
  var scrim = document.getElementById('scrim');
  var burger = document.querySelector('.burger');
  var closeBtn = document.querySelector('.drawer-close');

  function setDrawer(open) {
    if (!drawer || !scrim) return;
    drawer.setAttribute('data-open', open ? 'true' : 'false');
    scrim.setAttribute('data-open', open ? 'true' : 'false');
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      var first = drawer.querySelector('a, button');
      if (first) first.focus();
    } else if (burger) {
      burger.focus();
    }
  }

  if (burger) burger.addEventListener('click', function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });
  if (scrim) scrim.addEventListener('click', function () { setDrawer(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setDrawer(false);
  });

  var toTop = document.querySelector('.to-top');
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    var onScroll = function () {
      toTop.setAttribute('data-show', window.scrollY > 500 ? 'true' : 'false');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
