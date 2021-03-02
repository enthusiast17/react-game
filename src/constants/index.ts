import {IBox, ICoordinate} from '../interfaces';

const createCoordinate = (x: number, y: number): ICoordinate  => ({ x, y });

const createBox = (coordinate: ICoordinate, hasCoin: boolean = false): IBox => ({ hasCoin, coordinate})

const levels = [
  {
    id: 0,
    board: [Array.from(Array(6).keys()).map((_, index) => createBox(createCoordinate(0, index)))],
    arrow: { degree: 0, coordinate: createCoordinate(0, 0) },
    startCoordinate: createCoordinate(0, 0),
    finishCoordinate: createCoordinate(0, 5),
    solution: '// code here\n\ngoForward();',
    score: 5,
  },
  {
    id: 1,
    board: [
      [undefined, undefined, createBox(createCoordinate(0, 2))],
      [undefined, undefined, createBox(createCoordinate(1, 2))],
      Array.from(Array(3).keys()).map((_, index) => createBox(createCoordinate(2, index)))
    ],
    arrow: { degree: 0, coordinate: createCoordinate(2, 0) },
    startCoordinate: createCoordinate(2, 0),
    finishCoordinate: createCoordinate(0, 2),
    solution: '// code here\n\nif (isOut(getNextBox())) turnLeft();\nelse goForward();',
    score: 10,
  },
]

export default levels;
