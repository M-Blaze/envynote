import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NoteMenu from "../../../components/NoteMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
function MenuItem(props) {
  function getDate(timeStamp) {
    const fullDate = timeStamp.toDate();
    return `${fullDate.getFullYear()}-${fullDate.getMonth() +
      1}-${fullDate.getDate()}`;
  }

  function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  return (
    <ul className="notes-list">
      {props.notes.map(note => {
        const { title, id, content, editedAt, createdAt, editedIn } = note;
        return (
          <li
            key={note.id}
            className={props.activeNote.id === id ? "active" : ""}
          >
            <Link onClick={props.closeSidebar} to={`${props.match.url}/${id}`}>
              <div className="note">
                <div className="icon-holder">
                  <FontAwesomeIcon icon={faFileAlt} />
                </div>
                <div className="text-holder">
                  <h4>{title}</h4>
                  <div className="content-holder">
                    <p>{content}</p>
                  </div>
                  <div className="edited-info">
                    {editedIn ? (
                      <span>Last Edited: {formatDate(editedAt)}</span>
                    ) : (
                      <span>
                        Last Edited:
                        {editedAt ? getDate(editedAt) : getDate(createdAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
            <NoteMenu
              path={`${props.match.url}/${note.id}`}
              {...props}
              noteId={note.id}
            />
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
