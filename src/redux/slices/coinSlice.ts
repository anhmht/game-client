// @ts-ignore
import { createSlice } from "@reduxjs/toolkit"

const initialState: any = null;

const coinsSlice = createSlice({
    name: "coins",
    initialState,
    reducers: {
        setCoins: (state:any, action:any) => {
            return action.payload;
        }
    }
})

export const { setCoins }:any = coinsSlice.actions;
export default coinsSlice.reducer;