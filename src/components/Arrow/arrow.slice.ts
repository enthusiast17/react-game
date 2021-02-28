import { createSlice } from '@reduxjs/toolkit';
import levels from '../../constants';
import { ICoordinate } from '../../interfaces';

interface IArrowState {
  degree: number,
  coordinate: ICoordinate,
}

const initialState: IArrowState = {
  degree: levels[0].arrow.degree,
  coordinate: levels[0].arrow.coordinate,
};

const arrowSlice = createSlice({
  name: 'arrow',
  initialState,
  reducers: { },
});

export default arrowSlice.reducer;
