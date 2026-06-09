import { useEffect, useState } from 'react';

export type Platform = 'ios' | 'android' | 'desktop';

/**
 * Detect the visitor's mobile platform so the landing page can lead with the
 * right app store. Defaults to 'desktop' until the effect runs (no SSR here,
 * so this resolves on first paint).
 */
export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>('desktop');

  useEffect(() => {
    const ua = navigator.userAgent || '';
    if (/android/i.test(ua)) {
      setPlatform('android');
    } else if (
      /iphone|ipad|ipod/i.test(ua) ||
      // iPadOS 13+ reports as a Mac; disambiguate via touch points.
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    ) {
      setPlatform('ios');
    } else {
      setPlatform('desktop');
    }
  }, []);

  return platform;
}
