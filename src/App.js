import { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import CardDeck from "./components/CardDeck";
import Modal from "./components/Modal";
import getCardsData from "./helpers/getApiData";
import shuffleArray from "./helpers/shuffleArray";
import randomNumbersArray from "./helpers/randomNumbersArray";
import useSound from "use-sound";
import cardClickSound from "./music/cardClick.mp3";
import cardShufflingSound from "./music/cards-shuffling.mp3";
import winMessageSound from "./music/levelCompleted.mp3";
import gameOverSound from "./music/gameOver.mp3";

function App() {
  //testing pull request
  const test = 0;
  const [clickSound] = useSound(cardClickSound);
  const [shufflingSound] = useSound(cardShufflingSound);
  const [winSound] = useSound(winMessageSound);
  const [overSound] = useSound(gameOverSound);

  //add an empty array that will hold and array of objects to create the cards.
  const [cardsData, setCardsData] = useState([]);
  //add an empty array to hold the cards that had been clicked
  const [cardsClicked, setCardsClicked] = useState([]);

  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  const [level, setLevel] = useState(1);
  const numberOfCardsOnDeck = 6;
  const maxRandomNumber = 820;
  const [showGameOver, setShowGameOver] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const flipDelay = 800;
  const [flip, setFlip] = useState(false);

  //get data from api
  const fetchData = async () => {
    try {
      const charactersId = randomNumbersArray(
        numberOfCardsOnDeck,
        maxRandomNumber
      );
      const data = await getCardsData(charactersId);
      const shuffledCards = shuffleArray(data);
      setCardsData(shuffledCards);
    } catch (error) {
      console.log(error);
    }
  };

  // reset arrays containing data for cards and get new data
  const resetNGetNewCards = () => {
    setCardsData([]);
    setCardsClicked([]);
    fetchData();
    shufflingSound();
  };

  //update score and max score
  const updateScores = () => {
    setScore((prevScore) => {
      const updatedScore = prevScore + 1;
      if (updatedScore >= maxScore) {
        setMaxScore(updatedScore);
      }
      return updatedScore;
    });
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
    fetchData();
  }, []);

  const handleOnCardClick = (event, data) => {
    if (cardsClicked.some((clickedCard) => clickedCard.id === data.id)) {
      //show game over message
      setShowGameOver(true);
      overSound();
      return;
    }

    updateScores();

    if (cardsClicked.length + 1 === cardsData.length) {
      //if all cards clicked on this deck of cards get new cards
      setShowWinMessage(true);
      winSound();
      return;
    } else {
      //this code runs when  game is active not double clicks or win
      //card flip
      setFlip(!flip);
      setTimeout(() => setFlip(false), flipDelay);
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
