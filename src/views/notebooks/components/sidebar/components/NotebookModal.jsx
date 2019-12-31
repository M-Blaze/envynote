import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2.5, 3.5),
    borderRadius: "4px",
    minWidth: "280px",
    maxWidth: "385px",
    width: "100%"
  },
  btn_edit: {
    padding: theme.spacing(0.7, 2.1)
  }
}));

function NotebookModal({
  modalProps: {
    title,
    btnText,
    opener,
    openerClass,
    action,
    notebookId,
    notebookName
  }
}) {
  const [inputVal, setInputVal] = useState("");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    handleClose();
    if (title === "Create") {
      action(inputVal);
    } else {
      action({
        id: notebookId,
        name: inputVal
      });
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function changeHandler(e) {
    setInputVal(e.target.value);
  }

  return (
    <div>
      <div onClick={handleOpen} className={openerClass}>
        {opener}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={`${classes.paper} paperFocus`}>
            <div className="form-block">
              <form onSubmit={handleSubmit}>
                <div className="form-title">
                  <h2>{title} Notebook</h2>
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    onChange={changeHandler}
                    defaultValue={notebookName ? notebookName : null}
                    placeholder="Enter Notebook Title"
                    autoFocus
                  />
                </div>
                <div className="button-group">
                  <button className="btn btn-primary" type="submit">
                    {btnText}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    notebooks: state.notebooks
  };
};

export default connect(mapStateToProps)(NotebookModal);
