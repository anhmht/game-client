import { RequestMainService } from "../request";
import { Store } from "redux";
import { CookieService, ECookieVariable } from "../cookie";
import { ObjectUtils } from "../../modules";
// import { SET_SYMBOLS } from "./symbols.reducer";
import { MainService } from "../main";
import { EOrderStatus } from "../../types";
import { store } from "@/src/redux/store";
import { setCoins } from "@/src/redux/slices/coinSlice";

export class TradeService {
  static async getCoins(store: Store) {
    return RequestMainService.get(`/coins`)
      .then(({ result }) => store.dispatch(setCoins({ count: result.length, data: result })))
      .catch((res) => store.dispatch(setCoins({ error: res.error })));
  }

  static getCoinIdFromCoinCode(code: string, store: Store) {
    const coins = ObjectUtils.getIn(store.getState().coins, "data", []);
    return ObjectUtils.getIn(
      coins.find((item: any) => item.code === code),
      "coinId",
      ""
    );
  }

  static getCoinImageSrc(coinCode: string) {
    if (coinCode === "USDT") return "/assets/images/coins/usdt.png";
    if (coinCode === "ETHEREUM") return "/assets/images/coins/eth.png";
    if (coinCode === "USD") return "/assets/images/coins/usd.png";
    if (coinCode === "VLT") return "/assets/images/coins/vlt.png";
    if (coinCode === "MUT") return "/assets/images/coins/mut.png";
    if (coinCode === "MRT") return "/assets/images/coins/mrt.png";
    return "/assets/images/coins/usd.png";
  }

  // static async getSymbols(store: Store) {
  //   return RequestMainService.get(`/symbols`)
  //     .then(({ result }) => {
  //       const symbols = result.filter((v: any) => !["GBCBTC", "ETHBTC", "ETHUSDT"].includes(v.name));

  //       const currentSymbolName = decodeURIComponent(CookieService.get(ECookieVariable.USER_SYMBOL_ACTIVE_NAME));

  //       const symbolActive = symbols.find((v: any) => v.name === currentSymbolName) || symbols[0];
  //       CookieService.set(ECookieVariable.USER_SYMBOL_ACTIVE_NAME, ObjectUtils.getIn(symbolActive, "name"));
  //       CookieService.set(ECookieVariable.USER_SYMBOL_ACTIVE_ID, ObjectUtils.getIn(symbolActive, "symbolId"));

  //       store.dispatch({
  //         type: SET_SYMBOLS,
  //         data: {
  //           count: symbols.length,
  //           data: symbols,
  //         },
  //       });
  //     })
  //     .catch((res) => store.dispatch({ type: SET_SYMBOLS, error: res.error }));
  // }

  static getSymbolIdFromSymbolName(name: string, store: Store) {
    const symbols = ObjectUtils.getIn(store.getState().symbols, "data", []);
    return ObjectUtils.getIn(
      symbols.find((item: any) => item.name === name),
      "symbolId",
      ""
    );
  }

  static async getTradeData(limit = 2) {
    return RequestMainService.get(`/trading-view/apex-history`, {
      symbol: this.getSymbolActiveName(),
      limit,
    })
      .then((data) =>
        data.map((item: any) => {
          item[0] = item[0] * 1000;
          return item;
        })
      )
      .catch(() => false);
  }

  static getSymbolActiveName() {
    return decodeURIComponent(CookieService.get(ECookieVariable.USER_SYMBOL_ACTIVE_NAME));
  }

  static setSymbolActive(symbol: any) {
    CookieService.set(ECookieVariable.USER_SYMBOL_ACTIVE_NAME, symbol.name);
    CookieService.set(ECookieVariable.USER_SYMBOL_ACTIVE_ID, symbol.symbolId);
    MainService.forceUpdateApp();
  }

  static async getHistory() {
    return RequestMainService.get(`/order`, {
      page: 1,
      pageSize: 100,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  static async getInitTime() {
    return RequestMainService.getTime(`/time`).then((res) => {
      return new Date(res.result).getTime() + res._responseTime;
    });
  }

  // static async getSymbol(store: Store) {
  //   return RequestMainService.get(`/symbol`)
  //     .then(({ result }) => store.dispatch({ type: SET_SYMBOLS, data: result }))
  //     .catch((res) =>
  //       store.dispatch({
  //         type: SET_SYMBOLS,
  //         data: { error: res.error },
  //       })
  //     );
  // }

  static setSymbolActiveName(name: string) {
    CookieService.set(ECookieVariable.USER_SYMBOL_ACTIVE_NAME, name);
    window.location.reload();
  }

  static async getMarketInfo(coinId: any) {
    return RequestMainService.get(`/market-info/${CookieService.get(ECookieVariable.USER_SYMBOL_ACTIVE_ID)}/${coinId}`).then(({ result }) => result);
  }

  static async getLastResult() {
    return RequestMainService.get(`/trading-view/apex-history`, {
      symbol: this.getSymbolActiveName(),
      limit: 210,
    }).then((data) =>
      data.map((item: any) => {
        item[0] = item[0] * 1000;
        return item;
      })
    );
  }
  static async getCandleVolume() {
    const symbolId = this.getSymbolIdFromSymbolName(decodeURIComponent(CookieService.get(ECookieVariable.USER_SYMBOL_ACTIVE_NAME)), store);
    const coinId = this.getCoinIdFromCoinCode(CookieService.get(ECookieVariable.USER_TRADE_COIN), store);
    return RequestMainService.get(`/candle-volume/${symbolId}/${coinId}`).then((res) => {
      const { success, result } = res;
      if (success) return result;
      return [];
    });
  }

  static async getTradingResults() {
    return RequestMainService.get(`/trading-results`, {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
  }

  static exportReportFromOrders(orders: any[] = []) {
    const winOrders = orders.filter((item: any) => item.status === EOrderStatus.WIN);
    const winProfit: number = winOrders.reduce((output: any, item: any) => output + (item.profit - item.amount), 0);
    const winRevenue: number = winOrders.reduce((output: any, item: any) => output + item.profit, 0);

    const loseOrders = orders.filter((item: any) => item.status === EOrderStatus.LOSE);
    const loseProfit: number = loseOrders.reduce((output: any, item: any) => output + (item.profit > 0 ? item.amount - item.profit : item.amount), 0);

    const drawOrders = orders.filter((item: any) => item.status === EOrderStatus.DRAW);
    const drawAmount: number = drawOrders.reduce((output: any, item: any) => output + item.amount, 0);

    const type = winProfit > loseProfit ? "win" : winProfit < loseProfit ? "lose" : "draw";

    return {
      winOrders,
      winProfit: +winProfit.toFixed(2),
      winRevenue: +winRevenue.toFixed(2),
      loseOrders,
      loseProfit: +loseProfit.toFixed(2),
      type,
      drawOrders,
      drawAmount: +drawAmount.toFixed(2),
    };
  }

  static formatRawDataFilterResultCandles(data: any[], _store?: Store) {
    const currentServerTime = new Date((_store || store).getState().main.serverTime).getTime();
    return data.filter((item: any) => new Date(item[0]).getSeconds() === 30 && currentServerTime - item[0] > 31000);
  }
}
