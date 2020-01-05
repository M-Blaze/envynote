import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveNotebook, addNotebook } from "../../../../store/action";
import NotebookModal from "./components/NotebookModal";
import NotebookMenu from "../../../../components/NotebookMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@material-ui/icons/Add";

class Sidebar extends Component {
  componentDidMount() {
    this.props.setActiveNotebook(this.props.match.params.id);
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
            {this.props.notebooks.map((notebook, index) => {
              const { id, name } = notebook;
              return (
                <li
                  key={id}
                  className={`notebook-item ${
                    id === this.props.activeNotebook.id ? "active" : ""
                  }`}
                >
                  <Link
                    onClick={() => this.props.setActiveNotebook(id)}
                    to={`/notebooks/${id}`}
                    className="note-opener"
                  >
                    <div className="notebook">
                      <div className="icon-wrap">
                        <FontAwesomeIcon icon={faBook} />
                      </div>
                      <div className="notebook-title">{name}</div>
                    </div>
                  </Link>
                  {index !== 0 ? <NotebookMenu inputVal={notebook} /> : null}
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
  setActiveNotebook,
  addNotebook
})(Sidebar);
