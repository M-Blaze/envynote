import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addNote } from "../../../store/action";
import Spinner from "../../../components/Spinner";

function NewNote(props) {
  const titleRef = useRef(null);
  const [input, setInput] = useState({ title: "", content: "" });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    titleRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef.current;
    const notebookId = props.match.params.id;
    const userId = props.userId;
    const newNote = {
      title: input.title,
      content: input.content,
      notebookId,
      userId
    };
    if (input.title.trim() === "") {
      newNote.title = "Untitled";
    }
    if (input.content.trim() === "") {
      newNote.content = "No Content";
    }
    setIsCreating(true);
    props.addNote(newNote).then(() => {
      setIsCreating(false);
      setInput({ title: "", content: "" });
      title.focus();
    });
  }

  function changeHandler(e) {
    const target = e.target;
    const { name, value } = target;
    const height = calculateHeight(target);
    target.style.height = height + "px";
    setInput({
      ...input,
      [name]: value
    });
  }

  function calculateHeight(field) {
    field.style.height = "1px";
    const height = field.scrollHeight;
    return height;
  }

  return (
    <div className="newNote-block">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="input-group title-block">
          <textarea
            ref={titleRef}
            name="title"
            placeholder="Title Here..."
            spellCheck="false"
            value={input.title}
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className="input-group text-block">
          <textarea
            name="content"
            placeholder="Content Here..."
            spellCheck="false"
            value={input.content}
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className="button-group">
          {isCreating ? (
            <Spinner />
          ) : (
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.user
  };
};

export default connect(mapStateToProps, { addNote })(NewNote);
