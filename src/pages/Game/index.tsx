import React from 'react';
import AceEditor from 'react-ace';
import Board from '../../components/Board';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import './index.scss';


const Game = () => {
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
          defaultValue="// code here"
          tabSize={2}
          minLines={5}
          maxLines={Infinity}
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
  );
}

export default Game;