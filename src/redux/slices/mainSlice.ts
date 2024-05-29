// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  lifeCycleTime: 1,
  isServerInitialized: false,
  isClientInitialized: false,
  device: {},
  userPageInitializeStatus: "pending",
  isHasPinCode: false,
  time: -1,
  serverTime: null,
  balanceTime: -1,
  isOpenVerticalNavbarMobile: false,
  networkOptions: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setDevice: (state: any, action: any) => {
      return { ...state, device: { ...state.device, ...action.payload } };
    },
    setUserPageInitializeStatus: (state: any, action: any) => {
      return { ...state, userPageInitializeStatus: action.payload };
    },
    increaseAppLifeCycle: (state: any, action: any) => {
      return { ...state, lifeCycleTime: state.lifeCycleTime + 1 };
    },
    setIsHasPinCode: (state: any, action: any) => {
      return { ...state, isHasPinCode: action.payload };
    },
    setTime: (state: any, action: any) => {
      return { ...state, time: action.payload.time, serverTime: action.payload.serverTime, balanceTime: action.payload.balanceTime || -1 };
    },
    updateTime: (state: any, action: any) => {
      const newDateTime = new Date(state.serverTime + 1000);
      const newTime = state.time === 1 ? 60 : state.time - 1;
      return { ...state, time: newTime, serverTime: newDateTime.getTime() };
    },
    setIsOpenVerticalNavbarMobile: (state: any, action: any) => {
      return { ...state, isOpenVerticalNavbarMobile: action.payload };
    },
    setNetworkOptions: (state: any, action: any) => {
      return { ...state, networkOptions: action.payload };
    },
  },
});

export const {
  setDevice,
  setUserPageInitializeStatus,
  increaseAppLifeCycle,
  setIsHasPinCode,
  setTime,
  updateTime,
  setIsOpenVerticalNavbarMobile,
  setNetworkOptions,
}: any = mainSlice.actions;
export default mainSlice.reducer;
