import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetArrow, updateArrow } from '../../components/Arrow/arrow.slice';
import { resetBoard, updateBoard } from '../../components/Board/board.slice';
import levels from '../../constants';
import { storeLastGame } from '../../localstorage';
import { RootState } from '../../store';
import { resetGame, updateGame } from '../Game/game.slice';
import { goGamePage, goHomePage } from '../Home/home.slice';
import './index.scss';

const Congratulate = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.game);
  const sec = Math.floor(gameState.time % 60);
  const min = Math.floor(gameState.time / 60);

  const handleGoNextLevel = (nextLevel: number) => {
    const data = levels[nextLevel];
    dispatch(updateGame({
      isCodeRunning: false,
      level: nextLevel,
      score: gameState.score,
      time: 0,
      code: '// code here',
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
  }

  const handleExit = () => {
    if (levels[gameState.level + 1]) {
      handleGoNextLevel(gameState.level + 1);
      storeLastGame();
    }
    dispatch(resetBoard());
    dispatch(resetGame());
    dispatch(resetArrow());
    dispatch(goHomePage());
  }

  return (
    <div className="congratulate">
      <div className="content">
        <h1 className="title">Good job</h1>
        <h2 className="subtitle">You solved {gameState.level} level in {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}, got extra {levels[gameState.level].score} and total {gameState.score} score.</h2>
        {levels[gameState.level + 1] && (
          <button
            className="btn btn-outline-success"
            onClick={() => {
              handleGoNextLevel(gameState.level + 1);
              storeLastGame();
              dispatch(goGamePage());
            }}
          >
            Go to the next level
          </button>
        )}
        <button
          className="btn btn-outline-danger"
          onClick={handleExit}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Congratulate;