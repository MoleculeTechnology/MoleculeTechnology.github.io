"""Keep the contact page usable without third-party embeds or advertising."""

import unittest

from test_project_collections import Document
import test_project_collections as collections


class ContactPageTests(unittest.TestCase):
    def test_contact_uses_its_own_form_without_an_advertising_embed(self):
        source = (collections.FilmCollectionTests.BUILD / 'contact/index.html').read_text(encoding='utf-8')
        page = Document(source).root
        self.assertFalse(page.find_all(lambda item: item.tag == 'iframe'))
        scripts = page.find_all(lambda item: item.tag == 'script')
        self.assertEqual(len(scripts), 1)
        self.assertTrue(scripts[0].attrs['src'].startswith('/js/contact-form.min.'))
        self.assertIn('defer', scripts[0].attrs)
        self.assertNotIn('hubspot', source.lower())
        self.assertNotIn('hsforms', source.lower())
        panel = page.find_all(lambda item: item.has_class('contact-method'))
        self.assertEqual(len(panel), 1)
        contact = panel[0].find_all(lambda item: item.tag == 'a' and item.attrs.get('href') == 'mailto:info@ilovemolecule.com')
        self.assertEqual(len(contact), 1)
        self.assertEqual(contact[0].attrs['href'], 'mailto:info@ilovemolecule.com')
        self.assertIn('info@ilovemolecule.com', contact[0].text())
        forms = panel[0].find_all(lambda item: item.tag == 'form')
        self.assertEqual(len(forms), 1)
        form = forms[0]
        self.assertEqual(form.attrs['action'], 'https://api.web3forms.com/submit')
        self.assertEqual(form.attrs['method'], 'post')
        fields = {item.attrs['name']: item for item in form.find_all(
            lambda item: item.tag in ['input', 'textarea'])}
        self.assertRegex(fields['access_key'].attrs['value'], r'^[0-9a-f-]{36}$')
        self.assertEqual(fields['email'].attrs['type'], 'email')
        self.assertIn('required', fields['email'].attrs)
        self.assertIn('required', fields['message'].attrs)
        self.assertNotIn('required', fields['name'].attrs)
        self.assertIn('hidden', fields['botcheck'].attrs)
        self.assertEqual(fields['botcheck'].attrs['tabindex'], '-1')
        labels = {item.attrs['for'] for item in form.find_all(lambda item: item.tag == 'label')}
        self.assertEqual(labels, {fields[name].attrs['id'] for name in ['name', 'email', 'message']})
        submit = form.find_all(lambda item: item.tag == 'button' and item.attrs.get('type') == 'submit')
        self.assertEqual(len(submit), 1)
        self.assertIn('disabled', submit[0].attrs)
        self.assertEqual(submit[0].text(), 'Send message')
        status = form.find_all(lambda item: item.attrs.get('id') == 'contact-form-status')
        self.assertEqual(len(status), 1)
        self.assertEqual(status[0].attrs['aria-live'], 'polite')
        targets = page.find_all(lambda item: item.attrs.get('id') == 'contact-method-heading')
        self.assertEqual(len(targets), 1)
        self.assertEqual(targets[0].attrs.get('tabindex'), '-1')


if __name__ == '__main__':
    unittest.main()
