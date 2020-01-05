import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL91bba: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

export const db = app.firestore();

export function getCollection(name, where = []) {
  let collectionRef = db.collection(name);
  if (where.length) {
    const [fieldPath, optStr, value] = where;
    collectionRef = collectionRef.where(fieldPath, optStr, value);
  }
  return collectionRef.get().then(querySnapshot => {
    const results = [];
    querySnapshot.forEach(doc => {
      const result = {
        ...doc.data(),
        id: doc.id
      };
      results.push(result);
    });
    return results;
  });
}

export function addDocument(collectionName, docData) {
  return db
    .collection(collectionName)
    .add(docData)
    .then(doc => {
      return {
        ...docData,
        id: doc.id
      };
    });
}

export function updateDocument(collectionName, docId, docData) {
  return db
    .collection(collectionName)
    .doc(docId)
    .update({ ...docData });
}

export function deleteDocument(collectionName, docId, multiple) {
  if (multiple) {
    return db
      .collection(collectionName)
      .where("notebookId", "==", docId)
      .get()
      .then(querySnapshot => {
        const batch = db.batch();
        querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        batch.commit();
      });
  }
  return db
    .collection(collectionName)
    .doc(docId)
    .delete();
}

export function getDocuments(collectionName, notebookId) {
  const collectionRef = db.collection(collectionName);
  return collectionRef.get().then(querySnapshot => {
    let results = [];
    querySnapshot.forEach(doc => {
      if (doc.data().notebookId === notebookId) {
        results.push({ ...doc.data(), id: doc.id });
      }
    });
    return results;
  });
}

export function getDocument(collectionName, id) {
  return db
    .collection(collectionName)
    .get()
    .then(querySnapshot => {
      let result;
      querySnapshot.forEach(doc => {
        const docId = doc.id;
        if (docId === id) {
          result = {
            ...doc.data(),
            id: docId
          };
        }
      });
      return result;
    });
}
