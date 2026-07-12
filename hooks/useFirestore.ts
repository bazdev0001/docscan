import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import { subscribeToDocument } from '../services/firestore';

interface FirestoreState {
  data: DocumentData | null;
  loading: boolean;
  error: Error | null;
}

export const useFirestore = (collection: string, id: string): FirestoreState => {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!collection || !id) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToDocument(collection, id, (docData: DocumentData | null) => {
      setData(docData);
      setLoading(false);
      setError(null);
    });

    return unsubscribe;
  }, [collection, id]);

  return { data, loading, error };
};
