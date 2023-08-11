import classes from "./Card.module.css";
const Card = ({ data, onClick }) => {
  return (
    <div className={classes.card} onClick={onClick}>
      <img src={data.image} alt="character from api" />
      {/* <h4>{data.name}</h4> */}
    </div>
  );
};
export default Card;
