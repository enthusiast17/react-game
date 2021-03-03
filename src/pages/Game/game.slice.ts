import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGameState {
  isCodeRunning: boolean,
  level: number,
  score: number,
  time: number,
  code: string,
}

const initialState: IGameState = {
  isCodeRunning: false,
  level: 0,
  score: 0,
  time: 0,
  code: '// code here',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGame(state: IGameState, action: PayloadAction<IGameState>) {
      return { ...state, ...action.payload };
    },
    countUpTime(state: IGameState) {
      return { ...state, time: state.time + 1 };
    },
    resetGame() {
      return { ...initialState };
    },
  },
});

export const { updateGame, countUpTime, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
