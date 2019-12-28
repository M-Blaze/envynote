import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NoteMenu from "../../../components/NoteMenu";
function MenuItem(props) {
  console.log(props);

  return (
    <ul className="notes-list">
      {props.notes.map(note => {
        return (
          <li
            key={note.id}
            className={props.activeNote.id === note.id ? "active" : ""}
          >
            <Link to={`${props.match.url}/${note.id}`}>
              <div className="note">
                <div className="title-wrap">
                  <h4>{note.title}</h4>
                </div>
                <div className="content-wrap">
                  <p>{note.content}</p>
                </div>
              </div>
            </Link>
            <NoteMenu path={`${props.match.url}/${note.id}`} noteData={note} />
          </li>
        );
      })}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    activeNote: state.activeNote
  };
};

export default withRouter(connect(mapStateToProps)(MenuItem));
