// @ts-ignore
import { createSlice } from "@reduxjs/toolkit"

const initialState: any = null;

const userInternalWalletSlice = createSlice({
    name: "userInternalWallets",
    initialState,
    reducers: {
        setUserInternalWallets: (state:any, action:any) => {
            return action.payload;
        }
    }
})

export const { setUserInternalWallets }:any = userInternalWalletSlice.actions;
export default userInternalWalletSlice.reducer;