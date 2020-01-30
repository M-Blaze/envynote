import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../../../store/action";

function ProfileOptions({ display, signOut, username, email, toggleEditMenu }) {
  return (
    <div className={`profile-options ${display ? "show" : ""}`}>
      <ul className="profile-list">
        <li>
          <div className="image-block" id="profile-edit-block">
            {username.charAt(0)}
            <div onClick={toggleEditMenu} className="edit-button">
              Edit
            </div>
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
          <button onClick={signOut}>Sign out</button>
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = state => {
  const { username, email } = state;
  return {
    username,
    email
  };
};

export default connect(mapStateToProps, { signOut })(ProfileOptions);
