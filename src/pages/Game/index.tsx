import React from 'react';
import AceEditor from 'react-ace';
import { useDispatch, useSelector } from 'react-redux';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import { RootState } from '../../store';
import { updateGame } from './game.slice';
import Board from '../../components/Board';
import './index.scss';

const Game = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.game);

  const handleCodeOnChange = (value: string) => dispatch(updateGame({ ...state, code: value }));

  return (
    <div className="game">
      <div className="content">
        <Board />
        <div className="menu">
          <button className="btn btn-outline-primary">Guide</button>
          <button className="btn btn-outline-primary">Solution</button>
          <button className="btn btn-outline-success">Run</button>
        </div>

        <AceEditor
          mode="javascript"
          theme="monokai"
          name="code"
          fontSize={16}
          value={state.code}
          tabSize={2}
          minLines={5}
          maxLines={Infinity}
          editorProps={{ $blockScrolling: true }}
          onChange={handleCodeOnChange}
        />
      </div>
    </div>
  );
};

export default Game;