import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NotesIcon from "@material-ui/icons/Notes";
import { fetchNotebooks, setActiveNotebook } from "../../../../store/action";
import AddNotebook from "./components/createNotebook";
import NotebookMenu from "../../../../components/NotebookMenu";

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchNotebooks();
    this.props.setActiveNotebook(parseInt(this.props.match.params.id));
  }

  render() {
    return (
      <div className="notebook-bar">
        <div className="block-title">
          <h3>Notebooks</h3>
          <AddNotebook />
        </div>
        <div className="list-wrapper">
          <ul className="notebooks-list">
            {this.props.notebooks.map(notebook => {
              return (
                <li
                  key={notebook.id}
                  className={`notebook-item ${
                    notebook.id === this.props.activeNotebook.id ? "active" : ""
                  }`}
                >
                  <Link
                    onClick={() => this.props.setActiveNotebook(notebook.id)}
                    to={`/notebooks/${notebook.id}`}
                    className="note-opener"
                  >
                    <div className="notebook">
                      <div className="icon-wrap">
                        <NotesIcon />
                      </div>
                      <div className="notebook-title">{notebook.name}</div>
                    </div>
                  </Link>
                  {notebook.id !== 1 ? (
                    <NotebookMenu
                      path={`/notebooks/${notebook.id}`}
                      notebookId={notebook.id}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notebooks: state.notebooks,
    activeNotebook: state.activeNotebook
  };
};

export default connect(mapStateToProps, { fetchNotebooks, setActiveNotebook })(
  Sidebar
);
