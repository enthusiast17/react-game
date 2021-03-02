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
      const box = action.payload;
      const copyState = { ...state };
      copyState.board[box.coordinate.x][box.coordinate.y] = box;
      return copyState;
    },
    resetBoard() {
      return initialState;
    },
  },
});

export const { resetBoard } = boardSlice.actions;

export default boardSlice.reducer;
