import { useDispatch, useSelector } from "react-redux";
import styles from "./totalStake.module.css";
import { useEffect, useState } from "react";
import {
  combinations,
  createArrayWithLength,
  extractNumbers,
} from "../../utilities";
import {
  changeState,
  computeResults,
  totalStakeChange,
  turnOnCalc,
} from "../../state/slices/betCalculatorSlice";

const TotalStake = () => {
  const {
    value: result,
    totalStake,
    OddsData,
  } = useSelector((state) => state.betCalculator);

  const [point, setPoint] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setPoint(combinations(...extractNumbers(result)));

    dispatch(changeState(createArrayWithLength(extractNumbers(result)[1])));
    dispatch(turnOnCalc(false));
  }, [result]);

  return (
    <div className={styles.totalStakeBox}>
      <div className={styles.box}>
        <div className={styles.totalStakeHeader}>
          <span>Total Stake</span>
        </div>
        <div className={styles.totalStakeHeader}>
          <input
            type="number"
            value={totalStake}
            onChange={(e) => dispatch(totalStakeChange(e.target.value))}
          />
          <span>EUR</span>
        </div>
      </div>
      <div className={styles.middlebox}>
        <div className={styles.statusBar}>
          <span>Correct</span>
          <span>Incorrect</span>
          <span>Void</span>
        </div>
        <div className={styles.factorBigBox}>
          {OddsData.map((_, value) => {
            return (
              <div key={value} className={styles.factorBox}>
                <div className={styles.factorBoxFirst}>
                  {`Odds ${value + 1}`}
                </div>
                <div className={styles.factorBoxFirst}>
                  <input
                    type="number"
                    value={
                      OddsData.find((val) => val.name === `Odds${value + 1}`)
                        ?.factor
                    }
                    onChange={(e) => {
                      dispatch(
                        computeResults({
                          changeFactor: true,
                          keyState: `Odds${value + 1}`,
                          factor: e.target.value,
                        })
                      );
                    }}
                  />
                  <div
                    className={styles.round}
                    onClick={() =>
                      dispatch(
                        computeResults({
                          changeFactor: false,
                          keyState: `Odds${value + 1}`,
                          status: "Correct",
                        })
                      )
                    }
                  >
                    {OddsData.find(
                      (val) =>
                        val.name === `Odds${value + 1}` &&
                        val?.status === "Correct"
                    ) && <div className={styles.roundGreen} />}
                  </div>
                  <div
                    className={styles.round}
                    onClick={() =>
                      dispatch(
                        computeResults({
                          keyState: `Odds${value + 1}`,
                          status: "Incorrect",
                        })
                      )
                    }
                  >
                    {OddsData.find(
                      (val) =>
                        val.name === `Odds${value + 1}` &&
                        val?.status === "Incorrect"
                    ) && <div className={styles.roundRed} />}
                  </div>
                  <div
                    className={styles.round}
                    onClick={() =>
                      dispatch(
                        computeResults({
                          keyState: `Odds${value + 1}`,
                          status: "Void",
                        })
                      )
                    }
                  >
                    {OddsData.find(
                      (val) =>
                        val.name === `Odds${value + 1}` &&
                        val?.status === "Void"
                    ) && <div className={styles.roundGold} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.calcBox}>
        <div
          className={styles.calcButton}
          onClick={() => {
            dispatch(turnOnCalc(true));
          }}
        >
          Compute
        </div>
      </div>
    </div>
  );
};
export default TotalStake;
