import Card from "./Card";
import classes from "../CardDeck.module.css";
const CardDeck = ({ onCardClick, cardsData, flip }) => {
  const cards = cardsData.map((data) => (
    <Card
      flip={flip}
      data={data}
      key={data.id}
      onClick={(event) => onCardClick(event, data)}
    />
  ));
  return <div className={classes["card-container"]}>{cards}</div>;
};

export default CardDeck;
