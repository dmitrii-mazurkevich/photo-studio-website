/* ==========================================================================
   Aperture — site behaviour
   Vanilla JS, no dependencies. Without JavaScript the gallery is still a grid
   of images and every picture is still reachable; the lightbox, the filter and
   the before/after slider are enhancements on top.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- strings that only exist in JS ---------------------------- */

  var S = {
    en: {
      required: 'This field is required.',
      email: 'Please enter a valid email address.',
      message: 'A sentence or two more helps me answer properly.',
      sending: 'Sending…',
      of: 'of',
      close: 'Close',
      prev: 'Previous photo',
      next: 'Next photo',
      noResults: 'Nothing in this category yet.'
    },
    ru: {
      required: 'Это поле обязательно.',
      email: 'Введите корректный адрес электронной почты.',
      message: 'Ещё пара предложений поможет ответить по делу.',
      sending: 'Отправляем…',
      of: 'из',
      close: 'Закрыть',
      prev: 'Предыдущее фото',
      next: 'Следующее фото',
      noResults: 'В этой категории пока пусто.'
    }
  };

  function lang() { return root.getAttribute('data-lang') || 'en'; }
  function s(key) { return (S[lang()] || S.en)[key] || S.en[key] || key; }

  /* ---------- theme ------------------------------------------------------ */

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('ap-theme', next); } catch (e) {}
    });
  });

  /* ---------- sticky header ---------------------------------------------- */

  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 6); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile menu -------------------------------------------------- */

  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    var setMenu = function (open) {
      mobileMenu.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    navToggle.addEventListener('click', function () {
      setMenu(!mobileMenu.classList.contains('is-open'));
    });
    mobileMenu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) { setMenu(false); navToggle.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 960) setMenu(false); });
  }

  /* ---------- FAQ ---------------------------------------------------------- */

  document.querySelectorAll('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (panel) panel.classList.toggle('is-open', !open);
    });
  });

  /* ---------- reveal -------------------------------------------------------- */

  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    if (!('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* ==========================================================================
     Gallery: filter + lightbox
     ========================================================================== */

  var gallery = document.querySelector('.gallery');

  if (gallery) {
    var shots = Array.prototype.slice.call(gallery.querySelectorAll('.shot'));

    /* ---------- category filter ------------------------------------------- */

    var filterButtons = document.querySelectorAll('.filters button[data-filter]');
    var emptyNote = document.querySelector('[data-gallery-empty]');

    function applyFilter(value) {
      filterButtons.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === value));
      });
      var shown = 0;
      shots.forEach(function (shot) {
        var match = value === 'all' || shot.getAttribute('data-category') === value;
        shot.hidden = !match;
        if (match) shown++;
      });
      if (emptyNote) {
        emptyNote.hidden = shown > 0;
        emptyNote.textContent = s('noResults');
      }
    }

    filterButtons.forEach(function (b) {
      b.addEventListener('click', function () { applyFilter(b.getAttribute('data-filter')); });
    });

    /* ---------- lightbox --------------------------------------------------- */

    var lb = document.getElementById('lightbox');
    var lbImg = lb.querySelector('[data-lb-img]');
    var lbTitle = lb.querySelector('[data-lb-title]');
    var lbMeta = lb.querySelector('[data-lb-meta]');
    var lbCount = lb.querySelector('[data-lb-count]');
    var btnPrev = lb.querySelector('[data-lb-prev]');
    var btnNext = lb.querySelector('[data-lb-next]');
    var btnClose = lb.querySelector('[data-lb-close]');

    var index = -1;
    var lastFocused = null;

    function visibleShots() {
      return shots.filter(function (shot) { return !shot.hidden; });
    }

    function preload(src) {
      if (!src) return;
      var img = new Image();
      img.src = src;
    }

    function render() {
      var list = visibleShots();
      var shot = list[index];
      if (!shot) return;

      var img = shot.querySelector('img');
      lbImg.src = shot.getAttribute('data-full') || img.getAttribute('src');
      lbImg.width = Number(shot.getAttribute('data-w')) || img.naturalWidth || 1200;
      lbImg.height = Number(shot.getAttribute('data-h')) || img.naturalHeight || 800;
      lbImg.alt = img.getAttribute('alt') || '';

      lbTitle.textContent = shot.getAttribute('data-title') || '';
      lbMeta.textContent = shot.getAttribute('data-meta') || '';
      lbCount.textContent = (index + 1) + ' ' + s('of') + ' ' + list.length;

      btnPrev.disabled = list.length < 2;
      btnNext.disabled = list.length < 2;

      // Nudge the neighbours into cache so arrow keys feel instant.
      var nextShot = list[(index + 1) % list.length];
      var prevShot = list[(index - 1 + list.length) % list.length];
      preload(nextShot && nextShot.getAttribute('data-full'));
      preload(prevShot && prevShot.getAttribute('data-full'));

      var id = shot.getAttribute('data-id');
      if (id && history.replaceState) history.replaceState(null, '', '#p-' + id);
    }

    function open(shot) {
      var list = visibleShots();
      index = list.indexOf(shot);
      if (index === -1) return;
      lastFocused = document.activeElement;
      lb.classList.add('is-open');
      document.body.classList.add('lb-open');
      render();
      btnClose.focus();
    }

    function close() {
      lb.classList.remove('is-open');
      document.body.classList.remove('lb-open');
      lbImg.removeAttribute('src');
      if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
      if (lastFocused) lastFocused.focus();
      index = -1;
    }

    function step(delta) {
      var list = visibleShots();
      if (!list.length) return;
      index = (index + delta + list.length) % list.length;
      render();
    }

    shots.forEach(function (shot) {
      shot.addEventListener('click', function () { open(shot); });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { step(-1); });
    btnNext.addEventListener('click', function () { step(1); });

    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lightbox__figure')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      if (e.key === 'Tab') {
        // Keep focus inside the dialog while it's open.
        var focusables = [btnClose, btnPrev, btnNext].filter(function (b) { return !b.disabled; });
        var i = focusables.indexOf(document.activeElement);
        e.preventDefault();
        var nextIndex = e.shiftKey ? i - 1 : i + 1;
        if (nextIndex < 0) nextIndex = focusables.length - 1;
        if (nextIndex >= focusables.length) nextIndex = 0;
        focusables[nextIndex].focus();
      }
    });

    // Swipe on touch devices.
    var touchX = null;
    lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      touchX = null;
    }, { passive: true });

    // A shared link like /portfolio.html#p-wedding-03 opens on that photo.
    (function openFromHash() {
      var m = location.hash.match(/^#p-(.+)$/);
      if (!m) return;
      var target = shots.filter(function (sh) { return sh.getAttribute('data-id') === m[1]; })[0];
      if (target) open(target);
    })();

    document.addEventListener('languagechange', function () {
      var active = document.querySelector('.filters button[aria-pressed="true"]');
      if (active) applyFilter(active.getAttribute('data-filter'));
      if (lb.classList.contains('is-open')) render();
      btnClose.setAttribute('aria-label', s('close'));
      btnPrev.setAttribute('aria-label', s('prev'));
      btnNext.setAttribute('aria-label', s('next'));
    });
  }

  /* ==========================================================================
     Before / after slider
     ========================================================================== */

  document.querySelectorAll('.ba').forEach(function (ba) {
    var range = ba.querySelector('input[type="range"]');
    var after = ba.querySelector('.ba__after');
    var handle = ba.querySelector('.ba__handle');
    if (!range || !after || !handle) return;

    function paint() {
      var v = Number(range.value);
      after.style.width = v + '%';
      handle.style.left = v + '%';
    }
    range.addEventListener('input', paint);
    paint();
  });

  /* ==========================================================================
     Enquiry form
     ========================================================================== */

  var form = document.querySelector('[data-validate]');
  if (form) {
    var showError = function (field, message) {
      var wrap = field.closest('.field');
      if (!wrap) return;
      wrap.classList.toggle('has-error', Boolean(message));
      var slot = wrap.querySelector('.error');
      if (slot) slot.textContent = message || '';
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
    };

    var validateField = function (field) {
      var value = (field.value || '').trim();
      if (field.required && !value) { showError(field, s('required')); return false; }
      if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        showError(field, s('email')); return false;
      }
      if (field.name === 'message' && value && value.length < 15) {
        showError(field, s('message')); return false;
      }
      showError(field, '');
      return true;
    };

    form.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        var wrap = field.closest('.field');
        if (wrap && wrap.classList.contains('has-error')) validateField(field);
      });
    });

    document.addEventListener('languagechange', function () {
      form.querySelectorAll('.field.has-error').forEach(function (wrap) {
        var f = wrap.querySelector('input, textarea, select');
        if (f) validateField(f);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = Array.prototype.slice.call(
        form.querySelectorAll('input[required], textarea[required], select[required]')
      );
      var ok = fields.map(validateField).every(Boolean);
      if (!ok) {
        var bad = form.querySelector('.has-error input, .has-error textarea, .has-error select');
        if (bad) bad.focus();
        return;
      }

      // Demo build: nothing is sent. Point this at a form service or a handler.
      var btn = form.querySelector('[type="submit"]');
      var original = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = s('sending'); }

      setTimeout(function () {
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = original; }
        var success = document.querySelector('.form-success');
        if (success) {
          success.classList.add('is-visible');
          success.setAttribute('tabindex', '-1');
          success.focus();
        }
      }, 650);
    });
  }

  /* ---------- year ---------------------------------------------------------- */

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
