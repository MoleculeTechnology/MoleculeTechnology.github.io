(() => {
  'use strict';

  document.querySelectorAll('[data-project-carousel]').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
    const buttons = [...carousel.querySelectorAll('[data-carousel-choice]')];
    const stage = carousel.querySelector('[data-carousel-stage]');
    const caption = carousel.querySelector('[data-carousel-caption]');
    const count = carousel.querySelector('[data-carousel-count]');
    const status = carousel.querySelector('[data-carousel-status]');
    let active = 0;

    function show(index, focus = false) {
      const next = (index + slides.length) % slides.length;
      if (next !== active) {
        active = next;
        stage.replaceChildren(slides[active].content.cloneNode(true));
        caption.textContent = slides[active].dataset.caption;
        count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
        buttons.forEach((button, position) => {
          button.setAttribute('aria-pressed', String(position === active));
          button.tabIndex = position === active ? 0 : -1;
        });
        status.textContent = `Image ${active + 1} of ${slides.length}. ${caption.textContent}`;
      }
      if (focus) buttons[active].focus({ preventScroll: true });
    }

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => show(index));
      button.addEventListener('keydown', event => {
        const destinations = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: slides.length - 1 };
        if (Object.prototype.hasOwnProperty.call(destinations, event.key)) {
          event.preventDefault();
          show(destinations[event.key], true);
        }
      });
    });

    carousel.querySelector('[data-carousel-controls]').hidden = false;
    count.hidden = false;
  });
})();
