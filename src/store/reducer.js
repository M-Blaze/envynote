const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTEBOOKS":
      return { ...state, notebooks: action.payload };

    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload
      };

    case "SET_ACTIVE_NOTEBOOK":
      return {
        ...state,
        activeNotebook: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
