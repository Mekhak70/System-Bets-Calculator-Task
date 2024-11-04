import { useDispatch, useSelector } from "react-redux";
import styles from "./system.module.css";
import { selectState } from "../../state/slices/betCalculatorSlice";
import { combinations, extractNumbers, generatePairs } from "../../utilities";
import { useEffect, useState } from "react";
const System = () => {
  let optionData = generatePairs();

  const result = useSelector((state) => state.betCalculator.value);
  const [point, setPoint] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setPoint(combinations(...extractNumbers(result)));
  }, [result]);

  return (
    <div className={styles.systemBigBox}>
      <div className={styles.systemBox}>
        <span className={styles.system}>System</span>
        <select
          className={styles.systemOpt}
          onChange={(e) => dispatch(selectState(e.target.value))}
        >
          <optgroup>
            {optionData.map((value, index) => {
              return (
                <option key={index}>
                  {value.to} from {value.from}
                </option>
              );
            })}
          </optgroup>
        </select>
      </div>

      <div className={styles.systemBox}>
        <span>
          {" "}
          A system {result} + undefined contains {point} combinations
        </span>
      </div>
    </div>
  );
};
export default System;
