import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/links.ts';

/** A single store download button. Shows "Coming soon" until `url` is set. */
function StoreButton({
  url,
  glyph,
  small,
  big,
}: {
  url: string;
  glyph: string;
  small: string;
  big: string;
}) {
  const live = url !== '';
  return (
    <a
      className={live ? 'store-btn' : 'store-btn disabled'}
      href={live ? url : undefined}
      aria-disabled={!live}
      target={live ? '_blank' : undefined}
      rel={live ? 'noreferrer' : undefined}
    >
      <span className="glyph" aria-hidden="true">
        {glyph}
      </span>
      <span className="store-label">
        <span className="small">{live ? small : 'Coming soon'}</span>
        <span className="big">{big}</span>
      </span>
    </a>
  );
}

export function Home() {
  const navigate = useNavigate();
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  // Supabase auth emails redirect here with tokens in the URL hash.
  // Forward password-recovery links to /reset; flag confirmation links so
  // we can show a success banner.
  useEffect(() => {
    const hash = window.location.hash || '';
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const type = params.get('type');
    if (type === 'recovery') {
      navigate(`/reset${hash}`, { replace: true });
    } else if (params.get('access_token')) {
      setEmailConfirmed(true);
    }
  }, [navigate]);

  return (
    <>
      {emailConfirmed && (
        <div className="confirmed-wrap">
          <div className="confirmed-card">
            ✓ <strong>Your email is confirmed.</strong> Open the PaidRight app
            and sign in — you're all set.
          </div>
        </div>
      )}

      <section className="hero">
        <div className="logo-lg">P</div>
        <h1>Know what you're really paid.</h1>
        <p>
          PaidRight helps hourly workers in Ireland track their hours and see
          their take-home pay after PAYE, PRSI and USC — plus holiday
          entitlement under the Organisation of Working Time Act.
        </p>

        <div className="downloads">
          <StoreButton
            url={APP_STORE_URL}
            glyph=""
            small="Download on the"
            big="App Store"
          />
          <StoreButton
            url={PLAY_STORE_URL}
            glyph="▶"
            small="Get it on"
            big="Google Play"
          />
        </div>

        <p className="made">Made in Ireland 🇮🇪 · Free</p>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Take-home pay</h3>
          <p>
            Log your hours and see your estimated net pay after Irish tax and
            deductions — weekly, fortnightly or monthly.
          </p>
        </div>
        <div className="feature">
          <h3>Holiday entitlement</h3>
          <p>
            Track the leave you've earned under the Organisation of Working
            Time Act, and what unused leave is worth if you move on.
          </p>
        </div>
        <div className="feature">
          <h3>Premiums &amp; breaks</h3>
          <p>
            Sunday and night-shift premiums, bank-holiday rules, and rest-break
            reminders based on Workplace Relations Commission guidance.
          </p>
        </div>
      </section>

      <div className="disclaimer">
        <div className="card">
          <strong>Heads up:</strong> PaidRight is a planning tool, not a payroll
          or legal service. Figures are estimates based on publicly available
          Irish government information (Revenue, Citizens Information, the WRC)
          for the single-person standard case. For binding answers about your
          pay or entitlements, contact Revenue, the WRC, your union, or a
          qualified professional.
        </div>
      </div>
    </>
  );
}
