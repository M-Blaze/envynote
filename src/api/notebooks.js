function getNotebooks() {
  const notebooks = localStorage.getItem("notebooks");
  return [...JSON.parse(notebooks)];
}

function setNotebooks(notebooks) {
  localStorage.setItem("notebooks", JSON.stringify(notebooks));
}

function getNotes() {
  const notes = localStorage.getItem("notes");
  return [...JSON.parse(notes)];
}

function setNotes(note) {
  localStorage.setItem("notes", JSON.stringify(note));
}

export const fetchNotebooks = () => {
  return new Promise(resolve => {
    resolve(getNotebooks());
  });
};

export const fetchNotes = id => {
  const filteredNotes = getNotes().filter(note => {
    return note.notebookId === id;
  });
  return new Promise(resolve => {
    resolve(filteredNotes);
  });
};

export const fetchActiveNotebook = id => {
  const activeNotebook = getNotebooks().find(notebook => notebook.id === id);
  return new Promise(resolve => {
    resolve(activeNotebook);
  });
};

export const fetchActiveNote = id => {
  const activeNote = getNotes().find(note => note.id === id);
  return new Promise(resolve => {
    resolve(activeNote);
  });
};

export const addNotebook = name => {
  const notebooks = getNotebooks();
  const lastNotebook = notebooks[notebooks.length - 1];
  const newNotebook = {
    id: lastNotebook.id + 1,
    name
  };
  notebooks.push(newNotebook);
  setNotebooks(notebooks);
  return new Promise(resolve => {
    resolve(newNotebook);
  });
};

export const deleteNotebook = id => {
  const newNotebooks = getNotebooks().filter(notebook => notebook.id !== id);
  const newNotes = getNotes().filter(notebook => notebook.notebookId !== id);
  setNotebooks(newNotebooks);
  setNotes(newNotes);
  return new Promise(resolve => {
    resolve({ newNotebooks, newNotes });
  });
};

export const addNote = note => {
  const notes = getNotes();
  const lastNote = notes[notes.length - 1];
  const newNote = {
    id: lastNote.id + 1,
    title: note.title,
    content: note.content,
    notebookId: note.notebookId
  };
  notes.push(newNote);
  setNotes(notes);
  return new Promise(resolve => {
    resolve(newNote);
  });
};

export const deleteNote = data => {
  const newNotes = getNotes().filter(note => note.id !== data.id);
  setNotes(newNotes);
  const filteredNotes = newNotes.filter(
    note => note.notebookId === data.notebookId
  );
  return new Promise(resolve => {
    resolve(filteredNotes);
  });
};

export const editNote = data => {
  const notes = getNotes();
  const targetNote = notes.find(note => note.id === data.id);
  const targetIndex = notes.indexOf(targetNote);
  targetNote.title = data.title;
  targetNote.content = data.content;
  notes[targetIndex] = targetNote;
  setNotes(notes);
  const filteredNotes = notes.filter(note => {
    return note.notebookId === data.notebookId;
  });
  return new Promise(resolve => {
    resolve({ filteredNotes, targetNote });
  });
};
