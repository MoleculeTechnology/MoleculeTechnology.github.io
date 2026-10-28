(() => {
  const copyButton = document.querySelector('[data-copy-email]');
  const copyStatus = document.querySelector('[data-copy-status]');
  if (copyButton && navigator.clipboard?.writeText) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyButton.dataset.copyEmail);
        copyStatus.textContent = 'Email address copied.';
      } catch {
        copyStatus.textContent = 'Select and copy the email address above.';
      }
    });
  }

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const fields = form.querySelector('fieldset');
  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[role="status"]');
  const honeypot = form.querySelector('[name="botcheck"]');
  let pending = false;

  const showStatus = (message, state) => {
    status.textContent = message;
    status.dataset.state = state;
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (honeypot.checked) {
      showStatus('Unable to send this message. Please use the email address below.', 'error');
      return;
    }

    const payload = Object.fromEntries(new FormData(form));
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    pending = true;
    fields.disabled = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    showStatus('Sending your message…', 'pending');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
        redirect: 'error',
      });
      if (response.status === 429) {
        showStatus('Too many attempts. Please wait a moment and try again.', 'error');
        return;
      }
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        showStatus('Unable to send your message. Please try again, or use the email address below.', 'error');
        return;
      }
      form.reset();
      showStatus('Message sent. Thank you.', 'success');
    } catch {
      showStatus('Couldn’t confirm the message was sent. Your message is still here. Try again, or use the email address below.', 'error');
    } finally {
      clearTimeout(timeout);
      pending = false;
      fields.disabled = false;
      submit.disabled = false;
      submit.textContent = 'Send message';
      form.setAttribute('aria-busy', 'false');
    }
  });
  submit.disabled = false;
})();
