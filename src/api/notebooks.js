import {
  getCollection,
  addDocument,
  updateDocument,
  deleteDocument,
  getDocuments
} from "../services/FirebaseService";

export function fetchNotebooks() {
  return getCollection("Notebooks");
}

export function fetchNotes(id) {
  return getDocuments("Notes", id);
}

export function addNotebook(name) {
  return addDocument("Notebooks", { name });
}

export function editNotebook(data) {
  const { id, name } = data;
  return updateDocument("Notebooks", id, { name });
}

export function deleteNotebook(id) {
  const multiple = true;
  deleteDocument("Notes", id, multiple);
  return deleteDocument("Notebooks", id);
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
