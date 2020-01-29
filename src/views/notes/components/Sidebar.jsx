import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "./MenuItem";
import { fetchNotes, setActiveNotebook } from "../../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
class Sidebar extends Component {
  state = {
    isSidebarOpen: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    if (this.props.activeNotebook.id !== id) {
      this.props.setActiveNotebook(id);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.closeSidebarConditionally);
  }

  setIsSidebarOpen = value => {
    this.setState({
      isSidebarOpen: value
    });
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
    const sidebarId = "note-sidebar";
    const itemMenuClass = "note-menu";
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

  redirectHandler = () => {
    this.props.history.push(
      `/notebook/${this.props.activeNotebook.id}/notes/new`
    );
    this.closeSidebar();
  };

  render() {
    return (
      <div
        id="note-sidebar"
        className={`note-bar ${
          this.state.isSidebarOpen ? "toggle-active" : ""
        }`}
      >
        <div onClick={this.toggleSidebar} className="toggle-bar">
          <i className="icon-log-in"></i>
        </div>
        <div className="block-title">
          <div className="icon-wrap">
            <Link to="/">
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
          </div>
          <h3>{this.props.activeNotebook.name}</h3>
          <div onClick={this.redirectHandler} className="icon-holder">
            <AddIcon />
          </div>
        </div>
        <MenuItem
          openSidebar={this.openSidebar}
          closeSidebar={this.closeSidebar}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeNotebook: state.activeNotebook
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchNotes, setActiveNotebook })(Sidebar)
);
