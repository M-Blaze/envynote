import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import { fetchNotes } from "../../../store/action";
import { connect } from "react-redux";
import NoteMenu from "../../../components/NoteMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

class Notes extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.activeNotebook !== this.props.activeNotebook) {
      this.props.fetchNotes(this.props.activeNotebook.id);
    }
  }

  redirectHandler = () => {
    this.props.history.push(
      `/notebook/${this.props.activeNotebook.id}/notes/new`
    );
  };

  editRedirectHandler = id => {
    this.props.history.push(
      `/notebook/${this.props.activeNotebook.id}/notes/${id}/edit`
    );
  };

  render() {
    return (
      <div className="notebook-content">
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
                  <NoteMenu
                    horizontal="true"
                    noteId={note.id}
                    path={`/notebook/${this.props.activeNotebook.id}/notes/${note.id}`}
                  />
                </div>
                <div className="card-content">
                  <p>{note.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeNotebook: state.activeNotebook,
    notes: state.notes
  };
};

export default connect(mapStateToProps, { fetchNotes })(Notes);
