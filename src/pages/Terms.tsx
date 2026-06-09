import { useEffect } from 'react';

import { CONTACT_EMAIL } from '../lib/links.ts';

export function Terms() {
  useEffect(() => {
    document.title = 'Terms of Service — PaidRight';
  }, []);

  return (
    <main className="content">
      <h1>Terms of Service</h1>
      <p className="effective">Effective date: 6 June 2026</p>

      <h2>1. About the service</h2>
      <p>
        PaidRight is a free mobile application that helps hourly-paid workers in
        Ireland track their hours and estimate their take-home pay, holiday
        entitlement, and other employment-related figures based on publicly
        available Irish government information.
      </p>
      <p>
        Operated by <strong>Agustin Calvo Bentos</strong>, based in Dublin,
        Ireland, contactable at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>2. Your account</h2>
      <p>
        You can create an account using an email address and password. You are
        responsible for:
      </p>
      <ul>
        <li>Keeping your password confidential</li>
        <li>All activity that happens under your account</li>
        <li>
          Telling us promptly if you suspect unauthorised access (contact form
          or email)
        </li>
      </ul>
      <p>
        You can delete your account at any time from the in-app Account screen.
        Deletion is permanent and immediate.
      </p>

      <h2>3. Acceptable use</h2>
      <p>
        You may use PaidRight for personal use to track your own work. You may{' '}
        <strong>not</strong>:
      </p>
      <ul>
        <li>Use the service to harass, defraud, or harm anyone</li>
        <li>
          Attempt to reverse-engineer, scrape, decompile, or interfere with the
          app's operation
        </li>
        <li>Attempt to access other users' accounts or data</li>
        <li>Use the service to violate Irish or EU law</li>
      </ul>

      <h2>4. Calculation disclaimer (important)</h2>
      <div className="callout">
        <strong>
          PaidRight is a planning tool, not a payroll or legal service.
        </strong>
      </div>
      <p>
        Tax, deductions, and holiday-entitlement figures shown in the app are
        estimates produced from publicly available Irish government information
        (Revenue, Citizens Information, the Workplace Relations Commission, and
        the Organisation of Working Time Act 1997). They are intended for the{' '}
        <strong>single-person standard case</strong> and do not account for
        married rates, age exemptions, marginal relief, reduced USC for
        medical-card holders or over-70s, cumulative year-to-date earnings under
        PAYE, employer-specific contractual terms beyond what you enter into the
        app, or any other individual circumstance.
      </p>
      <p>
        For binding answers about your actual pay, deductions, holiday
        entitlement, or any other employment-law matter, contact Revenue, the
        Workplace Relations Commission, your trade union, or a qualified
        professional.
      </p>
      <p>
        <strong>
          You acknowledge and agree that you will not rely on PaidRight's
          outputs as legal, financial, tax, or HR advice, and that we are not
          liable for any decision you make based on those outputs.
        </strong>
      </p>

      <h2>5. Service availability</h2>
      <p>
        We try to keep the app working but make no guarantee of uninterrupted
        availability. The service may be temporarily unavailable for
        maintenance, upgrades, or reasons beyond our control. We may modify or
        discontinue features at any time.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The PaidRight name, logo, and app content are owned by{' '}
        <strong>Agustin Calvo Bentos</strong>. The Irish public information the
        app references (tax bands, holiday rules, working-time rules) is publicly
        available and belongs to its respective sources.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by Irish law, PaidRight and its operator
        are not liable for any indirect, incidental, special, consequential, or
        punitive damages arising out of or related to your use of the service,
        including but not limited to: lost income, incorrect payroll based on
        the app's estimates, employment disputes, or any decision you make based
        on the calculations.
      </p>
      <p>
        Nothing in these terms limits our liability for death or personal injury
        caused by negligence, or for fraud.
      </p>

      <h2>8. Termination</h2>
      <p>
        You can stop using PaidRight at any time and delete your account from
        within the app. We may suspend or terminate accounts that breach these
        terms, with or without notice.
      </p>
      <p>
        On termination, all your data is deleted as described in the Privacy
        Policy.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        We may update these terms. If we do, the effective date above changes
        and we will notify you in-app on next sign-in. Continued use after
        notification is acceptance of the updated terms.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of Ireland. Any dispute will be
        subject to the exclusive jurisdiction of the Irish courts.
      </p>

      <h2>11. Contact</h2>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </main>
  );
}
