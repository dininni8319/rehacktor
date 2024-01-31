import classes from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { createPortal } from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeModal}></div>;
};

const Overlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className="text-center">
        <FontAwesomeIcon icon={faSpinner} className="fa-1x text-main mx-1" />
        <h2> {props.title}</h2>
      </div>
      <p>{props.message}</p>
      <div className="mt-5 d-flex justify-content-between">
        <button
          className="btn btn-outline-info rounded-0 px-3"
          onClick={props.closeModal}
        >
          {props.declineMessage}
        </button>

        <button
          className="btn btn-outline-info rounded-0 px-3"
          onClick={props.action}
        >
          {props.confirmMessage}
        </button>
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop")
      )}
      {createPortal(<Overlay {...props} />, document.getElementById("overlay"))}
    </>
  );
};

export default Modal;

