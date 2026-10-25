/* GSLE / LEL — site behaviour v4.
 * One file for every page: masthead, drawer, search, home hero, count-up,
 * tabs, photo rail, publication explorer, gallery lightbox, scroll reveal.
 * No dependencies; works from file:// (records come from js/gsle-data.js,
 * loaded with a <script> tag, never fetch()).
 */
(function () {
  'use strict';

  var d = document, root = d.body.getAttribute('data-root') || '';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  var isEn = function () { return d.documentElement.getAttribute('data-lang') === 'en'; };
  var ICON = {
    doc: '<path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M15 3v5h5M9 13h7M9 17h5"/>',
    mic: '<path d="M3 4h18"/><path d="M4.5 4v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V4"/><path d="m9 20 3-4 3 4"/>',
    patent: '<path d="M12 3 4 7v5c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V7l-8-4z"/><path d="m9 12 2 2 4-4"/>',
    news: '<path d="M4 5h13a1 1 0 0 1 1 1v12a2 2 0 0 0 2 2H5a1 1 0 0 1-1-1V5z"/><path d="M7 9h7M7 13h7M7 17h4"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 17-5-5-9 8"/>',
    people: '<circle cx="9" cy="8" r="3.3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.3a3.2 3.2 0 0 1 0 5.4"/>',
    page: '<path d="M4 4h16v16H4z"/><path d="M4 9h16"/>',
    play: '<path d="M7 4.5v15l12-7.5z"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    pdf: '<path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M12 11v6m0 0-2.5-2.5M12 17l2.5-2.5"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  var svg = function (n, s) {
    return '<svg width="' + (s || 18) + '" height="' + (s || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[n] + '</svg>';
  };
  var toast = function (msg) {
    var t = $('.lx-toast');
    if (!t) { t = d.createElement('div'); t.className = 'lx-toast'; t.setAttribute('role', 'status'); d.body.appendChild(t); }
    t.textContent = msg; t.classList.add('is-on');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('is-on'); }, 1800);
  };

  /* ── masthead state + to-top ───────────────────────────────────────── */
  var mast = $('[data-lx-mast]'), top = $('.lx-totop');
  var onScroll = function () {
    var y = window.scrollY;
    if (mast) mast.classList.toggle('is-solid', y > 24);
    if (top) top.classList.toggle('is-on', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (top) top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  /* ── drawer ────────────────────────────────────────────────────────── */
  var drawer = $('#lx-drawer'), scrim = $('#lx-scrim'), burger = $('.lx-burger');
  var setDrawer = function (on) {
    if (!drawer) return;
    drawer.classList.toggle('is-on', on); scrim.classList.toggle('is-on', on);
    if (burger) burger.setAttribute('aria-expanded', on ? 'true' : 'false');
    d.body.style.overflow = on ? 'hidden' : '';
    if (on) { var f = $('button,a', drawer); if (f) f.focus(); } else if (burger) burger.focus();
  };
  if (burger) burger.addEventListener('click', function () { setDrawer(true); });
  if (scrim) scrim.addEventListener('click', function () { setDrawer(false); });
  var dc = $('.lx-dr-close'); if (dc) dc.addEventListener('click', function () { setDrawer(false); });

  /* ── data loader (search + explorer) ───────────────────────────────── */
  var dataCbs = [];
  var withData = function (cb) {
    if (window.GSLE) return cb(window.GSLE);
    dataCbs.push(cb);
    if (dataCbs.length > 1) return;
    var s = d.createElement('script');
    s.src = root + 'js/gsle-data.js';
    s.onload = function () { dataCbs.splice(0).forEach(function (f) { f(window.GSLE); }); };
    d.head.appendChild(s);
  };

  /* ── site search ───────────────────────────────────────────────────── */
  var sBox = $('#lx-search'), sIn = $('#lx-q'), sRes = $('#lx-res'), sIdx = null, sAct = 0, sLast = null;
  var norm = function (s) { return String(s || '').toLowerCase().normalize('NFKC'); };
  var buildIndex = function (G) {
    var out = [];
    var add = function (type, ic, title, sub, href, extra) {
      out.push({ type: type, ic: ic, title: title, sub: sub || '', href: href, hay: norm(title + ' ' + (sub || '') + ' ' + (extra || '')) });
    };
    $$('.lx-mega-links a').forEach(function (a) {
      var st = $('strong', a), sm = $('small', a);
      add('page', 'page', st.getAttribute('data-ko') || st.textContent, (sm.getAttribute('data-ko') || sm.textContent),
        a.getAttribute('href'), st.getAttribute('data-en') + ' ' + sm.getAttribute('data-en'));
    });
    var bbs = root + 'bbs/';
    G.pubs.forEach(function (p) { add('pub', 'doc', p.title, [p.year, p.journal, p.authors].filter(Boolean).join(' · '), bbs + p.id + '.html'); });
    G.confs.forEach(function (p) { add('conf', 'mic', p.title, [p.year, p.venue, p.authors].filter(Boolean).join(' · '), bbs + p.id + '.html'); });
    G.patents.forEach(function (p) { add('pat', 'patent', p.title, [p.year, p.country, p.number].filter(Boolean).join(' · '), bbs + p.id + '.html', p.inventors); });
    G.faculty.concat(G.students, G.alumni).forEach(function (m) {
      add('ppl', 'people', m.name, m.role, bbs + m.id + '.html');
    });
    G.news.forEach(function (n) { add('news', 'news', n.title, n.date, bbs + n.id + '.html', n.excerpt); });
    G.notices.forEach(function (n) { add('news', 'news', n.title, n.date + ' · 공지', bbs + n.id + '.html', n.excerpt); });
    G.gallery.forEach(function (n) { add('gal', 'image', n.title, n.date, bbs + n.id + '.html'); });
    G.videos.forEach(function (n) { add('gal', 'play', n.title, n.date, bbs + n.id + '.html'); });
    return out;
  };
  var GROUPS = [['page', '메뉴', 'Pages'], ['ppl', '구성원', 'People'], ['pub', '논문', 'Publications'],
    ['conf', '학술대회', 'Conferences'], ['pat', '특허', 'Patents'], ['news', '소식 · 공지', 'News & notices'], ['gal', '갤러리 · 영상', 'Gallery & video']];
  var hl = function (text, toks) {
    var h = esc(text);
    toks.forEach(function (t) {
      if (t.length < 1) return;
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      h = h.replace(re, '<mark>$1</mark>');
    });
    return h;
  };
  var renderSearch = function () {
    if (!sIdx) return;
    var q = norm(sIn.value).trim();
    var n = $('.lx-search-n');
    if (!q) {
      var tips = isEn() ? ['ammonia', 'composting', 'methane', 'odor', 'biochar', 'Heekwon Ahn'] : ['암모니아', '퇴비화', '메탄', '악취', '바이오차', '안희권'];
      sRes.innerHTML = '<div class="lx-sg">' + (isEn() ? 'Try' : '추천 검색어') + '</div><div class="lx-search-tips">' +
        tips.map(function (t) { return '<button type="button">' + esc(t) + '</button>'; }).join('') + '</div>';
      $$('.lx-search-tips button', sRes).forEach(function (b) {
        b.addEventListener('click', function () { sIn.value = b.textContent; renderSearch(); sIn.focus(); });
      });
      if (n) n.textContent = sIdx.length + ' records';
      return;
    }
    var toks = q.split(/\s+/).filter(Boolean);
    var hits = sIdx.filter(function (r) { return toks.every(function (t) { return r.hay.indexOf(t) >= 0; }); });
    hits.sort(function (a, b) {
      var ta = norm(a.title).indexOf(toks[0]) >= 0 ? 0 : 1, tb = norm(b.title).indexOf(toks[0]) >= 0 ? 0 : 1;
      return ta - tb;
    });
    var html = '', count = 0;
    GROUPS.forEach(function (g) {
      var list = hits.filter(function (h) { return h.type === g[0]; });
      if (!list.length) return;
      html += '<div class="lx-sg">' + (isEn() ? g[2] : g[1]) + ' · ' + list.length + '</div>';
      list.slice(0, g[0] === 'pub' ? 8 : 5).forEach(function (h) {
        html += '<a class="lx-si" role="option" href="' + esc(h.href) + '"><span class="ic">' + svg(h.ic) + '</span><span><strong>' +
          hl(h.title, toks) + '</strong><small>' + hl(h.sub, toks) + '</small></span></a>';
        count++;
      });
    });
    sRes.innerHTML = html || '<div class="lx-search-empty">' + (isEn() ? 'No results for' : '검색 결과가 없습니다:') + ' “' + esc(sIn.value) + '”</div>';
    if (n) n.textContent = hits.length + (isEn() ? ' results' : '건');
    sAct = 0; markAct();
  };
  var markAct = function () {
    var items = $$('.lx-si', sRes);
    items.forEach(function (el, i) { el.classList.toggle('is-act', i === sAct); });
    if (items[sAct]) items[sAct].scrollIntoView({ block: 'nearest' });
  };
  var openSearch = function () {
    if (!sBox) return;
    sLast = d.activeElement;
    setDrawer(false);
    sBox.hidden = false; d.body.style.overflow = 'hidden';
    sIn.focus();
    withData(function (G) { if (!sIdx) sIdx = buildIndex(G); renderSearch(); });
  };
  var closeSearch = function () {
    if (!sBox || sBox.hidden) return;
    sBox.hidden = true; d.body.style.overflow = '';
    if (sLast && sLast.focus) sLast.focus();
  };
  $$('[data-lx-search]').forEach(function (b) { b.addEventListener('click', openSearch); });
  if (sBox) {
    sBox.addEventListener('click', function (e) { if (e.target === sBox) closeSearch(); });
    $('.lx-search-x', sBox).addEventListener('click', closeSearch);
    sIn.addEventListener('input', renderSearch);
    sIn.addEventListener('keydown', function (e) {
      var items = $$('.lx-si', sRes);
      if (e.key === 'ArrowDown') { sAct = Math.min(sAct + 1, items.length - 1); markAct(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { sAct = Math.max(sAct - 1, 0); markAct(); e.preventDefault(); }
      else if (e.key === 'Enter' && items[sAct]) { location.href = items[sAct].href; e.preventDefault(); }
    });
  }
  d.addEventListener('keydown', function (e) {
    var k = e.key;
    if ((e.ctrlKey || e.metaKey) && (k === 'k' || k === 'K')) { e.preventDefault(); openSearch(); return; }
    if (k === '/' && !/input|textarea|select/i.test((d.activeElement || {}).tagName || '')) { e.preventDefault(); openSearch(); return; }
    if (k === 'Escape') { closeSearch(); setDrawer(false); closeLb(); }
  });

  /* ── home hero ─────────────────────────────────────────────────────── */
  var hero = $('.lx-hero');
  if (hero) {
    var slides = $$('.lx-hs', hero), tabs = $$('.lx-ht', hero), cur = 0, timer = null, paused = false;
    var DUR = 8000;
    hero.style.setProperty('--lx-dur', DUR / 1000 + 's');
    if (reduce) hero.classList.add('lx-reduced');
    var go = function (n) {
      cur = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-on', i === cur); s.setAttribute('aria-hidden', i === cur ? 'false' : 'true'); });
      tabs.forEach(function (t, i) {
        t.classList.toggle('is-on', i === cur); t.setAttribute('aria-selected', i === cur ? 'true' : 'false');
        var bar = $('i', t); if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
      });
      schedule();
    };
    var schedule = function () {
      clearTimeout(timer);
      if (!reduce && !paused) timer = setTimeout(function () { go(cur + 1); }, DUR);
    };
    var pause = function (p) { paused = p; hero.classList.toggle('is-paused', p); if (p) clearTimeout(timer); else go(cur); };
    tabs.forEach(function (t, i) { t.addEventListener('click', function () { go(i); }); });
    var pb = $('.lx-hplay', hero);
    if (pb) pb.addEventListener('click', function () {
      pause(!paused); pb.setAttribute('aria-label', paused ? '슬라이드 재생' : '슬라이드 일시정지');
    });
    d.addEventListener('visibilitychange', function () { if (d.hidden) clearTimeout(timer); else if (!paused) schedule(); });
    var m = /^#s([1-9])$/.exec(location.hash);
    go(m && +m[1] <= slides.length ? +m[1] - 1 : 0);
  }

  /* ── count-up ──────────────────────────────────────────────────────── */
  var nums = $$('[data-count]');
  if (nums.length && 'IntersectionObserver' in window && !reduce && d.documentElement.classList.contains('lx-js')) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, end = +el.getAttribute('data-count'), t0 = null;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var k = Math.min((ts - t0) / 1500, 1);
          el.firstChild.nodeValue = Math.round(end * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(step);
        };
        el.firstChild.nodeValue = '0';
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ── tabs ──────────────────────────────────────────────────────────── */
  $$('[role="tablist"].lx-tabs').forEach(function (list) {
    var ts = $$('[role="tab"]', list);
    var show = function (t) {
      ts.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        x.tabIndex = on ? 0 : -1;
        var p = d.getElementById(x.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
    };
    ts.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t); });
      t.addEventListener('keydown', function (e) {
        var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
        if (j === null) return;
        var nt = ts[(j + ts.length) % ts.length]; show(nt); nt.focus();
      });
    });
  });

  /* ── photo rail ────────────────────────────────────────────────────── */
  $$('[data-rail]').forEach(function (wrap) {
    var rail = $('.lx-rail', wrap);
    var stepBy = function (dir) {
      var c = $('.lx-shot', rail); var w = c ? c.getBoundingClientRect().width + 18 : 400;
      rail.scrollBy({ left: dir * w, behavior: reduce ? 'auto' : 'smooth' });
    };
    var p = $('[data-rail-prev]', wrap), n = $('[data-rail-next]', wrap);
    if (p) p.addEventListener('click', function () { stepBy(-1); });
    if (n) n.addEventListener('click', function () { stepBy(1); });
  });

  /* ── scroll reveal ─────────────────────────────────────────────────── */
  var rv = $$('[data-reveal]');
  if (rv.length) {
    if (!('IntersectionObserver' in window) || reduce) rv.forEach(function (e) { e.classList.add('is-in'); });
    else {
      var ro = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); ro.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      rv.forEach(function (e) { ro.observe(e); });
    }
  }

  /* ── publication explorer (논문 · 학술대회 · 특허 list pages) ─────── */
  var main = $('main.page-body');
  var bm = main && /\bboard-(sub4_[345])(?:_(s\w+|p\d+))?\b/.exec(main.className);
  if (bm && window.GSLE) {
    var board = bm[1], G = window.GSLE;
    var CFG = {
      sub4_3: { list: G.pubs, ko: '논문', en: 'publications', ph: '제목, 저자, 학술지로 검색 (예: ammonia, composting)' },
      sub4_4: { list: G.confs, ko: '학술대회 발표', en: 'presentations', ph: '제목, 저자, 학술대회로 검색' },
      sub4_5: { list: G.patents, ko: '특허', en: 'patents', ph: '특허명, 발명자, 등록번호로 검색' }
    }[board];
    var preYear = bm[2] && /^s(\d{4})$/.exec(bm[2]) ? bm[2].slice(1) : '';
    var years = [];
    CFG.list.forEach(function (r) { if (r.year && years.indexOf(r.year) < 0) years.push(r.year); });
    years.sort().reverse();
    var params = new URLSearchParams(location.search);
    var state = { q: params.get('q') || '', y: params.get('y') || preYear, sort: 'new' };

    var box = d.createElement('div');
    box.className = 'lx-px';
    box.innerHTML =
      '<div class="lx-px-bar">' +
      '<label class="lx-px-q">' + svg('search', 20) + '<input type="search" placeholder="' + esc(CFG.ph) + '" aria-label="검색"></label>' +
      '<select class="lx-px-sel" data-y aria-label="연도"><option value="" class="notranslate" data-en="All years">전체 연도</option>' +
      years.map(function (y) { return '<option>' + y + '</option>'; }).join('') + '</select>' +
      '<select class="lx-px-sel" data-sort aria-label="정렬"><option value="new" data-en="Newest first">최신순</option><option value="old" data-en="Oldest first">오래된순</option><option value="az" data-en="Title A–Z">제목순</option></select>' +
      '</div>' +
      '<div class="lx-px-meta"><p class="lx-px-count"></p></div>' +
      '<div class="lx-px-list"></div>';
    var anchor = $('.pagetab', main) || $('.sCont_title', main);
    anchor.parentNode.insertBefore(box, anchor.nextSibling);
    main.classList.add('lx-has-px');

    var qIn = $('input', box), ySel = $('[data-y]', box), sSel = $('[data-sort]', box), listEl = $('.lx-px-list', box), cnt = $('.lx-px-count', box);
    qIn.value = state.q; ySel.value = state.y;

    var AHN = /(Heekwon Ahn\*?|Hee-?kwon Ahn|H\.?\s?K\.?\s?Ahn|안희권)/g;
    var cite = function (r) {
      return (r.authors || r.inventors || '') + ' (' + r.year + '). ' + r.title + '. ' +
        [r.journal || r.venue, r.vol, r.page].filter(Boolean).join(', ') + '.' + (r.doi ? ' ' + r.doi : '');
    };
    var item = function (r, i, toks) {
      var venue = board === 'sub4_3'
        ? '<i>' + hl(r.journal, toks) + '</i>' + (r.vol ? ', ' + esc(r.vol) : '') + (r.page ? ', ' + esc(r.page) : '')
        : board === 'sub4_4' ? hl(r.venue, toks)
        : [r.country, r.number && ('No. ' + r.number), r.dates].filter(Boolean).map(esc).join(' · ');
      var who = r.authors || r.inventors || '';
      var acts = '<a href="' + esc(r.id) + '.html">' + svg('arrow', 14) + '<span>' + (isEn() ? 'Details' : '상세보기') + '</span></a>';
      if (r.doi) acts = '<a class="is-doi" href="' + esc(r.doi) + '" target="_blank" rel="noopener">' + svg('ext', 14) + 'DOI</a>' + acts;
      if (r.pdf) acts += '<a href="../' + esc(r.pdf) + '" target="_blank" rel="noopener">' + svg('pdf', 14) + 'PDF</a>';
      if (board !== 'sub4_5') acts += '<button type="button" data-cite="' + i + '">' + svg('copy', 14) + '<span>' + (isEn() ? 'Cite' : '인용 복사') + '</span></button>';
      return '<article class="lx-px-it"><span class="lx-px-no">' + String(r._n).padStart(3, '0') + '</span><div>' +
        '<a class="lx-px-t" href="' + esc(r.id) + '.html">' + hl(r.title, toks) + '</a>' +
        (who ? '<p class="lx-px-a">' + hl(who, toks).replace(AHN, '<b>$1</b>') + '</p>' : '') +
        '<p class="lx-px-v">' + venue + '</p><div class="lx-px-acts">' + acts + '</div></div></article>';
    };
    CFG.list.forEach(function (r, i) { r._n = CFG.list.length - i; });
    var shown = [];
    var render = function () {
      var toks = norm(state.q).trim().split(/\s+/).filter(Boolean);
      var res = CFG.list.filter(function (r) {
        if (state.y && r.year !== state.y) return false;
        if (!toks.length) return true;
        var h = norm([r.title, r.authors, r.inventors, r.journal, r.venue, r.number, r.year].join(' '));
        return toks.every(function (t) { return h.indexOf(t) >= 0; });
      });
      if (state.sort === 'old') res = res.slice().reverse();
      if (state.sort === 'az') res = res.slice().sort(function (a, b) { return a.title.localeCompare(b.title); });
      shown = res;
      cnt.innerHTML = isEn() ? '<b>' + res.length + '</b> of ' + CFG.list.length + ' ' + CFG.en
        : '전체 ' + CFG.list.length + '건 중 <b>' + res.length + '</b>건';
      if (!res.length) { listEl.innerHTML = '<p class="lx-px-empty">' + (isEn() ? 'No matching records.' : '조건에 맞는 항목이 없습니다.') + '</p>'; return; }
      var html = '', lastY = null;
      res.forEach(function (r, i) {
        if (state.sort !== 'az' && r.year !== lastY) {
          lastY = r.year;
          var c = res.filter(function (x) { return x.year === r.year; }).length;
          html += '<h3 class="lx-px-yr">' + esc(r.year || '—') + '<small>' + c + (isEn() ? ' ITEMS' : '건') + '</small></h3>';
        }
        html += item(r, i, toks);
      });
      listEl.innerHTML = html;
      try {
        var u = new URL(location.href);
        ['q', 'y'].forEach(function (k) { if (state[k]) u.searchParams.set(k, state[k]); else u.searchParams.delete(k); });
        history.replaceState(null, '', u);
      } catch (e) { /* file:// in some browsers */ }
    };
    var deb;
    qIn.addEventListener('input', function () { clearTimeout(deb); deb = setTimeout(function () { state.q = qIn.value; render(); }, 120); });
    ySel.addEventListener('change', function () { state.y = ySel.value; render(); });
    sSel.addEventListener('change', function () { state.sort = sSel.value; render(); });
    listEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cite]');
      if (!b) return;
      var txt = cite(shown[+b.getAttribute('data-cite')]);
      var done = function () { toast(isEn() ? 'Citation copied' : '인용 정보를 복사했습니다'); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(done);
      else { var ta = d.createElement('textarea'); ta.value = txt; d.body.appendChild(ta); ta.select(); d.execCommand('copy'); ta.remove(); done(); }
    });
    render();
  }

  /* ── lightbox for post images ──────────────────────────────────────── */
  var lb = null, lbImgs = [], lbI = 0;
  function closeLb() { if (lb && !lb.hidden) { lb.hidden = true; d.body.style.overflow = ''; } }
  var post = $('#bo_v');
  lbImgs = post ? $$('#bo_v_img img, #bo_v_con img', post) : $$('[data-zoom] img');
  lbImgs = lbImgs.filter(function (im) { return !/no_profile|icon/.test(im.src); });
  {
    if (lbImgs.length) {
      lb = d.createElement('div'); lb.className = 'lx-lb'; lb.hidden = true;
      lb.innerHTML = '<img alt=""><button class="lx-lb-x" type="button" aria-label="닫기"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
        '<button class="lx-lb-p" type="button" aria-label="이전"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg></button>' +
        '<button class="lx-lb-n" type="button" aria-label="다음"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></button><div class="lx-lb-c"></div>';
      d.body.appendChild(lb);
      var show = function (i) {
        lbI = (i + lbImgs.length) % lbImgs.length;
        var src = lbImgs[lbI].currentSrc || lbImgs[lbI].src;
        $('img', lb).src = src;
        $('.lx-lb-c', lb).textContent = (lbI + 1) + ' / ' + lbImgs.length;
        lb.hidden = false; d.body.style.overflow = 'hidden';
      };
      lbImgs.forEach(function (im, i) {
        var a = im.closest('a');
        (a || im).addEventListener('click', function (e) { e.preventDefault(); show(i); });
      });
      $('.lx-lb-x', lb).addEventListener('click', closeLb);
      $('.lx-lb-p', lb).addEventListener('click', function () { show(lbI - 1); });
      $('.lx-lb-n', lb).addEventListener('click', function () { show(lbI + 1); });
      lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
      d.addEventListener('keydown', function (e) {
        if (lb.hidden) return;
        if (e.key === 'ArrowRight') show(lbI + 1);
        if (e.key === 'ArrowLeft') show(lbI - 1);
      });
      if (lbImgs.length < 2) { $('.lx-lb-p', lb).style.display = 'none'; $('.lx-lb-n', lb).style.display = 'none'; }
    }
  }

  /* ── related papers on the research-area pages ─────────────────────── */
  var relBox = $('[data-related]');
  if (relBox && window.GSLE) {
    var PAT = {
      manure: /compost|manure|biochar|slurry|liquid fertili|bedding|퇴비|분뇨/i,
      odor: /odou?r|ammonia|hydrogen sulfide|h2s|nh3|volatile|voc|악취|암모니아/i,
      ghg: /methane|greenhouse|ghg|ch4|n2o|nitrous|carbon|emission factor|온실가스|메탄/i,
      bio: /biogas|anaerobic|digest|bioenergy|energy|syngas|hydrogen production|바이오가스|혐기/i
    }[relBox.getAttribute('data-related')];
    var hits = window.GSLE.pubs.filter(function (p) { return PAT && PAT.test(p.title + ' ' + p.journal); }).slice(0, 6);
    relBox.innerHTML = hits.map(function (p) {
      return '<a class="lx-rec" href="' + root + 'bbs/' + p.id + '.html"><span class="lx-rec-y">' + esc(p.year) + '</span><span>' +
        '<span class="lx-rec-t">' + esc(p.title) + '</span><span class="lx-rec-a">' + esc(p.authors) + '</span>' +
        '<span class="lx-rec-v">' + esc(p.journal) + (p.vol ? ', ' + esc(p.vol) : '') + '</span></span>' +
        '<span class="lx-rec-go">' + svg('arrow', 16) + '</span></a>';
    }).join('');
  }
})();
