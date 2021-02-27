interface ICoordinate {
  x: number,
  y: number
}

interface IBox {
  hasCoin: boolean,
  coodinate: ICoordinate,
}

export type {
  ICoordinate,
  IBox,
};
