import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import { Route, Switch } from "react-router-dom";
import NoteContent from "./components/NoteContent";
import NewNote from "./components/NewNote";

class Notes extends Component {
  render() {
    return (
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

export default Notes;
