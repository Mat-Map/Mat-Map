import { useState, useEffect, useCallback } from 'react';
import { getStages } from '@/api/stages';

export function useStages() {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStages();
      setStages(data.stages || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStages();
  }, [fetchStages]);

  return { stages, loading, error, refetch: fetchStages };
}

export default useStages;
