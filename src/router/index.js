import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import MainLayout from "../layout/MainLayout";
import Notebooks from "../views/notebooks";
import Notes from "../views/notes";
import SignUpForm from "../views/signUpForm";
import SignInForm from "../views/signInForm";
import PasswordResetForm from "../views/passwordResetForm";
import { authStateChange, getUserData } from "../store/action";
import VerifyEmail from "../views/verifyEmail";

class Router extends React.Component {
  componentDidMount() {
    this.props.authStateChange();
  }

  componentDidUpdate(prevProps) {
    const { user, username, getUserData } = this.props;
    if (prevProps.user !== user && user !== "loggedOut" && username === "") {
      getUserData(user);
    }
  }

  render() {
    const { user, emailVerified } = this.props;
    return (
      <div id="wrapper">
        <BrowserRouter>
          {user === "loggedOut" ? (
            <React.Fragment>
              <Switch>
                <Route path="/signin" component={SignInForm} />
                <Route path="/signup" component={SignUpForm} />
                <Route path="/forgot-password" component={PasswordResetForm} />
                <Route render={() => <Redirect to="/signin" />} />
              </Switch>
            </React.Fragment>
          ) : emailVerified ? (
            <React.Fragment>
              <MainLayout>
                <Switch>
                  <Route path="/notebook/:id/:slug" component={Notes} />
                  <Route path="/notebooks/:id" component={Notebooks} />
                  <Route render={() => <Redirect to="/notebooks/general" />} />
                </Switch>
              </MainLayout>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Redirect to="/verify-email" />
              <Route path="/verify-email" component={VerifyEmail} />
            </React.Fragment>
          )}
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, username, emailVerified } = state;
  return {
    user,
    username,
    emailVerified
  };
};

export default connect(mapStateToProps, {
  authStateChange,
  getUserData
})(Router);
