import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import MainLayout from "../layout/MainLayout";
import Notebooks from "../views/notebooks";
import Notes from "../views/notes";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import { authStateChange, getUsername } from "../store/action";
import Spinner from "../components/Spinner";

class Router extends React.Component {
  componentDidMount() {
    this.props.authStateChange();
  }

  componentDidUpdate(prevProps) {
    const { user, username } = this.props;
    if (prevProps.user !== user && user !== "loggedOut" && username === "") {
      this.props.getUsername(user);
    }
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.user === "loggedOut" ? (
          <React.Fragment>
            <Switch>
              <Route path="/signin" component={SignInForm} />
              <Route path="/signup" component={SignUpForm} />
              <Route render={() => <Redirect to="/signin" />} />
            </Switch>
          </React.Fragment>
        ) : this.props.username !== "" ? (
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
          <Spinner />
        )}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    username: state.username
  };
};

export default connect(mapStateToProps, { authStateChange, getUsername })(
  Router
);
