import { useSelector } from "react-redux";
import styles from "./calculator.module.css";
import {
  extractNumbers,
  getFactorData,
  getOddsData,
  getSets,
  winSumArray,
} from "../../utilities";
import { useEffect, useState } from "react";

const Calculator = () => {
  const {
    value: result,
    totalStake,
    OddsData,
  } = useSelector((state) => state.betCalculator);
  const [data, setData] = useState([]);
  const [oddsData, setOddsData] = useState([]);
  const [winning, setWinning] = useState(null);
  useEffect(() => {
    setData(getSets(getFactorData(OddsData), 0, extractNumbers(result)[0]));
    setOddsData(
      getOddsData(
        getSets(getFactorData(OddsData), 0, extractNumbers(result)[0])
      )
    );
  }, [OddsData]);

  useEffect(() => {
    setWinning(winSumArray(oddsData, totalStake, data.length));
  }, [data, totalStake]);

  return (
    <div className={styles.content}>
      <div className={styles.title}>System Bets Calculator</div>
      <div className={styles.calculatorInfo}>
        <div className={styles.calculatorHeader}>
          <div className={styles.box1} />
          <div className={styles.box2}>Combinations </div>
          <div className={styles.box3}>Odds </div>
          <div className={styles.box4}>Winnings</div>
        </div>
        <div className={styles.calculatoContent}>
          <table className={styles.firstTable}>
          <tbody>
            <tr className={styles.firstTr}>
              {data.map((_, index) => {
                return (
                  <th key={index} className={styles.firstTh}>
                    {index + 1}
                  </th>
                );
              })}
            </tr>
            </tbody>
          </table>
          <table className={styles.secondTable}>
            <tbody>
            {data.map((arr, index) => {
              return (
                <tr key={index}>
                  {arr.map((value, id) => {
                    return (
                      <th
                        key={id}
                        className={styles.secondTh}
                        style={{
                          color:
                            value.status === "Incorrect"
                              ? "red"
                              : value.status === "Void"
                              ? "#eeee00"
                              : "#cccccc",
                        }}
                      >
                        {value.factor}
                      </th>
                    );
                  })}
                </tr>

              );
            })}
            </tbody>
          </table>
          <table className={styles.firstTable}>
            <tbody>
            <tr className={styles.firstTr}>
              {oddsData.map((value, index) => {
                return (
                  <th key={index} className={styles.firstTh}>
                    {value}
                  </th>
                );
              })}
            </tr>
            </tbody>
          </table>
          <table className={styles.winningsTable}>
            <tbody>
            <tr className={styles.firstTr}>
              {oddsData.map((value, index) => {
                return (
                  <th key={index} className={styles.firstTh}>
                    {Math.round(((totalStake * value) / data.length) * 100) /
                      100}
                  </th>
                );
              })}
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.stakeInfo}>
        <span>Winnings: {Math.round(winning * 100) / 100}</span>
        <span>Stake: {totalStake}</span>
        <span>
          Stake per combination:{" "}
          {Math.round((totalStake / data.length) * 100) / 100}
        </span>
      </div>
    </div>
  );
};
export default Calculator;
