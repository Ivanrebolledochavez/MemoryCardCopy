import classes from "./Card.module.css";
import ReactCardFlip from "react-card-flip";
import backImage from "../images/back.jpeg";
const Card = ({ data, onClick, flip }) => {
  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <div className={classes.card} onClick={onClick}>
        <img src={data.image} alt="character from api" />
      </div>
      <div className={classes.card}>
        <img src={backImage} alt="back of card" />
      </div>
    </ReactCardFlip>
  );
};
export default Card;
