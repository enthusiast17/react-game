import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { goHomePage } from '../Home/home.slice';
import './index.scss';
import { updateSettings } from './settings.slice';

const Settings = () => {
  const dispatch = useDispatch();
  const settingsState = useSelector((state: RootState) => state.settings);

  return (
    <div className="settings">
      <div className="content">
        <div className="option">
          <span className="option-name">Background music</span>
          {settingsState.isBackgroundSoundPermitted && (
            <button className="btn btn-outline-primary" onClick={() => {
              dispatch(updateSettings({ ...settingsState, isBackgroundSoundPermitted: false }))
            }}>On</button>
          )}
          {!settingsState.isBackgroundSoundPermitted && (
            <button className="btn btn-outline-danger" onClick={() => {
              dispatch(updateSettings({ ...settingsState, isBackgroundSoundPermitted: true }))
            }}>Off</button>
          )}
        </div>
        <div className="option">
        <span className="option-name">Background volume</span>
          <div className="option-volume">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                if (settingsState.backgroundSoundVolume === 0) return;
                dispatch(updateSettings({
                  ...settingsState,
                  backgroundSoundVolume: parseFloat((settingsState.backgroundSoundVolume - 0.1).toFixed(1)),
                }))
              }}
            >-</button>
            <span>{settingsState.backgroundSoundVolume}</span>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                if (settingsState.backgroundSoundVolume === 1) return;
                dispatch(updateSettings({
                  ...settingsState,
                  backgroundSoundVolume: parseFloat((settingsState.backgroundSoundVolume + 0.1).toFixed(1)),
                }))
              }}
            >+</button>
          </div>
        </div>
        <div className="option">
          <span className="option-name">Move sounds</span>
          {settingsState.isMoveSoundPermitted && (
            <button className="btn btn-outline-primary" onClick={() => {
              dispatch(updateSettings({ ...settingsState, isMoveSoundPermitted: false }))
            }}>On</button>
          )}
          {!settingsState.isMoveSoundPermitted && (
            <button className="btn btn-outline-danger" onClick={() => {
              dispatch(updateSettings({ ...settingsState, isMoveSoundPermitted: true }))
            }}>Off</button>
          )}  
        </div>
        <div className="option">
        <span className="option-name">Move sound volume</span>
        <div className="option-volume">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                if (settingsState.moveSoundVolume === 0) return;
                dispatch(updateSettings({
                  ...settingsState,
                  moveSoundVolume: parseFloat((settingsState.moveSoundVolume - 0.1).toFixed(1)),
                }))
              }}
            >-</button>
            <span>{settingsState.moveSoundVolume}</span>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                if (settingsState.moveSoundVolume === 1) return;
                dispatch(updateSettings({
                  ...settingsState,
                  moveSoundVolume: parseFloat((settingsState.moveSoundVolume + 0.1).toFixed(1)),
                }))
              }}
            >+</button>
          </div>
        </div>
        <button
          className="btn btn-outline-danger"
          onClick={() => dispatch(goHomePage())}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Settings;
