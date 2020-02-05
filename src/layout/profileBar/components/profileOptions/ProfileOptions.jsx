import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../../../store/action";

function ProfileOptions({
  display,
  signOut,
  username,
  email,
  toggleEditMenu,
  profileImage
}) {
  function signOutHandler() {
    signOut();
  }
  return (
    <div className={`profile-options ${display ? "show" : ""}`}>
      <ul className="profile-list">
        <li>
          <div
            className="image-block"
            onClick={toggleEditMenu}
            style={{ backgroundImage: `url(${profileImage})` }}
            id="profile-edit-block"
          >
            {profileImage === "" && username.charAt(0)}
            <div className="edit-button">Edit</div>
          </div>
        </li>
        <li>
          <div className="username-block">
            <strong>{username}</strong>
          </div>
          <div className="email-block">
            <span>{email}</span>
          </div>
        </li>
        <li>
          <button onClick={signOutHandler}>Sign out</button>
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = state => {
  const { username, email, profileImage } = state;
  return {
    username,
    email,
    profileImage
  };
};

export default connect(mapStateToProps, { signOut })(ProfileOptions);
