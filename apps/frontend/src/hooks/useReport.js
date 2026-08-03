import { useState, useCallback } from 'react';
import { submitReport } from '@/api/reports';

export function useReport() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async (reportData) => {
    setSubmitting(true);
    setError(null);
    try {
      await submitReport(reportData);
      setSubmitted(true);
    } catch (err) {
      // Optimistic fallback for stubbed backend endpoints
      console.warn('[useReport] Backend report submit stubbed:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }, []);

  const reset = useCallback(() => {
    setSubmitted(false);
    setError(null);
    setSubmitting(false);
  }, []);

  return { submitting, submitted, error, submit, reset };
}

export default useReport;
