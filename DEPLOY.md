# Deploying paidright.app — guide for Thomas

Goal: host this static site (Vite + React) on **Cloudflare Pages** and serve
it at **paidright.app**, which is already in your Cloudflare account.

Time: ~10 minutes. Everything here is free. No domain transfer needed — the
domain can stay in your account.

---

## 0. One-time: repo access (Agustin does this)

Cloudflare needs to read the GitHub repo. Agustin adds you as a collaborator:
GitHub → `aguscalvob/paidright-web` → **Settings → Collaborators → Add people**
→ your GitHub username. You'll get an email invite — accept it.

(Alternatively Agustin makes the repo public; the site content is public
anyway.)

---

## 1. Create the Cloudflare Pages project

1. Cloudflare dashboard (the account that owns **paidright.app**) →
   **Workers & Pages**.
2. **Create application → Pages → Connect to Git**.
3. Authorize GitHub if prompted, then pick the **paidright-web** repo.
4. Build settings:
   - **Production branch:** `master`
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. **Save and Deploy**. Wait ~1–2 minutes. You'll get a
   `https://paidright-web-xxxx.pages.dev` URL — open it and confirm the site
   loads.

---

## 2. Point the domain — custom domain, NOT a redirect

1. In the Pages project → **Custom domains → Set up a custom domain**.
2. Enter **paidright.app** → Continue. Because the domain is in this same
   Cloudflare account, Cloudflare creates the DNS record and provisions the
   SSL certificate automatically.
3. (Optional) Add **www.paidright.app** too and let it redirect to the apex.
4. Wait for the domain to show **Active** (usually a couple of minutes), then
   visit **https://paidright.app** — it should serve the site over HTTPS.

> ⚠️ **Please use the custom-domain flow above — not a URL redirect / page
> rule / "301".** The app's password-reset and email-confirmation links, plus
> its in-app Privacy/Terms links, all expect `paidright.app` to *serve* the
> site directly. A redirect to the `pages.dev` URL would break the auth token
> flow.

---

## Future updates

Nothing to do. Every push to the repo's `master` branch auto-rebuilds and
redeploys (~1 min). Agustin pushes code; Cloudflare redeploys itself.

---

## After it's live (Agustin's side)

- **Supabase → Authentication → URL Configuration:** Site URL =
  `https://paidright.app`; add `https://paidright.app/reset` to Redirect URLs.
- **Web3Forms dashboard:** restrict the contact-form key to `paidright.app`.
