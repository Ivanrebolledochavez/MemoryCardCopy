import classes from "./Card.module.css";
const Card = ({ data, onClick }) => {
  return (
    <div className={classes.card} onClick={onClick}>
      <img src={data.image} alt="character from api" />
    </div>
  );
};
export default Card;
