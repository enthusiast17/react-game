import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from '../components/Board/board.slice';
import arrowReducer from '../components/Arrow/arrow.slice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    arrow: arrowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
