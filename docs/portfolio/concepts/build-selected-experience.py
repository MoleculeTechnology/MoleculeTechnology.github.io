"""Build a review-only Selected Experience comparison from the current preview."""

from html import escape
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[3]
BUILD = ROOT / (sys.argv[1] if len(sys.argv) > 1 else '.preview/site')
DESTINATION = Path(__file__).parent / 'selected-experience'
ORIGIN = 'http://127.0.0.1:1313'
COPIED = set()

PROPOSED = '''<section class="experience-strip experience-proposed site-width" id="experience-example" aria-label="Selected professional experience">
  <p class="eyebrow">Selected experience</p>
  <article class="experience-company" aria-labelledby="experience-blizzard">
    <h2 id="experience-blizzard">Blizzard</h2>
    <div class="experience-entry">
      <h3>Unannounced title</h3>
      <p class="experience-role">Lead Engineer</p>
      <p class="experience-scope">Graphics + content pipeline tools + performance</p>
    </div>
    <div class="experience-entry">
      <h3>Hearthstone</h3>
      <p class="experience-role">Senior Engineer</p>
      <p class="experience-scope">Core systems + multiplatform development</p>
    </div>
  </article>
  <article class="experience-company" aria-labelledby="experience-paper-ghost">
    <h2 id="experience-paper-ghost">Paper Ghost</h2>
    <div class="experience-entry">
      <p class="experience-role">Software engineer + artist</p>
      <p class="experience-scope">Interactive props + film-set visuals</p>
    </div>
  </article>
  <article class="experience-company" aria-labelledby="experience-enflux">
    <h2 id="experience-enflux">Enflux</h2>
    <div class="experience-entry">
      <p class="experience-role">VP, Product</p>
      <p class="experience-scope">Motion capture + developer tools + live demos</p>
    </div>
  </article>
</section>'''

CSS = '''
html { scroll-behavior: auto; scroll-padding-top: 28px; }
.experience-proposed .eyebrow { white-space: nowrap; }
.experience-proposed .experience-company { min-width: 0; }
.experience-proposed .experience-company h2 { font-size: 20px; font-weight: 700; line-height: 1.25; letter-spacing: .025em; text-transform: uppercase; margin: 0 0 12px; }
.experience-proposed .experience-entry + .experience-entry { margin-top: 20px; }
.experience-proposed .experience-entry h3 { font-size: 14px; font-weight: 700; line-height: 1.5; margin: 0 0 3px; }
.experience-proposed .experience-role, .experience-proposed .experience-scope { font-size: 14px; font-weight: 400; line-height: 1.5; }
.experience-proposed .experience-role { color: var(--mint); }
.experience-proposed .experience-scope { color: var(--muted); margin-top: 4px; }
@media (max-width: 1050px) {
  .experience-proposed { grid-template-columns: 1.6fr 1fr 1fr; }
  .experience-proposed > .eyebrow { grid-column: 1 / -1; }
  .experience-proposed .experience-company h2 { font-size: 19px; }
}
@media (max-width: 760px) {
  .experience-proposed { grid-template-columns: minmax(0, 1fr); gap: 25px; }
}
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
                from posixpath import dirname, relpath
                path = relpath(dependency, 'site-assets/' + dirname(relative))
                return 'url("' + path + '")'
            content = re.sub(r'url\(\s*([\'\"]?)(/[^\)\'\"]+)\1\s*\)', css_url, source.read_text(encoding='utf-8'))
            target.write_text(content, encoding='utf-8', newline='\n')
        else:
            target.write_bytes(source.read_bytes())
    return 'site-assets/' + relative


original = (BUILD / 'index.html').read_text(encoding='utf-8')
original = re.sub(r'<script\b[^>]*src="/livereload\.js[^\"]*"[^>]*></script>', '', original)
pattern = r'<section class="experience-strip site-width"[^>]*>.*?</section>'
assert len(re.findall(pattern, original, flags=re.S)) == 1

for treatment in ['current', 'proposed']:
    if treatment == 'proposed':
        output = re.sub(pattern, PROPOSED, original, count=1, flags=re.S)
    else:
        output = original.replace('<section class="experience-strip site-width"', '<section id="experience-example" class="experience-strip site-width"', 1)

    def opening_tag(match):
        opening = match[0]
        tag = match['tag'].lower()
        if tag in ['link', 'script']:
            attribute = 'href' if tag == 'link' else 'src'
            dependency = re.search(r'\b' + attribute + r'="(/[^\"]+)"', opening)
            if dependency and not dependency[1].startswith('/favicon'):
                opening = opening.replace(dependency[0], attribute + '="' + copy_dependency(dependency[1]) + '"')
                opening = re.sub(r'\s+integrity="[^"]*"', '', opening)
        opening = re.sub(r'\b(src|href|poster|data-loop-src)="(/[^\"]*)"',
                         lambda attr: attr[1] + '="' + ORIGIN + attr[2] + '"', opening)
        return re.sub(r'\bsrcset="([^\"]+)"',
                      lambda attr: 'srcset="' + re.sub(r'(^|,\s*)(/)', lambda item: item[1] + ORIGIN + item[2], attr[1]) + '"', opening)

    output = re.sub(r'<(?P<tag>[a-z][\w:-]*)\b[^>]*>', opening_tag, output, flags=re.I)
    output = re.sub(r'<link rel="canonical"[^>]*>', '', output)
    output = re.sub(r'<title>.*?</title>', '<title>' + escape(treatment.title() + ' Selected Experience / Molecule concept') + '</title>', output)
    output = output.replace('</head>', '<meta name="robots" content="noindex,nofollow"><style>' + CSS + '</style></head>')
    (DESTINATION / (treatment + '.html')).write_text(output, encoding='utf-8', newline='\n')

for filename in ['LICENSE.txt', 'OFL-Black.txt']:
    copy_dependency('/fonts/RobotoCondensed/' + filename)
print(f'Generated current and proposed homepage snapshots with {len(COPIED)} local dependencies. Live templates are unchanged.')
