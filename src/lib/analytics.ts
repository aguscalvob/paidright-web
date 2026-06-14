/**
 * Privacy-correct Google Analytics 4 loader.
 *
 * GA4 sets cookies and sends data to Google → under GDPR/ePrivacy we MUST get
 * consent before loading the script. Strategy:
 *   1. Default Google Consent Mode v2 to "denied" before anything else runs.
 *   2. Show the cookie banner. If the user accepts, persist that, queue a
 *      consent update + config, then load gtag.js.
 *   3. If they reject, persist that too and never load gtag.js.
 *   4. Choice persists in localStorage so users aren't re-asked.
 *
 * Uses the EXACT Google-recommended gtag pattern (pushes `arguments`, not a
 * rest array) because gtag.js inspects entries that way internally.
 */

export const GA_MEASUREMENT_ID = 'G-B7M06N6ZXJ';

const STORAGE_KEY = 'paidright-cookie-consent-v1';

export type ConsentChoice = 'accepted' | 'rejected';

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Read the saved choice, if any. Safe on SSR/no-window. */
export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === 'accepted' || v === 'rejected' ? v : null;
}

/**
 * Set Consent Mode v2 defaults to "denied" before any GA script is loaded.
 * Installs the canonical gtag function (pushes `arguments` to dataLayer) so
 * the gtag.js script picks up the queue correctly when it loads.
 */
export function initConsentDefaults(): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // The Google-recommended gtag function. Use `arguments`, not rest args.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(this: unknown): void {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  window.gtag('consent', 'default', {
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

/** Queue the consent update + config, then load gtag.js. */
function loadGtagAndGrant(): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  // Queue consent update + js + config FIRST. gtag.js processes the queue in
  // order on load: default(denied) -> update(granted) -> js -> config -> hit.
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });

  if (!scriptLoaded) {
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true,
      // debug_mode lights up GA's DebugView (Admin -> DebugView) — leave on
      // for now so we can verify hits in real time; can remove later.
      debug_mode: true,
    });

    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(s);
    scriptLoaded = true;
  }
}

/** Apply (and persist) a consent choice. */
export function applyConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, choice);
  if (choice === 'accepted') {
    loadGtagAndGrant();
  }
}

/**
 * On boot: set consent defaults and, if a previous "accepted" choice exists,
 * load GA right away.
 */
export function bootAnalytics(): void {
  initConsentDefaults();
  if (getStoredConsent() === 'accepted') {
    loadGtagAndGrant();
  }
}

/** Manually fire a page_view event (use on SPA route changes). */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}
