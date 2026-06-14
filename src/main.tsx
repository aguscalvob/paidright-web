import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App.tsx';
import { bootAnalytics } from './lib/analytics.ts';
import './index.css';

// Sets Consent Mode defaults to "denied" and, if consent was previously
// accepted, loads gtag.js. Safe to call before React mounts.
bootAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
