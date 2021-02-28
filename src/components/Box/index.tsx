import React from 'react';
import { useSelector } from 'react-redux';
import { IBox } from '../../interfaces';
import { RootState } from '../../store';
import Arrow from '../Arrow';
import './index.scss';

const Box = (props: IBox) => {
  const { coodinate } = props;
  const arrowCoordinate = useSelector((state: RootState) => state.arrow.coordinate);

  return (
    <div className="box">
      {JSON.stringify(coodinate) === JSON.stringify(arrowCoordinate) && (
        <Arrow />
      )}
    </div>
  )
}

export default Box;
