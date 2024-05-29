// @ts-ignore
import { createSlice } from "@reduxjs/toolkit"

const initialState: any = null;

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuth: (state:any, action:any) => {
            return action.payload;
        },
        logOut: (state:any, action:any) => {
            return initialState;
        }
    }
})

export const { setAuth, logOut }:any = userSlice.actions;
export default userSlice.reducer;