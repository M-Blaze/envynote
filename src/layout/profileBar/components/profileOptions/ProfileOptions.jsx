import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../../../store/action";

function ProfileOptions({ display, signOut }) {
  return (
    <div className={`profile-options ${display ? "show" : ""}`}>
      <ul className="profile-list">
        <li>Edit Profile</li>
        <li onClick={signOut}>Logout</li>
      </ul>
    </div>
  );
}

export default connect(null, { signOut })(ProfileOptions);
