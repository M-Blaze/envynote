import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, googleLogin } from "../store/action";
import ErrorTextBlock from "./ErrorTextBlock";

function SignInForm({ signIn, googleLogin }) {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: false, password: false });
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function InputChangeHandler(e) {
    const errorClass = "input-error";
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    });
    if (e.target.parentElement.classList.contains(errorClass)) {
      setError({
        ...error,
        [name]: false
      });
    }
  }

  function inputBlurHandler(e) {
    const { name } = e.target;
    if (input[name].length === 0) {
      setError({
        ...error,
        [name]: "empty"
      });
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    let newErrorObj = Object.entries(input)
      .filter(([key, value]) => {
        if (key === "email") {
          return !emailRegEx.test(value);
        } else {
          return value.length === 0;
        }
      })
      .reduce((obj, [key, value]) => {
        if (value === "") {
          obj[key] = "empty";
        } else {
          obj[key] = "invalid";
        }
        return obj;
      }, {});

    if (Object.keys(newErrorObj).length > 0) {
      setError(newErrorObj);
    } else {
      signIn(input.email, input.password).catch(() => {
        setDisplayErrorMessage(true);
      });
    }
  }

  function errorType(error) {
    if (error === "empty") {
      return "empty-error";
    }
    return "invalid-error";
  }

  return (
    <div className="log-form-wrapper">
      <div className="form-container log-in-container">
        <form
          className="signin-form"
          autoComplete="off"
          onSubmit={submitHandler}
          action="#"
        >
          <h1>Login</h1>
          <ul className="social-icons">
            <li>
              <i className="icon-facebook"></i>
            </li>
            <li onClick={googleLogin}>
              <i className="icon-google"></i>
            </li>
          </ul>
          <span>or use your account</span>
          <div
            className={`input-group ${
              error.email ? `input-error ${errorType(error.email)}` : ""
            }`}
          >
            <input
              type="email"
              name="email"
              onBlur={inputBlurHandler}
              onChange={InputChangeHandler}
              placeholder="Email"
            />
            <ErrorTextBlock />
            <ErrorTextBlock
              errorClass="invalid-error-text"
              errorText="Enter a valid email address."
            />
          </div>
          <div
            className={`input-group ${
              error.password ? `input-error ${errorType(error.password)}` : ""
            }`}
          >
            <input
              type="password"
              name="password"
              onBlur={inputBlurHandler}
              onChange={InputChangeHandler}
              placeholder="Password"
            />
            <ErrorTextBlock />
            <ErrorTextBlock
              errorClass="invalid-error-text"
              errorText="Enter a valid Password."
            />
          </div>
          <Link to="/forgot-password">Forgot your password?</Link>
          <button>Log In</button>
          <div className="text-block">
            Don't have an Account ? <Link to="/signup">Create an Account</Link>{" "}
            within a snap
          </div>
          {displayErrorMessage && (
            <div className="error-text">
              <strong className="h3">Invalid email or password.</strong>
              <strong>What could have gone wrong?</strong>
              <ul className="reason-list">
                <li>
                  Maybe you don't have an account yet.{" "}
                  <Link to="/signup">Create</Link> an Account
                </li>
                <li>
                  You may have created an account through a third party, such as
                  Facebook, Google, etc. In such case you need to sign in
                  through one of the options from the top.
                </li>
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default connect(null, { signIn, googleLogin })(SignInForm);
