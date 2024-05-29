import { Store } from "redux";
import findLastIndex from "lodash/findLastIndex";
import { setIntervalAsync } from "set-interval-async/fixed";
import { translate } from "../../languages";
// import {
//     SET_USER_PAGE_INITIALIZE_STATUS,
//     INCREASE_APP_LIFE_CYCLE,
//     SET_TIME,
//     UPDATE_TIME
// } from "./main.reducer";
import { UserService } from "../user";
import { TradeService } from "../trade";
import { RequestMainService } from "../request";
import { BankService } from "../bank";
import { CreateAlert, EAlertType } from "../../modules";
import { increaseAppLifeCycle, setTime, setUserPageInitializeStatus, updateTime } from "@/src/redux/slices/mainSlice";
import { store } from "@/src/redux/store";
import { setCountries } from "@/src/redux/slices/countriesSlice";

export const mergeCandleData = (prevData: any[], nextData: any[]) => {
  const result = [...prevData];
  const nextDataLength = nextData.length;

  for (let i = 0; i < nextDataLength; i++) {
    const item = nextData[i];
    const currentIndex = findLastIndex(result, (prev) => prev[0] === item[0]);
    if (currentIndex !== -1) result[currentIndex] = item;
    else result.push(item);
  }

  return result;
};

export class MainService {
  static async initialFromServer(store: Store) {}

  static async initializeClient() {
    // const store = getClientStore();

    await Promise.all([
      // this.initializeTime(store),
      // TradeService.getSymbols(store),
    ]);

    // this.getCountries(store);
  }

  static async initialUserPage() {
    // const store = getClientStore();
    const { userPageInitializeStatus } = store.getState().main;
    if (userPageInitializeStatus !== "pending") return;
    // store.dispatch({ type: SET_USER_PAGE_INITIALIZE_STATUS, status: 'processing' });
    store.dispatch(setUserPageInitializeStatus("processing"));
    await Promise.all([
      UserService.auth(store),
      //UserService.getListCategory(),
      //UserService.getListSupplier(),
      TradeService.getCoins(store),
      BankService.getTokenStandard(store),
      // BankService.getCoinConversionRate(store),
    ]);
    // store.dispatch({ type: SET_USER_PAGE_INITIALIZE_STATUS, status: 'completed' });
    store.dispatch(setUserPageInitializeStatus("completed"));
  }

  static async getCountries(store: Store) {
    return RequestMainService.get(`/country`)
      .then(({ result }) => {
        const data = result;
        store.dispatch(setCountries({ count: data.length, data: data }));
      })
      .catch((res) => store.dispatch(setCountries({ error: res.error })));
  }

  static async forceUpdateApp() {
    // return getClientStore().dispatch({ type: INCREASE_APP_LIFE_CYCLE })
    return store.dispatch(increaseAppLifeCycle(null));
  }

  static async initializeTime(store: Store) {
    let handleInterval: any;
    const handleClearInterval = () => clearInterval(handleInterval);
    // const handleUpdateTime = () => store.dispatch({ type: UPDATE_TIME });
    const handleUpdateTime = () => store.dispatch(updateTime(null));
    const balance = 0;

    TradeService.getInitTime()
      .then((time) => {
        handleClearInterval();
        const balanceTime = time - Date.now();
        // store.dispatch({ type: SET_TIME, time: (60 - (new Date(time + balance).getSeconds())), serverTime: time + balance, balanceTime });
        store.dispatch(setTime({ time: 60 - new Date(time + balance).getSeconds(), serverTime: time + balance, balanceTime }));
        handleInterval = setInterval(handleUpdateTime, 1000);
      })
      .catch((err) => CreateAlert({ message: err.message, type: EAlertType.ERROR }));

    setIntervalAsync(() => {
      TradeService.getInitTime()
        .then((time) => {
          // store.dispatch({ type: SET_TIME, time: (60 - (new Date(time + balance).getSeconds())), serverTime: time + balance });
          store.dispatch(setTime({ time: 60 - new Date(time + balance).getSeconds(), serverTime: time + balance }));
          handleClearInterval();
          handleInterval = setInterval(handleUpdateTime, 1000);
        })
        .catch((err) => CreateAlert({ message: err.message, type: EAlertType.ERROR }));
    }, 29.8 * 1000);
  }
}
