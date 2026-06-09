# PaidRight — website

Marketing + legal website for the PaidRight app. **Vite + React + TypeScript**,
deploys as a static site to **Cloudflare Pages** on the `paidright.app` domain.

## Routes

| URL | Component | Purpose |
|-----|-----------|---------|
| `/` | `pages/Home.tsx` | Landing page with App Store / Google Play download buttons. Also intercepts Supabase auth email redirects: forwards password-reset links to `/reset`, shows an "email confirmed" banner for confirmation links. |
| `/privacy` | `pages/Privacy.tsx` | Privacy Policy (GDPR). Linked from the app's Register + About screens and required by the App Store / Play Store. |
| `/terms` | `pages/Terms.tsx` | Terms of Service. |
| `/reset` | `pages/Reset.tsx` | Password-reset form. Reads the recovery token from the URL hash and calls `supabase.auth.updateUser`. |

Store links + contact email live in `src/lib/links.ts`. Supabase publishable
key (safe to expose — RLS protects all writes) lives in `src/lib/supabase.ts`.

## Develop

```bash
npm install
npm run dev      # local dev server (usually http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
```

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub (its own repo, e.g. `paidright-web`).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → pick this repo.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. You'll get a `*.pages.dev` URL to test.
5. **Custom domain:** Pages project → **Custom domains** → add
   `paidright.app`. Because the domain is already on Cloudflare, DNS is one
   click. `public/_redirects` handles SPA deep-link fallback.

## After it's live — wire it up

- **Supabase → Authentication → URL Configuration:**
  - **Site URL** = `https://paidright.app`
  - **Redirect URLs** — add `https://paidright.app/reset` and
    `https://paidright.app`
- The app's `src/constants/urls.ts` already points at
  `https://paidright.app/privacy` and `/terms` — no change needed.
- Once the apps are published, paste the store URLs into `src/lib/links.ts`
  (`APP_STORE_URL`, `PLAY_STORE_URL`) and redeploy.

## Keeping legal content in sync

The source of truth for the legal text is `LEGAL_DRAFTS.md` in the **app**
repo. If you change the policy there, update `pages/Privacy.tsx` /
`pages/Terms.tsx` here and bump the effective date in both places.
