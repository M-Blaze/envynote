import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

export default function SuccessModal() {
  return (
    <div className="message-modal success-modal">
      <div className="icon-holder">
        <Link to="/signin">
          <CloseIcon />
        </Link>
      </div>
      <div className="modal-content">
        <h2>Reset Email Succesfully SENT!!!</h2>
        <p>Please check your mail to reset your password.</p>
        <Link to="/signin">Return to Login page</Link>
      </div>
    </div>
  );
}
