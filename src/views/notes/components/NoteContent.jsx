import React, { Component } from "react";
import { withRouter, Route, Link } from "react-router-dom";
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
    return (
      <div className="note-content">
        <Link to={`${this.props.match.url}/edit`} className="output-block">
          <h2 onClick={() => this.focusElementHandler("title")}>
            {this.props.activeNote.title}
          </h2>
          <p onClick={() => this.focusElementHandler("content")}>
            {this.props.activeNote.content}
          </p>
        </Link>
        <Route
          path={`${this.props.match.url}/edit`}
          render={() => (
            <Form
              history={this.props.history}
              focusElement={this.state.focusElement}
              path={this.props.match.url}
            />
          )}
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

export default withRouter(
  connect(mapStateToProps, { setActiveNote })(NoteContent)
);
