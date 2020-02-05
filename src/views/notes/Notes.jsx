import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import { Route, Switch, Redirect } from "react-router-dom";
import NoteContent from "./components/NoteContent";
import NewNote from "./components/NewNote";
import { fetchNotes } from "../../store/action";
import { connect } from "react-redux";
import Spinner from "../../components/Spinner";

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: true
    };
  }

  componentDidMount() {
    const { user, notes, history } = this.props;
    if (notes.length === 0) {
      const { id: notebookId } = this.props.match.params;
      this.props
        .fetchNotes(user, notebookId)
        .then(() => {
          this.setState({
            isFetching: false
          });
        })
        .catch(() => {
          history.replace("/");
        });
      return;
    }
    this.setState({
      isFetching: false
    });
  }

  render() {
    return this.state.isFetching ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <Sidebar />
        <Switch>
          <Route path={`/notebooks/:id/notes/new`} component={NewNote} exact />
          <Route
            path={`/notebooks/:id/notes/:noteId`}
            render={() => <NoteContent />}
          ></Route>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user, notes } = state;
  return {
    user,
    notes
  };
};

export default connect(mapStateToProps, { fetchNotes })(Notes);
