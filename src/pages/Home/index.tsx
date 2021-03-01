import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Game from '../Game';
import { RootState } from '../../store';
import { updateGame } from '../Game/game.slice';
import './index.scss';

const Home = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.game);

  return (
    <>
      {!gameState.isPageOpen && (
        <div className="home">
          <div className="content">
            <h1 className="title">Show the path -&gt;</h1>
            <div className="btns">
              <button
                className="btn btn-outline-success"
                onClick={() => dispatch(updateGame({ ...gameState, isPageOpen: true }))}
              >
                Play game
              </button>
              <button className="btn btn-outline-primary">Score board</button>
              <button className="btn btn-outline-primary">Guide</button>
              <button className="btn btn-outline-primary">Settings</button>
            </div>
          </div>
        </div>
      )}

      {gameState.isPageOpen && (<Game />)}
    </>
  );
};

export default Home;
