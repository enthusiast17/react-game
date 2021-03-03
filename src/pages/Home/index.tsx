import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Game from '../Game';
import { RootState, store } from '../../store';
import Congratulate from '../Congratulate';
import Settings from '../Settings';
import { goGamePage, goGuidePage, goSettingsPage, goStatisticsPage } from './home.slice';
import { useHotkeys } from 'react-hotkeys-hook';
import { getLastGame, isLastGameExists } from '../../localstorage';
import { resetArrow, updateArrow } from '../../components/Arrow/arrow.slice';
import { resetBoard, updateBoard } from '../../components/Board/board.slice';
import levels from '../../constants';
import { resetGame, updateGame } from '../Game/game.slice';
import Statistics from '../Statistics';
import useSound from 'use-sound';
import './index.scss';
import Guide from '../Guide';
import Footer from '../../components/Footer';

const Home = () => {
  const dispatch = useDispatch();
  const homeState = useSelector((state: RootState) => state.home);

  useHotkeys('ctrl+f1', () => {
    if (store.getState().home.currentPage !== 'Home') return;
    dispatch(goGamePage())
  });

  const routes: { [key: string]: ReactNode } = {
    'Home': (
      <div className="home">
        <div className="content">
          <h1 className="title">Show the path -&gt;</h1>
          <div className="btns">
            <button
              className="btn btn-outline-success"
              onClick={() => {
                dispatch(resetGame());
                dispatch(resetBoard());
                dispatch(resetArrow());
                dispatch(goGamePage());
              }}
            >
              New game
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                if (!isLastGameExists()) return;
                const lastGame = getLastGame();
                const data = levels[lastGame.level];
                dispatch(updateGame({
                  isCodeRunning: false,
                  level: lastGame.level,
                  score: lastGame.score,
                  time: 0,
                  code: lastGame.code,
                }));
                dispatch(updateBoard({
                  board: data.board,
                  startCoordinate: data.startCoordinate,
                  finishCoordinate: data.finishCoordinate,
                }));
                dispatch(updateArrow({
                  degree: data.arrow.degree,
                  coordinate: data.arrow.coordinate,
                }));
                dispatch(goGamePage());
              }}
            >
              Continue last game
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => dispatch(goStatisticsPage())}
            >
              Statistics
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => dispatch(goGuidePage())}
            >
              Guide
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                dispatch(goSettingsPage());
              }}
            >
              Settings
            </button>
          </div>
          <Footer />
        </div>
      </div>
    ),
    'Game': (<Game />),
    'Congratulate': (<Congratulate />),
    'Settings': (<Settings />),
    'Statistics': (<Statistics />),
    'Guide': (<Guide />)
  }

  return (
    <>
      {(routes[homeState.currentPage])}
    </>
  );
};

export default Home;
