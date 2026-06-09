import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout.tsx';
import { About } from './pages/About.tsx';
import { Contact } from './pages/Contact.tsx';
import { Home } from './pages/Home.tsx';
import { Privacy } from './pages/Privacy.tsx';
import { Reset } from './pages/Reset.tsx';
import { Terms } from './pages/Terms.tsx';

export function App() {
  return (
    <Routes>
      {/* Reset stands alone (centred card, no nav/footer). */}
      <Route path="/reset" element={<Reset />} />
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
  );
}
