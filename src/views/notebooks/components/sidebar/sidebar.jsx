import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNotebooks, setActiveNotebook } from "../../../../store/action";
import NotebookModal from "./components/NotebookModal";
import NotebookMenu from "../../../../components/NotebookMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@material-ui/icons/Add";
import { addNotebook } from "../../../../store/action";

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchNotebooks();
    this.props.setActiveNotebook(parseInt(this.props.match.params.id));
  }

  render() {
    const modalProps = {
      opener: <AddIcon />,
      openerClass: "icon-holder",
      btnText: "Create Notebook",
      title: "Create",
      action: this.props.addNotebook
    };
    return (
      <div className="notebook-bar">
        <div className="block-title">
          <h3>Notebooks</h3>
          <NotebookModal modalProps={modalProps} />
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
                        <FontAwesomeIcon icon={faBook} />
                      </div>
                      <div className="notebook-title">{notebook.name}</div>
                    </div>
                  </Link>
                  {notebook.id !== 1 ? (
                    <NotebookMenu inputVal={notebook} />
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

export default connect(mapStateToProps, {
  fetchNotebooks,
  setActiveNotebook,
  addNotebook
})(Sidebar);
