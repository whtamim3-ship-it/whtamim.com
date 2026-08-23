// Ensure global fetch is safely writable in all iframe and sandboxed environments
(function ensureFetchWritable() {
  try {
    const origFetch = typeof window !== 'undefined' && window.fetch ? window.fetch.bind(window) : null;
    let currentFetch = origFetch;
    const getter = () => currentFetch || (origFetch ? origFetch : window.fetch);
    const setter = (v: any) => { currentFetch = v; };

    if (typeof Window !== 'undefined' && Window.prototype) {
      try {
        Object.defineProperty(Window.prototype, 'fetch', {
          get: getter,
          set: setter,
          configurable: true,
          enumerable: true,
        });
      } catch {}
    }

    try {
      Object.defineProperty(window, 'fetch', {
        get: getter,
        set: setter,
        configurable: true,
        enumerable: true,
      });
    } catch {}
  } catch {}
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
