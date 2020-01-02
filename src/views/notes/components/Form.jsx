import React, { Component } from "react";
import { connect } from "react-redux";
import { editNote } from "../../../store/action";
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
    if (Object.keys(this.props.activeNote).length !== 0) {
      const {
        activeNote: { title, content }
      } = this.props;
      this.setState({
        title,
        content
      });
    }
    this.titleRef.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeNote.id !== prevProps.activeNote.id) {
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
    const newNote = {
      id: this.props.activeNote.id,
      notebookId: this.props.activeNote.notebookId,
      ...this.state
    };
    this.props.editNote(newNote);
    this.props.history.push(this.props.path);
  };

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
      <form action="#" onSubmit={this.submitHandler} className="edit-form">
        <div className="input-group note-title">
          <TextareaAutosize
            type="text"
            name="title"
            inputRef={title => (this.titleRef = title)}
            onChange={this.changeHandler}
            value={this.state.title}
          />
        </div>
        <div className="input-group note-text">
          <TextareaAutosize
            type="text"
            name="content"
            onChange={this.changeHandler}
            value={this.state.content}
          />
        </div>
        {this.state.save && (
          <div className="button-group">
            <button className="btn" type="submit">
              Save
            </button>
          </div>
        )}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeNote: state.activeNote
  };
};

export default connect(mapStateToProps, { editNote })(Form);
