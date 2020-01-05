import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
class Notebooks extends Component {
  render() {
    const notebookComponents = (
      <React.Fragment>
        {this.props.location.pathname === "/" && (
          <Redirect to={`/notebooks/${this.props.defaultNotebookId}`} />
        )}
        <Route path="/notebooks/:id" component={Sidebar} />
        <Route path="/notebooks/:id" component={Notes} />
      </React.Fragment>
    );

    return <React.Fragment>{notebookComponents}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    notebooks: state.notebooks,
    defaultNotebookId: state.defaultNotebookId
  };
};

export default connect(mapStateToProps)(Notebooks);
