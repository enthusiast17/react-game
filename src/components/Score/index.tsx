import React from 'react';
import './index.scss';

const Score = (props: { totalScore: number }) => {
  const { totalScore } = props;

  return (
    <span className="score">Score: {totalScore}</span>
  );
};

export default Score;
