import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import { withRouter } from "react-router-dom";
import { fetchNotes, setActiveNotebook } from "../../../store/action";
import { connect } from "react-redux";
import NoteMenu from "../../../components/NoteMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../../components/Spinner";

class Notes extends Component {
  redirectHandler = () => {
    const url = this.props.match.url;
    this.props.history.push(`${url}/notes/new`);
  };

  editRedirectHandler = id => {
    const url = this.props.match.url;
    this.props.history.push(`${url}/notes/${id}/edit`);
  };

  render() {
    return this.props.isFetchingNotes ? (
      <Spinner />
    ) : (
      <div className="notebook-content">
        <React.Fragment>
          <div className="block-title">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faBook} />
            </div>
            <div className="title-text">{this.props.activeNotebook.name}</div>
            <div onClick={this.redirectHandler} className="icon-holder">
              <AddIcon />
            </div>
          </div>
          <div className="card-block">
            {this.props.notes.map(note => {
              return (
                <div className="card" key={note.id}>
                  <div className="card-title">
                    <h4 onClick={() => this.editRedirectHandler(note.id)}>
                      {note.title}
                    </h4>
                    <NoteMenu horizontal="true" noteId={note.id} />
                  </div>
                  <div className="card-content">
                    <p>{note.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { activeNotebook, notes } = state;
  return {
    activeNotebook,
    notes
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchNotes, setActiveNotebook })(Notes)
);
