import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Modal = ({ mainMessage, buttonText, onClick }) => {
  return ReactDOM.createPortal(
    <div className={classes.backdrop}>
      <div className={classes["main-modal"]}>
        <div className="main-message">
          <h2 className={classes.message}> {mainMessage}</h2>
          <button className={classes.button} onClick={onClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal-container")
  );
};
export default Modal;
