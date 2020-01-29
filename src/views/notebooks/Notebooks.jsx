import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
class Notebooks extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const prevActiveNotebookId = prevProps.activeNotebook.id;
    if (
      prevActiveNotebookId !== this.props.defaultNotebookId &&
      prevState.isFetching === false &&
      prevActiveNotebookId !== this.props.activeNotebook.id
    ) {
      this.fetchStateHandler(true);
    }
  }

  fetchStateHandler = stateParam => {
    this.setState({
      isFetching: stateParam
    });
  };

  render() {
    const notebookComponents = (
      <React.Fragment>
        <Route
          path="/notebooks/:id"
          render={props => (
            <Sidebar {...props} fetchHandler={this.fetchStateHandler} />
          )}
        />
        <Route
          path="/notebooks/:id"
          render={props => (
            <Notes
              {...props}
              isFetching={this.state.isFetching}
              fetchHandler={this.fetchStateHandler}
            />
          )}
        />
      </React.Fragment>
    );

    return <React.Fragment>{notebookComponents}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    notebooks: state.notebooks,
    defaultNotebookId: state.defaultNotebookId,
    activeNotebook: state.activeNotebook
  };
};

export default connect(mapStateToProps)(Notebooks);
