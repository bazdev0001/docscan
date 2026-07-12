import { getFirestore, collection, addDoc, getDocs as firestoreGetDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { app } from './firebase';

const db = getFirestore(app);

export interface DocItem {
  id: string;
  userId: string;
  title: string;
  imageUri: string;
  extractedText: string;
  createdAt: Date;
}

interface NewDoc {
  title: string;
  imageUri: string;
  extractedText: string;
  createdAt: Date;
}

export const saveDoc = async (userId: string, doc: NewDoc): Promise<string> => {
  const ref = await addDoc(collection(db, 'scanned_docs'), {
    ...doc,
    userId,
    createdAt: Timestamp.fromDate(doc.createdAt),
  });
  return ref.id;
};

export const getDocs = async (userId: string): Promise<DocItem[]> => {
  try {
    const q = query(
      collection(db, 'scanned_docs'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await firestoreGetDocs(q);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        userId: data.userId as string,
        title: data.title as string,
        imageUri: data.imageUri as string,
        extractedText: data.extractedText as string,
        createdAt: (data.createdAt as Timestamp).toDate(),
      };
    });
  } catch (_error) {
    return [];
  }
};
