import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import { Route, Switch } from "react-router-dom";
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
    this.props
      .fetchNotes(this.props.user, this.props.match.params.id)
      .then(() => {
        this.setState({
          isFetching: false
        });
      });
  }

  render() {
    return this.state.isFetching ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <Sidebar />
        <Switch>
          <Route path={`/notebook/:id/notes/new`} component={NewNote} exact />
          <Route
            path={`/notebook/:id/notes/:slug`}
            render={() => <NoteContent />}
          ></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return {
    user
  };
};

export default connect(mapStateToProps, { fetchNotes })(Notes);
