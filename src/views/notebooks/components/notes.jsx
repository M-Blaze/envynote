import React, { Component } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import NotesIcon from "@material-ui/icons/Notes";
import { fetchNotes, setActiveNotebook } from "../../../store/action";
import { connect } from "react-redux";
import AddNotes from "./sidebar/components/addNotes";
import { withRouter } from "react-router-dom";

class Notes extends Component {
  componentDidMount() {
    this.props.setActiveNotebook(parseInt(this.props.match.params.slug));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeNotebook !== this.props.activeNotebook) {
      this.props.fetchNotes(this.props.activeNotebook.id);
    }
  }

  render() {
    return (
      <div className="notebook-content">
        <div className="block-title">
          <div className="icon-wrapper">
            <NotesIcon />
          </div>
          <div className="title-text">{this.props.activeNotebook.name}</div>
          <div className="icon-holder">
            <AddNotes />
          </div>
        </div>
        <div className="card-block">
          {this.props.notes.map(note => {
            return (
              <div className="card" key={note.id}>
                <div className="card-title">
                  <h4>{note.title}</h4>
                  <div className="icon-holder">
                    <MoreHorizIcon />
                  </div>
                </div>
                <div className="card-content">
                  <p>{note.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeNotebook: state.activeNotebook,
    notes: state.notes
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchNotes, setActiveNotebook })(Notes)
);
