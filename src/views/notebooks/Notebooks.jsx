import React, { Component } from "react";
import Sidebar from "./components/sidebar";
import Notes from "./components/Notes";
import { Route, Redirect } from "react-router-dom";
class Notebooks extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.location.pathname === "/" && <Redirect to="/notebooks/1" />}
        <Route path="/notebooks/:id" component={Sidebar} />
        <Route path="/notebooks/:id" component={Notes} />
      </React.Fragment>
    );
  }
}

export default Notebooks;
