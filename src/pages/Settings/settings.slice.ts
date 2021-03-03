import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISettingsState {
  isBackgroundSoundPermitted: boolean,
  isMoveSoundPermitted: boolean,
  backgroundSoundVolume: number,
  moveSoundVolume: number,
}

const initialState: ISettingsState = {
  isBackgroundSoundPermitted: true,
  isMoveSoundPermitted: true,
  backgroundSoundVolume: 1,
  moveSoundVolume: 1,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings(state: ISettingsState, action: PayloadAction<ISettingsState>) {
      return { ...state, ...action.payload };
    }
  },
});

export const { updateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;