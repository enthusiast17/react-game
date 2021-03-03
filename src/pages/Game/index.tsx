import React, { useEffect } from 'react';
import AceEditor from 'react-ace';
import { useDispatch, useSelector } from 'react-redux';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import { useHotkeys } from 'react-hotkeys-hook';
import useSound from 'use-sound';
import { RootState, store } from '../../store';
import { countUpTime, updateGame } from './game.slice';
import Board from '../../components/Board';
import Timer from '../../components/Timer';
import Score from '../../components/Score';
import { IBox, ICoordinate } from '../../interfaces';
import { updateArrow } from '../../components/Arrow/arrow.slice';
import { goCongratulatePage, goHomePage } from '../Home/home.slice';
import { updateBoard, updateBox } from '../../components/Board/board.slice';
import { storeLastGame, storeStats } from '../../localstorage';
import moveSoundSrc from '../../assets/audio/move-sound.mp3';
import backgroundSoundSrc from '../../assets/audio/background-sound.mp3';
import levels from '../../constants';
import './index.scss';

let timer: NodeJS.Timeout;

const Game = () => {
  const dispatch = useDispatch();
  const boardState = useSelector((state: RootState) => state.board);
  const gameState = useSelector((state: RootState) => state.game);
  const settingsState = useSelector((state: RootState) => state.settings);
  const [moveSound] = useSound(moveSoundSrc, { volume: settingsState.moveSoundVolume });
  const [backgroundSound, { stop, isPlaying }] = useSound(backgroundSoundSrc, { volume: settingsState.backgroundSoundVolume });

  const playMoveSound = () => {
    if (settingsState.isMoveSoundPermitted) moveSound();
  }

  const handleExit = (): void => {
    storeLastGame();
    stop();
    dispatch(updateGame({ ...store.getState().game, isCodeRunning: false }));
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
    if (!settingsState.isBackgroundSoundPermitted) return;
    if (!isPlaying) backgroundSound();
  }, [isPlaying, backgroundSound])

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
    playMoveSound();
  };

  const getCurrentBox = (): ICoordinate => {
    return store.getState().arrow.coordinate;
  };

  const isOut = (coordinate: ICoordinate): boolean => (
    store.getState().board.board[coordinate.x] === undefined ||
    store.getState().board.board[coordinate.x][coordinate.y] === undefined
  );

  const isCoin = (coordinate: ICoordinate): boolean => {
    const box = store.getState().board.board[coordinate.x][coordinate.y];
    return box !== undefined && box.hasCoin;
  };

  const getCoin = (coordinate: ICoordinate): void => {
    if (store.getState().board.board[coordinate.x][coordinate.y] === undefined) return;
    const copyBox = { ...store.getState().board.board[coordinate.x][coordinate.y] } as IBox;
    if (copyBox !== undefined && copyBox.hasCoin) {
      dispatch(updateBox({ ...copyBox, hasCoin: false }));
      dispatch(updateGame({ ...store.getState().game, score: store.getState().game.score + 5 }));
    }
  }

  const getNextBox = (): ICoordinate => move(store.getState().arrow.coordinate, store.getState().arrow.degree);

  const turnLeft = (): void => {
    const arrowState = store.getState().arrow;
    if (arrowState.degree === 270) dispatch(updateArrow({ ...arrowState, degree: 0 }));
    else dispatch(updateArrow({ ...arrowState, degree: arrowState.degree + 90 }));
    playMoveSound();
  }

  const turnRight = (): void => {
    const arrowState = store.getState().arrow;
    if (arrowState.degree === 0) dispatch(updateArrow({ ...arrowState, degree: 360 }));
    else dispatch(updateArrow({ ...arrowState, degree: arrowState.degree - 90 }));
    playMoveSound();
  };

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
      clearInterval(timer);
      storeLastGame();
      dispatch(updateGame({
        ...store.getState().game,
        score: store.getState().game.score + levels[store.getState().game.level].score,
        isCodeRunning: false,
      }));
      storeStats();
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