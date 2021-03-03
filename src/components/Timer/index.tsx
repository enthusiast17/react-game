import React from 'react';
import './index.scss';

const Timer = (props: { totalSecond: number }) => {
  const { totalSecond } = props;
  const sec = Math.floor(totalSecond % 60)
  const min = Math.floor(totalSecond / 60)

  return (
    <span className="timer">
      Time:
      {' '}
      {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
    </span>
  );
};

export default Timer;
