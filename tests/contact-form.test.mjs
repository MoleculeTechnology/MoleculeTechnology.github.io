import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../assets/js/contact-form.js', import.meta.url), 'utf8');

function fixture(fetchResult = async () => ({ ok: true, status: 200, json: async () => ({ success: true }) })) {
  const status = { textContent: '', dataset: {} };
  const fields = { disabled: false };
  const button = { disabled: true, textContent: 'Send message' };
  const honeypot = { checked: false };
  const values = {
    access_key: '00000000-0000-0000-0000-000000000000',
    name: '',
    email: 'preview@example.com',
    message: 'Local submission-handler test.',
  };
  const state = { calls: [], resets: 0, valid: true, reports: 0, attributes: {}, timersCleared: 0 };
  const handlers = {};
  const form = {
    action: 'https://api.web3forms.com/submit',
    querySelector: selector => ({
      fieldset: fields,
      'button[type="submit"]': button,
      '[role="status"]': status,
      '[name="botcheck"]': honeypot,
    })[selector],
    addEventListener: (name, handler) => { handlers[name] = handler; },
    checkValidity: () => state.valid,
    reportValidity: () => { state.reports++; },
    reset: () => { state.resets++; values.message = ''; },
    setAttribute: (key, value) => { state.attributes[key] = value; },
  };
  runInNewContext(source, {
    document: { querySelector: selector => selector === '[data-contact-form]' ? form : null },
    navigator: {},
    AbortController,
    FormData: class {
      constructor() { this.entries = Object.entries(values); }
      [Symbol.iterator]() { return this.entries[Symbol.iterator](); }
    },
    fetch: async (url, options) => {
      state.calls.push({ url, options });
      return fetchResult(url, options);
    },
    setTimeout: callback => { state.timeout = callback; return 1; },
    clearTimeout: () => { state.timersCleared++; },
  });
  const submit = () => handlers.submit({ preventDefault() {} });
  return { status, fields, button, honeypot, values, state, submit };
}

function assertRestored(f) {
  assert.equal(f.fields.disabled, false);
  assert.equal(f.button.disabled, false);
  assert.equal(f.button.textContent, 'Send message');
  assert.equal(f.state.attributes['aria-busy'], 'false');
  assert.equal(f.state.timersCleared, 1);
}

test('a confirmed submission sends JSON and clears the message only after acceptance', async () => {
  const f = fixture();
  await f.submit();
  assert.equal(f.state.calls.length, 1);
  const { url, options } = f.state.calls[0];
  assert.equal(url, 'https://api.web3forms.com/submit');
  assert.equal(options.method, 'POST');
  assert.equal(options.headers.Accept, 'application/json');
  assert.equal(options.redirect, 'error');
  assert.equal(JSON.parse(options.body).message, 'Local submission-handler test.');
  assert.equal(f.state.resets, 1);
  assert.equal(f.status.dataset.state, 'success');
  assert.match(f.status.textContent, /Message sent/);
  assertRestored(f);
});

for (const [name, response] of [
  ['HTTP rejection', { ok: false, status: 400, json: async () => ({ success: false }) }],
  ['rejection in a successful HTTP response', { ok: true, status: 200, json: async () => ({ success: false }) }],
  ['missing acceptance flag', { ok: true, status: 200, json: async () => ({}) }],
  ['malformed response', { ok: true, status: 200, json: async () => { throw new SyntaxError('Invalid JSON'); } }],
]) {
  test(`${name} retains the message and restores the form`, async () => {
    const f = fixture(async () => response);
    await f.submit();
    assert.equal(f.state.resets, 0);
    assert.equal(f.values.message, 'Local submission-handler test.');
    assert.equal(f.status.dataset.state, 'error');
    assertRestored(f);
  });
}

test('rate limiting has a readable retry message and retains the inquiry', async () => {
  const f = fixture(async () => ({ status: 429 }));
  await f.submit();
  assert.match(f.status.textContent, /wait a moment/);
  assert.equal(f.state.resets, 0);
  assertRestored(f);
});

test('network failure does not claim that sending succeeded or erase the message', async () => {
  const f = fixture(async () => { throw new TypeError('Network unavailable'); });
  await f.submit();
  assert.match(f.status.textContent, /Couldn’t confirm/);
  assert.equal(f.values.message, 'Local submission-handler test.');
  assertRestored(f);
});

test('a timeout aborts the request and permits a manual retry', async () => {
  const f = fixture((url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('Aborted')), { once: true });
  }));
  const pending = f.submit();
  f.state.timeout();
  await pending;
  assert.equal(f.state.calls[0].options.signal.aborted, true);
  assert.equal(f.status.dataset.state, 'error');
  assert.equal(f.state.resets, 0);
  assertRestored(f);
});

test('pending requests disable editing and ignore duplicate submissions', async () => {
  let accept;
  const f = fixture(() => new Promise(resolve => { accept = resolve; }));
  const first = f.submit();
  assert.equal(f.fields.disabled, true);
  assert.equal(f.button.disabled, true);
  assert.equal(f.state.attributes['aria-busy'], 'true');
  await f.submit();
  assert.equal(f.state.calls.length, 1);
  accept({ ok: true, status: 200, json: async () => ({ success: true }) });
  await first;
  assertRestored(f);
});

test('invalid fields and a filled honeypot do not issue requests', async () => {
  const f = fixture();
  f.state.valid = false;
  await f.submit();
  assert.equal(f.state.reports, 1);
  assert.equal(f.state.calls.length, 0);
  f.state.valid = true;
  f.honeypot.checked = true;
  await f.submit();
  assert.equal(f.state.calls.length, 0);
  assert.equal(f.status.dataset.state, 'error');
  assert.equal(f.state.resets, 0);
});
