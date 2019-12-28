const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "SET_NOTEBOOKS":
      return { ...state, notebooks: payload };

    case "SET_NOTES":
      return {
        ...state,
        notes: payload
      };

    case "SET_ACTIVE_NOTEBOOK":
      return {
        ...state,
        activeNotebook: payload
      };

    case "SET_ACTIVENOTE":
      return {
        ...state,
        activeNote: payload
      };

    default:
      return state;
  }
};

export default reducer;
