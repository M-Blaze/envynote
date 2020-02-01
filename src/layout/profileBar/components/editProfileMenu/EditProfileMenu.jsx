import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import CustomButton from "../../../../components/button";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { uploadProfileImage, editUsername } from "../../../../store/action";
import CloseIcon from "@material-ui/icons/Close";

const CustomTooltip = withStyles(theme => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 12
  }
}))(Tooltip);

function EditProfileMenu({
  toggleEditMenu,
  usernameState,
  profileImageState,
  uploadProfileImage,
  editUsername,
  profileId,
  userId
}) {
  const usernameRef = useRef(null);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const usernameRegEx = /^[a-z]+[\w_-]+/i;

  useEffect(() => {
    usernameRef.current.focus();
    document.body.addEventListener("click", closePopupConditionally);
    setIsVisible(true);

    return function cleanup() {
      document.body.removeEventListener("click", closePopupConditionally);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setImageURL(profileImageState);
  }, [profileImageState]);

  useEffect(() => {
    setUsername(usernameState);
  }, [usernameState]);

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
    if (name === "profileImage") {
      const image = e.target.files[0];
      setProfileImage(image);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageURL(reader.result);
      });
      reader.readAsDataURL(image);
      return;
    }
    setUsername(value);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (profileImage !== "") {
      uploadProfileImage(profileId, userId, profileImage);
    }
    if (username !== usernameState && usernameRegEx.test(username.trim())) {
      editUsername({ username: username.trim(), id: profileId });
    }
    toggleEditMenu();
  }

  return (
    <div
      id="edit-profile-form-wrapper"
      className={`form-wrapper ${isVisible ? "form-visible" : ""}`}
    >
      <form
        action="#"
        autoComplete="off"
        onSubmit={submitHandler}
        className="edit-profile-form"
        id="edit-profile-form"
      >
        <div className="close-button">
          <CloseIcon onClick={toggleEditMenu} />
        </div>
        <CustomTooltip
          title="Change your profile picture"
          placement="top"
          arrow
        >
          <div className="input-group input-file">
            <div className="icon-holder">
              <i className="icon-camera"></i>
            </div>
            <input
              id="profile-image"
              type="file"
              name="profileImage"
              onChange={inputChangeHandler}
              accept="image/*"
            />
            <label
              style={{ backgroundImage: `url(${imageURL})` }}
              htmlFor="profile-image"
            >
              {imageURL === "" && username.charAt(0)}
            </label>
          </div>
        </CustomTooltip>
        <div className="input-group username-wrap">
          <label
            style={{
              backgroundImage:
                "https://firebasestorage.googleapis.com/v0/b/envynote-91bba.appspot.com/o/profile_images%2Fenvynote.png?alt=media&token=30bf9e11-7af8-4810-b160-56b66faf648d"
            }}
            htmlFor="profile-username"
          >
            Username:
          </label>
          <input
            onChange={inputChangeHandler}
            id="profile-username"
            type="text"
            name="username"
            value={username}
            placeholder="Enter a Username"
            spellCheck="false"
            ref={usernameRef}
          />
        </div>
        <div className="button-group">
          <CustomButton type="submit" text="save">
            <i className="icon-arrow-right"></i>
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  const { username, profileImage, profileId, user } = state;
  return {
    usernameState: username,
    profileImageState: profileImage,
    profileId,
    userId: user
  };
};

export default connect(mapStateToProps, { uploadProfileImage, editUsername })(
  EditProfileMenu
);
