import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import { Route, Switch } from "react-router-dom";
import NoteContent from "./components/NoteContent";
import NewNote from "./components/NewNote";
import { fetchNotes } from "../../store/action";
import { connect } from "react-redux";

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: true
    };
  }

  componentDidMount() {
    this.props.fetchNotes(this.props.match.params.id).then(() => {
      this.setState({
        isFetching: false
      });
    });
  }

  render() {
    return this.state.isFetching ? null : (
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

export default connect(null, { fetchNotes })(Notes);
