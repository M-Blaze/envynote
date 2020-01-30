import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

function EditProfileMenu({ toggleEditMenu, username }) {
  const usernameRef = useRef(null);
  const [input, setInput] = useState({
    username: "",
    profileImage: ""
  });

  useEffect(() => {
    usernameRef.current.focus();
    document.body.addEventListener("click", closePopupConditionally);

    return function cleanup() {
      document.body.removeEventListener("click", closePopupConditionally);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInput({
      ...input,
      username
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  function closePopupConditionally(e) {
    const target = e.target;
    const popupContainer = document.getElementById("edit-profile-form");
    if (popupContainer.contains(target)) {
      return;
    }
    toggleEditMenu();
  }

  function inputChangeHandler(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    });
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log("submitted");
    toggleEditMenu();
  }

  return (
    <div id="edit-profile-form-wrapper" className="form-wrapper">
      <form
        action="#"
        autoComplete="off"
        onSubmit={submitHandler}
        className="edit-profile-form"
        id="edit-profile-form"
      >
        <div className="input-group input-file">
          <div className="image-block">
            {username.charAt(0)}
            <div className="icon-holder">
              <i className="icon-camera"></i>
            </div>
          </div>
          <input
            id="profile-image"
            type="file"
            name="profileImage"
            onChange={inputChangeHandler}
            accept="image/*"
          />
          {/* <div className="label-block">
            <label htmlFor="profile-image">
              Select a photo from your computer
            </label>
          </div> */}
        </div>
        <div className="input-group username-wrap">
          <label htmlFor="profile-username">Username:</label>
          <input
            onChange={inputChangeHandler}
            id="profile-username"
            type="text"
            name="username"
            value={input.username}
            placeholder="Enter a Username"
            spellCheck="false"
            ref={usernameRef}
          />
        </div>

        <div className="button-group">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  const { username } = state;
  return {
    username
  };
};

export default connect(mapStateToProps)(EditProfileMenu);
