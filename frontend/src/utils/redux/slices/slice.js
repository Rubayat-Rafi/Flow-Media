import { createSlice } from "@reduxjs/toolkit";
const Slice = createSlice({
  name: "Slice",
  initialState: {
    url: "",
    usbscribe: false,
    hideVideoFlag: false,
  },
  reducers: {
    addUrl: (state, action) => {
      state.url = action.payload;
    },
    addSubscription: (state, action) => {
      state.usbscribe = action.payload;
    },
    addVideoFlag: (state, action) => {
      state.hideVideoFlag = action.payload;
    },
  },
});

export const { addUrl, addSubscription, addVideoFlag } = Slice.actions;
export default Slice.reducer;
