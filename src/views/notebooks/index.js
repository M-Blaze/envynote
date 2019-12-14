import React, { Component } from "react";
import { Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Notes from "./components/notes";
class Notebooks extends Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Route path="/notebooks/:slug" exact>
          <Notes />
        </Route>
      </React.Fragment>
    );
  }
}

export default Notebooks;
