import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from '../components/Board/board.slice';
import arrowReducer from '../components/Arrow/arrow.slice';
import gameReducer from '../pages/Game/game.slice';
import homeReducer from '../pages/Home/home.slice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    arrow: arrowReducer,
    game: gameReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
