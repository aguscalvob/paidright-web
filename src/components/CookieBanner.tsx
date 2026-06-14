import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { applyConsent, getStoredConsent } from '../lib/analytics.ts';

/**
 * Bottom-bar cookie consent banner. GDPR/ePrivacy-compliant for the EU:
 *   - Equal-weight Accept and Reject buttons (no dark patterns).
 *   - Rejecting is the default if the user closes the tab without choosing.
 *   - Choice persists in localStorage; banner re-shows only if cleared.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  function choose(c: 'accepted' | 'rejected') {
    applyConsent(c);
    setVisible(false);
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        <p>
          We use a cookie for{' '}
          <strong>Google Analytics</strong> to count visits and see which pages
          people find useful. No ads, no profiling. See our{' '}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="cookie-btn cookie-btn-reject"
            onClick={() => choose('rejected')}
          >
            Reject
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn-accept"
            onClick={() => choose('accepted')}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
