import { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import getCardsData from "./helpers/getApiData";
import shuffleArray from "./helpers/shuffleArray";
import randomNumbersArray from "./helpers/randomNumbersArray";
import CardDeck from "./components/CardDeck";
import Modal from "./components/Modal";
import useSound from "use-sound";
import cardClickSound from "./music/cardClick.mp3";
import cardShufflingSound from "./music/cards-shuffling.mp3";
import winMessageSound from "./music/levelCompleted.mp3";
import gameOverSound from "./music/gameOver.mp3";

function App() {
  const [clickSound] = useSound(cardClickSound);
  const [shufflingSound] = useSound(cardShufflingSound);
  const [winSound] = useSound(winMessageSound);
  const [overSound] = useSound(gameOverSound);

  //add an empty array that will hold and array of objects to create the cards.
  const [cardsData, setCardsData] = useState([]);
  //add an empty array to hold the cards that had been clicked
  const [cardsClicked, setCardsClicked] = useState([]);

  const [getNewCards, setGetNewCards] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  const [level, setLevel] = useState(1);
  const numberOfCardsOnDeck = 6;
  const maxRandomNumber = 820;
  const [showGameOver, setShowGameOver] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);

  const [flip, setFlip] = useState(false);

  const resetNGetNewCards = () => {
    setCardsData([]);
    setCardsClicked([]);
    setGetNewCards(!getNewCards);
  };

  //Handle Restart after game over
  const handleRestartGame = () => {
    resetNGetNewCards();
    setShowGameOver(false);
    setScore(0);
    setLevel(1);
  };

  const handleWin = () => {
    resetNGetNewCards();
    setShowWinMessage(false);
    setLevel((prev) => prev + 1);
  };

  //get cards data from API
  useEffect(() => {
    const fethData = async () => {
      try {
        const charactersId = randomNumbersArray(
          numberOfCardsOnDeck,
          maxRandomNumber
        );
        const data = await getCardsData(charactersId);
        const shuffledCards = shuffleArray(data);
        shufflingSound();
        setCardsData(shuffledCards);
      } catch (error) {
        console.log(error);
      }
    };
    fethData();
  }, [getNewCards, shufflingSound]);

  useEffect(() => {
    if (score >= maxScore) {
      setMaxScore(score);
    }
  }, [score, maxScore]);

  const handleOnCardClick = (event, data) => {
    if (cardsClicked.some((clickedCard) => clickedCard.id === data.id)) {
      //show game over message
      setShowGameOver(true);
      overSound();
      return;
    }
    setScore(score + 1);
    // if (score >= maxScore) {
    //   setMaxScore(score);
    // }
    if (cardsClicked.length + 1 === cardsData.length) {
      //if all cards clicked on this deck of cards get new cards
      setShowWinMessage(true);
      winSound();
      return;
    } else {
      //active game
      //card flip
      setFlip(!flip);
      setTimeout(() => setFlip(false), 800);
      clickSound();
      setCardsClicked((prev) => [...prev, data]);
      //suffle existing card Deck
      setCardsData((prevCardsData) => shuffleArray(prevCardsData));
    }
  };
  return (
    <Fragment>
      <Header score={score} maxScore={maxScore} level={level} />

      <CardDeck
        onCardClick={handleOnCardClick}
        cardsData={cardsData}
        flip={flip}
      />

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
