import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function About() {
  useEffect(() => {
    document.title = 'Why PaidRight — About';
  }, []);

  return (
    <main className="content">
      <h1>Why PaidRight</h1>
      <p className="effective">The story behind the app</p>

      <p>
        PaidRight started with a payslip I didn't understand.
      </p>
      <p>
        A few years ago I was working part-time — the kind of hourly job a lot
        of people in Ireland have while studying or starting out. Every week I
        got paid, and every week I had the same quiet questions: is this the
        right amount? How much tax should be coming out? Am I owed holidays —
        and how many? Was I even entitled to a break on that long shift?
      </p>
      <p>
        The information existed — on Revenue, Citizens Information, the
        Workplace Relations Commission — but it was scattered across dense
        government pages written for accountants and HR departments, not for
        someone trying to sanity-check one week's pay on their phone. So like a
        lot of hourly workers, I mostly just hoped it was right.
      </p>
      <p>
        I built the first version of PaidRight as my final-year college project,
        to finally answer those questions for myself. It worked — but it never
        made it out of the classroom. This is the rebuilt version: properly
        made, free, and actually in your pocket.
      </p>
      <p>
        The goal is simple. Take the public Irish rules on pay, tax, holidays
        and breaks, and turn them into clear numbers for the people they
        actually affect — hourly workers. No jargon, no spreadsheets, no
        guessing.
      </p>
      <p>
        PaidRight is a planning tool, not a replacement for Revenue or a
        solicitor (see the <Link to="/terms">Terms</Link> for the full
        disclaimer). But if it helps one person realise they were owed a holiday
        day, or finally understand their take-home pay, it's done its job.
      </p>

      <p style={{ marginTop: 28, fontWeight: 600, color: 'var(--brand)' }}>
        — The PaidRight team, Ireland
      </p>
    </main>
  );
}
