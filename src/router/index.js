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
import ErrorBoundary from "../hoc/ErrorBoundary";

class Router extends React.Component {
  state = {
    isCheckingAuth: true,
    isUpdated: false
  };

  componentDidMount() {
    this.props.authStateChange();
  }

  componentDidUpdate() {
    const userId = this.props.user;
    if (userId !== "" && userId !== "loggedOut") {
      if (this.props.email === "") {
        this.props.getUserData(userId);
      }
      if (!this.state.isUpdated) {
        this.setState({
          isCheckingAuth: false,
          isUpdated: true
        });
      }
      return;
    }
  }

  componentWillUnmount() {
    this.setState({
      isUpdated: false
    });
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
          ) : !this.state.isCheckingAuth ? (
            user !== "" && emailVerified ? (
              <React.Fragment>
                <ErrorBoundary>
                  <MainLayout>
                    <Switch>
                      <Route
                        path="/notebooks/:id/notes/:noteId"
                        component={Notes}
                        strict
                      />
                      <Route
                        path="/notebooks/:id"
                        strict
                        exact
                        component={Notebooks}
                      />
                      <Route
                        render={() => <Redirect to="/notebooks/general" />}
                      />
                    </Switch>
                  </MainLayout>
                </ErrorBoundary>
              </React.Fragment>
            ) : (
              <VerifyEmail />
            )
          ) : null}
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, emailVerified, email } = state;
  return {
    user,
    emailVerified,
    email
  };
};

export default connect(mapStateToProps, {
  authStateChange,
  getUserData
})(Router);
