"""Protect the original About presentation while sharing project metadata."""

import hashlib
import json
from pathlib import Path
import re
import unittest

from test_project_collections import Document, Element
import test_project_collections as collections


def presentation(element):
    """Keep content and attributes, ignoring formatting and generated gallery IDs."""
    def normalize(text):
        return re.sub(r'gallery-(?:resume-\d+-)?\d+', 'gallery-ID', text)

    return [
        element.tag,
        {key: normalize(value) if value else value for key, value in element.attrs.items()},
        [presentation(child) if isinstance(child, Element)
         else normalize(re.sub(r'\s+', ' ', child)).strip()
         for child in element.children if isinstance(child, Element) or child.strip()],
    ]


def presentation_hash(main):
    encoded = json.dumps(presentation(main), ensure_ascii=False, sort_keys=True).encode('utf-8')
    return hashlib.sha256(encoded).hexdigest()


class AboutMetadataTests(unittest.TestCase):
    BUILD = collections.FilmCollectionTests.BUILD

    def page(self, route):
        return Document((self.BUILD / route.strip('/') / 'index.html').read_text(encoding='utf-8')).root

    def test_about_preserves_the_pre_refactor_presentation(self):
        fixture = json.loads((Path(__file__).parent / 'fixtures/about-presentation.json').read_text(encoding='utf-8'))
        about = self.page('/about/')
        main = about.find_all(lambda item: item.tag == 'main')[0]
        self.assertEqual(presentation_hash(main), fixture['mainSha256'],
                         'About content or markup changed. Review any intentional edit before updating the presentation fixture.')
        stylesheets = [item.attrs['href'] for item in about.find_all(
            lambda item: item.tag == 'link' and item.attrs.get('rel') == 'stylesheet')]
        self.assertEqual(stylesheets, fixture['stylesheets'])

    def test_generated_galleries_keep_unique_ids_and_their_layout_dependency(self):
        about = self.page('/about/')
        ids = [item.attrs['id'] for item in about.find_all(lambda item: 'id' in item.attrs)]
        self.assertEqual(len(ids), len(set(ids)))
        galleries = about.find_all(lambda item: item.attrs.get('id', '').startswith('gallery-'))
        self.assertEqual(len(galleries), 10)
        scripts = about.find_all(lambda item: item.tag == 'script' and 'packery' in item.attrs.get('src', ''))
        self.assertEqual(len(scripts), 1)

    def test_about_and_work_share_curated_selections(self):
        about = self.page('/about/')
        galleries = about.find_all(lambda item: item.attrs.get('id', '').startswith('gallery-'))
        pairs = [
            ('/work/x-men-apocalypse/', '/work/x-men-apocalypse/', 0, 'PaperGhost/xmen_apocalypse_pentagon3.jpg'),
            ('/work/paper-ghost/', '/work/quantico/', 1, None),
            ('/work/paper-ghost/', '/work/ca-decolle/', 3, None),
            ('/work/mother/', '/work/mother/', 4, 'PaperGhost/mother_preproduction3.png'),
            ('/work/arrival/', '/work/arrival/', 5, 'PaperGhost/arrival_spytent2.jpg'),
            ('/work/enflux/', '/work/enflux/', 6, None),
        ]
        for route, project, index, excluded in pairs:
            with self.subTest(project=project):
                original = [item.attrs['src'] for item in galleries[index].find_all(lambda item: item.tag == 'img')]
                shared = self.page(route).find_all(lambda item: item.attrs.get('data-project-gallery') == project + ':archive')
                self.assertEqual(len(shared), 1)
                selected = [item.attrs['data-project-image'] for item in shared[0].find_all(
                    lambda item: 'data-project-image' in item.attrs)]
                self.assertEqual(selected, [source for source in original if source != excluded])

    def test_metadata_only_records_do_not_add_public_pages(self):
        for slug in ['quantico', 'ca-decolle', 'shoppermx']:
            with self.subTest(project=slug):
                self.assertFalse((self.BUILD / 'work' / slug / 'index.html').exists())


if __name__ == '__main__':
    unittest.main()
