import { createSlice } from "@reduxjs/toolkit";
const Slice = createSlice({
  name: "Slice",
  initialState: {
    url: "",
    usbscribe: false,
    hideVideoFlag: false,
    timeZone: "GMT+6",
    time: "",
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
    addTimeZone: (state, action) => {
      state.timeZone = action.payload;
    },
    addTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { addUrl, addSubscription, addVideoFlag, addTimeZone, addTime } =
  Slice.actions;
export default Slice.reducer;
