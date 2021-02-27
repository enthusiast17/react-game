import {IBox, ICoordinate} from "../interfaces";

const createCoordinate = (x: number, y: number): ICoordinate  => ({ x, y });

const createBox = (coodinate: ICoordinate, hasCoin: boolean = false): IBox => ({ hasCoin, coodinate})

const levels = [
  {
    id: 0,
    board: [Array.from(Array(6).keys()).map((_, index) => createBox(createCoordinate(0, index)))],
    startCoordinate: createCoordinate(0, 0),
    finishCoordinate: createCoordinate(0, 5),
  }
]

export default levels;
