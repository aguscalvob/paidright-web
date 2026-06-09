import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const FEATURES = [
  'Real take-home pay',
  'Holiday entitlements',
  'Irish tax calculations',
  'Break rights',
];

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
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-top">
            <Link className="brand" to="/">
              <span className="logo">P✓</span> PAIDRIGHT
            </Link>
            <div className="hero-actions">
              <nav className="hero-nav">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/terms">Terms</Link>
                <Link to="/privacy">Privacy</Link>
                <Link to="/contact">Contact</Link>
              </nav>
              <a className="freedl" href="#get">
                Free Download
              </a>
            </div>
          </div>

          <h1>
            Are you being
            <br />
            <span className="accent">paid right?</span>
          </h1>

          <p className="sub">
            Most hourly workers don't know their exact take-home, breaks, or
            holiday rights. Now you will.
          </p>

          <div className="pills">
            {FEATURES.map((f) => (
              <span className="pill" key={f}>
                {f}
              </span>
            ))}
          </div>

          <p className="tagline">
            Your work. Your rights. <span className="muted">Your money.</span>
          </p>

          <div className="downloads" id="get">
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
        </div>
      </section>

      {emailConfirmed && (
        <div className="confirmed-wrap">
          <div className="confirmed-card">
            ✓ <strong>Your email is confirmed.</strong> Open the PaidRight app
            and sign in — you're all set.
          </div>
        </div>
      )}

      <footer className="lfoot">
        <div className="inner">
          <div className="row">
            <div className="links">
              <Link to="/about">About</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="copy">© 2026 PaidRight · Dublin, Ireland</div>
          </div>
        </div>
      </footer>
    </>
  );
}
