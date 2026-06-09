# PaidRight — website

Static marketing + legal site for the PaidRight app. Plain HTML/CSS, no build
step. Deploys to **Cloudflare Pages** on the `paidright.app` domain.

## Pages

| URL | File | Purpose |
|-----|------|---------|
| `/` | `index.html` | Landing page. Also intercepts Supabase auth email redirects: forwards password-reset links to `/reset`, shows an "email confirmed" banner for confirmation links. |
| `/privacy` | `privacy/index.html` | Privacy Policy (GDPR). Linked from the app's Register + About screens and required by the App Store / Play Store. |
| `/terms` | `terms/index.html` | Terms of Service. |
| `/reset` | `reset/index.html` | Password-reset form. Reads the recovery token from the URL hash and calls `supabase.auth.updateUser`. Supabase publishable key is baked in (safe — RLS protects all writes). |
| `/assets/style.css` | shared styles | Navy + emerald brand. |

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub (its own repo, e.g. `paidright-web`).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → pick this repo.
3. Build settings: **Framework preset = None**, **Build command = (blank)**,
   **Build output directory = `/`** (the site is static, no build step).
4. Deploy. You'll get a `*.pages.dev` URL to test.
5. **Custom domain:** Pages project → **Custom domains** → add
   `paidright.app` (and `www` if you want). Because the domain is already on
   Cloudflare, DNS is one click.

## After it's live — wire it up

- **Supabase → Authentication → URL Configuration:**
  - **Site URL** = `https://paidright.app`
  - **Redirect URLs** — add `https://paidright.app/reset` and
    `https://paidright.app`
- The app's `src/constants/urls.ts` already points at
  `https://paidright.app/privacy` and `/terms` — no change needed.

## Keeping legal content in sync

The source of truth for the legal text is `LEGAL_DRAFTS.md` in the **app**
repo. If you change the policy there, update `privacy/index.html` /
`terms/index.html` here and bump the effective date in both places.
