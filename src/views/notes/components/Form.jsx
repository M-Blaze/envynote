import React, { Component } from "react";
import { connect } from "react-redux";
import { editNote, setActiveNote } from "../../../store/action";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      save: false,
      _isMounted: false
    };
    this.titleRef = React.createRef();
    this.contentRef = React.createRef();
  }

  componentDidMount() {
    const titleRef = this.titleRef.current;
    const contentRef = this.contentRef.current;
    this.props.toggleIsOutputBlockHidden(true);

    if (this.props.focusElement === "content") {
      contentRef.focus();
    } else {
      titleRef.focus();
    }
    if (Object.keys(this.props.activeNote).length !== 0) {
      const {
        activeNote: { title, content }
      } = this.props;
      this.setState({
        title,
        content,
        _isMounted: true
      });
    }
  }

  componentDidUpdate(prevProps) {
    const titleRef = this.titleRef.current;
    const contentRef = this.contentRef.current;

    if (
      this.props.activeNote.id !== prevProps.activeNote.id &&
      this.props.activeNote !== ""
    ) {
      titleRef.focus();
      const { title, content } = this.props.activeNote;
      this.setState({
        title,
        content,
        _isMounted: true
      });
      return;
    }

    if (this.state._isMounted && this.state.title !== "") {
      titleRef.style.height = titleRef.scrollHeight + "px";
      contentRef.style.height = contentRef.scrollHeight + "px";
      this.setState({ _isMounted: false });
    }
  }

  componentWillUnmount() {
    this.props.toggleIsOutputBlockHidden(false);
    this.setState({ _isMounted: false });
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
    if (!title) {
      newNote.title = "Untitled";
    }
    if (!content) {
      newNote.content = "No Content";
    }
    this.props.editNote(newNote);
    this.props.setActiveNote(this.props.activeNote.id);
    this.redirectFromEdit();
  };

  redirectFromEdit() {
    this.props.history.push(this.props.path);
  }

  changeHandler = e => {
    const target = e.target;
    const height = this.calculateHeight(target);
    target.style.height = height + "px";

    if (!this.state.save) {
      this.setState({
        save: true
      });
    }
    this.setState({
      [target.name]: target.value
    });
  };

  calculateHeight = field => {
    field.style.height = "1px";
    const height = field.scrollHeight;
    console.log(height);
    return height;
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
          <textarea
            type="text"
            name="title"
            spellCheck="false"
            ref={this.titleRef}
            onChange={this.changeHandler}
            value={this.state.title}
            maxLength="200"
          ></textarea>
        </div>
        <div className="input-group note-text">
          <textarea
            type="text"
            name="content"
            spellCheck="false"
            ref={this.contentRef}
            onChange={this.changeHandler}
            value={this.state.content}
          ></textarea>
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
