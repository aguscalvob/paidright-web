import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout.tsx';
import { Home } from './pages/Home.tsx';
import { Privacy } from './pages/Privacy.tsx';
import { Reset } from './pages/Reset.tsx';
import { Terms } from './pages/Terms.tsx';

export function App() {
  return (
    <Routes>
      {/* Reset stands alone (centred card, no nav/footer). */}
      <Route path="/reset" element={<Reset />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        {/* Unknown paths fall back to the landing page. */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
