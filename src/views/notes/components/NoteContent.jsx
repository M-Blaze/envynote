import React, { Component } from "react";
import { withRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setActiveNote } from "../../../store/action";
import Form from "./Form";
class NoteContent extends Component {
  componentDidMount() {
    this.props.setActiveNote(this.props.match.params.slug);
  }

  componentDidUpdate(prevProps) {
    const slug = this.props.match.params.slug;
    if (prevProps.match.params.slug !== slug) {
      // console.log(slug);
      this.props.setActiveNote(slug);
    }
  }

  render() {
    return (
      <div className="note-content">
        <Link to={`${this.props.match.url}/edit`} className="output-block">
          <h2>{this.props.activeNote.title}</h2>
          <p>{this.props.activeNote.content}</p>
        </Link>
        <Route
          path={`${this.props.match.url}/edit`}
          render={() => (
            <Form history={this.props.history} path={this.props.match.url} />
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
