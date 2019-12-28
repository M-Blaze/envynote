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

export const deleteNotebook = data => {
  const notebooks = getNotebooks();
  const newNotebooks = notebooks.filter(notebook => notebook.id !== data.id);
  const newNotes = getNotes().filter(note => note.notebookId !== data.id);
  setNotes(newNotes);
  setNotebooks(newNotebooks);
  if (data.id === data.activeNotebookId) {
    const index = notebooks.findIndex(notebook => notebook.id === data.id);
    const activeNotebook = newNotebooks[index - 1];
    const activeNotes = newNotes.filter(note => note.id === activeNotebook.id);
    return new Promise(resolve => {
      resolve({ newNotebooks, activeNotes, activeNotebook });
    });
  }
  return new Promise(resolve => {
    resolve({ newNotebooks });
  });
};

export const addNote = note => {
  const notes = getNotes();
  const newNote = {
    id: 1,
    title: note.title,
    content: note.content,
    notebookId: note.notebookId
  };
  if (notes.length > 0) {
    const lastNote = notes[notes.length - 1];
    newNote.id = lastNote.id + 1;
  }
  notes.push(newNote);
  setNotes(notes);
  return new Promise(resolve => {
    resolve(newNote);
  });
};

export const deleteNote = data => {
  const notes = getNotes();
  const newNotes = notes.filter(note => note.id !== data.id);
  setNotes(newNotes);
  const filteredNotes = newNotes.filter(
    note => note.notebookId === data.notebookId
  );

  if (data.id === data.activeNoteId) {
    const index = notes
      .filter(note => note.notebookId === data.notebookId)
      .findIndex(note => note.id === data.id);
    const arrLength = filteredNotes.length;
    let newActiveNote;
    if (arrLength > 1) {
      if (index === 0) {
        newActiveNote = filteredNotes[index];
      } else {
        newActiveNote = filteredNotes[index - 1];
      }
    } else if (arrLength === 1) {
      newActiveNote = filteredNotes[0];
    } else {
      newActiveNote = [];
    }

    return new Promise(resolve => {
      resolve({ filteredNotes, newActiveNote });
    });
  }

  return new Promise(resolve => {
    resolve({ filteredNotes });
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
