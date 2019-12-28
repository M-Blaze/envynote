import React, { Component } from "react";
import NotesIcon from "@material-ui/icons/Notes";
import { fetchNotes, setActiveNotebook } from "../../../store/action";
import { connect } from "react-redux";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import NoteMenu from "../../../components/NoteMenu";

class Notes extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.activeNotebook !== this.props.activeNotebook) {
      this.props.fetchNotes(this.props.activeNotebook.id);
    }
  }

  redirectHandler = () => {
    console.log(this.props);

    this.props.history.push(
      `/notebook/${this.props.activeNotebook.id}/notes/new`
    );
  };

  render() {
    return (
      <div className="notebook-content">
        <div className="block-title">
          <div className="icon-wrapper">
            <NotesIcon />
          </div>
          <div className="title-text">{this.props.activeNotebook.name}</div>
          <div onClick={this.redirectHandler} className="icon-holder">
            <NoteAddIcon />
          </div>
        </div>
        <div className="card-block">
          {this.props.notes.map(note => {
            return (
              <div className="card" key={note.id}>
                <div className="card-title">
                  <h4>{note.title}</h4>
                  <NoteMenu
                    horizontal="true"
                    noteData={note}
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

export default connect(mapStateToProps, { fetchNotes, setActiveNotebook })(
  Notes
);
