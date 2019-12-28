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
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const notebookId = props.activeNotebook.id;
    if (
      title.startsWith(" ") ||
      title.length === 0 ||
      content.startsWith(" " || content.length === 0)
    ) {
      return;
    }
    props.addNote({ title, content, notebookId });
  }

  return (
    <div className="newNote-block">
      <form onSubmit={handleSubmit}>
        <div className="input-group title-block">
          <input
            ref={titleRef}
            name="title"
            type="text"
            placeholder="Title Here..."
          />
        </div>
        <div className="input-group text-block">
          <textarea
            ref={contentRef}
            type="text"
            name="content"
            placeholder="Content Here..."
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
    activeNotebook: state.activeNotebook
  };
};

export default connect(mapStateToProps, { addNote })(NewNote);
