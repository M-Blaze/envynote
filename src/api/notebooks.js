import notebooks from "../api/note-books.json";
import notes from "../api/notes.json";

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
