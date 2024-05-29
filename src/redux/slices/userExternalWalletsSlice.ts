// @ts-ignore
import { createSlice } from "@reduxjs/toolkit"

const initialState: any = null;

const userExternalWalletsSlice = createSlice({
    name: "userExternalWallets",
    initialState,
    reducers: {
        setUserExternalWallets: (state:any, action:any) => {
            return action.payload;
        }
    }
})

export const { setUserExternalWallets }:any = userExternalWalletsSlice.actions;
export default userExternalWalletsSlice.reducer;