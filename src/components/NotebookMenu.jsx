import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteNotebook, editNotebook } from "../store/action";
import NotebookModal from "../views/notebooks/components/Sidebar/components/NotebookModal";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    menuItem: {
      padding: theme.spacing(0),
      display: "block"
    }
  })
);

function SimpleMenu({
  deleteNotebook,
  horizontal,
  activeNotebook,
  inputVal: { id: notebookId, name: notebookName },
  editNotebook,
  history
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
  };

  function deleteHandler(id) {
    handleClose();
    deleteNotebook(id);
    history.replace(`/notebooks/${activeNotebook.id}`);
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
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <NotebookModal modalProps={modalProps} />
        </MenuItem>
        <MenuItem onClick={() => deleteHandler(notebookId)}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

SimpleMenu.defaultProps = {
  horizontal: false
};

const mapStateToProps = state => {
  return {
    activeNotebook: state.activeNotebook
  };
};

export default withRouter(
  connect(mapStateToProps, { deleteNotebook, editNotebook })(SimpleMenu)
);
