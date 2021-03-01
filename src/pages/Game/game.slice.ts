import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGameState {
  isPageOpen: boolean,
  isCodeRunning: boolean,
  isPlayerSolved: boolean,
  level: number,
  score: number,
  time: number,
  code: string,
}

const initialState: IGameState = {
  isPageOpen: false,
  isCodeRunning: false,
  isPlayerSolved: false,
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
    }
  },
});

export const { updateGame, countUpTime } = gameSlice.actions;

export default gameSlice.reducer;
