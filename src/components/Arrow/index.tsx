import React from 'react';
import { useSelector } from 'react-redux';
import arrowImg from './arrow-right.png'
import { RootState } from '../../store';

const Arrow = () => {
  const { degree } = useSelector((state: RootState) => state.arrow);
  return (
    <img style={{ transform: `rotate(-${degree}deg)` }} src={arrowImg} alt="arrow" />
  )
};

export default Arrow;
