"""Generate review-only Film + Television layouts from the built homepage."""

from html import escape
from pathlib import Path
import posixpath
import re
import sys
from urllib.parse import urljoin

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / 'tests'))
from test_project_collections import Document, Element

BUILD = ROOT / (sys.argv[1] if len(sys.argv) > 1 else '.preview/project-catalogue-check')
DESTINATION = Path(__file__).parent / 'film-layouts'
ORIGIN = 'http://127.0.0.1:1313/'
COPIED = set()


def copy_dependency(url):
    relative = url.lstrip('/')
    target = DESTINATION / 'site-assets' / relative
    if relative not in COPIED:
        COPIED.add(relative)
        target.parent.mkdir(parents=True, exist_ok=True)
        source = BUILD / relative
        if source.suffix == '.css':
            def css_url(match):
                copied = copy_dependency(match[2])
                return 'url("' + posixpath.relpath(copied.removeprefix('site-assets/'), posixpath.dirname(relative)) + '")'
            css = re.sub(r'url\(\s*([\'\"]?)(/[^\)\'\"]+)\1\s*\)', css_url, source.read_text(encoding='utf-8'))
            target.write_text(css + '\n', encoding='utf-8', newline='\n')
        else:
            target.write_bytes(source.read_bytes())
    return 'site-assets/' + relative


def serialize(node):
    if isinstance(node, str):
        return escape(node)
    attrs = dict(node.attrs)
    if node.tag in ['link', 'script']:
        key = 'href' if node.tag == 'link' else 'src'
        attrs[key] = copy_dependency(attrs[key])
        attrs.pop('integrity', None)
    for key in ['href', 'src', 'data-loop-src']:
        if attrs.get(key, '').startswith('/'):
            attrs[key] = urljoin(ORIGIN, attrs[key])
    if 'srcset' in attrs:
        attrs['srcset'] = ', '.join(urljoin(ORIGIN, item.strip()) for item in attrs['srcset'].split(','))
    attributes = ''.join(' ' + key + ('="' + escape(value, quote=True) + '"' if value is not None else '') for key, value in attrs.items())
    opening = '<' + node.tag + attributes + '>'
    if node.tag in Document.VOID:
        return opening
    return opening + ''.join(serialize(child) for child in node.children) + '</' + node.tag + '>'


page = Document((BUILD / 'index.html').read_text(encoding='utf-8')).root
collection = page.find_all(lambda node: node.has_class('project-collection'))[0]
dependencies = page.find_all(lambda node:
    (node.tag == 'link' and node.attrs.get('rel') in ['stylesheet', 'preload']) or
    (node.tag == 'script' and any(name in node.attrs.get('src', '') for name in ['project-carousels', 'deferred-media'])))
head = ''.join(serialize(node) for node in dependencies)
content = serialize(collection)
DESTINATION.mkdir(exist_ok=True)
for mode in ['full', 'grid']:
    css = '''
    html { overflow-y: hidden; }
    body { min-height: 0; }
    .concept-section { padding-block: 36px 48px; }
    .concept-section .collection-intro { margin-bottom: 32px; }
    .concept-section .home-collection-projects { gap: 44px 36px; }
    .concept-section .collection-project-copy { max-width: 58ch; }
    .concept-section .collection-project-title { margin-bottom: 18px !important; }
    '''
    if mode == 'grid':
        css += '''
        @media (min-width: 761px) {
          .concept-section .home-collection-projects { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .concept-section .collection-project + .collection-project { border-top: 0; padding-top: 0; }
          .concept-section .collection-project-copy { font-size: 17px; }
          .concept-section .collection-project-title { font-size: 28px; }
        }
        '''
    output = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
    output += '<title>Film + Television / ' + mode + '</title>' + head + '<style>' + css + '</style></head>'
    output += '<body class="molecule-site"><main class="site-width concept-section"><div class="work-index-grid home-projects">' + content + '</div></main></body></html>'
    output = '\n'.join(line.rstrip() for line in output.splitlines()).rstrip() + '\n'
    (DESTINATION / (mode + '.html')).write_text(output, encoding='utf-8', newline='\n')
asset_root = (DESTINATION / 'site-assets').resolve()
for generated in asset_root.rglob('*'):
    if generated.is_file() and generated.resolve().is_relative_to(asset_root):
        if generated.relative_to(asset_root).as_posix() not in COPIED:
            generated.unlink()
print('Generated full-width and two-column concepts from the same four project records.')
