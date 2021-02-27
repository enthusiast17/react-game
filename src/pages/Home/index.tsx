import React, { useState } from 'react';
import Game from '../Game';
import './index.scss';

const Home = () => {
  const [playGame, setPlayGame] = useState<boolean>(false);

  return (
    <>
      {!playGame && (
        <div className="home">
          <div className="content">
            <h1 className="title">Show the path -&gt;</h1>
            <div className="btns">
              <button className="btn btn-outline-success" onClick={() => setPlayGame(true)}>Play game</button>
              <button className="btn btn-outline-primary">Score board</button>
              <button className="btn btn-outline-primary">Guide</button>
              <button className="btn btn-outline-primary">Settings</button>
            </div>
          </div>
        </div>
      )}

      {playGame && (<Game />)}
    </>
  );
}

export default Home;
