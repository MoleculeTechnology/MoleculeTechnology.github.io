"""Prevent eager gallery downloads and preserve original animation delivery."""

import hashlib
import json
from pathlib import Path
import unittest

from test_project_collections import Document
import test_project_collections as collections


class MediaDeliveryTests(unittest.TestCase):
    BUILD = collections.FilmCollectionTests.BUILD
    GLASS_LOOPS = json.loads(Path('docs/portfolio/assets/glass-castle-loop-delivery.json').read_text(encoding='utf-8'))['animations']

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
            optimized = next((item for item in self.GLASS_LOOPS if item['source'] == source.as_posix()), None)
            if optimized:
                self.assertEqual(hashlib.sha256(source.read_bytes()).hexdigest(), optimized['sourceSha256'])
                self.assertEqual(hashlib.sha256(delivered.read_bytes()).hexdigest(), optimized['deliverySha256'])
            else:
                self.assertEqual(hashlib.sha256(source.read_bytes()).digest(),
                                 hashlib.sha256(delivered.read_bytes()).digest())

    def test_glass_castle_uses_verified_lossless_loops_in_every_view(self):
        home = self.page('/')
        gallery = self.page('/work/glass-castle/')
        for item in self.GLASS_LOOPS:
            with self.subTest(source=item['source']):
                canonical = item['source'].removeprefix('content/about/')
                preserved = Path(item['preservedSource']).read_bytes()
                self.assertEqual(hashlib.sha256(preserved).hexdigest(), item['sourceSha256'])
                published_original = (self.BUILD / 'legacy-work' / canonical).read_bytes()
                self.assertEqual(hashlib.sha256(published_original).hexdigest(), item['sourceSha256'])
                data = (self.BUILD / item['deliverySource']).read_bytes()
                self.assertEqual(hashlib.sha256(data).hexdigest(), item['deliverySha256'])
                self.assertLess(len(data), item['sourceBytes'])
                self.assertTrue(item['framePixelsIdentical'])
                self.assertEqual(data[:4], b'RIFF')
                self.assertEqual(data[8:12], b'WEBP')
                durations = []
                offset = 12
                while offset < len(data):
                    kind = data[offset:offset + 4]
                    size = int.from_bytes(data[offset + 4:offset + 8], 'little')
                    payload = data[offset + 8:offset + 8 + size]
                    if kind == b'ANIM':
                        self.assertEqual(int.from_bytes(payload[4:6], 'little'), 0)
                    elif kind == b'ANMF':
                        durations.append(int.from_bytes(payload[12:15], 'little'))
                    offset += 8 + size + (size % 2)
                self.assertEqual(durations, item['durationsMs'])
                slides = home.find_all(lambda e: e.tag == 'template' and 'data-carousel-slide' in e.attrs)
                selected = [img for slide in slides for img in slide.find_all(
                    lambda e: e.tag == 'img' and e.attrs.get('data-project-image') == canonical)]
                self.assertEqual(len(selected), 1)
                self.assertEqual(selected[0].attrs['src'], '/' + item['deliverySource'])
                frame = gallery.find_all(lambda e: e.attrs.get('data-project-image') == canonical)[0]
                image = frame.find_all(lambda e: e.tag == 'img')[0]
                self.assertEqual(image.attrs['data-loop-src'], '/' + item['deliverySource'])

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
