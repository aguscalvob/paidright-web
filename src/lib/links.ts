// Store + contact config.
//
// Store URLs — fill once the listings are live:
//   - APP_STORE_URL  → https://apps.apple.com/app/idXXXXXXXXXX
//   - PLAY_STORE_URL → https://play.google.com/store/apps/details?id=ie.paidright.app
// While a URL is empty (''), the landing page shows a "Coming soon" badge.
export const APP_STORE_URL: string = 'https://apps.apple.com/app/id6780205516';
export const PLAY_STORE_URL: string = '';

export const CONTACT_EMAIL = 'paidright.app@hotmail.com';

// App-usage demo shown in the hero phone mockup. Drop a screen recording at
// public/demo.mp4 (portrait, muted, short loop) and set this to '/demo.mp4'.
// While empty (''), the phone shows a branded placeholder instead.
export const APP_DEMO_VIDEO: string = '/demo.mp4';

// Contact form delivery via Web3Forms (https://web3forms.com).
// Get a free access key: enter paidright.app@hotmail.com at web3forms.com →
// the key is emailed instantly (no account needed). Paste it here. The key is
// safe to expose in client code. While empty (''), the contact form falls back
// to a "please email us" message.
export const CONTACT_ACCESS_KEY: string = 'f2ba79bc-4109-4b16-b2c6-2ab1a37aa5a5';

// Tag added to the email subject + sender name so you can filter website
// submissions in your inbox (e.g. a rule: subject contains this tag).
export const CONTACT_SUBJECT_TAG = '[PaidRight Website]';
