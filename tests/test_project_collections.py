"""Check collection rendering after a Hugo build into PORTFOLIO_BUILD_DIR."""

from html.parser import HTMLParser
from pathlib import Path
import os
import re
import unittest


class Element:
    def __init__(self, tag, attrs=()):
        self.tag = tag
        self.attrs = dict(attrs)
        self.children = []

    def has_class(self, name):
        return name in self.attrs.get('class', '').split()

    def find_all(self, predicate):
        found = []
        for child in self.children:
            if isinstance(child, Element):
                if predicate(child):
                    found.append(child)
                found.extend(child.find_all(predicate))
        return found

    def text(self):
        content = ''.join(child.text() if isinstance(child, Element) else child for child in self.children)
        return re.sub(r'\s+', ' ', content).strip()


class Document(HTMLParser):
    VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Element('document')
        self.stack = [self.root]
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        element = Element(tag, attrs)
        self.stack[-1].children.append(element)
        if tag not in self.VOID:
            self.stack.append(element)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                self.stack = self.stack[:index]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


class FilmCollectionTests(unittest.TestCase):
    BUILD = Path(os.environ.get('PORTFOLIO_BUILD_DIR', '.preview/project-catalogue-check'))
    FILMS = ['/work/x-men-apocalypse/', '/work/glass-castle/', '/work/mother/', '/work/arrival/']

    def page(self, route):
        return Document((self.BUILD / route.strip('/') / 'index.html').read_text(encoding='utf-8')).root

    def one(self, parent, predicate):
        matches = parent.find_all(predicate)
        self.assertEqual(len(matches), 1)
        return matches[0]

    def test_home_and_collection_share_the_requested_order(self):
        for route in ['/', '/work/paper-ghost/']:
            with self.subTest(route=route):
                page = self.page(route)
                projects = page.find_all(lambda item: 'data-collection-project' in item.attrs)
                self.assertEqual([item.attrs['data-collection-project'] for item in projects], self.FILMS)
                lead = self.one(projects[0], lambda item: item.has_class('case-hero'))
                if route == '/':
                    lead = self.one(lead, lambda item: 'data-carousel-stage' in item.attrs)
                self.assertIn('xmen_apocalypse_pentagon3', self.one(lead, lambda item: item.tag == 'img').attrs['src'])
                self.assertEqual(len(page.find_all(lambda item: item.tag == 'h1')), 1)
                ids = [item.attrs['id'] for item in page.find_all(lambda item: 'id' in item.attrs)]
                self.assertEqual(len(ids), len(set(ids)))

    def test_work_lists_films_as_individual_projects(self):
        cards = self.page('/work/').find_all(lambda item: 'data-project-card' in item.attrs)
        links = []
        for card in cards:
            title = self.one(card, lambda item: item.has_class('project-title'))
            links.append(self.one(title, lambda item: item.tag == 'a').attrs['href'])
        self.assertEqual(links[:4], self.FILMS)
        self.assertNotIn('/work/paper-ghost/', links)
        self.assertEqual(len(links), 7)

    def test_collection_contains_each_complete_project_and_its_credits(self):
        collection = self.page('/work/paper-ghost/')
        for route in self.FILMS:
            with self.subTest(project=route):
                leaf = self.page(route)
                body = self.one(leaf, lambda item: item.has_class('case-body'))
                embedded = self.one(collection, lambda item: item.attrs.get('data-collection-project') == route)
                copy = self.one(embedded, lambda item: item.has_class('collection-project-copy'))
                self.assertIn(body.text(), copy.text())
                self.assertEqual(
                    [item.attrs['src'] for item in body.find_all(lambda item: item.tag == 'img')],
                    [item.attrs['src'] for item in copy.find_all(lambda item: item.tag == 'img')],
                )
                facts = self.one(leaf, lambda item: item.has_class('case-facts'))
                self.assertEqual(facts.text(), self.one(copy, lambda item: item.has_class('case-facts')).text())
                self.assertTrue(leaf.find_all(lambda item: item.tag == 'a' and item.attrs.get('href') == '/work/paper-ghost/'))


if __name__ == '__main__':
    unittest.main()
