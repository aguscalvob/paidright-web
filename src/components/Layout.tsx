import { Link, Outlet } from 'react-router-dom';

import { Logo } from './Logo.tsx';

/**
 * Chrome for the inner pages. Keeps the navy brand background across the whole
 * site and floats the page content in a white "capsule" card, with a dark
 * top nav and footer to match the landing page.
 */
export function Layout() {
  return (
    <div className="page">
      <nav className="subnav">
        <Link className="brand" to="/">
          <span className="logo">
            <Logo size={30} />
          </span>{' '}
          PAIDRIGHT
        </Link>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      <main className="page-main">
        <div className="page-card">
          <Outlet />
        </div>
      </main>

      <footer className="page-foot">
        <div className="links">
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="copy">© 2026 PaidRight · Dublin, Ireland</div>
      </footer>
    </div>
  );
}
