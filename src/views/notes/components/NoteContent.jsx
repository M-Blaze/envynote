import React, { Component } from "react";
import { withRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Form from "./Form";

class NoteContent extends Component {
  constructor() {
    super();
    this.state = {
      focusElement: "title",
      isOutputBlockHidden: false
    };
  }

  focusElementHandler = ele => {
    this.setState({
      focusElement: ele
    });
  };

  toggleIsOutputBlockHidden = param => {
    this.setState({
      isOutputBlockHidden: param
    });
  };

  clickHandler = targetType => {
    this.toggleIsOutputBlockHidden(true);
    this.focusElementHandler(targetType);
  };

  render() {
    const URL = this.props.match.url;
    return (
      <div className="note-content">
        <Link
          to={`${URL}/edit`}
          className={`output-block ${
            this.state.isOutputBlockHidden ? "block-hide" : ""
          }`}
        >
          <h2 onClick={() => this.clickHandler("title")}>
            {this.props.activeNote.title}
          </h2>
          <p onClick={() => this.clickHandler("content")}>
            {this.props.activeNote.content}
          </p>
        </Link>
        <Route
          path={`${URL}/edit`}
          render={() => (
            <Form
              toggleIsOutputBlockHidden={this.toggleIsOutputBlockHidden}
              history={this.props.history}
              focusElement={this.state.focusElement}
              path={URL}
            />
          )}
          exact
        />
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
