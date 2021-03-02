import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Game from '../Game';
import { RootState, store } from '../../store';
import { updateGame } from '../Game/game.slice';
import './index.scss';
import Congratulate from '../Congratulate';

const Home = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.game);

  return (
    <>
      {!gameState.isPageOpen && !gameState.isPlayerSolved && (
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

      {gameState.isPageOpen && !gameState.isPlayerSolved && (<Game />)}

      {!gameState.isPageOpen && gameState.isPlayerSolved && (<Congratulate />)}
    </>
  );
};

export default Home;
