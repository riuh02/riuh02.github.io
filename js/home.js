/* GSLE homepage — research-area hero (framed exhibit) + stat count-up */
(function () {
  'use strict';
  var hx = document.querySelector('.hx');
  if (hx) {
    var slides = hx.querySelectorAll('.hx-slide');
    var texts = hx.querySelectorAll('.hx-text');
    var caps = hx.querySelectorAll('.hx-cap');
    var thumbs = hx.querySelectorAll('.hx-thumb');
    var count = hx.querySelector('[data-hx-count]');
    var track = hx.querySelector('.hx-track i');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dur = 8000, cur = 0, timer = null, paused = false, prevTimer = null;

    var restart = function (el) {
      if (!el) return;
      el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
    };
    var go = function (n) {
      var next = (n + slides.length) % slides.length;
      if (next !== cur) {
        // keep the outgoing figure underneath while the new one wipes in
        clearTimeout(prevTimer);
        Array.prototype.forEach.call(slides, function (s) { s.classList.remove('is-prev'); });
        slides[cur].classList.add('is-prev');
        var old = slides[cur];
        prevTimer = setTimeout(function () { old.classList.remove('is-prev'); }, 1300);
      }
      cur = next;
      for (var i = 0; i < slides.length; i++) {
        var on = i === cur;
        slides[i].classList.toggle('is-on', on);
        texts[i].classList.toggle('is-on', on);
        caps[i].classList.toggle('is-on', on);
        thumbs[i].classList.toggle('is-on', on);
        thumbs[i].setAttribute('aria-selected', on ? 'true' : 'false');
        restart(thumbs[i].querySelector('i'));
      }
      if (count) count.textContent = (cur + 1 < 10 ? '0' : '') + (cur + 1);
      restart(track);
      schedule();
    };
    var schedule = function () {
      clearTimeout(timer);
      if (!reduce && !paused) timer = setTimeout(function () { go(cur + 1); }, dur);
    };
    var pause = function (p) {
      paused = p; hx.classList.toggle('is-paused', p);
      if (p) clearTimeout(timer); else schedule();
    };

    Array.prototype.forEach.call(thumbs, function (t, i) {
      t.addEventListener('click', function () { go(i); });
    });
    var prev = hx.querySelector('[data-hx-prev]');
    var next = hx.querySelector('[data-hx-next]');
    if (prev) prev.addEventListener('click', function () { go(cur - 1); });
    if (next) next.addEventListener('click', function () { go(cur + 1); });
    var stage = hx.querySelector('.hx-stage');
    stage.addEventListener('mouseenter', function () { pause(true); });
    stage.addEventListener('mouseleave', function () { pause(false); });
    document.addEventListener('visibilitychange', function () { pause(document.hidden); });

    // #s2 … #s4 in the URL opens that slide directly (handy for sharing one slide)
    var m = /^#s([1-9])$/.exec(location.hash);
    if (m && +m[1] <= slides.length) go(+m[1] - 1); else schedule();
  }

  // count the stat numbers up when they scroll into view
  var nums = document.querySelectorAll('.stat b');
  if (nums.length && 'IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, end = parseInt(el.textContent, 10), t0 = null;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var k = Math.min((ts - t0) / 1400, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io.observe(n); });
  }
})();
