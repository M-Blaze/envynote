const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: payload
      };

    case "SET_USERNAME":
      return {
        ...state,
        username: payload
      };

    case "SET_PROFILE_ID":
      return {
        ...state,
        profileId: payload
      };

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

    case "SET_ACTIVE_NOTE":
      return {
        ...state,
        activeNote: payload
      };

    case "SET_EMAIL":
      return {
        ...state,
        email: payload
      };

    case "SET_PROFILE_IMAGE":
      return {
        ...state,
        profileImage: payload
      };

    default:
      return state;
  }
};

export default reducer;
