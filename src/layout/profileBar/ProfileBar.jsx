import React, { useState } from "react";
import Logo from "./components/logo";
import { connect } from "react-redux";
import ProfileOptions from "./components/profileOptions";
import useToggle from "../../hooks/useToggle";
import EditProfileMenu from "../profileBar/components/editProfileMenu";

function ProfileBar({ profileAlphabet, profileImage }) {
  const [isOptionsVisible, toggleOptions] = useToggle("profile-content");

  const [isEditMenuVisible, setIsEditMenuVisible] = useState(false);

  function toggleEditMenu() {
    if (isEditMenuVisible) {
      setIsEditMenuVisible(false);
      return;
    }
    setIsEditMenuVisible(true);
  }

  return (
    <div className="profile-bar">
      <div>
        <Logo />
      </div>
      <div id="profile-content">
        <div id="profile-avatar" className="profile-avatar">
          <ProfileOptions
            display={isOptionsVisible}
            toggleEditMenu={toggleEditMenu}
          />
          <div
            onClick={toggleOptions}
            style={{ backgroundImage: `url(${profileImage})` }}
            className="profile-button"
          >
            {profileImage === "" && profileAlphabet}
          </div>
        </div>
        {isEditMenuVisible && (
          <EditProfileMenu toggleEditMenu={toggleEditMenu} />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const { username, profileImage } = state;
  return {
    profileAlphabet: username.charAt(0),
    profileImage
  };
};

export default connect(mapStateToProps)(ProfileBar);
