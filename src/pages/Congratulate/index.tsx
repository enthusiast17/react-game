import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetArrow } from '../../components/Arrow/arrow.slice';
import { resetBoard } from '../../components/Board/board.slice';
import { RootState } from '../../store';
import { resetGame } from '../Game/game.slice';
import './index.scss';

const Congratulate = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.game);
  const sec = Math.floor(gameState.time % 60);
  const min = Math.floor(gameState.time / 60);

  const handleExit = () => {
    dispatch(resetBoard());
    dispatch(resetGame());
    dispatch(resetArrow());
  }

  return (
    <div className="congratulate">
      <div className="content">
        <h1 className="title">Good job</h1>
        <h2 className="subtitle">You solved {gameState.level} level in {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec} and got {gameState.score} score.</h2>
        <button
          className="btn btn-outline-success"
        >
          Go to the next level
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => handleExit()}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Congratulate;