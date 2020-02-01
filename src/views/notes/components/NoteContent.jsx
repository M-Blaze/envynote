import React, { Component } from "react";
import { withRouter, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setActiveNote } from "../../../store/action";
import Form from "./Form";
class NoteContent extends Component {
  constructor() {
    super();
    this.state = {
      focusElement: "title"
    };
  }
  componentDidMount() {
    this.props.setActiveNote(this.props.match.params.slug);
  }

  componentDidUpdate(prevProps) {
    const slug = this.props.match.params.slug;
    if (prevProps.match.params.slug !== slug) {
      this.props.setActiveNote(slug);
    }
  }

  focusElementHandler = ele => {
    this.setState({
      focusElement: ele
    });
  };

  render() {
    const url = this.props.match.url;
    return this.props.activeNote ? (
      <div className="note-content">
        <Link to={`${url}/edit`} className="output-block">
          <h2 onClick={() => this.focusElementHandler("title")}>
            {this.props.activeNote.title}
          </h2>
          <p onClick={() => this.focusElementHandler("content")}>
            {this.props.activeNote.content}
          </p>
        </Link>
        <Route
          path={`${url}/edit`}
          render={() => (
            <Form
              history={this.props.history}
              focusElement={this.state.focusElement}
              path={url}
            />
          )}
        />
      </div>
    ) : (
      <Redirect to={`/notebook/${this.props.match.params.id}/notes/new`} />
    );
  }
}

const mapStateToProps = state => {
  return {
    activeNote: state.activeNote
  };
};

export default withRouter(
  connect(mapStateToProps, { setActiveNote })(NoteContent)
);
