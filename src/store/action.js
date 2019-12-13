import { fetchNotebooks as fetchNotebook } from "../api/notebooks";

export const fetchNotebooks = () => dispatch => {
  fetchNotebook().then(notebooks => {
    return dispatch({
      type: "SET_NOTEBOOKS",
      payload: notebooks
    });
  });
};
