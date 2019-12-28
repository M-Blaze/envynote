import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NoteMenu from "../../../components/NoteMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
function MenuItem(props) {
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
                <div className="icon-holder">
                  <FontAwesomeIcon icon={faFileAlt} />
                </div>
                <div className="text-holder">
                  <h4>{note.title}</h4>
                  <div className="content-holder">
                    <p>{note.content}</p>
                  </div>
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
