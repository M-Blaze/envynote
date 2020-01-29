import React, { useEffect } from "react";
import Logo from "./components/logo";
import { connect } from "react-redux";
import ProfileOptions from "./components/profileOptions";
import useToggle from "../../hooks/useToggle";

function ProfileBar({ profileAlphabet }) {
  const [isOptionsVisible, toggleOptions] = useToggle(
    "profile-avatar",
    "profile-button"
  );

  useEffect(() => {
    document.body.addEventListener("click", toggleOptions);
    return function cleanUp() {
      document.body.removeEventListener("click", toggleOptions);
    };
  });

  return profileAlphabet === "" ? null : (
    <div className="profile-bar">
      <Logo />
      <div className="profile-avatar">
        <ProfileOptions display={isOptionsVisible} />
        <div className="profile-button">{profileAlphabet}</div>
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
