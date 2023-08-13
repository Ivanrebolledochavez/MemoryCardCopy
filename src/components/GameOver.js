import classes from "../App.module.css";
const GameOver = ({ onClick }) => {
  return (
    <div className={classes["card-container"]}>
      <h1 className={classes.gameOver}>Game Over</h1>
      <button onClick={onClick}>Restart Game</button>
    </div>
  );
};

export default GameOver;
