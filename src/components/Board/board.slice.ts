import { createSlice } from "@reduxjs/toolkit";
import levels from "../../constants";
import { IBox, ICoordinate } from "../../interfaces";

interface IBoardState {
  level: number,
  board: IBox[][],
  startCoordinate: ICoordinate,
  finishCoordinate: ICoordinate,
}

const initialState: IBoardState = {
  level: 0,
  board: levels[0].board,
  startCoordinate: levels[0].startCoordinate,
  finishCoordinate: levels[0].finishCoordinate,
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: { },
});

export default boardSlice.reducer;