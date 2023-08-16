import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div>
      <div className={classes.backdrop}></div>
      <div className={classes["main-modal"]}>Modal</div>
    </div>
  );
};
export default Modal;
