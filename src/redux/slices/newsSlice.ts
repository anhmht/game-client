// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  listNews: [],
  detailNews: [],
  detailNewsPopup: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setListNews: (state: any, action: any) => {
      return { ...state, listNews: action.payload };
    },
    setDetailNews: (state: any, action: any) => {
      return { ...state, detailNews: action.payload };
    },
    setDetailNewsPopup: (state: any, action: any) => {
      return { ...state, detailNewsPopup: action.payload };
    },
  },
});

export const { setListNews, setDetailNews, setDetailNewsPopup }: any = newsSlice.actions;
export default newsSlice.reducer;
