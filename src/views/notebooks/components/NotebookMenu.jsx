import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteNotebook, editNotebook } from "../../../store/action";
import NotebookModal from "./NotebookModal";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    menuItem: {
      padding: theme.spacing(0.7, 2),
      display: "block",
      minHeight: "auto",
      fontSize: "1.3rem"
    },
    editMenu: {
      padding: theme.spacing(0),
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
  deleteNotebook,
  horizontal,
  inputVal: { id: notebookId, name: notebookName },
  editNotebook,
  history,
  user,
  openSidebar
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const modalProps = {
    title: "Edit",
    btnText: "Save",
    opener: "Edit",
    notebookId,
    notebookName,
    openerClass: "edit-btn",
    action: editNotebook
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    openSidebar();
  };

  function deleteHandler(id) {
    handleClose();
    const newActiveNotebookId = deleteNotebook(user, id);
    history.replace(`/notebooks/${newActiveNotebookId}`);
    openSidebar();
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
        className={`notebook-menu ${classes.menu}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} className={classes.editMenu}>
          <NotebookModal classProp={classes.menuItem} modalProps={modalProps} />
        </MenuItem>
        <MenuItem
          onClick={() => deleteHandler(notebookId)}
          className={classes.menuItem}
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
    user: state.user
  };
};

export default withRouter(
  connect(mapStateToProps, { deleteNotebook, editNotebook })(SimpleMenu)
);
