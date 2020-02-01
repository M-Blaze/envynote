import {
  getCollection,
  addDocument,
  updateDocument,
  deleteDocument,
  getDocuments,
  auth,
  provider,
  storage
} from "../services/FirebaseService";

export function fetchDefaultNotebook() {
  return getCollection("Notebooks", ["state", "==", "public"], false);
}

export function fetchNotebooks(userId) {
  const sortBy = "createdAt";
  return getCollection("Notebooks", ["userId", "==", userId], true, sortBy);
}

export function fetchNotes(userId, id) {
  return getDocuments("Notes", ["userId", "==", userId], id);
}

export function addNotebook(notebook) {
  return addDocument("Notebooks", notebook);
}

export function editNotebook(data) {
  const { id, name } = data;
  return updateDocument("Notebooks", id, { name });
}

export function deleteNotebook(userId, notebookId) {
  deleteDocument("Notes", notebookId, ["userId", "==", userId]);
  return deleteDocument("Notebooks", notebookId);
}

export function addNote(note) {
  return addDocument("Notes", note);
}

export function deleteNote(id) {
  deleteDocument("Notes", id);
}

export function editNote(data) {
  return updateDocument("Notes", data.id, data);
}

export function signInApi(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signUpApi(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function getUsernameApi(userId) {
  return getCollection("User", ["userId", "==", userId]);
}

export function addUserApi(user) {
  return addDocument("User", user);
}

export function googleLoginApi() {
  return auth.signInWithPopup(provider);
}

export function uploadImageInFirebase(filePath, userId, image) {
  const { name } = image;
  const metaData = {
    customMetadata: {
      userId
    }
  };
  return storage.ref(`${filePath}/${name}`).put(image, metaData);
}

export function updateUser(user) {
  return updateDocument("User", user.id, user);
}
