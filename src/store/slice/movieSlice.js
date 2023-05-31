import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: 'member',
  initialState: [],
  reducers: {
    setMovies(state, action) {
      return action.payload
    },
    setMovie(state, action){
      const data = action.payload
      const index = state.findIndex((d) => d._id === data._id)
      state[index] = data;
    }
  }
})

export const { setMovies, setMovie } = movieSlice.actions
const SYSTEM_NAME = process.env.REACT_APP_NAME;
export const selectMovie = (state) => {
  return state?.[SYSTEM_NAME].movieReducer;
};
export default movieSlice.reducer