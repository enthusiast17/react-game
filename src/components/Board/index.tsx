import React from 'react';
import { useSelector } from 'react-redux';
import { IBox } from '../../interfaces';
import { RootState } from '../../store';
import Box from '../Box';


const Board = () => {
  const state = useSelector((state: RootState) => state.board);

  return (
    <div className="board">
      {state.board.map((row: IBox[], rowKey: number) => (
        <div key={rowKey} className="row">{
          row.map((box: IBox, boxKey: number) => <Box key={boxKey} {...box} />)
        }</div>
      ))}
    </div>
  )
}

export default Board;
