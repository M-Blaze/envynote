import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "./MenuItem";
import { fetchNotes, setActiveNotebook } from "../../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
class Sidebar extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (this.props.activeNotebook.id !== id) {
      this.props.setActiveNotebook(id);
    }
  }

  redirectHandler = () => {
    this.props.history.push(
      `/notebook/${this.props.activeNotebook.id}/notes/new`
    );
  };

  render() {
    return (
      <div className="note-bar">
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
        <MenuItem />
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
