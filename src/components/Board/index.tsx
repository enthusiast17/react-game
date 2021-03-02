import React from 'react';
import { useSelector } from 'react-redux';
import { IBox } from '../../interfaces';
import { RootState } from '../../store';
import Box from '../Box';
import EmptyBox from '../EmptyBox';

const Board = () => {
  const state = useSelector((state: RootState) => state.board);

  return (
    <div className="board">
      {state.board.map((row: (IBox | undefined)[], rowKey: number) => (
        <div key={rowKey} className="row">{
          row.map((box: (IBox | undefined), boxKey: number) => (
            box ? <Box key={boxKey} {...box} /> : <EmptyBox key={boxKey} />
          ))
        }</div>
      ))}
    </div>
  )
};

export default Board;
