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


def copy_hash(main):
    passages = [item.text() for item in main.find_all(
        lambda item: item.tag in ['h1', 'h2', 'h3', 'p', 'li'])]
    return hashlib.sha256(json.dumps(passages, ensure_ascii=False).encode('utf-8')).hexdigest()


class AboutMetadataTests(unittest.TestCase):
    BUILD = collections.FilmCollectionTests.BUILD

    def page(self, route):
        return Document((self.BUILD / route.strip('/') / 'index.html').read_text(encoding='utf-8')).root

    def test_about_preserves_the_reviewed_presentation_and_original_copy(self):
        fixture = json.loads((Path(__file__).parent / 'fixtures/about-presentation.json').read_text(encoding='utf-8'))
        about = self.page('/about/')
        main = about.find_all(lambda item: item.tag == 'main')[0]
        self.assertEqual(presentation_hash(main), fixture['mainSha256'],
                         'About content or markup changed. Review any intentional edit before updating the presentation fixture.')
        self.assertEqual(copy_hash(main), fixture['originalCopySha256'])
        sources = [item.attrs['data-project-image'] for item in main.find_all(
            lambda item: item.tag == 'img' and 'data-project-image' in item.attrs)]
        self.assertEqual(sources, fixture['originalGallerySources'])
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
            ('/work/quantico/', '/work/quantico/', 1, 'PaperGhost/quantico_van1.jpg'),
            ('/work/glass-castle/', '/work/glass-castle/', 2, 'PaperGhost/glasscastle_test1.jpg'),
            ('/work/ca-decolle/', '/work/ca-decolle/', 3, 'PaperGhost/cadecolle_plane1.jpg'),
            ('/work/mother/', '/work/mother/', 4, 'PaperGhost/mother_preproduction3.png'),
            ('/work/arrival/', '/work/arrival/', 5, 'PaperGhost/arrival_spytent2.jpg'),
            ('/work/enflux/', '/work/enflux/', 6, None),
            ('/work/shoppermx/', '/work/shoppermx/', 8, 'InContext/incontext_store1.png'),
            ('/work/game-engine-graphics-content-pipeline/', '/work/game-engine-graphics-content-pipeline/',
             9, 'Blizzard/hearthstone_credits_russelljahn2.webp'),
        ]
        for route, project, index, excluded in pairs:
            with self.subTest(project=project):
                original = [item.attrs['data-project-image'] for item in galleries[index].find_all(lambda item: item.tag == 'img')]
                shared = self.page(route).find_all(lambda item: item.attrs.get('data-project-gallery') == project + ':archive')
                self.assertEqual(len(shared), 1)
                selected = [item.attrs['data-project-image'] for item in shared[0].find_all(
                    lambda item: 'data-project-image' in item.attrs)]
                self.assertEqual(selected, [source for source in original if source != excluded])
                all_sources = {item.attrs['data-project-image'] for item in self.page(route).find_all(
                    lambda item: 'data-project-image' in item.attrs)}
                self.assertTrue(set(original).issubset(all_sources), 'A curated About image is missing from its case study')
                self.assertFalse(self.page(route).find_all(lambda item: item.tag == 'pre'),
                                 'Gallery HTML must not render as an indented Markdown code block')

        blender = self.page('/work/enflux/').find_all(
            lambda item: item.attrs.get('data-project-gallery') == '/work/enflux/:blender')[0]
        self.assertEqual([item.attrs['data-project-image'] for item in blender.find_all(
            lambda item: 'data-project-image' in item.attrs)], ['Enflux/enflux_blender1.jpg'])

    def test_major_projects_publish_their_shared_contribution_details(self):
        expected = {
            'quantico': ['259 Android apps', '21 episodes', 'Audio surveillance van.', 'Bomb timers.'],
            'ca-decolle': ['generate and dynamically adjust clouds'],
            'shoppermx': ['enterprise 3D store editor', 'VR-based multiplayer installation'],
            'game-engine-graphics-content-pipeline': ['Shipped 9 major game expansions',
                '03/2021 - 08/2023', 'FX artist tools', 'SDK integrations', 'low-level game engine issues'],
        }
        for slug, passages in expected.items():
            with self.subTest(project=slug):
                page = self.page('/work/' + slug + '/')
                details = page.find_all(lambda item: item.attrs.get('data-project-details') == '/work/' + slug + '/')
                self.assertEqual(len(details), 1)
                for passage in passages:
                    self.assertIn(passage, details[0].text())


if __name__ == '__main__':
    unittest.main()
