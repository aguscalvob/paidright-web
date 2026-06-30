import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link, useNavigate } from 'react-router-dom';

import { Logo } from '../components/Logo.tsx';
import { APP_DEMO_VIDEO, APP_STORE_URL, PLAY_STORE_URL } from '../lib/links.ts';
import { usePlatform } from '../lib/usePlatform.ts';

type Store = {
  key: 'ios' | 'android';
  url: string;
  glyph: string;
  small: string;
  big: string;
};

const STORES: Record<'ios' | 'android', Store> = {
  ios: { key: 'ios', url: APP_STORE_URL, glyph: '', small: 'Download on the', big: 'App Store' },
  android: { key: 'android', url: PLAY_STORE_URL, glyph: '▶', small: 'Get it on', big: 'Google Play' },
};

/** A single store download button. Shows "Coming soon" until `url` is set. */
function StoreButton({ store }: { store: Store }) {
  const live = store.url !== '';
  return (
    <a
      className={live ? 'store-btn' : 'store-btn disabled'}
      href={live ? store.url : undefined}
      aria-disabled={!live}
      target={live ? '_blank' : undefined}
      rel={live ? 'noreferrer' : undefined}
    >
      <span className="glyph" aria-hidden="true">
        {store.glyph}
      </span>
      <span className="store-label">
        <span className="small">{live ? store.small : 'Coming soon'}</span>
        <span className="big">{store.big}</span>
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
  const platform = usePlatform();
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

  // Lead with the visitor's platform; desktop shows both.
  const isMobile = platform === 'ios' || platform === 'android';
  const primary = platform === 'android' ? STORES.android : STORES.ios;
  const secondary = primary.key === 'ios' ? STORES.android : STORES.ios;

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-top">
            <Link className="brand" to="/">
              <span className="logo">
                <Logo size={30} />
              </span>{' '}
              PAIDRIGHT
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

          <div className="hero-body">
            <div className="hero-content">
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
                Your work. Your rights.{' '}
                <span className="muted">Your money.</span>
              </p>

              <div className="downloads" id="get">
                {isMobile ? (
                  <>
                    <StoreButton store={primary} />
                    <a
                      className="alt-store"
                      href={secondary.url !== '' ? secondary.url : '#get'}
                      target={secondary.url !== '' ? '_blank' : undefined}
                      rel={secondary.url !== '' ? 'noreferrer' : undefined}
                    >
                      {secondary.url !== ''
                        ? `Also on ${secondary.big}`
                        : `${secondary.big} coming soon`}
                    </a>
                  </>
                ) : (
                  <>
                    <div className="downloads-stores">
                      <StoreButton store={STORES.ios} />
                      <StoreButton store={STORES.android} />
                    </div>
                    <div className="downloads-qr" aria-label="QR code to download the app">
                      <QRCodeSVG
                        value="https://paidright.app/get"
                        size={104}
                        bgColor="#ffffff"
                        fgColor="#0c1f4b"
                        level="M"
                        marginSize={2}
                      />
                      <p className="downloads-qr-label">
                        Scan to download
                        <br />
                        on your phone
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="hero-phone">
              <div className="phone-frame">
                {APP_DEMO_VIDEO !== '' ? (
                  <video
                    className="phone-media"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={APP_DEMO_VIDEO} type="video/mp4" />
                  </video>
                ) : (
                  <div className="phone-placeholder">
                    <Logo size={46} />
                    <span>App preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {emailConfirmed && (
        <div
          className="confirm-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setEmailConfirmed(false)}
        >
          <div
            className="confirm-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="confirm-check" aria-hidden="true">
              ✓
            </div>
            <h2>Email confirmed</h2>
            <p>You're all set — open the PaidRight app and sign in.</p>
            <button type="button" onClick={() => setEmailConfirmed(false)}>
              Got it
            </button>
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

      {/* Sticky mobile download bar — visible immediately on phones. */}
      {isMobile && (
        <div className="mcta">
          <StoreButton store={primary} />
        </div>
      )}
    </>
  );
}
