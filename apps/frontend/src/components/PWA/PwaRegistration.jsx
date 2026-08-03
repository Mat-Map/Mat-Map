'use client';

import { useEffect } from 'react';

export default function PwaRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('[MatMap PWA] Service worker registered successfully:', reg.scope);
          })
          .catch((err) => {
            console.error('[MatMap PWA] Service worker registration failed:', err);
          });
      });
    }
  }, []);

  return null;
}
