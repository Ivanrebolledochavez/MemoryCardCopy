import classes from "./Header.module.css";
const Header = ({ score }) => {
  return (
    <header className={classes.header}>
      <h1>{`Your score :${score}`}</h1>
    </header>
  );
};

export default Header;
