import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import AddIcon from "@material-ui/icons/Add";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import { addNotebook } from "../../../../../store/action";

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
  }
}));

function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.addNotebook(inputRef.current.value);
    handleClose();
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen} className="icon-holder">
        <AddIcon />
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
                  <h2>Create Notebook</h2>
                </div>
                <div className="input-group">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter Notebook Title"
                  />
                </div>
                <div className="button-group">
                  <button className="btn btn-primary" type="submit">
                    Add Notebook
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

export default connect(mapStateToProps, { addNotebook })(TransitionsModal);
