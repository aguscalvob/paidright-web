import { Link, Outlet } from 'react-router-dom';

import { CONTACT_EMAIL } from '../lib/links.ts';

/** Shared chrome (nav + footer) for the content pages. */
export function Layout() {
  return (
    <>
      <nav className="nav">
        <Link className="brand" to="/">
          <span className="logo">P</span> PaidRight
        </Link>
        <div className="links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </nav>

      <Outlet />

      <footer className="footer">
        <div className="inner">
          <div>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
          </div>
          <div>© 2026 PaidRight · Dublin, Ireland</div>
        </div>
      </footer>
    </>
  );
}
