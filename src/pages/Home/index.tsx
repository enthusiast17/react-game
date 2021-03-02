import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Game from '../Game';
import { RootState } from '../../store';
import Congratulate from '../Congratulate';
import Settings from '../Settings';
import { goGamePage } from './home.slice';
import './index.scss';

const Home = () => {
  const dispatch = useDispatch();
  const homeState = useSelector((state: RootState) => state.home);

  const routes: { [key: string]: ReactNode } = {
    'Home': (
      <div className="home">
        <div className="content">
          <h1 className="title">Show the path -&gt;</h1>
          <div className="btns">
            <button
              className="btn btn-outline-success"
              onClick={() => dispatch(goGamePage())}
            >
              Play game
            </button>
            <button className="btn btn-outline-primary">Score board</button>
            <button className="btn btn-outline-primary">Guide</button>
            <button className="btn btn-outline-primary">Settings</button>
          </div>
        </div>
      </div>
    ),
    'Game': (<Game />),
    'Congratulate': (<Congratulate />),
    'Settings': (<Settings />),
  }

  return (
    <>
      {(routes[homeState.currentPage])}
    </>
  );
};

export default Home;
