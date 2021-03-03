import {IBox, ICoordinate} from '../interfaces';

const createCoordinate = (x: number, y: number): ICoordinate  => ({ x, y });

const createBox = (coordinate: ICoordinate, hasCoin: boolean = false): IBox => ({ hasCoin, coordinate})

const levels = [
  {
    id: 0,
    board: [Array.from(Array(3).keys()).map((_, index) => createBox(createCoordinate(0, index)))],
    arrow: { degree: 0, coordinate: createCoordinate(0, 0) },
    startCoordinate: createCoordinate(0, 0),
    finishCoordinate: createCoordinate(0, 2),
    solution: '// code here\n\ngoForward();\n',
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
    solution: '// code here\n\nif (isOut(getNextBox())) turnLeft();\nelse goForward();\n',
    score: 10,
  },
  {
    id: 2,
    board: [
      [undefined, createBox(createCoordinate(0, 1)), createBox(createCoordinate(0, 2))],
      [createBox(createCoordinate(1, 0)), createBox(createCoordinate(1, 1), true), undefined],
      [undefined, createBox(createCoordinate(2, 1)), undefined],
    ],
    arrow: { degree: 0, coordinate: createCoordinate(1, 0) },
    startCoordinate: createCoordinate(1, 0),
    finishCoordinate: createCoordinate(0, 2),
    solution: '// code here\n\nif (isCoin(getCurrentBox())) {\n turnLeft();\n getCoin(getCurrentBox());\n}\nelse if (isOut(getNextBox())) {\n turnRight();\n}\nelse goForward();\n',
    score: 15,
  },
  {
    id: 3,
    board: [
      [createBox(createCoordinate(0, 0)), createBox(createCoordinate(0, 1)), createBox(createCoordinate(0, 2), true)],
      [createBox(createCoordinate(1, 0)), undefined, createBox(createCoordinate(1, 2))],
      [createBox(createCoordinate(2, 0)), createBox(createCoordinate(2, 1)), createBox(createCoordinate(2, 2), true)],
      [undefined, undefined, createBox(createCoordinate(3, 2))],
    ],
    arrow: { degree: 90, coordinate: createCoordinate(3, 2) },
    startCoordinate: createCoordinate(3, 2),
    finishCoordinate: createCoordinate(0, 0),
    solution: '// code here\n\nif (isOut(getNextBox())) {\n turnLeft();\n} \n else if (isCoin(getCurrentBox())) {\n getCoin(getCurrentBox());\n}\n else {\n goForward();\n}\n',
    score: 20,
  },
  {
    id: 4,
    board: [
      [createBox(createCoordinate(0, 0)), createBox(createCoordinate(0, 1)), createBox(createCoordinate(0, 2))],
      [createBox(createCoordinate(1, 0)), undefined, undefined],
      [createBox(createCoordinate(2, 0)), createBox(createCoordinate(2, 1)), createBox(createCoordinate(2, 2))],
    ],
    arrow: { degree: 180, coordinate: createCoordinate(0, 2) },
    startCoordinate: createCoordinate(0, 2),
    finishCoordinate: createCoordinate(2, 2),
    solution: '// code here\n\nif (isOut(getNextBox())) {\n turnLeft();\n} else goForward()\n',
    score: 5,
  }
]

export default levels;
