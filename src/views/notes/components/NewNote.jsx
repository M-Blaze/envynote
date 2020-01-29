import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { addNote } from "../../../store/action";

function NewNote(props) {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  });

  function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef.current;
    const titleValue = title.value;
    const content = contentRef.current;
    const contentValue = content.value;
    const notebookId = props.activeNotebook.id;
    const userId = props.userId;
    if (titleValue.trim() === "" || contentValue.trim() === "") {
      return;
    }
    props
      .addNote({ title: titleValue, content: contentValue, notebookId, userId })
      .then(() => {
        title.value = "";
        title.focus();
        content.value = "";
      });
  }

  return (
    <div className="newNote-block">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="input-group title-block">
          <input
            ref={titleRef}
            name="title"
            type="text"
            placeholder="Title Here..."
            spellCheck="false"
          />
        </div>
        <div className="input-group text-block">
          <textarea
            ref={contentRef}
            type="text"
            name="content"
            placeholder="Content Here..."
            spellCheck="false"
          />
        </div>
        <div className="button-group">
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    activeNotebook: state.activeNotebook,
    userId: state.user
  };
};

export default connect(mapStateToProps, { addNote })(NewNote);
