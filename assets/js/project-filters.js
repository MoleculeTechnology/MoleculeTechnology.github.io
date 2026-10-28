(() => {
  const catalogue = document.querySelector('[data-project-catalogue]');
  if (!catalogue) return;
  const controls = catalogue.querySelector('[data-project-filters]');
  const buttons = [...controls.querySelectorAll('[data-project-filter]')];
  const cards = [...catalogue.querySelectorAll('[data-project-card]')];
  const count = catalogue.querySelector('[data-project-count]');
  const validFilters = new Set(buttons.map(button => button.dataset.projectFilter));

  function selectFilter(value, updateUrl = false) {
    const selected = validFilters.has(value) ? value : 'all';
    let visible = 0;
    for (const card of cards) {
      const matches = selected === 'all' || card.dataset.projectTags.split(' ').includes(selected);
      card.hidden = !matches;
      if (matches) visible += 1;
    }
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.projectFilter === selected));
    count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (selected === 'all') url.searchParams.delete('tag');
      else url.searchParams.set('tag', selected);
      history.pushState(null, '', url);
    }
  }

  function readLocation() {
    const requested = new URLSearchParams(window.location.search).get('tag');
    selectFilter(requested || (window.location.hash === '#experiments' ? 'experimental' : 'all'));
  }
  controls.hidden = false;
  controls.addEventListener('click', event => {
    const button = event.target.closest('[data-project-filter]');
    if (button && controls.contains(button)) selectFilter(button.dataset.projectFilter, true);
  });
  window.addEventListener('popstate', readLocation);
  readLocation();
})();
