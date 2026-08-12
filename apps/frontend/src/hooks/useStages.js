import { useState, useEffect, useCallback } from 'react';
import { getStages } from '@/api/stages';
import { mockStages } from '@/mock/mockData';

export function useStages() {
  const [stages, setStages] = useState(mockStages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStages = useCallback(async () => {
    setError(null);
    try {
      const data = await getStages();
      if (data && data.stages && data.stages.length > 0) {
        setStages(data.stages);
      } else {
        setStages(mockStages);
      }
    } catch (err) {
      console.warn('Backend offline - using mockStages:', err?.message);
      setStages(mockStages);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    getStages()
      .then((data) => {
        if (isMounted) {
          if (data && data.stages && data.stages.length > 0) {
            setStages(data.stages);
          } else {
            setStages(mockStages);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Backend offline - using mockStages:', err?.message);
          setStages(mockStages);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { stages, loading, error, refetch: fetchStages, setStages };
}

export default useStages;


