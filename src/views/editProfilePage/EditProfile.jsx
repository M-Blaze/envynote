import React from "react";

export default function EditProfile(props) {
  return (
    <div className="edit-profile">
      <form action="#" className="edit-form">
        <div className="input-group">
          <input type="file" name="profile-picture" accept="image" />
        </div>
        <div className="input-group">
          <input type="text" name="username" />
        </div>
      </form>
    </div>
  );
}
