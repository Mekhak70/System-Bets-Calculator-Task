import { createSlice } from "@reduxjs/toolkit";

const betCalculatorSlice = createSlice({
  name: "betCalculator",

  initialState: {
    calculator: false,
    value: "2 from 3",
    totalStake: "100.00",
    OddsData: [
      { name: "Odds1", status: "Correct", factor: "2.00" },
      { name: "Odds2", status: "Correct", factor: "2.00" },
      { name: "Odds3", status: "Correct", factor: "2.00" },
    ],
  },
  reducers: {
    turnOnCalc: (state, action) => {
      state.calculator = action.payload;
    },
    changeState: (state, action) => {
      state.OddsData = action.payload;
    },
    selectState: (state, action) => {
      state.value = action.payload;
    },
    totalStakeChange: (state, action) => {
      state.totalStake = action.payload;
    },
    computeResults: (state, action) => {
      if (action.payload.changeFactor) {
        state.OddsData.find(
          (val) => val.name === action.payload.keyState
        ).factor = action.payload.factor;
      } else {
        state.OddsData.find(
          (val) => val.name === action.payload.keyState
        ).status = action.payload.status;
      }
    },
  },
});

export const {
  selectState,
  totalStakeChange,
  computeResults,
  changeState,
  turnOnCalc,
} = betCalculatorSlice.actions;
export default betCalculatorSlice.reducer;
