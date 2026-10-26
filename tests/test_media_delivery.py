"""Prevent eager gallery downloads and preserve original animation delivery."""

import hashlib
from pathlib import Path
import unittest

from test_project_collections import Document
import test_project_collections as collections


class MediaDeliveryTests(unittest.TestCase):
    BUILD = collections.FilmCollectionTests.BUILD

    def page(self, route):
        return Document((self.BUILD / route.strip('/') / 'index.html').read_text(encoding='utf-8')).root

    def test_about_reserves_images_and_defers_everything_except_its_portrait(self):
        page = self.page('/about/')
        images = page.find_all(lambda item: item.tag == 'img')
        self.assertEqual(len(images), 54)
        eager = [item for item in images if item.attrs.get('loading') != 'lazy']
        self.assertEqual(len(eager), 1)
        self.assertEqual(eager[0].attrs.get('alt'), 'Russell Jahn')
        self.assertEqual(eager[0].attrs.get('fetchpriority'), 'high')
        for image in images:
            with self.subTest(source=image.attrs.get('src')):
                self.assertGreater(int(image.attrs['width']), 0)
                self.assertGreater(int(image.attrs['height']), 0)
                self.assertEqual(image.attrs['decoding'], 'async')
                self.assertTrue(image.attrs.get('alt'))
                if 'data-loop-src' not in image.attrs:
                    self.assertIn('srcset', image.attrs)
                    self.assertIn('sizes', image.attrs)
        scripts = page.find_all(lambda item: item.tag == 'script')
        self.assertFalse(any('jquery' in item.attrs.get('src', '') for item in scripts))
        self.assertFalse(any('packery(' in item.text() for item in scripts))
        self.assertTrue(any('resume-galleries' in item.attrs.get('src', '') for item in scripts))
        self.assertTrue(any('deferred-media' in item.attrs.get('src', '') for item in scripts))
        frames = page.find_all(lambda item: item.tag == 'iframe')
        self.assertEqual(len(frames), 1)
        self.assertEqual(frames[0].attrs.get('loading'), 'lazy')

    def test_about_gifs_are_published_without_flattening_or_changing_the_source(self):
        images = self.page('/about/').find_all(
            lambda item: item.tag == 'img' and 'data-loop-src' in item.attrs)
        self.assertGreater(len(images), 10)
        for image in images:
            source = Path('content/about') / image.attrs['data-project-image']
            self.assertTrue(image.attrs['src'].endswith('.webp'))
            delivered = self.BUILD / image.attrs['data-loop-src'].lstrip('/')
            self.assertEqual(hashlib.sha256(source.read_bytes()).digest(),
                             hashlib.sha256(delivered.read_bytes()).digest())

    def test_work_prioritizes_its_visible_first_image(self):
        images = self.page('/work/').find_all(lambda item: item.tag == 'img')
        self.assertEqual(images[0].attrs.get('loading'), 'eager')
        self.assertEqual(images[0].attrs.get('fetchpriority'), 'high')
        self.assertTrue(all(item.attrs.get('loading') == 'lazy' for item in images[1:]))

    def test_font_preload_uses_woff2_and_videos_wait_for_play(self):
        for route in ['/', '/about/', '/work/', '/work/game-engine-graphics-content-pipeline/',
                      '/work/motion-capture-lightsabers/']:
            page = self.page(route)
            preloads = page.find_all(lambda item: item.tag == 'link' and item.attrs.get('as') == 'font')
            self.assertEqual(len(preloads), 2)
            self.assertTrue(all(item.attrs['href'].endswith('.woff2') for item in preloads))
            for video in page.find_all(lambda item: item.tag == 'video'):
                self.assertEqual(video.attrs.get('preload'), 'none')
                self.assertEqual(video.attrs.get('loading'), 'lazy')
                self.assertNotIn('autoplay', video.attrs)
                self.assertIn('controls', video.attrs)


if __name__ == '__main__':
    unittest.main()
