(() => {
  'use strict';
  const images = document.querySelectorAll('[data-loop-src]');
  const load = image => { image.src = image.dataset.loopSrc; };
  if (!('IntersectionObserver' in window)) { images.forEach(load); return; }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      load(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '600px 0px' });
  images.forEach(image => observer.observe(image));
})();
