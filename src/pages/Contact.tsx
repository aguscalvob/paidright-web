import { useEffect, useState } from 'react';

import {
  CONTACT_ACCESS_KEY,
  CONTACT_EMAIL,
  CONTACT_SUBJECT_TAG,
} from '../lib/links.ts';

const REASONS = [
  { value: 'support', label: 'Help / support' },
  { value: 'bug', label: 'Report a bug' },
  { value: 'feature', label: 'Feature request' },
  { value: 'gdpr', label: 'Data / privacy request (GDPR)' },
  { value: 'other', label: 'Something else' },
];

export function Contact() {
  const [reason, setReason] = useState('support');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [botField, setBotField] = useState(''); // honeypot
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Contact — PaidRight';
  }, []);

  const configured = CONTACT_ACCESS_KEY !== '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (botField !== '') return; // bot caught
    if (!email.trim() || !message.trim()) {
      setError('Please add your email and a message.');
      return;
    }
    if (!configured) {
      setError(
        `The form isn't set up yet. Please email ${CONTACT_EMAIL} directly.`,
      );
      return;
    }

    const reasonLabel =
      REASONS.find((r) => r.value === reason)?.label ?? reason;

    setBusy(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: CONTACT_ACCESS_KEY,
          subject: `${CONTACT_SUBJECT_TAG} ${reasonLabel}`,
          from_name: 'PaidRight Website',
          name: name.trim() || 'Anonymous',
          email: email.trim(),
          reason: reasonLabel,
          source: 'paidright-website',
          message: message.trim(),
        }),
      });
      const data = await res.json();
      setBusy(false);
      if (data.success) {
        setSent(true);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setBusy(false);
      setError('Could not send right now. Please try again or email us.');
    }
  }

  return (
    <main className="content">
      <h1>Contact</h1>
      <p className="effective">
        Questions, bugs, feature ideas, or a data request — we read everything.
      </p>

      {sent ? (
        <div className="msg-success" style={{ fontSize: 15 }}>
          ✓ Thanks — your message is on its way. We'll reply to{' '}
          <strong>{email}</strong> as soon as we can.
        </div>
      ) : (
        <form className="cform" onSubmit={handleSubmit}>
          <label htmlFor="reason">Reason</label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            {REASONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>

          <label htmlFor="name">Your name (optional)</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane"
          />

          <label htmlFor="email">Your email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
          />

          {/* Honeypot — hidden from humans, catches bots. */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
            style={{ position: 'absolute', left: '-9999px' }}
            aria-hidden="true"
          />

          {error && <div className="msg-error">{error}</div>}

          <button type="submit" disabled={busy}>
            {busy ? 'Sending…' : 'Send message'}
          </button>

          <p className="cform-alt">
            Prefer email? Write to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </form>
      )}
    </main>
  );
}
