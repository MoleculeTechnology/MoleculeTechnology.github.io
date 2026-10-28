"""Build a local contact-form design preview without a delivery endpoint."""

from pathlib import Path
from posixpath import dirname, relpath
import re

ROOT = Path(__file__).resolve().parents[3]
BUILD = ROOT / '.preview/project-catalogue-check'
DESTINATION = Path(__file__).parent / 'contact-form'
COPIED = set()

FORM = '''<section class="inquiry-form-panel contact-method" aria-labelledby="contact-method-heading">
  <h2 id="contact-method-heading" tabindex="-1">Send a message</h2>
  <p>Email for collaborations, installation projects, and software requests.</p>
  <form class="native-contact-form" method="post" aria-describedby="form-preview-note">
    <div class="form-row">
      <div class="form-field">
        <label for="contact-name">Name <span>(optional)</span></label>
        <input id="contact-name" name="name" type="text" autocomplete="name" maxlength="120">
      </div>
      <div class="form-field">
        <label for="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autocomplete="email" maxlength="254" required>
      </div>
    </div>
    <div class="form-field">
      <label for="contact-message">Message</label>
      <textarea id="contact-message" name="message" rows="7" maxlength="5000" required></textarea>
    </div>
    <button class="contact-action" type="submit" disabled>Send message</button>
    <p class="form-status" id="form-preview-note" role="status" aria-live="polite">Preview only. Messages are not sent.</p>
  </form>
  <p class="direct-email">Or email <a href="mailto:info@ilovemolecule.com">info@ilovemolecule.com</a> directly.</p>
</section>'''

CSS = '''
.form-review-note { border-bottom: 1px solid var(--rule); padding: 12px 22px; text-align: center; font-size: 14px; color: var(--muted); }
.form-review-note strong { color: var(--mint); font-weight: 700; }
.native-contact-form { display: grid; gap: 22px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-field { min-width: 0; display: grid; gap: 9px; }
.form-field label { color: var(--ghost); font-size: 16px; line-height: 1.5; font-weight: 700; }
.form-field label span { color: var(--muted); font-weight: 400; }
.form-field input, .form-field textarea { display: block; width: 100%; min-width: 0; border: 1px solid var(--rule); border-radius: 0; background: var(--surface); color: var(--ghost); font: inherit; font-size: 18px; line-height: 1.5; padding: 12px 14px; }
.form-field input { min-height: 50px; }
.form-field textarea { min-height: 180px; resize: vertical; }
.form-field input:focus-visible, .form-field textarea:focus-visible { outline: 2px solid var(--mint); outline-offset: 3px; }
.native-contact-form .contact-action { display: inline-flex; width: fit-content; min-height: 48px; border: 0; border-radius: 0; padding: 12px 24px; cursor: pointer; font-size: 18px; line-height: 1.4; font-weight: 700; }
.native-contact-form .contact-action:disabled { cursor: default; opacity: .7; }
.native-contact-form .form-status { color: var(--muted); font-size: 15px; line-height: 1.5; margin: -8px 0 0; }
.contact-method > .direct-email { margin-top: 24px; font-size: 16px; }
.direct-email a { color: var(--ghost); text-decoration: underline; text-underline-offset: 4px; overflow-wrap: anywhere; }
@media (max-width: 480px) { .form-row { grid-template-columns: minmax(0, 1fr); gap: 22px; } }
'''

JS = '''
const form = document.querySelector('.native-contact-form');
const status = document.querySelector('.form-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  status.textContent = 'Preview only. Your message has not been sent.';
});
form.querySelector('button[type="submit"]').disabled = false;
'''


def copy_dependency(url):
    relative = url.lstrip('/')
    source = BUILD / relative
    if not source.is_file():
        raise FileNotFoundError(source)
    target = DESTINATION / 'site-assets' / relative
    if relative not in COPIED:
        COPIED.add(relative)
        target.parent.mkdir(parents=True, exist_ok=True)
        if source.suffix == '.css':
            def css_url(match):
                dependency = copy_dependency(match[2])
                return 'url("' + relpath(dependency, 'site-assets/' + dirname(relative)) + '")'
            css = re.sub(r'url\(\s*([\'\"]?)(/[^\)\'\"]+)\1\s*\)', css_url, source.read_text(encoding='utf-8'))
            target.write_text(css, encoding='utf-8', newline='\n')
        else:
            target.write_bytes(source.read_bytes())
    return 'site-assets/' + relative


page = (BUILD / 'contact/index.html').read_text(encoding='utf-8')
page = re.sub(r'<script\b[^>]*src="[^\"]*/contact-form\.min\.[^\"]*"[^>]*></script>', '', page)
assert 'class="inquiry-form-panel contact-method"' in page
page = re.sub(r'<section class="inquiry-form-panel contact-method"[^>]*>.*?</section>', FORM, page, count=1, flags=re.S)


def opening_tag(match):
    opening = match[0]
    if match['tag'] == 'link' and 'rel="stylesheet"' in opening:
        dependency = re.search(r'href="(/[^\"]+)"', opening)
        opening = opening.replace(dependency[0], 'href="contact-form/' + copy_dependency(dependency[1]) + '"')
        opening = re.sub(r'\s+integrity="[^"]*"', '', opening)
    elif match['tag'] == 'link' and 'as="font"' in opening:
        dependency = re.search(r'href="(/[^\"]+)"', opening)
        opening = opening.replace(dependency[0], 'href="contact-form/' + copy_dependency(dependency[1]) + '"')
    return re.sub(r'\b(href|src)="(/[^\"]*)"', lambda attr: attr[1] + '="http://127.0.0.1:1313' + attr[2] + '"', opening)


page = re.sub(r'<(?P<tag>[a-z][\w:-]*)\b[^>]*>', opening_tag, page)
page = re.sub(r'<link rel="canonical"[^>]*>', '', page)
page = re.sub(r'<title>.*?</title>', '<title>Contact form preview / Molecule</title>', page)
page = page.replace('</head>', '<meta name="robots" content="noindex,nofollow"><style>' + CSS + '</style></head>')
page = page.replace('<body class="molecule-site">', '<body class="molecule-site"><div class="form-review-note"><strong>Form preview</strong> · Design and validation only. No messages are sent.</div>', 1)
page = page.replace('</body>', '<script>' + JS + '</script></body>')
(Path(__file__).parent / 'contact-form.html').write_text(page, encoding='utf-8', newline='\n')
for filename in ['LICENSE.txt', 'OFL-Black.txt']:
    copy_dependency('/fonts/RobotoCondensed/' + filename)
print(f'Generated a non-sending form preview with {len(COPIED)} local dependencies. The live contact page is unchanged.')
