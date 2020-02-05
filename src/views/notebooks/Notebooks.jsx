import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { setActiveNotebook, fetchNotes } from "../../store/action";

class Notebooks extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      isFetching: true,
      isFetchingNotes: true
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      const activeNotebookId = this.props.match.params.id;
      const userId = this.props.user;
      this.props.setActiveNotebook(activeNotebookId);
      this.props.fetchNotes(userId, activeNotebookId).then(() => {
        this.setState({
          isFetchingNotes: false
        });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this._isMounted) {
      const activeNotebookId = this.props.match.params.id;
      const userId = this.props.user;
      if (prevProps.activeNotebook) {
        const prevActiveNotebookId = prevProps.activeNotebook.id;
        if (prevActiveNotebookId !== activeNotebookId) {
          this.setState({
            isFetchingNotes: true
          });
          this.props.setActiveNotebook(activeNotebookId);
          this.props.fetchNotes(userId, activeNotebookId).then(() => {
            this.setState({
              isFetchingNotes: false
            });
          });
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Route path="/notebooks/:id" component={Sidebar} />
        <Route
          path="/notebooks/:id"
          render={() => <Notes isFetchingNotes={this.state.isFetchingNotes} />}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user, defaultNotebookId, activeNotebook } = state;
  return {
    defaultNotebookId,
    activeNotebook,
    user
  };
};

export default connect(mapStateToProps, { setActiveNotebook, fetchNotes })(
  Notebooks
);
