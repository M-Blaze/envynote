import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NoteMenu from "../../../components/NoteMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { setActiveNote } from "../../../store/action";
function MenuItem(props) {
  const { noteId: activeNoteId, id: activeNotebookId } = props.match.params;
  useEffect(() => {
    if (activeNoteId !== "new") {
      props.setActiveNote(activeNoteId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNoteId]);

  useEffect(() => {
    if (props.notes.length === 0 && activeNoteId !== "new") {
      props.history.replace(`/notebooks/${activeNotebookId}/notes/new`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.notes]);

  function getDate(timeStamp) {
    const fullDate = timeStamp.toDate();
    return `${fullDate.getFullYear()}-${fullDate.getMonth() +
      1}-${fullDate.getDate()}`;
  }

  function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  function checkActiveNote(id) {
    if (activeNoteId === "new") {
      return;
    }
    if (activeNoteId === id) {
      return "active";
    }
  }

  return (
    <ul className="notes-list">
      {props.notes.map(note => {
        const { title, id, content, editedAt, createdAt, editedIn } = note;
        return (
          <li key={id} className={checkActiveNote(id)}>
            <Link
              onClick={props.closeSidebar}
              to={`/notebooks/${activeNotebookId}/notes/${id}`}
            >
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
              noteId={id}
              openSidebar={props.openSidebar}
              closeSidebar={props.closeSidebar}
            />
          </li>
        );
      })}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

export default withRouter(
  connect(mapStateToProps, { setActiveNote })(MenuItem)
);
