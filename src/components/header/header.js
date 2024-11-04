import styles from "./header.module.css";
import logo from "../../LSbetLogo.png";

const Header = () => {
  return (
    <div className={styles.logoBox}>
      <img src={logo} />
      <span >System Bets Calculator</span>
    </div>
  );
};
export default Header;
