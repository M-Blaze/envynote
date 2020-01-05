import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteNote } from "../store/action";

function SimpleMenu({ history, deleteNote, noteId, path, horizontal }) {
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

  function deleteHandler(id) {
    handleClose();
    deleteNote(id);
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
        <MenuItem onClick={() => deleteHandler(noteId)}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

SimpleMenu.defaultProps = {
  horizontal: false
};

const mapStateToProps = state => {
  return {
    activeNote: state.activeNote
  };
};

export default withRouter(connect(mapStateToProps, { deleteNote })(SimpleMenu));
