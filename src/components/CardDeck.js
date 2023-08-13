import Card from "./Card";
import classes from "../App.module.css";
const CardDeck = ({ onCardClick, cardsData }) => {
  const cards = cardsData.map((data) => (
    <Card
      data={data}
      key={data.id}
      onClick={(event) => onCardClick(event, data)}
    />
  ));
  return <div className={classes["card-container"]}>{cards}</div>;
};

export default CardDeck;
