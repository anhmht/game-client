// @ts-ignore
import { createSlice } from "@reduxjs/toolkit"

const initialState: any = null;

const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        setCountries: (state:any, action:any) => {
            return action.payload;
        }
    }
})

export const { setCountries }:any = countriesSlice.actions;
export default countriesSlice.reducer;