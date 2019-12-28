import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteNote } from "../store/action";

function SimpleMenu({ history, deleteNote, noteData, path, horizontal }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function redirectHandler() {
    handleClose();
    history.push(`${path}/edit`);
  }

  function deleteHandler(data) {
    handleClose();
    deleteNote(data);
  }

  return (
    <div className="menu-button">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {horizontal ? <MoreHorizIcon /> : <MoreVertIcon />}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => redirectHandler()}>Edit</MenuItem>
        <MenuItem onClick={() => deleteHandler(noteData)}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

SimpleMenu.defaultProps = {
  horizontal: false
};

export default withRouter(connect(null, { deleteNote })(SimpleMenu));
