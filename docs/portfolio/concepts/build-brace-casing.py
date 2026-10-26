"""Build review-only casing snapshots from the current Hugo production output."""

from html import escape
from pathlib import Path
import json
import posixpath
import re
import sys
from urllib.parse import urljoin, urlsplit

from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
BUILD = ROOT / (sys.argv[1] if len(sys.argv) > 1 else '.preview/project-catalogue-check')
DESTINATION = Path(__file__).parent / 'brace-casing'
ASSET_ORIGIN = 'http://127.0.0.1:1313'
PAGES = [('home', 'Home', '/'), ('work', 'Work', '/work/'), ('about', 'About', '/about/'),
         ('contact', 'Contact', '/contact/'), ('moodboard', 'Mood board', '/moodboard/'),
         ('experiments', 'Experiments redirect', '/experiments/')]
BRACE_NODE = re.compile(r'(<(?P<tag>h[1-6]|span)\b[^>]*>)(?P<text>\s*\{[^{}<>]+\}\s*)(?=<)', re.I)
VERTICES = {'programming', 'design', 'art', 'animation'}
DESTINATION.mkdir(exist_ok=True)
locations = []
copied = set()


def normalized_text(value):
    return '\n'.join(line.rstrip() for line in value.splitlines()).rstrip() + '\n'


def copy_dependency(url):
    parsed = urlsplit(url)
    relative = parsed.path.lstrip('/')
    source = BUILD / relative
    target = DESTINATION / 'site-assets' / relative
    if not source.is_file():
        raise FileNotFoundError(source)
    if relative not in copied:
        copied.add(relative)
        target.parent.mkdir(parents=True, exist_ok=True)
        if source.suffix == '.css':
            css = source.read_text(encoding='utf-8')

            def css_url(match):
                dependency = copy_dependency(match[2])
                path = posixpath.relpath(dependency.removeprefix('site-assets/'), posixpath.dirname(relative))
                return 'url("' + path + '")'

            css = re.sub(r'url\(\s*([\'\"]?)(/[^\)\'\"]+)\1\s*\)', css_url, css)
            target.write_text(normalized_text(css), encoding='utf-8', newline='\n')
        elif source.suffix in ['.js', '.txt', '.svg']:
            target.write_text(normalized_text(source.read_text(encoding='utf-8')), encoding='utf-8', newline='\n')
        else:
            target.write_bytes(source.read_bytes())
    return 'site-assets/' + relative + ('#' + parsed.fragment if parsed.fragment else '')


def role(page, tag, opening, label):
    if page in ['moodboard', 'experiments']:
        return 'Legacy page title', 'Legacy pages', '#84f9eb', 700
    if page == 'home' and label in VERTICES:
        return 'Pyramid label', 'Pyramid', '#f8f8ff' if label == 'programming' else '#84f9eb', 400
    if page == 'home' and label == 'specializations':
        return 'Pyramid caption', 'Pyramid', '#b7c4c1', 700
    return ('Page title' if tag.lower() == 'h1' else 'Section heading',
            'Pages + sections', '#f8f8ff' if page == 'about' and tag.lower() != 'h1' else '#84f9eb', 700)


def image_attributes(match, route):
    opening = match[0]
    if 'loading=' not in opening:
        opening = opening[:-1] + ' loading="lazy">'
    if 'width=' not in opening:
        source = re.search(r'\bsrc="([^"]+)"', opening)
        if source:
            parsed = urlsplit(source[1])
            asset = BUILD / urlsplit(urljoin(route, parsed.path)).path.lstrip('/')
            if not parsed.scheme and asset.exists():
                with Image.open(asset) as image:
                    opening = opening[:-1] + f' width="{image.width}" height="{image.height}">'
    return opening


for page_id, page_title, route in PAGES:
    original = (BUILD / route.strip('/') / 'index.html').read_text(encoding='utf-8')
    # The retired mood board only needs its original heading for this review.
    if page_id == 'moodboard':
        original = re.sub(r'(<main\b[^>]*>).*?(</main>)',
                          r'\1<article><header><h1 class="heading-accent">{ mood board }</h1></header>'
                          r'<div class="prose"><p>Inspirations for future design, UI, aesthetics, and robotics.</p></div></article>\2',
                          original, flags=re.S)
    matches = list(BRACE_NODE.finditer(original))
    for index, match in enumerate(matches):
        label = re.sub(r'\s+', ' ', match['text']).strip()[1:-1].strip().lower()
        item_role, group, color, weight = role(page_id, match['tag'], match[1], label)
        existing_id = re.search(r'\bid="([^"]+)"', match[1])
        anchor = existing_id[1] if existing_id else f'case-{page_id}-{index}'
        locations.append(dict(id=f'{page_id}-{index}', page=page_id, pageTitle=page_title, route=route,
                              label=label, role=item_role, group=group, color=color, weight=weight,
                              current='{ ' + (label.upper() if label == 'specializations' else match['text'].strip()[1:-1].strip()) + ' }',
                              anchor=anchor, contextAnchor='case-home-pyramid' if group == 'Pyramid' else anchor))

    for casing in ['lowercase', 'uppercase']:
        ordinal = [0]

        def transform(match):
            index = ordinal[0]
            ordinal[0] += 1
            opening = match[1][:-1] + f' data-brace-case="{casing}"'
            if not re.search(r'\bid="', match[1]):
                opening += f' id="case-{page_id}-{index}"'
            text = match['text'].lower() if casing == 'lowercase' else match['text'].upper()
            return opening + '>' + text

        html = BRACE_NODE.sub(transform, original)
        if page_id == 'home':
            html = html.replace('<section class="pyramid"', '<section id="case-home-pyramid" class="pyramid"')
        html = re.sub(r'<meta\b[^>]*http-equiv="refresh"[^>]*>', '', html, flags=re.I)
        html = re.sub(r'<script\b[^>]*specialization-pyramid[^>]*>\s*</script>', '', html)
        # External media is unnecessary for the typography review.
        html = re.sub(r'<iframe\b[^>]*>.*?</iframe>', '', html, flags=re.S)
        html = re.sub(r'<img\b[^>]*>', lambda m: image_attributes(m, route), html)
        # Review copies serve CSS, fonts, and scripts together on port 1314.
        html = re.sub(r'(<(?:link|script)\b[^>]*?\b(?:href|src)=")(/[^\"]+)"',
                      lambda m: m[1] + copy_dependency(m[2]) + '"', html)
        html = re.sub(r'\s+integrity="[^"]*"', '', html)
        def resolve_url(value):
            if value.startswith(('site-assets/', '#', '//')) or urlsplit(value).scheme:
                return value
            return urljoin(ASSET_ORIGIN + route, value)

        html = re.sub(r'\b(src|href|poster)="([^"]+)"',
                      lambda m: m[1] + '="' + resolve_url(m[2]) + '"', html)

        def resolve_srcset(match):
            candidates = []
            for candidate in match[1].split(','):
                parts = candidate.strip().split(maxsplit=1)
                candidates.append(resolve_url(parts[0]) + (' ' + parts[1] if len(parts) > 1 else ''))
            return 'srcset="' + ', '.join(candidates) + '"'

        html = re.sub(r'srcset="([^"]+)"', resolve_srcset, html)

        def link_target(match):
            opening = match[0]
            if not re.search(r'href="#', opening):
                opening = opening[:-1] + ' target="_blank" rel="noopener">'
            return opening

        html = re.sub(r'<a\b[^>]*>', link_target, html)
        html = re.sub(r'<title>.*?</title>', '<title>' + escape(f'{page_title} / {casing} / Molecule casing concept') + '</title>', html)
        html = html.replace('</head>', '<style>[data-brace-case]{text-transform:' + casing + '!important}html{scroll-behavior:auto}</style>\n</head>')
        (DESTINATION / f'{page_id}-{casing}.html').write_text(normalized_text(html), encoding='utf-8', newline='\n')

group_order = {'Pages + sections': 0, 'Pyramid': 1, 'Legacy pages': 2}
for license_file in ['LICENSE.txt', 'OFL-Black.txt']:
    copy_dependency('/fonts/RobotoCondensed/' + license_file)
locations.sort(key=lambda item: group_order[item['group']])
data = dict(assetOrigin=ASSET_ORIGIN, locations=locations)
(DESTINATION / 'inventory.js').write_text('const braceCasingInventory = ' + json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Built {len(PAGES) * 2} casing previews for {len(locations)} occurrences and {len(set(item["label"] for item in locations))} distinct labels')
