"""Check homepage delivery and the static fallback after a Hugo build."""

from pathlib import Path
import unittest
from urllib.parse import unquote, urlsplit

from test_project_collections import Document
import test_project_collections as collections


class HomeCarouselTests(unittest.TestCase):
    BUILD = collections.FilmCollectionTests.BUILD
    PROJECTS = ['x-men-apocalypse', 'glass-castle', 'mother', 'arrival', 'enflux',
                'game-engine-graphics-content-pipeline', 'motion-capture-lightsabers']

    def page(self, route='/'):
        return Document((self.BUILD / route.strip('/') / 'index.html').read_text(encoding='utf-8')).root

    def test_all_seven_home_projects_have_the_selected_contact_strip(self):
        carousels = self.page().find_all(lambda item: 'data-project-carousel' in item.attrs)
        self.assertEqual([item.attrs['data-project-carousel'] for item in carousels],
                         ['/work/' + slug + '/' for slug in self.PROJECTS])
        for carousel, total in zip(carousels, [3, 3, 3, 3, 3, 2, 3]):
            with self.subTest(project=carousel.attrs['data-project-carousel']):
                choices = carousel.find_all(lambda item: 'data-carousel-choice' in item.attrs)
                self.assertEqual(len(choices), total)
                self.assertEqual([item.attrs['aria-pressed'] for item in choices], ['true'] + ['false'] * (total - 1))
                self.assertEqual([item.attrs['tabindex'] for item in choices], ['0'] + ['-1'] * (total - 1))
                self.assertTrue(all(item.attrs.get('aria-label', '').startswith('Show ') for item in choices))

    def test_initial_image_and_caption_work_without_javascript(self):
        for carousel in self.page().find_all(lambda item: 'data-project-carousel' in item.attrs):
            stage = carousel.find_all(lambda item: 'data-carousel-stage' in item.attrs)[0]
            images = stage.find_all(lambda item: item.tag == 'img')
            self.assertEqual(len(images), 1)
            self.assertTrue(images[0].attrs['alt'])
            self.assertTrue(images[0].attrs.get('srcset'))
            caption = carousel.find_all(lambda item: 'data-carousel-caption' in item.attrs)[0]
            self.assertTrue(caption.text())
            controls = carousel.find_all(lambda item: 'data-carousel-controls' in item.attrs)[0]
            self.assertIn('hidden', controls.attrs)

    def test_additional_images_stay_inert_and_loops_are_preserved(self):
        templates = self.page().find_all(lambda item: item.tag == 'template' and 'data-carousel-slide' in item.attrs)
        self.assertEqual(len(templates), 20)
        loops = []
        for template in templates:
            images = template.find_all(lambda item: item.tag == 'img')
            self.assertEqual(len(images), 1)
            self.assertTrue(template.attrs['data-caption'])
            if 'srcset' not in images[0].attrs:
                loops.append(images[0].attrs['src'])
        self.assertEqual(len(loops), 4)
        self.assertTrue(any('glasscastle_final3' in source for source in loops))
        self.assertTrue(any('enflux_convention2' in source for source in loops))
        self.assertTrue(any('pixelperf-sword-demo' in source for source in loops))
        self.assertTrue(any('patch-led-animation' in source for source in loops))

    def test_thumbnails_are_small_still_images(self):
        controls = self.page().find_all(lambda item: 'data-carousel-controls' in item.attrs)
        thumbnails = [image for group in controls for image in group.find_all(lambda item: item.tag == 'img')]
        self.assertEqual(len(thumbnails), 20)
        for thumbnail in thumbnails:
            self.assertLessEqual(int(thumbnail.attrs['width']), 160)
            self.assertLessEqual(int(thumbnail.attrs['height']), 100)
            source = thumbnail.attrs['src']
            self.assertNotIn('.gif', source)
            path = self.BUILD / unquote(urlsplit(source).path.lstrip('/'))
            data = path.read_bytes()
            self.assertEqual(data[:4], b'RIFF')
            self.assertEqual(data[8:12], b'WEBP')
            if data[12:16] == b'VP8X':
                self.assertFalse(data[20] & 2, 'Thumbnail unexpectedly contains animation')

    def test_carousel_code_and_markup_are_limited_to_home(self):
        for route in ['/work/', '/about/', '/work/paper-ghost/', '/work/glass-castle/']:
            page = self.page(route)
            self.assertFalse(page.find_all(lambda item: 'data-project-carousel' in item.attrs))
            self.assertFalse(page.find_all(lambda item: item.tag == 'script' and 'project-carousels' in item.attrs.get('src', '')))
        home = self.page()
        self.assertEqual(len(home.find_all(lambda item: item.tag == 'script' and 'project-carousels' in item.attrs.get('src', ''))), 1)


if __name__ == '__main__':
    unittest.main()
