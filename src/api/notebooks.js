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
