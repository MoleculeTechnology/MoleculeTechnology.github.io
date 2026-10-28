"""Build review-only social icon colors from the current Hugo output."""

from html import escape
from pathlib import Path
import json
import posixpath
import re
import sys
from urllib.parse import urljoin, urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parents[3]
BUILD = ROOT / (sys.argv[1] if len(sys.argv) > 1 else '.preview/project-catalogue-check')
DESTINATION = Path(__file__).parent / 'social-icon-colors'
ORIGIN = 'http://127.0.0.1:1313'
PAGES = [
    ('home', 'Home', '/'),
    ('work', 'Work', '/work/'),
    ('about', 'About', '/about/'),
    ('contact', 'Contact', '/contact/'),
    ('paper-ghost', 'Film + television', '/work/paper-ghost/'),
    ('x-men-apocalypse', 'X-Men: Apocalypse', '/work/x-men-apocalypse/'),
    ('glass-castle', 'The Glass Castle', '/work/glass-castle/'),
    ('mother', 'mother!', '/work/mother/'),
    ('arrival', 'Arrival', '/work/arrival/'),
    ('enflux', 'Motion capture / Enflux', '/work/enflux/'),
    ('blizzard', 'Graphics + Content Pipeline + Performance', '/work/game-engine-graphics-content-pipeline/'),
    ('lightsabers', 'Motion Capture + Lightsabers', '/work/motion-capture-lightsabers/'),
]
PAGE_IDS = {route: page_id for page_id, _, route in PAGES}
COPIED = set()
DESTINATION.mkdir(exist_ok=True)

CONCEPT_CSS = '''
html { scroll-behavior: auto; }
.concept-icon-inlay { display: none; }
body[data-social-concept="brand"] .concept-icon-inlay { display: initial; }
body[data-social-concept="white"] .social-icon path:not(.concept-icon-inlay) { fill: currentColor; }
body[data-social-concept="brand"] a[href*="linkedin.com"] .social-icon { color: #0a66c2; }
body[data-social-concept="brand"] a[href*="youtube.com"] .social-icon { color: #ff0033; }
body[data-social-concept="brand"] a[href*="github.com"] .social-icon { color: #ffffff; }
'''


def normalized(value):
    return '\n'.join(line.rstrip() for line in value.splitlines()).rstrip() + '\n'


def copy_dependency(url):
    parsed = urlsplit(url)
    relative = parsed.path.lstrip('/')
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
                path = posixpath.relpath(dependency.removeprefix('site-assets/'), posixpath.dirname(relative))
                return 'url("' + path + '")'
            content = re.sub(r'url\(\s*([\'\"]?)(/[^\)\'\"]+)\1\s*\)', css_url, source.read_text(encoding='utf-8'))
            target.write_text(normalized(content), encoding='utf-8', newline='\n')
        else:
            target.write_bytes(source.read_bytes())
    return 'site-assets/' + relative + ('#' + parsed.fragment if parsed.fragment else '')


def icon_inlay(prefix, service):
    if service == 'linkedin':
        return prefix + '<rect class="concept-icon-inlay" x="32" y="64" width="384" height="384" fill="#fff"/>'
    if service == 'youtube':
        return prefix + '<rect class="concept-icon-inlay" x="200" y="150" width="210" height="210" fill="#fff"/>'
    return prefix


for page_id, title, route in PAGES:
    original = (BUILD / route.strip('/') / 'index.html').read_text(encoding='utf-8')
    assert original.count('class="social-icon"') == (4 if page_id == 'home' else 3), page_id
    for treatment in ['white', 'brand']:
        def resolve_url(value, tag, attribute):
            if value.startswith(('site-assets/', '#', '//')):
                return value
            parsed = urlsplit(value)
            if parsed.scheme and parsed.netloc not in ['127.0.0.1:1313', 'www.ilovemolecule.com', 'ilovemolecule.com']:
                return value
            resolved = urlsplit(urljoin(ORIGIN + route, value))
            if tag == 'a' and attribute == 'href' and resolved.path in PAGE_IDS:
                return urlunsplit(('', '', PAGE_IDS[resolved.path] + '-' + treatment + '.html', resolved.query, resolved.fragment))
            return urljoin(ORIGIN + route, value)

        def opening_tag(match):
            opening = match[0]
            tag = match['tag'].lower()
            if tag in ['link', 'script']:
                attribute = 'href' if tag == 'link' else 'src'
                dependency = re.search(r'\b' + attribute + r'="(/[^\"]+)"', opening)
                if dependency:
                    opening = opening.replace(dependency[0], attribute + '="' + copy_dependency(dependency[1]) + '"')
                    opening = re.sub(r'\s+integrity="[^"]*"', '', opening)
            opening = re.sub(r'\b(src|href|poster|data-loop-src)="([^\"]+)"',
                             lambda attr: attr[1] + '="' + escape(resolve_url(attr[2], tag, attr[1]), quote=True) + '"', opening)

            def srcset(attribute):
                candidates = []
                for candidate in attribute[1].split(','):
                    parts = candidate.strip().split(maxsplit=1)
                    candidates.append(resolve_url(parts[0], tag, 'srcset') + (' ' + parts[1] if len(parts) > 1 else ''))
                return 'srcset="' + ', '.join(candidates) + '"'
            return re.sub(r'\bsrcset="([^\"]+)"', srcset, opening)

        output = re.sub(r'<(?P<tag>[a-z][\w:-]*)\b[^>]*>', opening_tag, original, flags=re.I)
        def mark_inlay(match):
            svg = match[2].replace('<path fill="#fff"', '<path class="concept-icon-inlay" fill="#fff"', 1)
            return match[1] + svg + match[3]
        output = re.sub(r'(<a\b[^>]*href="https://(?:www\.)?(?:linkedin|youtube)\.com[^\"]*"[^>]*>\s*<span class="social-icon"[^>]*>\s*)(<svg\b[^>]*>.*?</svg>)(\s*</span>)',
                        mark_inlay, output, flags=re.S)
        output = output.replace('<body ', f'<body data-social-concept="{treatment}" data-concept-page="{page_id}" ', 1)
        output = output.replace('<footer class="site-footer', '<footer id="concept-social-links" class="site-footer', 1)
        output = re.sub(r'<title>.*?</title>', '<title>' + escape(title + ' / ' + treatment + ' social icons / Molecule concept') + '</title>', output)
        output = output.replace('</head>', '<meta name="robots" content="noindex,nofollow"><style>' + CONCEPT_CSS + '</style></head>')
        (DESTINATION / f'{page_id}-{treatment}.html').write_text(normalized(output), encoding='utf-8', newline='\n')

icons = {}
for service in ['linkedin', 'github', 'youtube']:
    svg = (ROOT / 'themes/blowfish/assets/icons' / (service + '.svg')).read_text(encoding='utf-8').strip()
    svg = svg.replace('<svg ', '<svg focusable="false" ', 1)
    svg = re.sub(r'<svg\b[^>]*>', lambda match: icon_inlay(match[0], service), svg, count=1)
    icons[service] = svg

for filename in ['LICENSE.txt', 'OFL-Black.txt']:
    copy_dependency('/fonts/RobotoCondensed/' + filename)
inventory = dict(pages=[dict(id=page_id, title=title, route=route, group='Pages' if index < 4 else 'Projects')
                            for index, (page_id, title, route) in enumerate(PAGES)], icons=icons)
(DESTINATION / 'inventory.js').write_text('const socialColorConcepts = ' + json.dumps(inventory, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
print(f'Generated {len(PAGES) * 2} page concepts with {len(COPIED)} shared dependencies. Production templates are unchanged.')
