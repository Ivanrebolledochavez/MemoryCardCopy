import { Fragment, useEffect, useState } from "react";
// import classes from "./App.module.css";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import getCardsData from "./helpers/getApiData";
import shuffleArray from "./helpers/shuffleArray";
import randomNumbersArray from "./helpers/randomNumbersArray";
import CardDeck from "./components/CardDeck";
import GameStart from "./components/GameStart";

function App() {
  //add an empty array that will hold and array of objects to create the cards.
  const [cardsData, setCardsData] = useState([]);
  //add an empty array to hold the cards that had been clicked
  const [cardsClicked, setCardsClicked] = useState([]);

  const [gameIsActive, setGameIsActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shuffleCards, setShuffleCards] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [level, setLevel] = useState(0);

  const [ShowStartGame, setShowStartGame] = useState(true);

  const handleStartGame = () => {
    setGameIsActive(true);
    setShowStartGame(false);
    setLevel(1);
  };

  //Handle Restart after game over
  const handleRestartGame = () => {
    setCardsData([]);
    setCardsClicked([]);
    setGameIsActive(true);
    setGameOver(false);
    setScore(0);
    setShuffleCards(!shuffleCards);
    setLevel(1);
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

  //render Max score when score changes and current level
  useEffect(() => {
    const numberOfCards = 5;
    setMaxScore((prevMAxScore) => Math.max(prevMAxScore, score));
    if (score % numberOfCards === 0 && score !== 0) {
      // setLevel((numberOfCards + 5) / numberOfCards);
      setLevel((prev) => prev + 1);
    }
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
      <Header score={score} maxScore={maxScore} level={level} />
      {ShowStartGame && <GameStart onClick={handleStartGame} />}
      {gameIsActive && (
        <CardDeck onCardClick={handleOnCardClick} cardsData={cardsData} />
      )}
      {gameOver && <GameOver onClick={handleRestartGame} />}
    </Fragment>
  );
}

export default App;
