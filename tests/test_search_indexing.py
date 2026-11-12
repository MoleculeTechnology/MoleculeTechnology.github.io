"""Keep sitemap discovery focused on canonical pages and the removed blog absent."""

import unittest
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

from test_project_collections import Document
import test_project_collections as collections


class SearchIndexingTests(unittest.TestCase):
    BUILD = collections.FilmCollectionTests.BUILD

    def test_sitemap_lists_canonical_pages_without_redirects_or_legacy_placeholders(self):
        sitemap = ET.parse(self.BUILD / 'sitemap.xml')
        urls = [item.text for item in sitemap.findall('{*}url/{*}loc')]
        self.assertEqual(len(urls), len(set(urls)))
        routes = {urlsplit(url).path for url in urls}
        self.assertTrue({'/', '/work/', '/about/', '/contact/', '/work/paper-ghost/'}.issubset(routes))
        self.assertFalse(routes.intersection({'/posts/', '/users/', '/moodboard/', '/experiments/'}))
        for url in urls:
            with self.subTest(url=url):
                parsed = urlsplit(url)
                self.assertEqual(parsed.scheme, 'https')
                self.assertEqual(parsed.netloc, 'www.ilovemolecule.com')
                self.assertFalse(parsed.query or parsed.fragment)
                page = Document((self.BUILD / parsed.path.strip('/') / 'index.html').read_text(encoding='utf-8')).root
                canonical = page.find_all(lambda item: item.tag == 'link' and item.attrs.get('rel') == 'canonical')
                self.assertEqual([item.attrs.get('href') for item in canonical], [url])
                self.assertFalse(page.find_all(lambda item: item.tag == 'meta' and (
                    item.attrs.get('http-equiv', '').lower() == 'refresh'
                    or (item.attrs.get('name', '').lower() in {'robots', 'googlebot'}
                        and 'noindex' in item.attrs.get('content', '').lower()))))

    def test_removed_blog_has_no_pages_or_feed_and_sitemap_links(self):
        for route in ['posts', 'devblog', 'devblog/2023-08-02', 'devblog/2019-10-01']:
            self.assertFalse((self.BUILD / route / 'index.html').exists(), route)
        for name in ['sitemap.xml', 'index.xml', 'index.json']:
            source = (self.BUILD / name).read_text(encoding='utf-8')
            self.assertNotIn('/devblog/', source)
            self.assertNotIn('https://www.ilovemolecule.com/posts/', source)


if __name__ == '__main__':
    unittest.main()
