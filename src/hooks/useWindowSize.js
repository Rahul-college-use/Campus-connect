import { useState, useEffect } from 'react';

/**
 * Custom hook to track window dimensions and responsive screen breakpoints.
 * SSR-safe and updates on screen resize.
 */
export default function useWindowSize() {
  // SSR check helper
  const isClient = typeof window !== 'undefined';

  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!isClient) return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Attach resize listener
    window.addEventListener('resize', handleResize);
    
    // Initial call to catch current dimensions on mount
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  // Convenient Tailwind breakpoint flags
  const isMobile = windowSize.width < 768;                   // < md
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024; // md -> lg
  const isDesktop = windowSize.width >= 1024;                 // >= lg

  return {
    ...windowSize,
    isMobile,
    isTablet,
    isDesktop,
  };
}