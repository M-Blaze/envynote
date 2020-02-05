import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { deleteNote } from "../store/action";
const useStyles = makeStyles(theme =>
  createStyles({
    menuItem: {
      padding: theme.spacing(0.7, 2),
      display: "block",
      minHeight: "auto",
      fontSize: "1.3rem"
    },
    menu: {
      padding: theme.spacing(0)
    }
  })
);

function NoteMenu({ deleteNote, horizontal, noteId, ...props }) {
  const { id: activeNotebook } = useParams();
  const closeSidebar = props.closeSidebar;
  const openSidebar = props.openSidebar;
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function redirectHandler() {
    handleClose();
    history.push(`/notebooks/${activeNotebook}/notes/${noteId}/edit`);
    if (closeSidebar) {
      closeSidebar();
    }
  }

  function deleteHandler(id) {
    handleClose();
    deleteNote(id);
    if (openSidebar) {
      openSidebar();
    }
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
        className={`note-menu ${classes.menu}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          className={classes.menuItem}
          onClick={() => redirectHandler()}
        >
          Edit
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={() => deleteHandler(noteId)}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

NoteMenu.defaultProps = {
  horizontal: false
};

export default connect(null, { deleteNote })(NoteMenu);
