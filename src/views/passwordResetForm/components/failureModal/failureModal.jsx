import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

export default function SuccessModal({ stateHandler }) {
  return (
    <div className="message-modal failure-modal">
      <div
        className="icon-holder"
        onClick={() => stateHandler("failure", false)}
      >
        <CloseIcon />
      </div>
      <div className="modal-content">
        <h2>Email Address not found!!!</h2>
        <p>
          The Email address you provided is not registered in our Database.{" "}
          <br /> If you have not signed up yet!!! click{" "}
          <Link to="/signup">HERE</Link> to go to the signup Page.
        </p>
      </div>
    </div>
  );
}
