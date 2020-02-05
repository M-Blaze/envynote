import React, { Component } from "react";
import { withRouter, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Form from "./Form";
class NoteContent extends Component {
  constructor() {
    super();
    this.state = {
      focusElement: "title"
    };
  }

  focusElementHandler = ele => {
    this.setState({
      focusElement: ele
    });
  };

  render() {
    const URL = this.props.match.url;
    return (
      <div className="note-content">
        <Link to={`${URL}/edit`} className="output-block">
          <h2 onClick={() => this.focusElementHandler("title")}>
            {this.props.activeNote.title}
          </h2>
          <p onClick={() => this.focusElementHandler("content")}>
            {this.props.activeNote.content}
          </p>
        </Link>
        <Switch>
          <Route
            path={`${URL}/edit`}
            render={() => (
              <Form
                history={this.props.history}
                focusElement={this.state.focusElement}
                path={URL}
              />
            )}
            exact
          />
          {/* <Route path={`${url}/:id`} render={() => <Redirect to="/" />} /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeNote: state.activeNote
  };
};

export default withRouter(connect(mapStateToProps)(NoteContent));
