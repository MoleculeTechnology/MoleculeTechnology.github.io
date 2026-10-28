const frame = document.querySelector('iframe');
const pageSelect = document.querySelector('#page');
const widthSelect = document.querySelector('#width');
const viewSelect = document.querySelector('#view');
const openLink = document.querySelector('#open');
const status = document.querySelector('#status');
let treatment = 'brand';

for (const group of ['Pages', 'Projects']) {
  const options = document.createElement('optgroup');
  options.label = group;
  for (const page of socialColorConcepts.pages.filter(page => page.group === group)) {
    const option = document.createElement('option');
    option.value = page.id;
    option.textContent = page.title;
    options.append(option);
  }
  pageSelect.append(options);
}
pageSelect.value = 'contact';
for (const sample of document.querySelectorAll('.samples')) {
  for (const service of ['linkedin', 'github', 'youtube']) {
    const icon = document.createElement('span');
    icon.dataset.service = service;
    icon.innerHTML = socialColorConcepts.icons[service];
    sample.append(icon);
  }
}

function currentPage() {
  return socialColorConcepts.pages.find(page => page.id === pageSelect.value);
}

function destination() {
  return 'social-icon-colors/' + currentPage().id + '-' + treatment + '.html' + (viewSelect.value === 'links' ? '#concept-social-links' : '');
}

function updateStatus() {
  const page = currentPage();
  const palette = treatment === 'brand' ? 'Brand colors' : 'White';
  frame.title = page.title + ' / ' + palette + ' social icons';
  openLink.href = destination();
  status.textContent = page.title + ' · ' + palette + ' · ' + frame.clientWidth + 'px preview · ' + (viewSelect.value === 'links' ? 'Social links in context' : 'Whole page');
}

function showPage() {
  frame.src = destination();
  updateStatus();
}

for (const button of document.querySelectorAll('[data-treatment]')) {
  button.addEventListener('click', () => {
    treatment = button.dataset.treatment;
    for (const choice of document.querySelectorAll('[data-treatment]')) {
      choice.setAttribute('aria-pressed', String(choice === button));
    }
    showPage();
  });
}
pageSelect.addEventListener('change', showPage);
viewSelect.addEventListener('change', showPage);
widthSelect.addEventListener('change', () => {
  frame.style.width = 'min(100%, ' + widthSelect.value + 'px)';
  showPage();
});
frame.addEventListener('load', () => {
  const body = frame.contentDocument?.body;
  if (!body?.dataset.conceptPage) return;
  pageSelect.value = body.dataset.conceptPage;
  treatment = body.dataset.socialConcept;
  for (const choice of document.querySelectorAll('[data-treatment]')) {
    choice.setAttribute('aria-pressed', String(choice.dataset.treatment === treatment));
  }
  updateStatus();
});
new ResizeObserver(updateStatus).observe(frame);
updateStatus();
