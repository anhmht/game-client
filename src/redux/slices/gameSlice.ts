// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  providers: [],
  category: [],
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setListProviders: (state: any, action: any) => {
      state.providers = action.payload;
    },
    setListCategory: (state: any, action: any) => {
      state.category = action.payload;
    },
  },
});

export const { setListProviders, setListCategory }: any = gameSlice.actions;
export default gameSlice.reducer;
