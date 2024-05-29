// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = null;

const userAffiliateSlice = createSlice({
  name: "userAffiliate",
  initialState,
  reducers: {
    setUserAffiliate: (state: any, action: any) => {
      return action.payload;
    },
  },
});

export const { setUserAffiliate }: any = userAffiliateSlice.actions;
export default userAffiliateSlice.reducer;
