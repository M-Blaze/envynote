import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addNotebook } from "../../../../store/action";
import NotebookModal from "../NotebookModal";
import NotebookMenu from "../NotebookMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@material-ui/icons/Add";

class Sidebar extends Component {
  _mounted = false;
  constructor() {
    super();
    this.state = {
      isSidebarOpen: false
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;

    document.body.removeEventListener("click", this.closeSidebarConditionally);
  }

  clickHandler = id => {
    if (this.props.activeNotebook.id !== id) {
      this.closeSidebar();
    }
  };

  setIsSidebarOpen = value => {
    if (this._mounted) {
      this.setState({
        isSidebarOpen: value
      });
    }
  };

  openSidebar = () => {
    this.setIsSidebarOpen(true);
    document.body.addEventListener("click", this.closeSidebarConditionally);
  };

  closeSidebar = () => {
    this.setIsSidebarOpen(false);
    document.body.removeEventListener("click", this.closeSidebarConditionally);
  };

  closeSidebarConditionally = e => {
    const sidebarId = "notebook-sidebar";
    const itemMenuClass = "notebook-menu";
    const target = e.target;
    const sidebarContainer = document.getElementById(sidebarId);
    if (
      sidebarContainer.contains(target) ||
      target.parentElement.classList.contains(itemMenuClass)
    ) {
      return;
    }
    this.closeSidebar();
  };

  toggleSidebar = () => {
    if (!this.state.isSidebarOpen) {
      this.openSidebar();
      return;
    }
    this.closeSidebar();
  };

  render() {
    const modalProps = {
      opener: <AddIcon />,
      openerClass: "icon-holder",
      btnText: "Create Notebook",
      title: "Create",
      action: this.props.addNotebook
    };
    return this.props.activeNotebook ? (
      <div
        id="notebook-sidebar"
        className={`notebook-sidebar ${
          this.state.isSidebarOpen ? "toggle-active" : ""
        }`}
      >
        <div onClick={this.toggleSidebar} className="toggle-bar">
          <i className="icon-log-in"></i>
        </div>
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
                    onClick={() => this.clickHandler(id)}
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
                  {index !== 0 ? (
                    <NotebookMenu
                      openSidebar={this.openSidebar}
                      closeSidebar={this.closeSidebar}
                      inputVal={notebook}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    notebooks: state.notebooks,
    activeNotebook: state.activeNotebook
  };
};

export default connect(mapStateToProps, {
  addNotebook
})(Sidebar);
