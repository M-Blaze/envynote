import { fetchNotebooks as fetchNotebooksApi } from "../api/notebooks";
import { fetchNotes as fetchNotesApi } from "../api/notebooks";
import { fetchActiveNotebook } from "../api/notebooks";

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
