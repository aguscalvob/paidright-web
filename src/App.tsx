import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { CookieBanner } from './components/CookieBanner.tsx';
import { Layout } from './components/Layout.tsx';
import { trackPageView } from './lib/analytics.ts';
import { About } from './pages/About.tsx';
import { Contact } from './pages/Contact.tsx';
import { Get } from './pages/Get.tsx';
import { Home } from './pages/Home.tsx';
import { Privacy } from './pages/Privacy.tsx';
import { Reset } from './pages/Reset.tsx';
import { Terms } from './pages/Terms.tsx';

export function App() {
  // SPA route changes don't trigger gtag's default page_view; fire one manually
  // on each navigation. No-op until/unless consent loads gtag.
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return (
    <>
      <CookieBanner />
      <Routes>
      {/* Reset stands alone (centred card, no nav/footer). */}
      <Route path="/reset" element={<Reset />} />
      {/* Smart store-redirect (target of the homepage QR). */}
      <Route path="/get" element={<Get />} />
      {/* Home is standalone — the navy hero carries its own top bar. */}
      <Route path="/" element={<Home />} />
      {/* Inner pages share the white nav + footer chrome. */}
      <Route element={<Layout />}>
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      {/* Unknown paths fall back to the landing page. */}
      <Route path="*" element={<Home />} />
    </Routes>
    </>
  );
}
