import { useState, useEffect } from 'react';
import { getDocs, DocItem } from '../services/docs';

interface DocsState {
  docs: DocItem[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useDocs = (userId: string | undefined): DocsState => {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getDocs(userId)
      .then(setDocs)
      .catch((e: unknown) => setError(e instanceof Error ? e : new Error(String(e))))
      .finally(() => setLoading(false));
  }, [userId, tick]);

  const refetch = (): void => setTick((t) => t + 1);

  return { docs, loading, error, refetch };
};
