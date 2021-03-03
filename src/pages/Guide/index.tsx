import React from 'react';
import { useDispatch } from 'react-redux';
import { goHomePage } from '../Home/home.slice';
import './index.scss';

const Guide = () => {
  const dispatch = useDispatch();

  return (
    <div className="guide">
      <div className="content">
        <h1 className="title">Guide</h1>
        <p>The game idea is to help arrow to get finish box <span className="green">(green box)</span> by coding.</p>
        <p>Functions:</p>
        <p><span className="green">getCurrentBox()</span> - to get current arrow's position.</p>
        <p><span className="green">getNextBox()</span> - to get next arrow's position.</p>
        <p><span className="green">isOut(box)</span> - to check box is out or not. For example: isOut(getCurrentBox()), isOut(getNextBox()).</p>
        <p><span className="green">isCoin(box)</span> - to check box has coin or not. For example: isCoin(getCurrentBox()), isCoin(getNextBox()).</p>
        <p><span className="green">getCoin(box)</span> - to get coin from box. For example: getCoin(getCurrentBox()).</p>
        <p><span className="green">goForward()</span> - to move arrow forward.</p>
        <p><span className="green">turnLeft()</span> - to turn left arrow forward.</p>
        <p><span className="green">turnRight()</span> - to turn right arrow forward.</p>
        <button
            className="btn btn-outline-danger"
            onClick={() => dispatch(goHomePage())}
          >
            Exit
          </button>
      </div>
    </div>
  );
};

export default Guide;
