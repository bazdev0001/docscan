import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  DocumentData,
  DocumentSnapshot,
  Unsubscribe,
  Firestore,
} from 'firebase/firestore';
import { app } from './firebase';

const db: Firestore = getFirestore(app);

export const getDocument = async (collection: string, id: string): Promise<DocumentData | null> => {
  try {
    const docRef = doc(db, collection, id);
    const docSnap: DocumentSnapshot = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

export const setDocument = async (collection: string, id: string, data: DocumentData): Promise<void> => {
  try {
    const docRef = doc(db, collection, id);
    await setDoc(docRef, data);
  } catch (error) {
    console.error('Error setting document:', error);
    throw error;
  }
};

export const updateDocument = async (collection: string, id: string, data: Partial<DocumentData>): Promise<void> => {
  try {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (collection: string, id: string): Promise<void> => {
  try {
    const docRef = doc(db, collection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const subscribeToDocument = (
  collection: string,
  id: string,
  callback: (data: DocumentData | null) => void
): Unsubscribe => {
  const docRef = doc(db, collection, id);
  return onSnapshot(docRef, (docSnap: DocumentSnapshot) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() });
    } else {
      callback(null);
    }
  });
};

export { db };
