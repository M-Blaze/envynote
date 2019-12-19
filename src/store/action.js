import {
  addNote as addNoteApi,
  addNotebook as addNotebookApi,
  fetchActiveNotebook,
  fetchNotebooks as fetchNotebooksApi,
  fetchNotes as fetchNotesApi
} from "../api/notebooks";

export const fetchNotebooks = () => dispatch => {
  fetchNotebooksApi().then(notebooks => {
    return dispatch({
      type: "SET_NOTEBOOKS",
      payload: notebooks
    });
  });
};

export const fetchNotes = notebookId => dispatch => {
  fetchNotesApi(notebookId).then(notes => {
    dispatch({
      type: "SET_NOTES",
      payload: notes
    });
  });
};

export const setActiveNotebook = notebookId => dispatch => {
  fetchActiveNotebook(notebookId).then(notebook => {
    dispatch({
      type: "SET_ACTIVE_NOTEBOOK",
      payload: notebook
    });
  });
};

export const addNotebook = notebookName => (dispatch, getState) => {
  addNotebookApi(notebookName).then(notebook => {
    dispatch({
      type: "SET_NOTEBOOKS",
      payload: getState().notebooks.concat([notebook])
    });
  });
};

export const addNote = note => (dispatch, getState) => {
  addNoteApi(note).then(newNote => {
    dispatch({
      type: "SET_NOTES",
      payload: getState().notes.concat([newNote])
    });
  });
};
