'use client';

import React, { useState, useEffect } from 'react';
import { BannerWrapper, BannerText } from './OfflineBanner.styles';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <BannerWrapper>
      <BannerText>
        ⚡ OFFLINE MANIFEST ACTIVE — CACHED CORRIDOR MANIFEST ENABLED
      </BannerText>
    </BannerWrapper>
  );
}
