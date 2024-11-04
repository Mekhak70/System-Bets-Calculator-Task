import { useSelector } from "react-redux";
import Calculator from "../calculator/calculator";
import System from "../system/system";
import TotalStake from "../totalStake/totalStake";
import styles from "./section.module.css";

const Section = () => {
  const { calculator } = useSelector((state) => state.betCalculator);

  return (
    <div className={styles.maincontent}>
      <div className={styles.content}>
        <System />
        <TotalStake />
      </div>
      {calculator && <Calculator />}
    </div>
  );
};
export default Section;
