import { Fragment, useEffect, useState } from "react";
// import classes from "./App.module.css";
import Header from "./components/Header";
import getCardsData from "./helpers/getApiData";
import shuffleArray from "./helpers/shuffleArray";
import randomNumbersArray from "./helpers/randomNumbersArray";
import CardDeck from "./components/CardDeck";
import Modal from "./components/Modal";

function App() {
  //add an empty array that will hold and array of objects to create the cards.
  const [cardsData, setCardsData] = useState([]);
  //add an empty array to hold the cards that had been clicked
  const [cardsClicked, setCardsClicked] = useState([]);

  const [gameIsActive, setGameIsActive] = useState(true);
  const [shuffleCards, setShuffleCards] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [level, setLevel] = useState(1);
  //maybe chage this name to number of cards?
  const [cardsToRetrieve, setCardsToRetrieve] = useState(4);
  const maxRandomNumber = 820;
  const [showGameOver, setShowGameOver] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);

  //Handle Restart after game over
  const handleRestartGame = () => {
    setCardsData([]);
    setCardsClicked([]);
    setGameIsActive(true);
    setShowGameOver(false);
    setScore(0);
    setLevel(1);
    setCardsToRetrieve(4);
    setShuffleCards(!shuffleCards);
  };

  const handleWin = () => {
    setShowWinMessage(false);
  };

  //get cards data from API
  useEffect(() => {
    const fethData = async () => {
      try {
        const charactersId = randomNumbersArray(
          cardsToRetrieve,
          maxRandomNumber
        );
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
    if (cardsClicked.some((clickedCard) => clickedCard.id === data.id)) {
      //show game over message
      setShowGameOver(true);
      return;
    }

    if (cardsClicked.length + 1 === cardsData.length) {
      //if all cards clicked on this deck of cards get new cards
      setShowWinMessage(true);
      setScore(score + 1);
      setCardsData([]);
      setCardsClicked([]);
      setCardsToRetrieve((prev) => prev + 4);
      setLevel((prev) => prev + 1);
      setShuffleCards(!shuffleCards);
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
      {gameIsActive && (
        <CardDeck onCardClick={handleOnCardClick} cardsData={cardsData} />
      )}
      {showGameOver && (
        <Modal
          mainMessage="GameOver"
          buttonText="restart"
          onClick={handleRestartGame}
        />
      )}
      {showWinMessage && (
        <Modal
          mainMessage="Congratulations!! you Win"
          buttonText="continue"
          onClick={handleWin}
        />
      )}
    </Fragment>
  );
}

export default App;
