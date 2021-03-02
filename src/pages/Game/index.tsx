import React, { useEffect } from 'react';
import AceEditor from 'react-ace';
import { useDispatch, useSelector } from 'react-redux';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import { useHotkeys } from 'react-hotkeys-hook';
import { RootState, store } from '../../store';
import { countUpTime, resetGame, updateGame } from './game.slice';
import Board from '../../components/Board';
import Timer from '../../components/Timer';
import Score from '../../components/Score';
import { ICoordinate } from '../../interfaces';
import { resetArrow, updateArrow } from '../../components/Arrow/arrow.slice';
import { goCongratulatePage, goHomePage } from '../Home/home.slice';
import levels from '../../constants';
import './index.scss';
import { resetBoard, updateBoard } from '../../components/Board/board.slice';

let timer: NodeJS.Timeout;

const Game = () => {
  const dispatch = useDispatch();
  const boardState = useSelector((state: RootState) => state.board);
  const gameState = useSelector((state: RootState) => state.game);

  const handleExit = (): void => {
    dispatch(resetGame());
    dispatch(resetBoard());
    dispatch(resetArrow());
    dispatch(goHomePage());
  };

  const handleReset = (): void => {
    const data = levels[gameState.level];
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

  const handleStop = (): void => {
    dispatch(updateGame({ ...store.getState().game, isCodeRunning: false }));
  };

  useHotkeys('ctrl+f6', handleExit);

  useHotkeys('ctrl+f7', handleStop);

  useHotkeys('ctrl+f8', () => {
    dispatch(updateGame({ ...store.getState().game, code: '// code here' }));
  });

  useHotkeys('ctrl+f9', () => {
    dispatch(updateGame({ ...store.getState().game, code: levels[gameState.level].solution }));
  });

  useHotkeys('ctrl+f10', handleReset);

  useEffect(() => {
    timer = setInterval(() => dispatch(countUpTime()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleCodeOnChange = (value: string) => dispatch(updateGame({ ...gameState, code: value }));

  const isFinish = (coordinate: ICoordinate): boolean => {
    return JSON.stringify(coordinate) === JSON.stringify(boardState.finishCoordinate);
  }
  
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const move = (coordinate: ICoordinate, degree: number): ICoordinate => {
    const nextCoordinate = { ...coordinate };
    switch (degree) {
      case 90:
        nextCoordinate.x -= 1;
        break;
      case 180:
        nextCoordinate.y -= 1;
        break;
      case 270:
        nextCoordinate.x += 1;
        break;
      default:
        nextCoordinate.y += 1;
        break;
    };
    return nextCoordinate;
  }

  const goForward = (): void => {
    const state = store.getState().arrow;
    switch (state.degree) {
      case 90:
        dispatch(updateArrow({ ...state, coordinate: move(state.coordinate, 90) }));
        break;
      case 180:
        dispatch(updateArrow({ ...state, coordinate: move(state.coordinate, 180) }));
        break;
      case 270:
        dispatch(updateArrow({ ...state, coordinate: move(state.coordinate, 270) }));
        break;
      default:
        dispatch(updateArrow({ ...state, coordinate: move(state.coordinate, 0) }));
        break;
    }
  };

  const getCurrentBox = (): ICoordinate => {
    return store.getState().arrow.coordinate;
  };

  const isOut = (coordinate: ICoordinate): boolean => store.getState().board.board[coordinate.x][coordinate.y] === undefined;

  const getNextBox = (): ICoordinate => move(store.getState().arrow.coordinate, store.getState().arrow.degree);

  const turnLeft = (): void => {
    const arrowState = store.getState().arrow;
    if (arrowState.degree === 270) dispatch(updateArrow({ ...arrowState, degree: 0 }));
    else dispatch(updateArrow({ ...arrowState, degree: arrowState.degree + 90 }));
  }

  const runCode = async () => {
    if (store.getState().game.code.trim() === '// code here') return;
      dispatch(updateGame({ ...store.getState().game, isCodeRunning: true }));
    try {
      while(store.getState().game.isCodeRunning && !isFinish(getCurrentBox())) {
        await delay(1000);
        eval(store.getState().game.code);
      }
    } catch (error) {
      console.log(error);
    }
    if (isFinish(store.getState().arrow.coordinate)) {
      dispatch(updateGame({
        ...store.getState().game,
        score: levels[store.getState().game.level].score,
        isCodeRunning: false,
      }));
      setTimeout(() => {
        dispatch(goCongratulatePage());
      }, 1000);
    } else dispatch(updateGame({ ...store.getState().game, isCodeRunning: false }))
  }

  return (
    <div className="game">
      <div className="content">
        <div className="timer-score">
          <Timer totalSecond={gameState.time} />
          <Score totalScore={gameState.score} />
        </div>
        <Board />
        <div className="menu">
          <button
            className="btn btn-outline-danger"
            onClick={handleExit}
          >
            Exit
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={async () => {
              dispatch(updateGame({
                ...store.getState().game,
                code: levels[gameState.level].solution,
              }));
              await runCode();
            }}
          >
            Solution
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={handleReset}
          >
            Reset
          </button>
          {!gameState.isCodeRunning && (
            <button
              className="btn btn-outline-success"
              onClick={async () => await runCode()}
            >
              Run
            </button>
          )}
          {gameState.isCodeRunning && (
            <button
              className="btn btn-outline-danger"
              onClick={handleStop}
            >
              Stop
            </button>
          )}
        </div>

        <AceEditor
          mode="javascript"
          theme="monokai"
          name="code"
          fontSize={16}
          value={gameState.code}
          tabSize={2}
          minLines={5}
          maxLines={Infinity}
          width="100%"
          editorProps={{ $blockScrolling: true }}
          onChange={handleCodeOnChange}
          setOptions={{ useWorker: false }}
        />
      </div>
    </div>
  );
};

export default Game;