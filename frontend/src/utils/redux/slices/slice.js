import { createSlice } from "@reduxjs/toolkit";
const Slice = createSlice({
  name: "Slice",
  initialState: {
    url: "",
    defaultUrl: "",
    runningUrl: null,
    events: null,
    usbscribe: false,
    hideVideoFlag: false,
    videoFlag: false,
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
    addEvents: (state, action) => {
      state.events = action.payload;
    },
    addDefaultUrl: (state, action) => {
      state.defaultUrl = action.payload;
    },
    addRunningUrl: (state, action) => {
      state.runningUrl = action.payload;
    },
  },
});

export const {
  addUrl,
  addSubscription,
  addVideoFlag,
  addTimeZone,
  addTime,
  addEvents,
  addDefaultUrl,
  addRunningUrl,
} = Slice.actions;
export default Slice.reducer;
