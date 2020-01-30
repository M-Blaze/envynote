import React, { useEffect, useState } from "react";
import Logo from "./components/logo";
import { connect } from "react-redux";
import ProfileOptions from "./components/profileOptions";
import useToggle from "../../hooks/useToggle";
import EditProfileMenu from "../profileBar/components/editProfileMenu";

function ProfileBar({ profileAlphabet }) {
  const [isOptionsVisible, toggleOptions, closePopupConditionally] = useToggle(
    "profile-content"
  );
  const [isEditMenuVisible, setIsEditMenuVisible] = useState(false);

  function toggleEditMenu() {
    if (isEditMenuVisible) {
      setIsEditMenuVisible(false);
      return;
    }
    setIsEditMenuVisible(true);
  }

  useEffect(() => {
    return function cleanUp() {
      document.body.removeEventListener("click", closePopupConditionally);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return profileAlphabet === "" ? null : (
    <div className="profile-bar">
      <Logo />
      <div id="profile-content">
        <div id="profile-avatar" className="profile-avatar">
          <ProfileOptions
            display={isOptionsVisible}
            toggleEditMenu={toggleEditMenu}
          />
          <div onClick={toggleOptions} className="profile-button">
            {profileAlphabet}
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
  return {
    profileAlphabet: state.username.charAt(0)
  };
};

export default connect(mapStateToProps)(ProfileBar);
