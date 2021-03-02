import { createSlice } from "@reduxjs/toolkit";

interface IHomeState {
  currentPage: string,
}

const initialState: IHomeState = {
  currentPage: 'Home',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    goHomePage() {
      return { ...initialState };
    },
    goGamePage(state: IHomeState) {
      return { ...state, currentPage: 'Game' };
    },
    goCongratulatePage(state: IHomeState) {
      return { ...state, currentPage: 'Congratulate' };
    },
    goSettingsPage(state: IHomeState) {
      return { ...state, currentPage: 'Settings' };
    }
  },
});

export const { goHomePage, goGamePage, goCongratulatePage, goSettingsPage } = homeSlice.actions;

export default homeSlice.reducer;
