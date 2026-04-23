import { useEffect } from 'react';
import GA4React from 'react-ga4';

export const useGoogleAnalytics = (measurementId: string) => {
  useEffect(() => {
    if (!measurementId) return;

    try {
      GA4React.initialize(measurementId);
      GA4React.pageview(window.location.pathname);
    } catch (error) {
      console.error('Google Analytics initialization error:', error);
    }

    // Track page changes
    const handleRouteChange = () => {
      GA4React.pageview(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [measurementId]);
};
