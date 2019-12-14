import notebooks from "../data/note-book.json";
import notes from "../data/notes.json";

export const fetchNotebooks = () => {
  return new Promise(resolve => {
    resolve(notebooks);
  });
};

export const fetchNotes = id => {
  const filteredNotes = notes.filter(note => {
    return note.notebookId === id;
  });
  return new Promise(resolve => {
    resolve(filteredNotes);
  });
};

export const fetchActiveNotebook = id => {
  const activeNotebook = notebooks.find(notebook => notebook.id === id);
  return new Promise(resolve => {
    resolve(activeNotebook);
  });
};
