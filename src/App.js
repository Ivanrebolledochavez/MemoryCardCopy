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
  const [gameIsOver, setGameIsOver] = useState(false);
  const [shuffleCards, setShuffleCards] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [cardsToRetrieve, setCardsToRetrieve] = useState(2);

  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showScore, setShowScore] = useState(false);

  const handleStartGame = () => {
    setShowScore(true);
    setGameIsActive(true);
    setShowStartScreen(false);
  };

  //Handle Restart after game over
  const handleRestartGame = () => {
    setCardsData([]);
    setCardsClicked([]);
    setGameIsActive(true);
    setGameIsOver(false);
    setScore(0);
    setShuffleCards(!shuffleCards);
    setLevel(1);
  };

  //get cards data from API
  useEffect(() => {
    const fethData = async () => {
      try {
        const charactersId = randomNumbersArray(cardsToRetrieve);
        const data = await getCardsData(charactersId);
        const shuffledCards = shuffleArray(data);
        setCardsData(shuffledCards);
      } catch (error) {
        console.log(error);
      }
    };
    fethData();
  }, [shuffleCards, cardsToRetrieve]);

  //render Max score when score changes and current level
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
      setCardsToRetrieve((prev) => prev * 2);
      setLevel((prev) => prev + 1);
      return;
    }
    if (cardsClicked.some((clickedCard) => clickedCard.id === data.id)) {
      //show game over message
      setGameIsOver(true);
      setGameIsActive(false);
      setCardsToRetrieve(2);
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
      {showScore && <Header score={score} maxScore={maxScore} level={level} />}
      {showStartScreen && <GameStart onClick={handleStartGame} />}
      {gameIsActive && (
        <CardDeck onCardClick={handleOnCardClick} cardsData={cardsData} />
      )}
      {gameIsOver && <GameOver onClick={handleRestartGame} />}
    </Fragment>
  );
}

export default App;
