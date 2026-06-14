/**
 * Privacy-correct Google Analytics 4 loader.
 *
 * GA4 sets cookies and sends data to Google → under GDPR/ePrivacy we MUST get
 * consent before loading the script. Strategy:
 *   1. Default Google Consent Mode v2 to "denied" before anything else runs.
 *   2. Show the cookie banner. If the user accepts, persist that and load
 *      gtag.js, then call gtag('consent','update', { ... granted }).
 *   3. If they reject, persist that too and never load gtag.js (no GA cookies
 *      are set at all — the consent-default-denied call uses no cookies).
 *   4. Choice persists in localStorage so users aren't re-asked.
 *
 * Measurement ID is hardcoded — the publishable site key for GA4 is intended
 * to be public.
 */

export const GA_MEASUREMENT_ID = 'G-04Q70MT0RE';

const STORAGE_KEY = 'paidright-cookie-consent-v1';

export type ConsentChoice = 'accepted' | 'rejected';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Read the saved choice, if any. Safe on SSR/no-window. */
export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === 'accepted' || v === 'rejected' ? v : null;
}

function gtag(...args: unknown[]): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Set Consent Mode v2 defaults to "denied" before any GA script is loaded.
 * Must run on every page load, regardless of stored consent. Safe to call
 * more than once.
 */
export function initConsentDefaults(): void {
  if (typeof window === 'undefined') return;
  // Expose `gtag` globally so the later script picks up the same queue.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => {
    window.dataLayer!.push(args);
  });
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });
}

let scriptLoaded = false;

/** Load gtag.js (only once) and grant analytics_storage. */
function loadGtagAndGrant(): void {
  if (typeof window === 'undefined') return;
  if (!scriptLoaded) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(s);
    scriptLoaded = true;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true,
    });
  }
  gtag('consent', 'update', {
    analytics_storage: 'granted',
  });
}

/** Apply (and persist) a consent choice. */
export function applyConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, choice);
  if (choice === 'accepted') {
    loadGtagAndGrant();
  }
  // If rejected: defaults already deny analytics_storage; no script loaded.
}

/**
 * On boot: read the stored choice and, if it's "accepted", load GA.
 * If null (no choice yet), do nothing — the banner will be shown.
 */
export function bootAnalytics(): void {
  initConsentDefaults();
  const stored = getStoredConsent();
  if (stored === 'accepted') {
    loadGtagAndGrant();
  }
}

/** Manually fire a page_view event (use on SPA route changes). */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}
