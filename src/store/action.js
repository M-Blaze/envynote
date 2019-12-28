import {
  addNote as addNoteApi,
  addNotebook as addNotebookApi,
  deleteNotebook as deleteNotebookApi,
  fetchActiveNotebook,
  fetchNotebooks as fetchNotebooksApi,
  fetchNotes as fetchNotesApi,
  fetchActiveNote,
  deleteNote as deleteNoteApi,
  editNote as editNoteApi
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

export const deleteNotebook = id => dispatch => {
  deleteNotebookApi(id).then(({ newNotebooks: notebooks, newNotes: notes }) => {
    dispatch({
      type: "SET_NOTEBOOKS",
      payload: notebooks
    });
    dispatch({
      type: "SET_NOTES",
      payload: notes
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

export const setActiveNote = id => dispatch => {
  fetchActiveNote(id).then(activeNote => {
    dispatch({
      type: "SET_ACTIVENOTE",
      payload: activeNote
    });
  });
};

export const editNote = data => dispatch => {
  editNoteApi(data).then(({ filteredNotes: notes, targetNote: activeNote }) => {
    dispatch({
      type: "SET_NOTES",
      payload: notes
    });
    dispatch({
      type: "SET_ACTIVENOTE",
      payload: activeNote
    });
  });
};

export const deleteNote = data => dispatch => {
  deleteNoteApi(data).then(notes => {
    dispatch({
      type: "SET_NOTES",
      payload: notes
    });
  });
};
