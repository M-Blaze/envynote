import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { resetPassword } from "../../store/action";
import CustomButton from "../../components/button";
import SuccessModal from "./components/successModal";
import FailureModal from "./components/failureModal";

function PasswordResetForm({ resetPassword }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ success: false, failure: false });
  const [error, setError] = useState({
    emptyError: false,
    invalidError: false
  });
  const emailInputRef = useRef(null);
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  function inputChangeHandler(e) {
    const { value } = e.target;
    setEmail(value);
    setError({ emptyError: false, invalidError: false });
  }

  function blurHandler() {
    if (email.trim() === "") {
      setError({
        ...error,
        emptyError: true
      });
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (emailRegEx.test(email)) {
      resetPassword(email)
        .then(() => {
          stateHandler("success", true);
        })
        .catch(() => {
          stateHandler("failure", true);
        });
      return;
    }
    if (email.trim() === "") {
      setError({
        ...error,
        emptyError: true
      });
      return;
    }
    setError({
      ...error,
      invalidError: true
    });
  }

  function stateHandler(stateType, value) {
    setState({ ...state, [stateType]: value });
    return;
  }

  return (
    <div className="password-reset-block">
      <form action="#" onSubmit={submitHandler} className="password-reset-form">
        <div className="text-block">
          <h2>Forgot your password?</h2>
          <p>
            To reset your password, enter the email address you use to login. A
            link will be mailed to that address which will let you reset your
            password.
          </p>
        </div>
        <div
          className={`input-group ${
            error.emptyError ? "input-error empty-error" : ""
          } ${error.invalidError ? "input-error invalid-error" : ""}`}
        >
          <input
            ref={emailInputRef}
            onChange={inputChangeHandler}
            onBlur={blurHandler}
            value={email}
            type="email"
            placeholder="Enter your email address"
          />
          <div className="invalid-text">Enter a valid Email address.</div>
          <div className="empty-text">Empty field is not valid.</div>
        </div>
        <div className="button-group">
          <CustomButton type="submit" bgColor="#ff4b2b" text="Reset">
            <i className="icon-arrow-right"></i>
          </CustomButton>
        </div>
      </form>
      <div className="info-message-block">
        {state.success && <SuccessModal />}
        {state.failure && <FailureModal stateHandler={stateHandler} />}
      </div>
    </div>
  );
}

export default connect(null, { resetPassword })(PasswordResetForm);
