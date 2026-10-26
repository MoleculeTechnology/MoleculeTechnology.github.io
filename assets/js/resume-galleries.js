(() => {
  'use strict';
  if (typeof Packery === 'undefined') return;
  // Intrinsic image dimensions reserve each tile before its lazy download.
  document.querySelectorAll('[data-resume-gallery]').forEach(gallery => {
    const layout = new Packery(gallery, { itemSelector: 'img', percentPosition: true, gutter: 5, resize: true });
    gallery.querySelectorAll('img').forEach(image => {
      image.addEventListener('load', () => layout.layout(), { once: true });
    });
  });
})();
