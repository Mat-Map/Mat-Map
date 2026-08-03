import { useState, useCallback } from 'react';
import { getJourney } from '@/api/journey';

export function useJourney() {
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJourney = useCallback(async (fromUuid, toUuid) => {
    if (!fromUuid || !toUuid) {
      setError(new Error('Please select both starting and destination stages'));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getJourney(fromUuid, toUuid);
      setJourney(data);
    } catch (err) {
      setError(err);
      setJourney(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetJourney = useCallback(() => {
    setJourney(null);
    setError(null);
    setLoading(false);
  }, []);

  return { journey, loading, error, fetchJourney, resetJourney };
}

export default useJourney;
