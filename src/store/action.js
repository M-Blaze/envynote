import {
  addNote as addNoteApi,
  addNotebook as addNotebookApi,
  editNotebook as editNotebookApi,
  deleteNotebook as deleteNotebookApi,
  fetchNotebooks as fetchNotebooksApi,
  fetchNotes as fetchNotesApi,
  deleteNote as deleteNoteApi,
  editNote as editNoteApi
} from "../api/notebooks";

import { findIndex } from "lodash";

export const fetchNotebooks = () => dispatch => {
  return fetchNotebooksApi().then(notebooks => {
    dispatch({
      type: "SET_NOTEBOOKS",
      payload: notebooks
    });
    return notebooks[0].id;
  });
};

export const setDefaultNotebookId = id => dispatch => {
  dispatch({
    type: "SET_DEFAULT_NOTEBOOK_ID",
    payload: id
  });
};

export const setActiveNotebook = notebookId => (dispatch, getState) => {
  const activeNotebook = getState().notebooks.find(
    notebook => notebook.id === notebookId
  );
  dispatch({
    type: "SET_ACTIVE_NOTEBOOK",
    payload: activeNotebook
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

export const editNotebook = data => (dispatch, getState) => {
  const notebooks = getState().notebooks;
  editNotebookApi(data);
  dispatch({
    type: "SET_NOTEBOOKS",
    payload: notebooks.map(notebook => {
      if (notebook.id === data.id) {
        return {
          ...notebook,
          ...data
        };
      }
      return notebook;
    })
  });
};

export const deleteNotebook = id => (dispatch, getState) => {
  deleteNotebookApi(id);
  const notebooks = getState().notebooks;
  const activeNoteId = getState().activeNotebook.id;
  const targetIndex = findIndex(notebooks, notebook => notebook.id === id);
  const newNotebooks = getState().notebooks.filter(
    notebook => notebook.id !== id
  );
  const newNotes = getState().notes.filter(note => note.notebookId !== id);
  dispatch({
    type: "SET_NOTEBOOKS",
    payload: newNotebooks
  });
  dispatch({
    type: "SET_NOTES",
    payload: newNotes
  });
  if (activeNoteId === id) {
    dispatch({
      type: "SET_ACTIVE_NOTEBOOK",
      payload: notebooks[targetIndex - 1]
    });
  }
};

export const fetchNotes = notebookId => dispatch => {
  return fetchNotesApi(notebookId).then(notes => {
    dispatch({
      type: "SET_NOTES",
      payload: notes
    });
  });
};

export const addNote = note => (dispatch, getState) => {
  return addNoteApi(note).then(newNote => {
    dispatch({
      type: "SET_NOTES",
      payload: getState().notes.concat([newNote])
    });
  });
};

export const setActiveNote = id => (dispatch, getState) => {
  const activeNote = getState().notes.find(note => note.id === id);
  dispatch({
    type: "SET_ACTIVE_NOTE",
    payload: activeNote
  });
};

export const editNote = data => (dispatch, getState) => {
  const notes = getState().notes;
  editNoteApi(data);
  dispatch({
    type: "SET_NOTES",
    payload: notes.map(note => {
      if (note.id === data.id) {
        return {
          ...note,
          ...data
        };
      }
      return note;
    })
  });
};

export const deleteNote = id => (dispatch, getState) => {
  deleteNoteApi(id);
  const notes = getState().notes;
  const activeNoteId = getState().activeNote.id;
  const newNotes = notes.filter(note => note.id !== id);
  if (activeNoteId === id) {
    const targetIndex = findIndex(notes, note => note.id === id);
    if (targetIndex === 0) {
      dispatch({
        type: "SET_ACTIVE_NOTE",
        payload: newNotes[0]
      });
    } else {
      dispatch({
        type: "SET_ACTIVE_NOTE",
        payload: newNotes[targetIndex - 1]
      });
    }
  }
  dispatch({
    type: "SET_NOTES",
    payload: newNotes
  });
};
