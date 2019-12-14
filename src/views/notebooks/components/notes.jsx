import React from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import NotesIcon from "@material-ui/icons/Notes";

const Notes = () => {
  return (
    <div className="notebook-content">
      <div className="block-title">
        <div className="icon-wrapper">
          <NotesIcon />
        </div>
        <div className="title-text">General</div>
        <div className="icon-holder">
          <MoreHorizIcon />
        </div>
      </div>
      <div className="card-block"></div>
    </div>
  );
};

export default Notes;
