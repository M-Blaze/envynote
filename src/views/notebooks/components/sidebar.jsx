import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NotesIcon from "@material-ui/icons/Notes";
import { fetchNotebooks } from "../../../store/action";

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchNotebooks();
  }
  render() {
    return (
      <div className="notebook-bar">
        <div className="block-title">
          <h3>Notebook</h3>
          <div className="icon-holder">
            <AddIcon />
          </div>
        </div>
        <div className="notebooks-list">
          {this.props.notebooks.map(notebook => {
            return (
              <Link key={notebook.id} to={`/notebooks/${notebook.id}`}>
                <div className="notebook">
                  <div className="icon-wrap">
                    <NotesIcon />
                  </div>
                  <div className="notebook-title">{notebook.name}</div>
                  <div className="icon-holder">
                    <MoreVertIcon />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notebooks: state.notebooks
  };
};

export default connect(mapStateToProps, { fetchNotebooks })(Sidebar);
