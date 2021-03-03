interface ICoordinate {
  x: number,
  y: number
}

interface IBox {
  hasCoin: boolean,
  coordinate: ICoordinate,
}

export type {
  ICoordinate,
  IBox,
};
