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
export const auth = app.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

function getTimeStamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

export function getCollection(name, where = [], sort = false, sortBy) {
  let collectionRef = db.collection(name);
  if (where.length) {
    const [fieldPath, optStr, value] = where;
    if (sort) {
      collectionRef = collectionRef
        .where(fieldPath, optStr, value)
        .orderBy(sortBy);
    } else {
      collectionRef = collectionRef.where(fieldPath, optStr, value);
    }
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

export function getDocuments(collectionName, where, notebookId) {
  if (where.length !== 0) {
    const [fieldPath, optStr, value] = where;
    const collectionRef = db
      .collection(collectionName)
      .where(fieldPath, optStr, value)
      .orderBy("createdAt");
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
}

export function addDocument(collectionName, docData) {
  const timeStamp = getTimeStamp();
  console.log(timeStamp);

  return db
    .collection(collectionName)
    .add({ ...docData, createdAt: timeStamp })
    .then(doc => {
      return {
        ...docData,
        id: doc.id,
        createdAt: timeStamp
      };
    });
}

export function updateDocument(collectionName, docId, docData) {
  const timeStamp = getTimeStamp();
  return db
    .collection(collectionName)
    .doc(docId)
    .update({ ...docData, editedAt: timeStamp });
}

export function deleteDocument(collectionName, docId, where = []) {
  if (where.length !== 0) {
    const [fieldPath, optStr, value] = where;
    return db
      .collection(collectionName)
      .where(fieldPath, optStr, value)
      .get()
      .then(querySnapshot => {
        const batch = db.batch();
        querySnapshot.forEach(doc => {
          if (doc.data().notebookId === docId) {
            batch.delete(doc.ref);
          }
        });
        batch.commit();
      });
  }
  return db
    .collection(collectionName)
    .doc(docId)
    .delete();
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
