import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import levels from '../../constants';
import { IBox, ICoordinate } from '../../interfaces';

interface IBoardState {
  board: (IBox | undefined)[][],
  startCoordinate: ICoordinate,
  finishCoordinate: ICoordinate,
}

const initialState: IBoardState = {
  board: levels[0].board,
  startCoordinate: levels[0].startCoordinate,
  finishCoordinate: levels[0].finishCoordinate,
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: { 
    updateBoard(state: IBoardState, action: PayloadAction<IBoardState>) {
      return { ...state, ...action.payload };
    },
    updateBox(state: IBoardState, action: PayloadAction<IBox>) {
      return { ...state, board: state.board.map((row, i) => row.map((box, j) => {
        if (i === action.payload.coordinate.x && j === action.payload.coordinate.y) {
          return action.payload;
        }
        return box;
      })) };
    },
    resetBoard() {
      return initialState;
    },
  },
});

export const { updateBoard, updateBox, resetBoard } = boardSlice.actions;

export default boardSlice.reducer;
