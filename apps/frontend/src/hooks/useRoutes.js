import { useState, useEffect, useCallback } from 'react';
import { getRoutes } from '@/api/routes';
import { mockRoutes } from '@/mock/mockData';

export function useRoutes() {
  const [routes, setRoutes] = useState(mockRoutes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoutes = useCallback(async () => {
    setError(null);
    try {
      const data = await getRoutes();
      if (data && data.routes && data.routes.length > 0) {
        setRoutes(data.routes);
      } else {
        setRoutes(mockRoutes);
      }
    } catch (err) {
      console.warn('Backend offline - using mockRoutes:', err?.message);
      setRoutes(mockRoutes);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    getRoutes()
      .then((data) => {
        if (isMounted) {
          if (data && data.routes && data.routes.length > 0) {
            setRoutes(data.routes);
          } else {
            setRoutes(mockRoutes);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Backend offline - using mockRoutes:', err?.message);
          setRoutes(mockRoutes);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { routes, loading, error, refetch: fetchRoutes, setRoutes };
}

export default useRoutes;


