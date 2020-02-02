import {
  getCollection,
  addDocument,
  updateDocument,
  deleteDocument,
  getDocuments,
  auth,
  googleProvider,
  facebookProvider,
  storage,
  emailAuthProvider
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
  console.log("user added");
  return addDocument("User", user);
}

export function googleLoginApi() {
  return auth.signInWithPopup(googleProvider);
}

export function facebookLoginApi() {
  return auth.signInWithPopup(facebookProvider);
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

export function resetPasswordInFirebase(email) {
  return auth.sendPasswordResetEmail(email);
}

export function updatePasswordInFirebase(currentPassword, newPassword) {
  const user = auth.currentUser;
  const credential = emailAuthProvider.credential(user.email, currentPassword);
  return user.reauthenticateWithCredential(credential).then(() => {
    user.updatePassword(newPassword);
  });
}

export function sendVerificationMailFromFirebase() {
  const user = auth.currentUser;
  return user.sendEmailVerification();
}
