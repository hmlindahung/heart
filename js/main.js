/* ==========================================================================
   心心 個人品牌官網 V1 — main.js
   純 Vanilla JS，無框架依賴
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     0. 人物形象表情/手勢切換（Brand Avatar）
     ---------------------------------------------------------
     .brand-avatar 只是版面上的小尺寸點綴，不是主視覺。
     data-mood 對應下方 PORTRAIT_MOODS 的檔名，圖檔內建對話框文字，
     所以用貼紙卡呈現（見 style.css），不會被裁切。
     圖檔還沒補齊前，onerror 會自動 fallback 回預設的 portrait-placeholder.svg，
     不會破版。
  --------------------------------------------------------- */
  var PORTRAIT_MOODS = {
    greeting: 'assets/images/portrait/portrait-greeting.png', // Hero：打招呼
    explain:  'assets/images/portrait/portrait-explain.png',  // About：說明手勢
    wave:     'assets/images/portrait/portrait-wave.png'      // Contact：揮手道別
  };
  var DEFAULT_PORTRAIT = 'assets/images/portrait-placeholder.svg';

  document.querySelectorAll('.brand-avatar[data-mood]').forEach(function (el) {
    var mood = el.getAttribute('data-mood');
    var img = el.querySelector('.brand-avatar__img');
    var src = PORTRAIT_MOODS[mood];
    if (!img || !src) return;

    img.addEventListener('error', function () {
      if (img.src.indexOf(DEFAULT_PORTRAIT) === -1) {
        img.src = DEFAULT_PORTRAIT;
      }
    }, { once: true });

    img.src = src;
  });

  /* ---------------------------------------------------------
     1. 頁面淡入
  --------------------------------------------------------- */
  window.addEventListener('load', function () {
    document.body.classList.add('is-loaded');
  });

  /* ---------------------------------------------------------
     2. 固定導覽列：捲動陰影 + 目前區塊高亮
  --------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function onScroll() {
    if (window.scrollY > 12) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
    highlightActiveSection();
  }

  function highlightActiveSection() {
    var scrollPos = window.scrollY + 120;
    var currentId = sections.length ? sections[0].id : null;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var isActive = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('is-active', isActive);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     3. 平滑捲動至區塊（含導覽列高度補償）+ 關閉手機選單
  --------------------------------------------------------- */
  var navLinksWrap = document.getElementById('navLinks');
  var navToggle = document.getElementById('navToggle');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      var navHeight = nav.offsetHeight;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;

      window.scrollTo({ top: top, behavior: 'smooth' });
      closeMobileNav();
    });
  });

  /* ---------------------------------------------------------
     4. 手機選單開關
  --------------------------------------------------------- */
  function openMobileNav() {
    navLinksWrap.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
  }
  function closeMobileNav() {
    navLinksWrap.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  navToggle.addEventListener('click', function () {
    var isOpen = navLinksWrap.classList.contains('is-open');
    isOpen ? closeMobileNav() : openMobileNav();
  });

  /* ---------------------------------------------------------
     5. 動態產生 12 組作品預留卡片（假資料，未來可直接替換）
  --------------------------------------------------------- */
  var portfolioGrid = document.getElementById('portfolioGrid');
  var placeholderTones = ['#F6DEE0', '#E7EEE4', '#F3EBDF', '#FBEDEE'];
  var placeholderData = Array.from({ length: 12 }, function (_, i) {
    return {
      name: '作品名稱 ' + String(i + 1).padStart(2, '0'),
      category: ['社群企劃', '活動視覺', 'AI 內容', '品牌設計'][i % 4]
    };
  });

  placeholderData.forEach(function (item, i) {
    var card = document.createElement('article');
    card.className = 'portfolio-card reveal';
    card.style.setProperty('--reveal-delay', (i % 3) * 0.08 + 's');

    var thumb = document.createElement('div');
    thumb.className = 'portfolio-card__thumb';
    thumb.style.background = placeholderTones[i % placeholderTones.length];

    var label = document.createElement('span');
    label.textContent = '作品圖片預留位置';
    thumb.appendChild(label);

    var body = document.createElement('div');
    body.className = 'portfolio-card__body';
    body.innerHTML =
      '<p class="portfolio-card__name">' + item.name + '</p>' +
      '<p class="portfolio-card__cat">' + item.category + '</p>';

    card.appendChild(thumb);
    card.appendChild(body);
    portfolioGrid.appendChild(card);
  });

  /* ---------------------------------------------------------
     6. 滑動出現動畫（IntersectionObserver）
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------
     擴充預留區（V1 不啟用）
     - AI Lab / Blog / Case Study 頁面路由
     - Google Analytics 事件追蹤
     - 自訂表單串接
  --------------------------------------------------------- */
})();
