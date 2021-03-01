import React from 'react';
import { useSelector } from 'react-redux';
import { IBox, ICoordinate } from '../../interfaces';
import { RootState } from '../../store';
import Arrow from '../Arrow';
import coinImg from '../../assets/coin.png';
import './index.scss';

const Box = (props: IBox) => {
  const { coordinate, hasCoin } = props;
  const finishCoordinate = useSelector((state: RootState) => state.board.finishCoordinate);
  const arrowCoordinate = useSelector((state: RootState) => state.arrow.coordinate);

  const isCoordinatesEqual = (firstCoordinate: ICoordinate, secondCoordinate: ICoordinate) => (
    JSON.stringify(firstCoordinate) === JSON.stringify(secondCoordinate)
  );

  return (
    <div className={isCoordinatesEqual(coordinate, finishCoordinate) ? 'box is-finish' : 'box'}>
      {isCoordinatesEqual(coordinate, arrowCoordinate) && (
        <Arrow />
      )}

      {hasCoin && (
        <img src={coinImg} alt="coin" />
      )}
    </div>
  )
};

export default Box;
