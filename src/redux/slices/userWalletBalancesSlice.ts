// @ts-ignore
import { createSlice } from "@reduxjs/toolkit"

const initialState: any = null;

const userWalletBalancesSlice = createSlice({
    name: "userWalletBalances",
    initialState,
    reducers: {
        setUserWalletBalances: (state:any, action:any) => {
            return action.payload;
        }
    }
})

export const { setUserWalletBalances }:any = userWalletBalancesSlice.actions;
export default userWalletBalancesSlice.reducer;