import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { withRouter } from "react-router-dom";
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

function SimpleMenu({
  history,
  deleteNote,
  noteId,
  path,
  horizontal,
  ...props
}) {
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
    history.push(`${path}/edit`);
    props.closeSidebar();
  }

  function deleteHandler(id) {
    handleClose();
    deleteNote(id);
    props.openSidebar();
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

SimpleMenu.defaultProps = {
  horizontal: false
};

const mapStateToProps = state => {
  return {
    activeNote: state.activeNote
  };
};

export default withRouter(connect(mapStateToProps, { deleteNote })(SimpleMenu));
