import React from 'react';
import './index.scss';

const Home = () => (
  <div className="home">
    <div className="content">
      <h1 className="title">Show the path -&gt;</h1>
      <div className="btns">
        <button className="btn btn-outline-success">Play game</button>
        <button className="btn btn-outline-primary">Score board</button>
        <button className="btn btn-outline-primary">Guide</button>
        <button className="btn btn-outline-primary">Settings</button>
      </div>
    </div>
  </div>
);

export default Home;
