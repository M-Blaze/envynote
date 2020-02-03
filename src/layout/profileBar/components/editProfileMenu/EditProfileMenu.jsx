import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import CustomButton from "../../../../components/customButton";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import {
  uploadProfileImage,
  editUsername,
  updatePassword
} from "../../../../store/action";

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
  userId,
  provider,
  updatePassword,
  email
}) {
  const usernameRef = useRef(null);
  const [isPasswordMenuVisibile, setIsPasswordMenuVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: ""
  });
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const usernameRegEx = /^[a-z]+[\w_-]+/i;
  const passwordRegEx = /^[\w_\-#@+*/]+/;

  function togglePasswordMenu() {
    setIsPasswordMenuVisible(!isPasswordMenuVisibile);
  }

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
    if (name === "username") {
      setUsername(value);
      return;
    }
    if (name === "currentPassword") {
      setPassword({ ...password, [name]: value });
    }
    if (name === "newPassword") {
      setPassword({ ...password, [name]: value });
      return;
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    const { currentPassword, newPassword } = password;
    if (profileImage !== "") {
      uploadProfileImage(profileId, userId, profileImage);
    }
    if (username !== usernameState && usernameRegEx.test(username)) {
      editUsername({ username: username.trim(), id: profileId });
    }
    if (
      passwordRegEx.test(newPassword) &&
      passwordRegEx.test(currentPassword)
    ) {
      updatePassword(currentPassword, newPassword)
        .then(() => {
          setIsPasswordUpdated("success");
        })
        .catch(e => {
          setIsPasswordUpdated("failure");
        });
    }
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
          <label htmlFor="profile-username">Username</label>
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
        {provider === "password" ? (
          <div
            className={`password-block ${
              isPasswordMenuVisibile ? "block-active" : ""
            }`}
          >
            <div onClick={togglePasswordMenu} className="block-header">
              <strong>Change your Password</strong>
              <div className="icon-holder">
                <i className="icon-cheveron-down"></i>
              </div>
            </div>
            <div className="block-content">
              <div className="input-group">
                <label htmlFor="currentPassword">Current</label>
                <input
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  placeholder="Enter your current password."
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="input-group">
                <label htmlFor="newPassword">New</label>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  placeholder="Enter your new password."
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            {isPasswordUpdated ? (
              <div className={`password-update-message ${isPasswordUpdated}`}>
                {isPasswordUpdated === "success" ? (
                  <div className="success-message">
                    Password changed successfully!!!
                  </div>
                ) : (
                  <div className="failure-message">
                    The Password you provided is Invalid!!!
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="button-group">
          <div className="button">
            <CustomButton type="submit" text="save">
              <i className="icon-arrow-right"></i>
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  const { username, profileImage, profileId, user, provider, email } = state;
  return {
    usernameState: username,
    profileImageState: profileImage,
    profileId,
    userId: user,
    provider,
    email
  };
};

export default connect(mapStateToProps, {
  uploadProfileImage,
  editUsername,
  updatePassword
})(EditProfileMenu);
