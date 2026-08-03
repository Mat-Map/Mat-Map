import { useState, useEffect, useCallback } from 'react';
import { getRouteById } from '@/api/routes';

export function useRouteDetail(routeId) {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(Boolean(routeId));
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const refetch = useCallback(() => {
    setReloadTrigger((count) => count + 1);
  }, []);

  useEffect(() => {
    if (!routeId) return;

    let isSubscribed = true;

    async function loadRouteDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await getRouteById(routeId);
        if (isSubscribed) {
          setRoute(data.route || null);
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err);
          setRoute(null);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    }

    loadRouteDetail();

    return () => {
      isSubscribed = false;
    };
  }, [routeId, reloadTrigger]);

  return { route, loading, error, refetch };
}

export default useRouteDetail;
