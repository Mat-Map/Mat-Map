import { useState, useEffect, useCallback } from 'react';
import { getRoutes } from '@/api/routes';
import { mockRoutes } from '@/mock/mockData';

const SAVED_KEYS_STORAGE = 'matmap_saved_route_ids';

const getInitialSavedIds = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SAVED_KEYS_STORAGE);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export function useRoutes() {
  const [routes, setRoutes] = useState(() => {
    const savedIds = getInitialSavedIds();
    if (savedIds && Array.isArray(savedIds)) {
      return mockRoutes.map((r) => ({
        ...r,
        isSaved: savedIds.includes(r.id),
      }));
    }
    return mockRoutes;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoutes = useCallback(async () => {
    setError(null);
    try {
      const data = await getRoutes();
      const savedIds = getInitialSavedIds();
      if (data && data.routes && data.routes.length > 0) {
        const mapped = data.routes.map((r) => ({
          ...r,
          isSaved: savedIds ? savedIds.includes(r.id) : Boolean(r.isSaved),
        }));
        setRoutes(mapped);
      } else {
        setRoutes(
          mockRoutes.map((r) => ({
            ...r,
            isSaved: savedIds ? savedIds.includes(r.id) : Boolean(r.isSaved),
          }))
        );
      }
    } catch (err) {
      console.warn('Backend offline - using mockRoutes:', err?.message);
      const savedIds = getInitialSavedIds();
      setRoutes(
        mockRoutes.map((r) => ({
          ...r,
          isSaved: savedIds ? savedIds.includes(r.id) : Boolean(r.isSaved),
        }))
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const savedIds = getInitialSavedIds();
    getRoutes()
      .then((data) => {
        if (isMounted) {
          if (data && data.routes && data.routes.length > 0) {
            const mapped = data.routes.map((r) => ({
              ...r,
              isSaved: savedIds ? savedIds.includes(r.id) : Boolean(r.isSaved),
            }));
            setRoutes(mapped);
          } else {
            setRoutes(
              mockRoutes.map((r) => ({
                ...r,
                isSaved: savedIds ? savedIds.includes(r.id) : Boolean(r.isSaved),
              }))
            );
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Backend offline - using mockRoutes:', err?.message);
          setRoutes(
            mockRoutes.map((r) => ({
              ...r,
              isSaved: savedIds ? savedIds.includes(r.id) : Boolean(r.isSaved),
            }))
          );
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Custom setter that persists to localStorage
  const updateRoutes = useCallback((updater) => {
    setRoutes((prevRoutes) => {
      const nextRoutes = typeof updater === 'function' ? updater(prevRoutes) : updater;
      if (typeof window !== 'undefined' && Array.isArray(nextRoutes)) {
        try {
          const savedIds = nextRoutes.filter((r) => r.isSaved).map((r) => r.id);
          localStorage.setItem(SAVED_KEYS_STORAGE, JSON.stringify(savedIds));
        } catch (e) {
          console.warn('Could not save to localStorage', e);
        }
      }
      return nextRoutes;
    });
  }, []);

  return { routes, loading, error, refetch: fetchRoutes, setRoutes: updateRoutes };
}

export default useRoutes;


