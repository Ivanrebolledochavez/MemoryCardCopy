import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Modal = ({ mainMessage, buttonText, onClick, backgrounImage }) => {
  return ReactDOM.createPortal(
    <div className={classes.backdrop}>
      <div className={classes["main-modal"]}>
        {/* <div className="main-message"> */}
        <img src={backgrounImage} alt="Card background" />
        <h2 className={classes.message}> {mainMessage}</h2>
        <button className={classes.button} onClick={onClick}>
          {buttonText}
        </button>
        {/* </div> */}
      </div>
    </div>,
    document.querySelector("#modal-container")
  );
};
export default Modal;
