import { Fragment, useEffect, useState } from "react";
import classes from "./App.module.css";
import Header from "./components/Header";
import Card from "./components/Card";
import GameOver from "./components/GameOver";
import getCardsData from "./helpers/getApiData";
import shuffleArray from "./helpers/shuffleArray";
import randomNumbersArray from "./helpers/randomNumbersArray";

function App() {
  //add an empty array that will hold and array of objects to create the cards.
  const [cardsData, setCardsData] = useState([]);
  //add an empty array to hold the cards that had been clicked
  const [cardsClicked, setCardsClicked] = useState([]);

  const [gameIsActive, setGameIsActive] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [shuffleCards, setShuffleCards] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  //Handle Restart after game over
  const handleRestartGame = () => {
    setCardsData([]);
    setCardsClicked([]);
    setGameIsActive(true);
    setGameOver(false);
    setScore(0);
    setShuffleCards(!shuffleCards);
  };

  //get cards data from API
  useEffect(() => {
    const fethData = async () => {
      try {
        const charactersId = randomNumbersArray();
        const data = await getCardsData(charactersId);
        const shuffledCards = shuffleArray(data);
        setCardsData(shuffledCards);
      } catch (error) {
        console.log(error);
      }
    };
    fethData();
  }, [shuffleCards]);

  //render Max score when score changes
  useEffect(() => {
    setMaxScore((prevMAxScore) => Math.max(prevMAxScore, score));
  }, [score]);

  const handleOnCardClick = (event, data) => {
    if (cardsClicked.length + 1 === cardsData.length) {
      //if all cards clicked on this deck of cards get new cards
      setScore(score + 1);
      setCardsData([]);
      setCardsClicked([]);
      setShuffleCards(!shuffleCards);
      return;
    }
    if (cardsClicked.some((clickedCard) => clickedCard.id === data.id)) {
      //show game over message
      setGameOver(true);
      setGameIsActive(false);
      return;
    } else {
      //active game
      setCardsClicked((prev) => [...prev, data]);
      setScore(score + 1);
      //suffle existing card Deck
      setCardsData((prevCardsData) => shuffleArray(prevCardsData));
    }
  };
  return (
    <Fragment>
      <Header score={score} maxScore={maxScore} />
      <main className={classes["card-container"]}>
        {gameIsActive &&
          cardsData.map((data) => (
            <Card
              data={data}
              key={data.id}
              onClick={(event) => handleOnCardClick(event, data)}
            />
          ))}
        {gameOver && <GameOver onClick={handleRestartGame} />}
      </main>
    </Fragment>
  );
}

export default App;
