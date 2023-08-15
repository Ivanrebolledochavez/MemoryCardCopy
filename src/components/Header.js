import classes from "./Header.module.css";
const Header = ({ score, maxScore, level }) => {
  console.log(level);
  return (
    <header className={classes.header}>
      <h1>{`Your score : ${score}`}</h1>
      <h2>{`Max Score : ${maxScore}`}</h2>
      <h2>{`Level : ${level}`}</h2>
    </header>
  );
};

export default Header;
