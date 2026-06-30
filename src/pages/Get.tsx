import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../components/Logo.tsx';
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/links.ts';
import { usePlatform } from '../lib/usePlatform.ts';

/**
 * Smart store-redirect landing page.
 *
 * - iOS visitor: redirects to the App Store URL (when set)
 * - Android visitor: redirects to the Play Store URL (when set), else shows
 *   a "coming soon" message + the App Store option
 * - Desktop visitor: shows both buttons with a "scan / open on your phone"
 *   message — this is what's encoded in the homepage QR code
 *
 * Forward-compatible: when Android ships, fill PLAY_STORE_URL in links.ts and
 * this page picks it up automatically without code changes.
 */
export function Get() {
  const platform = usePlatform();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    document.title = 'Download PaidRight';
  }, []);

  useEffect(() => {
    if (platform === 'ios' && APP_STORE_URL !== '') {
      window.location.replace(APP_STORE_URL);
      setRedirected(true);
    } else if (platform === 'android' && PLAY_STORE_URL !== '') {
      window.location.replace(PLAY_STORE_URL);
      setRedirected(true);
    }
  }, [platform]);

  const showAppStore = APP_STORE_URL !== '';
  const showPlay = PLAY_STORE_URL !== '';

  return (
    <div className="get-page">
      <div className="get-card">
        <div className="get-logo">
          <Logo size={48} />
        </div>
        <h1>PaidRight</h1>
        <p className="get-lead">
          {redirected
            ? 'Opening the store…'
            : platform === 'ios'
              ? 'Open in the App Store →'
              : platform === 'android'
                ? showPlay
                  ? 'Open in Google Play →'
                  : "Android version is coming soon. For now, PaidRight is on iOS."
                : "Free for hourly workers in Ireland. Tap the store for your device."}
        </p>

        <div className="get-buttons">
          {showAppStore ? (
            <a
              className="get-btn"
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span className="get-btn-small">Download on the</span>
              <span className="get-btn-big">App Store</span>
            </a>
          ) : null}
          {showPlay ? (
            <a
              className="get-btn"
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span className="get-btn-small">Get it on</span>
              <span className="get-btn-big">Google Play</span>
            </a>
          ) : (
            <div className="get-btn get-btn-disabled">
              <span className="get-btn-small">Coming soon</span>
              <span className="get-btn-big">Google Play</span>
            </div>
          )}
        </div>

        <Link to="/" className="get-back">
          ← Back to paidright.app
        </Link>
      </div>
    </div>
  );
}
