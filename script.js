/* Portfolio interactions. Visual styling remains in styles.css. */
(function () {
  'use strict';

  function initScrollReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    // Show content immediately on browsers without IntersectionObserver.
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initCurrentSectionNavigation() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
    var sections = links.map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    }).filter(Boolean);

    if (!('IntersectionObserver' in window) || !sections.length) return;

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          var isCurrent = link.getAttribute('href') === '#' + entry.target.id;
          if (isCurrent) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  function init() {
    initScrollReveal();
    initCurrentSectionNavigation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
