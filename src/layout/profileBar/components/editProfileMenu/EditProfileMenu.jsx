import React, { useState } from "react";

function EditProfileMenu() {
  const [input, setInput] = useState({
    username: "",
    profileImage: ""
  });

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
  }

  return (
    <React.Fragment>
      <div className="form-wrapper">
        <form action="#" onSubmit={submitHandler} className="edit-profile-form">
          <div className="input-group">
            <input
              onChange={inputChangeHandler}
              type="text"
              name="username"
              value={input.username}
              placeholder="Enter a Username"
            />
          </div>
          <div className="input-group input-file">
            <div className="info-block">
              <i className="icon-photos"></i> <br />
              <strong>Drag a profile phto here.</strong>
            </div>
            <div className="label-block">
              <label htmlFor="profile-image">
                Select a photo from your computer
              </label>
            </div>
            <input
              id="profile-image"
              type="file"
              name="profileImage"
              onChange={inputChangeHandler}
              accept="image/*"
            />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default EditProfileMenu;
