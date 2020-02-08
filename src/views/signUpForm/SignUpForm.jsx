import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/action";
import ErrorTextBlock from "../../components/ErrorTextBlock";
import Spinner from "../../components/Spinner";

function SignUpForm({ signUp }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
    rePassword: "",
    username: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState({
    email: false,
    password: false,
    rePassword: false,
    username: false
  });

  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegEx = /^\S+/i;
  const nameRegEx = /^[^\s\d]+/i;

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
        const isEmpty = value.trim().length === 0;
        if (key === "email") {
          return !emailRegEx.test(value);
        } else if (key === "rePassword") {
          return !(input["password"] === value) || isEmpty;
        } else if (key === "username") {
          return !nameRegEx.test(value) || isEmpty;
        }
        return !passwordRegEx.test(value.trim());
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
      setIsProcessing(true);
      const { username, email, password } = input;
      signUp(username, email, password).catch(error => {
        setIsProcessing(false);
        if (error.code === "auth/email-already-in-use") {
          setError({ email: "exist-error" });
        }
      });
    }
  }

  function errorType(error) {
    if (error === "empty") {
      return "empty-error";
    }
    if (error === "exist-error") {
      return "exist-error";
    }
    return "invalid-error";
  }

  return (
    <div className="log-form-wrapper">
      <div className="form-container signup-container">
        <form
          className="signup-form"
          autoComplete="off"
          onSubmit={submitHandler}
          action="#"
        >
          <div className="header-block">
            <h1>Signup</h1>
          </div>
          <div
            className={`input-group ${
              error.username ? `input-error ${errorType(error.username)}` : ""
            }`}
          >
            <input
              type="text"
              name="username"
              onBlur={inputBlurHandler}
              onChange={InputChangeHandler}
              placeholder="Username"
            />
            <ErrorTextBlock />
            <ErrorTextBlock
              errorClass="invalid-error-text"
              errorText="Enter a valid Username."
            />
          </div>
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
            <ErrorTextBlock
              errorClass="exist-error-text"
              errorText="A user with this email already exist."
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
          <div
            className={`input-group ${
              error.rePassword
                ? `input-error ${errorType(error.rePassword)}`
                : ""
            }`}
          >
            <input
              type="password"
              name="rePassword"
              onBlur={inputBlurHandler}
              onChange={InputChangeHandler}
              placeholder="Re-type Password"
            />
            <ErrorTextBlock />
            <ErrorTextBlock
              errorClass="invalid-error-text"
              errorText="Password didn't match..."
            />
          </div>
          <div className="button-block">
            <button>{isProcessing ? <Spinner /> : "Sign Up"}</button>
          </div>
          <div className="text-block">
            Already have an Account ? <Link to="/signin">Go to Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(null, { signUp })(SignUpForm);
