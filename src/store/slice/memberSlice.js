import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
  name: 'member',
  initialState: [],
  reducers: {
    setMembers(state, action) {
      return action.payload
    },
    setMember(state, action){
      const data = action.payload
      const index = state.findIndex((d) => d._id === data._id)
      state[index] = data;
    }
  }
})

export const { setMembers, setMember } = memberSlice.actions
const SYSTEM_NAME = process.env.REACT_APP_NAME;
export const selectMember = (state) => {
  return state?.[SYSTEM_NAME].memberReducer;
};
export default memberSlice.reducer