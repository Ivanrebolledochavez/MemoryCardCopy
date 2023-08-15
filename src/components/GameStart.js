import classes from "../App.module.css";
const GameStart = ({ onClick }) => {
  return (
    <div className={classes["card-container"]}>
      <h1 className={classes.gameStart}>Start Game</h1>
      <button onClick={onClick}>Start Game</button>
    </div>
  );
};

export default GameStart;
