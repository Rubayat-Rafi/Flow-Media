import { createSlice } from '@reduxjs/toolkit';
const Slice = createSlice({
  name: 'Slice',
  initialState: {
    url:""
  },
  reducers: {
    addUrl:(state,action)=>{
        state.url = action.payload
    }
  },
});

export const {addUrl} = Slice.actions;
export default Slice.reducer;
