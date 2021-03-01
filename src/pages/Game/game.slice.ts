import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGameState {
  isPageOpen: boolean,
  level: number,
  code: string,
}

const initialState: IGameState = {
  isPageOpen: false,
  level: 0,
  code: '// code here',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGame(state: IGameState, action: PayloadAction<IGameState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateGame } = gameSlice.actions;

export default gameSlice.reducer;
