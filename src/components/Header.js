import classes from "./Header.module.css";
const Header = ({ score, maxScore, level }) => {
  return (
    <header className={classes.header}>
      <div>
        <h1>{`Your score : ${score}`}</h1>
        <h2>{`Max Score : ${maxScore}`}</h2>
        <h2>{`Level : ${level}`}</h2>
      </div>
      <p>Click a card once to select it. Avoid clicking the same card twice.</p>
    </header>
  );
};

export default Header;
