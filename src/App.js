import { Fragment, useEffect, useState } from "react";
import classes from "./App.module.css";
import Header from "./components/Header";
import Card from "./components/Card";

function App() {
  //add an empty array that will hold and array of objects to create the cards.
  const [cardsData, setCardsData] = useState([]);
  //add an empty array to hold the cards that had been clicked
  const [cardsClicked, setCardsClicked] = useState([]);
  const [startGame, setStartGame] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [reStartGame, setReStartGame] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  const handleRestartGame = () => {
    setCardsData([]);
    setCardsClicked([]);
    setGameOver(false);
    setScore(0);
    setStartGame(true);
  };

  //make this a separate component
  const gameOverMessage = (
    <div>
      <h1 className={classes.gameOver}>Game Over</h1>
      <button onClick={handleRestartGame}>Restart Game</button>
    </div>
  );

  //function to shuffle an array of any length  using the Fisher-Yates Sorting Algorithm
  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  //function to get an array of random numbers
  //I need to update this  seems to work but it looks complicated the way I'm implementing this function
  const randomArray = () => {
    const randomNumbersArray = [];
    for (let i = 0; i < 5; i++) {
      let randomNumber = Math.floor(Math.random() * 48) + 1;
      //if random number is included on array
      if (randomNumbersArray.includes(randomNumber)) {
        randomNumber = randomNumber + randomNumber;
      }
      randomNumbersArray.push(randomNumber);
    }
    return randomNumbersArray;
  };

  //get cards data from API
  useEffect(() => {
    setReStartGame(false);
    const GetCardsData = async () => {
      const charactersId = randomArray();
      try {
        const results = await fetch(
          `https://rickandmortyapi.com/api/character/${charactersId}`
        );
        if (!results.ok) {
          throw new Error("something went wrong");
        }
        const data = await results.json();
        setCardsData(data);
        setCardsData((prev) => shuffle(prev));
      } catch (error) {
        console.log(error);
      }
    };
    GetCardsData();
  }, [reStartGame, startGame]);

  //render Max score when score changes
  useEffect(() => {
    setMaxScore((prevMAxScore) => Math.max(prevMAxScore, score));
  }, [score]);

  const handleOnClick = (event, data) => {
    //check if curent card is in previous cards clicked if not add this card to previous cards cliked
    //if currect card cliked is on the previus cards cliked array game over
    if (cardsClicked.length === cardsData.length - 1) {
      setScore(score + 1);
      console.log("if all  cards clicked  restartGame");
      setReStartGame(true);
      setCardsData([]);
      setCardsClicked([]);
      setGameOver(false);
      return;
    }
    if (cardsClicked.some((clickedCard) => clickedCard.id === data.id)) {
      setGameOver(true);
      setStartGame(false);
      setCardsData([]);
      setCardsClicked([]);

      return;
    } else {
      setCardsClicked((prev) => [...prev, data]);
      setScore(score + 1);
      //suffle card Deck
      setCardsData((prevCardsData) => shuffle(prevCardsData));
    }
  };
  return (
    <Fragment>
      <Header score={score} maxScore={maxScore} />
      <main className={classes["card-container"]}>
        {startGame &&
          cardsData.map((data) => (
            <Card
              data={data}
              key={data.id}
              onClick={(event) => handleOnClick(event, data)}
            />
          ))}
        {gameOver && gameOverMessage}
      </main>
    </Fragment>
  );
}

export default App;
