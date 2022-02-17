import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Occasion } from '../occasion.type';

export const initialState: Occasion[] = [
  {
    id: '1',
    name: 'Valentines',
    date: '2022-02-14T00:00:00+01:00',
    active: true,
    occasionIcon: './src/icon.png',
  },
  {
    id: '8',
    name: 'Sleep',
    date: '2022-02-15T02:20:00+01:00',
    active: true,
    occasionIcon: './src/icon.png',
  },
  {
    id: '2',
    name: 'Payday',
    date: '2022-02-25T00:00:00+01:00',
    active: true,
    occasionIcon: './src/icon.png',
  },
  {
    id: '3',
    name: 'Driving Exam',
    date: '2022-03-14T00:00:00+01:00',
    active: true,
    occasionIcon: './src/icon.png',
  },
  {
    id: '4',
    name: 'Back to Turkey',
    date: '2022-04-03T00:00:00+01:00',
    active: true,
    occasionIcon: './src/icon.png',
  },
  {
    id: '5',
    name: 'Las Vegas',
    date: '2022-06-15T00:00:00+01:00',
    active: true,
    occasionIcon: './src/icon.png',
  },
];

const occasionsSlice = createSlice({
  name: 'occasions',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Occasion>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<Pick<Occasion, 'id'>>) => {
      const index = state.findIndex((o) => action.payload.id === o.id);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { add, remove } = occasionsSlice.actions;
export default occasionsSlice.reducer;
