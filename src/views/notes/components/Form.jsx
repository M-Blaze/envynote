import React, { Component } from "react";
import { connect } from "react-redux";
import { editNote, setActiveNote } from "../../../store/action";
import TextareaAutosize from "react-textarea-autosize";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      save: false
    };
  }

  componentDidMount() {
    if (this.props.focusElement === "content") {
      this.contentRef.focus();
    } else {
      this.titleRef.focus();
    }
    if (Object.keys(this.props.activeNote).length !== 0) {
      const {
        activeNote: { title, content }
      } = this.props;
      this.setState({
        title,
        content
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeNote.id !== prevProps.activeNote.id) {
      this.titleRef.focus();
      const {
        activeNote: { title, content }
      } = this.props;
      this.setState({
        title,
        content
      });
    }
  }

  submitHandler = e => {
    e.preventDefault();
    const { title, content } = this.state;
    const newNote = {
      id: this.props.activeNote.id,
      notebookId: this.props.activeNote.notebookId,
      title,
      content
    };
    this.props.editNote(newNote);
    this.props.setActiveNote(this.props.activeNote.id);
    this.redirectFromEdit();
  };

  redirectFromEdit() {
    this.props.history.push(this.props.path);
  }

  changeHandler = e => {
    const target = e.target;
    if (!this.state.save) {
      this.setState({
        save: true
      });
    }
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    return (
      <form
        action="#"
        autoComplete="off"
        onSubmit={this.submitHandler}
        className="edit-form"
      >
        <div className="input-group note-title">
          <TextareaAutosize
            type="text"
            name="title"
            spellCheck="false"
            inputRef={input => {
              this.titleRef = input;
            }}
            onChange={this.changeHandler}
            value={this.state.title}
          />
        </div>
        <div className="input-group note-text">
          <TextareaAutosize
            type="text"
            name="content"
            spellCheck="false"
            inputRef={input => {
              this.contentRef = input;
            }}
            onChange={this.changeHandler}
            value={this.state.content}
          />
        </div>
        <div className="button-group">
          <button className="btn">Cancel</button>
          {this.state.save && (
            <button className="btn" type="submit">
              Save
            </button>
          )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeNote: state.activeNote
  };
};

export default connect(mapStateToProps, { editNote, setActiveNote })(Form);
