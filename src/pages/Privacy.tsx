import { useEffect } from 'react';

import { CONTACT_EMAIL } from '../lib/links.ts';

export function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy — PaidRight';
  }, []);

  return (
    <main className="content">
      <h1>Privacy Policy</h1>
      <p className="effective">Effective date: 17 June 2026</p>

      <h2>1. Who we are</h2>
      <p>
        PaidRight (“we”, “us”, “our”) is operated by{' '}
        <strong>Agustin Calvo Bentos</strong>, based in Dublin, Ireland. We are
        the data controller for the personal data described in this policy.
      </p>
      <p>
        You can reach us at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> for any
        data-protection question or request.
      </p>

      <h2>2. What data we collect</h2>
      <p>We only collect the minimum information needed to run the app.</p>
      <h3>You give us directly when you create an account:</h3>
      <ul>
        <li>Email address (required, used for sign-in and account recovery)</li>
        <li>
          Password (encrypted by our authentication provider — we never see or
          store it in plain text)
        </li>
        <li>Optional display name</li>
      </ul>
      <p>
        If you choose <strong>Sign in with Apple</strong>, Apple sends us your
        name (once, on first sign-in) and an email address — which may be an
        Apple private relay address if you choose to hide your real one. We use
        these only to create and identify your account.
      </p>
      <p>
        If you choose <strong>Continue with Google</strong>, Google sends us
        your name, email address and profile picture URL. We use these only to
        create and identify your account.
      </p>
      <h3>You give us directly when you use the app:</h3>
      <ul>
        <li>
          Job details for each job you add — job name, hourly rate, pay
          frequency, break length and whether it's paid, bank-holiday
          agreement, optional Sunday and night-shift premium settings, optional
          auto-fill schedule, active/inactive status
        </li>
        <li>
          Worked-day records — dates worked, start and end times, hours worked,
          whether the day was a bank holiday
        </li>
        <li>Annual leave you record as taken</li>
      </ul>
      <h3>Automatically:</h3>
      <ul>
        <li>The dates your account and records were created and last updated</li>
        <li>
          A small role flag (<code>employee</code> or <code>employer</code>) —
          currently always <code>employee</code>; reserved for a future
          employer-account feature
        </li>
      </ul>
      <h3>We do not collect:</h3>
      <ul>
        <li>Your location</li>
        <li>Your device identifiers (IMEI, advertising IDs, etc.)</li>
        <li>Phone numbers</li>
        <li>Payment information (the app is free)</li>
        <li>Browsing or usage analytics</li>
        <li>Marketing or advertising data</li>
        <li>Anything from third-party data brokers</li>
      </ul>

      <h2>3. Why we collect it and our legal basis</h2>
      <table>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Legal basis (GDPR Art. 6)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Letting you sign in and use the app</td>
            <td>Contract performance (Art. 6(1)(b))</td>
          </tr>
          <tr>
            <td>
              Calculating your estimated take-home pay and holiday entitlement
            </td>
            <td>Contract performance</td>
          </tr>
          <tr>
            <td>Responding to your contact-form messages</td>
            <td>Legitimate interest in providing support (Art. 6(1)(f))</td>
          </tr>
          <tr>
            <td>Deleting your account and data on request</td>
            <td>Legal obligation (Art. 6(1)(c))</td>
          </tr>
        </tbody>
      </table>
      <p>
        We do not use your data for profiling, automated decision-making, or
        marketing.
      </p>

      <h2>4. Where we store it</h2>
      <p>
        All data is stored by our processor <strong>Supabase, Inc.</strong> in
        their EU region (Ireland / Frankfurt) on infrastructure operated by
        Amazon Web Services EMEA SARL. Authentication is also handled by
        Supabase. No data is transferred outside the EU/EEA.
      </p>

      <h2>5. How long we keep it</h2>
      <p>
        We keep your data as long as your account exists. When you delete your
        account through the in-app Delete account button, every row tied to your
        user ID is permanently removed from our database within a few seconds
        via a cascading delete. We do not retain backups beyond Supabase's
        standard disaster-recovery window (currently 24 hours on the free tier).
      </p>
      <p>
        If you contact us by email through the in-app form, your message stays
        in our <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> inbox
        until we delete it.
      </p>

      <h2>6. Who we share it with</h2>
      <p>We share data with the following processors and no other parties:</p>
      <ul>
        <li>
          <strong>Supabase, Inc.</strong> — authentication and database hosting
          (EU region). Bound by their data processing addendum.
        </li>
        <li>
          <strong>Apple Inc.</strong> — identity provider for the optional
          "Sign in with Apple" feature. If you use it, Apple handles your
          authentication and provides us a token confirming your identity.
          Governed by Apple's own privacy policy.
        </li>
        <li>
          <strong>Google LLC</strong> — used in two distinct, narrow ways:
          (i) <em>identity provider</em> for the optional "Continue with Google"
          sign-in feature in the app. If you use it, Google handles your
          authentication and provides us a token plus your name, email and
          profile-picture URL. (ii) <em>Google Analytics</em>, only on our
          website (<a href="https://paidright.app">paidright.app</a>) and only
          if you accept the cookie banner — used to count visits and see which
          pages people find useful. IP addresses are anonymised and we do not
          use Google Analytics for advertising or profiling. The mobile app
          itself does NOT use Google Analytics.
        </li>
      </ul>

      <h2>Website cookies</h2>
      <p>
        Our website uses one analytics cookie when you accept the cookie
        banner: <code>_ga</code> / related Google Analytics cookies, set by
        Google to count unique visits (typically expires after up to 2 years).
      </p>
      <p>
        If you reject the banner, no analytics cookies are set. You can change
        your mind at any time by clearing your browser's cookies and site data
        for <code>paidright.app</code> — the banner will reappear on your next
        visit. The PaidRight mobile app does not set or use cookies.
      </p>
      <p>
        We do not share data with advertisers, analytics providers, social
        networks, or marketers. We do not sell your data. We do not have any
        third-party SDKs in the app that collect data in the background.
      </p>
      <p>
        We may disclose data if legally compelled (court order, valid request
        from an Irish authority). If that ever happens we will tell you unless
        legally prohibited.
      </p>

      <h2>7. Your rights</h2>
      <p>Under the GDPR you have the right to:</p>
      <ul>
        <li>
          <strong>Access</strong> the data we hold about you (Art. 15)
        </li>
        <li>
          <strong>Rectify</strong> inaccurate data (Art. 16) — you can edit your
          profile, jobs, and worked days directly in the app
        </li>
        <li>
          <strong>Erase</strong> your account and all associated data (Art. 17)
          — use the Delete account button in Account → tap, confirm, done
        </li>
        <li>
          <strong>Restrict</strong> processing (Art. 18)
        </li>
        <li>
          <strong>Data portability</strong> (Art. 20) — request a JSON export of
          your data via the contact form; we'll send it within 30 days
        </li>
        <li>
          <strong>Object</strong> to processing (Art. 21)
        </li>
        <li>
          <strong>Lodge a complaint</strong> with the Irish Data Protection
          Commission (
          <a href="https://www.dataprotection.ie">www.dataprotection.ie</a>) at
          any time
        </li>
      </ul>
      <p>
        To exercise any of these rights other than access (which is in-app), use
        the in-app Contact form or email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We aim to
        respond within a few working days and at the latest within one month.
      </p>

      <h2>8. Children's data</h2>
      <p>
        PaidRight is not intended for children under 16. We do not knowingly
        collect data from anyone under 16. If you believe a child has
        registered, contact us and we will delete the account.
      </p>

      <h2>9. Security</h2>
      <p>
        Passwords are encrypted at rest by Supabase Auth (bcrypt). All
        connections between the app and the database use HTTPS / TLS. Row-Level
        Security ensures one user's database queries cannot read or modify
        another user's data. We do not have administrator access to your
        password in any form.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        If we make material changes we will update the effective date above and
        notify you in-app on next sign-in. Continued use after notification is
        acceptance of the updated policy.
      </p>

      <h2>11. Contact</h2>
      <p>
        For any data-protection question, request, or complaint:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        For Irish Data Protection Commission complaints:{' '}
        <a href="https://www.dataprotection.ie">www.dataprotection.ie</a>
      </p>
    </main>
  );
}
