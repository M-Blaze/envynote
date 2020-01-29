import React, { useEffect } from "react";
import Logo from "./components/logo";
import { connect } from "react-redux";
import ProfileOptions from "./components/profileOptions";
import useToggle from "../../hooks/useToggle";

function ProfileBar({ profileAlphabet }) {
  const [isOptionsVisible, toggleOptions, closePopupConditionally] = useToggle(
    "profile-avatar"
  );
  useEffect(() => {
    return function cleanUp() {
      document.body.removeEventListener("click", closePopupConditionally);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return profileAlphabet === "" ? null : (
    <div className="profile-bar">
      <Logo />
      <div id="profile-avatar" className="profile-avatar">
        <ProfileOptions display={isOptionsVisible} />
        <div onClick={toggleOptions} className="profile-button">
          {profileAlphabet}
        </div>
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
