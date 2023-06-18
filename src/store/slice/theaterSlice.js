import { createSlice } from "@reduxjs/toolkit";

const SYSTEM_NAME = process.env.REACT_APP_NAME;
export const theaterSlice = createSlice({
  name: 'therter',
  initialState: {},
  reducers: {
    setTheater(state, action) {
      state.theaterId = action.payload;
    },
    setRoom(state, action){
      state.roomId = action.payload;
    },
    setSeats(state, action){
      state.seats = action.payload;

    }
  }
});

export const { setTheater, setRoom, setSeats } = theaterSlice.actions;

export const selectTheater = (state) => {
  return  state?.[SYSTEM_NAME].theaterReducer
};
export default theaterSlice.reducer



