import {
  addNote as addNoteApi,
  addNotebook as addNotebookApi,
  editNotebook as editNotebookApi,
  deleteNotebook as deleteNotebookApi,
  fetchNotebooks as fetchNotebooksApi,
  fetchDefaultNotebook,
  fetchNotes as fetchNotesApi,
  deleteNote as deleteNoteApi,
  editNote as editNoteApi,
  getUsernameApi,
  signInApi,
  signUpApi,
  googleLoginApi,
  facebookLoginApi,
  addUserApi,
  uploadImageInFirebase,
  updateUser,
  resetPasswordInFirebase,
  updatePasswordInFirebase,
  sendVerificationMailFromFirebase
} from "../api/api";

import { auth, storage } from "../services/FirebaseService";
import { findIndex } from "lodash";

export const fetchNotebooks = userId => dispatch => {
  let defaultNotebook = [];
  fetchDefaultNotebook().then(notebook => {
    defaultNotebook = defaultNotebook.concat(notebook);
  });

  return fetchNotebooksApi(userId).then(notebooks => {
    if (notebooks.length !== 0) {
      dispatch({
        type: "SET_NOTEBOOKS",
        payload: defaultNotebook.concat(notebooks)
      });
    } else {
      dispatch({
        type: "SET_NOTEBOOKS",
        payload: defaultNotebook
      });
    }
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

export const addNotebook = notebook => (dispatch, getState) => {
  addNotebookApi(notebook).then(notebook => {
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

export const deleteNotebook = (userId, notebookId) => (dispatch, getState) => {
  deleteNotebookApi(userId, notebookId);
  const notebooks = getState().notebooks;
  const activeNoteId = getState().activeNotebook.id;
  const targetIndex = findIndex(
    notebooks,
    notebook => notebook.id === notebookId
  );
  const newNotebooks = getState().notebooks.filter(
    notebook => notebook.id !== notebookId
  );
  const newNotes = getState().notes.filter(
    note => note.notebookId !== notebookId
  );
  dispatch({
    type: "SET_NOTEBOOKS",
    payload: newNotebooks
  });
  dispatch({
    type: "SET_NOTES",
    payload: newNotes
  });
  if (activeNoteId === notebookId) {
    dispatch({
      type: "SET_ACTIVE_NOTEBOOK",
      payload: notebooks[targetIndex - 1]
    });
  }
};

export const fetchNotes = (userId, notebookId) => dispatch => {
  return fetchNotesApi(userId, notebookId).then(notes => {
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
      payload: getState().notes.concat([
        { ...newNote, editedAt: new Date(), editedIn: true }
      ])
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
  const newDate = new Date();
  editNoteApi(data);
  dispatch({
    type: "SET_NOTES",
    payload: notes.map(note => {
      if (note.id === data.id) {
        return {
          ...note,
          ...data,
          editedAt: newDate,
          editedIn: true
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

export const authStateChange = () => dispatch => {
  auth.onAuthStateChanged(firebaseUser => {
    console.log(firebaseUser);
    if (firebaseUser) {
      const uid = firebaseUser.uid;
      const provider = firebaseUser.providerData[0].providerId;
      dispatch({
        type: "SET_USER",
        payload: uid
      });
      dispatch({
        type: "SET_PROVIDER",
        payload: provider
      });
      if (provider === "password" && firebaseUser.emailVerified) {
        dispatch({
          type: "SET_EMAIL_VERIFIED",
          payload: true
        });
      }
      return;
    }
    dispatch({
      type: "SET_USER",
      payload: "loggedOut"
    });
  });
};

export const signIn = (email, password) => () => {
  return signInApi(email, password);
};

export const signUp = (username, email, password) => dispatch => {
  return signUpApi(email, password).then(doc => {
    const { uid } = doc.user;
    addUserApi({ userId: uid, username });
    dispatch({
      type: "SET_USER",
      payload: username
    });
  });
};

export const signOut = () => () => {
  auth.signOut();
};

export const getUserData = userId => dispatch => {
  return getUsernameApi(userId).then(doc => {
    const { username, email, id, imageURL } = doc[0];
    dispatch({
      type: "SET_USERNAME",
      payload: username
    });
    dispatch({
      type: "SET_EMAIL",
      payload: email
    });
    dispatch({
      type: "SET_PROFILE_ID",
      payload: id
    });
    if (imageURL) {
      dispatch({
        type: "SET_PROFILE_IMAGE",
        payload: imageURL
      });
    }
  });
};

export const googleLogin = () => dispatch => {
  return googleLoginApi().then(userDoc => {
    dispatch({
      type: "SET_USERNAME",
      payload: "logged from external API"
    });
    const { uid, displayName, email, photoURL } = userDoc.user;
    getUsernameApi(uid).then(doc => {
      if (doc.length !== 0) {
        const { username, email, id, imageURL } = doc[0];
        dispatch({
          type: "SET_USERNAME",
          payload: username
        });
        dispatch({
          type: "SET_EMAIL",
          payload: email
        });
        dispatch({
          type: "SET_PROFILE_ID",
          payload: id
        });
        if (imageURL) {
          dispatch({
            type: "SET_PROFILE_IMAGE",
            payload: imageURL
          });
        }
        return;
      }
      addUserApi({
        userId: uid,
        username: displayName,
        email,
        imageURL: photoURL
      }).then(() => {
        getUsernameApi(uid);
      });
    });
  });
};

export const facebookLogin = () => dispatch => {
  return facebookLoginApi().then(userDoc => {
    dispatch({
      type: "SET_USERNAME",
      payload: "logged from external API"
    });
    const { uid, displayName, email, photoURL } = userDoc.user;
    getUsernameApi(uid).then(doc => {
      if (doc.length !== 0) {
        const { username, email, id, imageURL } = doc[0];
        dispatch({
          type: "SET_USERNAME",
          payload: username
        });
        dispatch({
          type: "SET_EMAIL",
          payload: email
        });
        dispatch({
          type: "SET_PROFILE_ID",
          payload: id
        });
        if (imageURL) {
          dispatch({
            type: "SET_PROFILE_IMAGE",
            payload: imageURL
          });
        }
        return;
      }
      addUserApi({
        userId: uid,
        username: displayName,
        email,
        imageURL: photoURL
      }).then(() => {
        getUsernameApi(uid);
      });
    });
  });
};

export const uploadProfileImage = (profileId, userId, image) => dispatch => {
  const filePath = "profile_images";
  uploadImageInFirebase(filePath, userId, image).on(
    "state_changed",
    null,
    null,
    () => {
      storage
        .ref(filePath)
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          updateUser({ id: profileId, imageURL: url });
          dispatch({
            type: "SET_PROFILE_IMAGE",
            payload: url
          });
        });
    }
  );
};

export const editUsername = userInfo => dispatch => {
  const { username } = userInfo;
  updateUser(userInfo);
  dispatch({
    type: "SET_USERNAME",
    payload: username
  });
};

export const resetPassword = email => () => {
  return resetPasswordInFirebase(email);
};

export const updatePassword = (currentPassword, newPassword) => () => {
  return updatePasswordInFirebase(currentPassword, newPassword);
};

export const sendVerificationMail = () => () => {
  console.log("sadf");

  return sendVerificationMailFromFirebase();
};
