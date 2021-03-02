import React, { useEffect } from 'react';
import AceEditor from 'react-ace';
import { useDispatch, useSelector } from 'react-redux';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import { RootState, store } from '../../store';
import { countUpTime, resetGame, updateGame } from './game.slice';
import Board from '../../components/Board';
import Timer from '../../components/Timer';
import Score from '../../components/Score';
import { ICoordinate } from '../../interfaces';
import { updateArrow } from '../../components/Arrow/arrow.slice';
import levels from '../../constants';
import './index.scss';
import { goCongratulatePage, goHomePage } from '../Home/home.slice';


let timer: NodeJS.Timeout;

const Game = () => {
  const dispatch = useDispatch();
  const boardState = useSelector((state: RootState) => state.board);
  const gameState = useSelector((state: RootState) => state.game);

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

  const goForward = () => {
    const state = store.getState().arrow;
    dispatch(updateArrow({ ...state, coordinate: { ...state.coordinate, y: state.coordinate.y + 1 } }));
  };

  const getCurrentBox = () => {
    return store.getState().arrow.coordinate;
  };

  const runCode = async () => {
    if (store.getState().game.code.trim() === '// code here') return;
      dispatch(updateGame({ ...gameState, isCodeRunning: true }));
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
      dispatch(goCongratulatePage());
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
            onClick={() => {
              dispatch(resetGame());
              dispatch(goHomePage());
            }}
          >
            Exit
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => dispatch(updateGame({ ...gameState, code: levels[gameState.level].solution }))}
          >
            Solution
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
              onClick={() => dispatch(updateGame({ ...gameState, isCodeRunning: false }))}
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