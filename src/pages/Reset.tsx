import { useEffect, useState } from 'react';

import { supabase } from '../lib/supabase.ts';

export function Reset() {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');

  useEffect(() => {
    document.title = 'Reset password — PaidRight';

    // The reset link puts the recovery tokens in the URL hash. Parse them and
    // establish a session before allowing the password update.
    async function init() {
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      const type = params.get('type');

      if (!access_token || type !== 'recovery') {
        setError(
          'This link is missing the recovery token. Request a new reset link from the app.',
        );
        return;
      }

      const { error: sessErr } = await supabase.auth.setSession({
        access_token,
        refresh_token: refresh_token ?? '',
      });
      if (sessErr) {
        setError(sessErr.message);
        return;
      }
      setReady(true);
    }

    void init();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (pw1.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (pw1 !== pw2) {
      setError('Passwords do not match.');
      return;
    }

    setBusy(true);
    const { error: updErr } = await supabase.auth.updateUser({ password: pw1 });
    setBusy(false);

    if (updErr) {
      setError(updErr.message);
      return;
    }
    setDone(true);
  }

  return (
    <div className="reset-body">
      <div className="reset-card">
        <h1>Set a new password</h1>
        <p className="lead">
          After saving, open the PaidRight app and sign in with your new
          password.
        </p>

        {error && <div className="msg-error">{error}</div>}

        {done ? (
          <div className="msg-success">
            ✓ Password updated. You can now open PaidRight and sign in.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="pw1">New password</label>
            <input
              id="pw1"
              type="password"
              placeholder="At least 6 characters"
              autoComplete="new-password"
              minLength={6}
              required
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
            />
            <label htmlFor="pw2">Confirm new password</label>
            <input
              id="pw2"
              type="password"
              placeholder="Re-enter it"
              autoComplete="new-password"
              minLength={6}
              required
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
            />
            <button type="submit" disabled={busy || !ready}>
              {busy ? 'Updating…' : 'Update password'}
            </button>
          </form>
        )}

        <div className="reset-footer">PaidRight · Ireland</div>
      </div>
    </div>
  );
}
