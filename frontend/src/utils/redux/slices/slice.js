import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "Slice",
  initialState: {
    url: "",
    defaultUrl: "",
    defaultChannel: null,
    runningUrl: null,
    events: null,
    subscribe: false,      
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
      state.subscribe = action.payload;
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
    addDefaultChannel: (state, action) => {
      state.defaultChannel = action.payload;
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
  addDefaultChannel,
} = slice.actions;

export default slice.reducer;