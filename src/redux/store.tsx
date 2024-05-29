// @ts-ignore
import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slices/mainSlice";
import userSlice from "./slices/userSlice";
import userExternalWalletsSlice from "./slices/userExternalWalletsSlice";
import countriesSlice from "./slices/countriesSlice";
import coinSlice from "./slices/coinSlice";
import userWalletBalancesSlice from "./slices/userWalletBalancesSlice";
import userInternalWalletSlice from "./slices/userInternalWalletSlice";
import userAffiliateSlice from "./slices/userAffiliateSlice";
import gameSlice from "./slices/gameSlice";
import newsSlice from "./slices/newsSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    user: userSlice,
    userExternalWallets: userExternalWalletsSlice,
    userInternalWallets: userInternalWalletSlice,
    countries: countriesSlice,
    coins: coinSlice,
    userWalletBalances: userWalletBalancesSlice,
    userAffiliate: userAffiliateSlice,
    game: gameSlice,
    news: newsSlice,
  },
});
