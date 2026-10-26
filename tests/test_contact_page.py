"""Keep the contact page usable without third-party embeds or advertising."""

import unittest

from test_project_collections import Document
import test_project_collections as collections


class ContactPageTests(unittest.TestCase):
    def test_contact_has_a_direct_destination_and_no_advertising_embed(self):
        source = (collections.FilmCollectionTests.BUILD / 'contact/index.html').read_text(encoding='utf-8')
        page = Document(source).root
        self.assertFalse(page.find_all(lambda item: item.tag in ['iframe', 'form']))
        self.assertFalse(page.find_all(lambda item: item.tag == 'script'))
        self.assertNotIn('hubspot', source.lower())
        self.assertNotIn('hsforms', source.lower())
        panel = page.find_all(lambda item: item.has_class('contact-method'))
        self.assertEqual(len(panel), 1)
        contact = panel[0].find_all(lambda item: item.tag == 'a' and item.has_class('contact-action'))
        self.assertEqual(len(contact), 1)
        self.assertEqual(contact[0].attrs['href'], 'https://www.linkedin.com/in/russelljahn/')
        self.assertIn('Message on LinkedIn', contact[0].text())
        targets = page.find_all(lambda item: item.attrs.get('id') == 'contact-method-heading')
        self.assertEqual(len(targets), 1)
        self.assertEqual(targets[0].attrs.get('tabindex'), '-1')


if __name__ == '__main__':
    unittest.main()
