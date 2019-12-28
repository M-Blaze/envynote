import React, { Component } from "react";
import { withRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setActiveNote } from "../../../store/action";
import Form from "./Form";
class NoteContent extends Component {
  state = {
    slug: 1
  };

  componentDidMount() {
    this.props.setActiveNote(parseInt(this.props.match.params.slug));
  }

  componentDidUpdate() {
    const slug = this.props.match.params.slug;
    if (slug !== this.state.slug) {
      this.setState({ slug });
      this.props.setActiveNote(parseInt(slug));
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
