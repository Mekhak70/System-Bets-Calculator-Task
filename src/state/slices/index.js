import { combineReducers } from "redux";
import betCalculatorReducer from "./betCalculatorSlice";

const rootReducer = combineReducers({
  betCalculator: betCalculatorReducer,
});

export default rootReducer;
