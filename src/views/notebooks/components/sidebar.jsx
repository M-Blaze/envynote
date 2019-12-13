import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";

class Sidebar extends Component {
  render() {
    return (
      <div className="notebook-bar">
        <div className="block-title">
          <h3>Notebook</h3>
          <div className="icon-holder">
            <AddIcon />
          </div>
        </div>
        <div className="notebooks-list"></div>
      </div>
    );
  }
}

export default Sidebar;
