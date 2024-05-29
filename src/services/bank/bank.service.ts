import { Store } from "redux";
import capitalize from "lodash/capitalize";

import { RequestMainService } from "../request";
// import { SET_COIN_CONVERSION_RATE } from "./coinConversionRate.reducer";
import { UserService } from "../user";
import { translate } from "../../languages";
import { ENetWork, EToken } from "../../types";
import { store } from "@/src/redux/store";
import { setNetworkOptions } from "@/src/redux/slices/mainSlice";

export interface IRequestWithdrawPayload {
  coinId: number;
  feeCoinId: number;
  value: number;
  twoFaCode: string;
  network: ENetWork;
  token: EToken;
  address: string;
  methodVerify: string;
  pinCode: number;
}

export class BankService {
  static async getTransactions(params: any = {}) {
    return RequestMainService.get(`/bank/transaction`, params).then(({ result }) => ({
      count: result.total,
      data: result.transactions,
      monthlyProfit: result.monthlyProfit,
      monthlyProfitPercent: result.monthlyProfitPercent,
    }));
  }

  static async getTransactionsCommission(params: any = {}) {
    return RequestMainService.get(`/bank/transaction-commission`, params).then(({ result }) => ({
      count: result.total,
      data: result.transactions,
      totalAmount: result.totalAmount,
      personalSales: result.personalSales,
      teamSales: result.teamSales
    }));
  }

  static async requestWithdraw(payload: IRequestWithdrawPayload) {
    return RequestMainService.post(`/bank/withdraw/confirm`, payload);
  }

  static async requestTransfer(payload: any) {
    // return RequestMainService.post(`/bank/transfer-request`, payload).then(() => UserService.getWalletBalances(getClientStore()));
    return RequestMainService.post(`/bank/transfer-request`, payload).then(() => UserService.getWalletBalances(store));
  }

  static async withdraw(code: string) {
    return RequestMainService.post(`/verify-withdrawal`, { code });
  }

  // static async getCoinConversionRate(store: Store) {
  //   return RequestMainService.get(`/bank/rates-to-usd`)
  //     .then(({ result }) => store.dispatch({ type: SET_COIN_CONVERSION_RATE, data: result }))
  //     .catch((res) =>
  //       store.dispatch({
  //         type: SET_COIN_CONVERSION_RATE,
  //         error: res.error,
  //       })
  //     );
  // }

  static async requestExchange(payload: any) {
    return RequestMainService.post(`/bank/exchange-request`, payload);
  }

  static async fillDemo() {
    return RequestMainService.post(`/demo/fill`).then(() => UserService.getWalletBalances(store));
  }

  static getTransactionTypeOptions() {
    return [
      // { label: "INIT", value: 0 },
      { label: "DEPOSIT", value: 1 },
      { label: "WITHDRAW", value: 2 },
      // { label: "RECEIVE_TRANSFER", value: 3 },
      // { label: "SEND_TRANSFER", value: 4 },
      // { label: "DEPOSIT_FEE", value: 5 },
      { label: "WITHDRAW_FEE", value: 6 },
      // { label: "SEND_TRANSFER_FEE", value: 7 },
      // { label: "RECEIVE_TRANSFER_FEE", value: 8 },
      // { label: "TRADE_FEE", value: 9 },
      // { label: "OTHER_INCOME", value: 10 },
      // { label: "OTHER_FEE", value: 11 },
      // { label: "BUY_PRESALE_COIN", value: 12 },
      { label: "REFUND_WITHDRAW_FEE", value: 13 },
      // { label: "DIRECT_COMMISSION", value: 14 },
      // { label: "BUY_AGENCY_LICENSE", value: 15 },
      // { label: "UPGRADE_MINER", value: 16 },
      // { label: "BANK_RECEIVE_FROM_USERS", value: 17 },
      // { label: "BANK_SEND_TO_USERS", value: 18 },
      // { label: "EXCHANGE_SENT", value: 19 },
      // { label: "EXCHANGE_RECEIVED", value: 20 },
      // { label: "SEND_EXCHANGE_FEE", value: 21 },
      // { label: "BUY_MINER_COMMISSION", value: 22 },
      // { label: "UPGRADE_MINER_COMMISSION", value: 23 },
      // { label: "SYSTEM_COMMISSION", value: 24 },
      // { label: "CASH_BACK", value: 25 },
      // { label: "RANK_COMMISSION", value: 26 },
      { label: "REFUND_WITHDRAW", value: 27 },
      // { label: "REFILL_DEMO_ACCOUNT", value: 28 },
      // { label: "RETURN_MINER_FEE", value: 29 },
      // { label: "PLACE_GAME", value: 46 },
      // { label: "GAME_PROFIT", value: 47 },
      // { label: "AIRDROP_TOKEN", value: 48 },
      // { label: "AIRDROP_TOKEN_FROM_USER", value: 49 },
      // { label: "EXPERIENCE_GAME_REFUND", value: 50 },
      // { label: "CANCEL_GAME", value: 52 },
      // { label: "EXCHANGE_OUT", value: 53 },
      // { label: "EXCHANGE_OUT_FEE", value: 54 },
      // { label: "EXCHANGE_IN", value: 55 },
      // { label: "GAME_RECOVERY", value: 56 },
      // { label: "GAME_ADJUST", value: 57 },
      // { label: "GAME_TIP", value: 58 },
      // { label: "GAME_GIVE_PROMOTION", value: 59 },
      // { label: "GAME_REFUND", value: 60 },
      // { label: "GAME_CANCEL_TIP", value: 61 },
      // { label: "EXPERIENCE_GAME_FEE", value: 62 },
      // { label: "CIC_AIRDROP", value: 63 },
      // { label: "CIC_AIRDROP_FROM_F1", value: 64 }
      // { label: "AIRDROP_TOKEN_COMMISSION", value: 68 },
      // { label: "AIRDROP_TOKEN_COMMISSION_TO_USER", value: 69 },
      // { label: "USER_PROMOTION", value: 70 },
      // { label: "DEPOSIT_BONUS", value: 72 },
      // { label: "LOSE_7", value: 73 },
      // { label: "LOSE_9", value: 74 },
      { label: "BUY_PRIVATE_SALE", value: 76 },
      { label: "REJECT_PRIVATE_SALE", value: 78 },
    ].map((v) => ({
      ...v,
      label: translate(v.label),
    }));
  }

  static getCommissonTransactionTypeOptions() {
    return [
      // { label: "CASH_BACK", value: 25 },
      { label: "DIRECT_COMMISSION", value: 14 },
      { label: "RANK_COMMISSION", value: 26 },
    ].map((v) => ({
      ...v,
      label: translate(v.label),
    }));
  }

  static getConvertTransactionTypeOptions() {
    return [
      { label: "EXCHANGE_SENT", value: 19 },
      { label: "EXCHANGE_RECEIVED", value: 20 },
    ].map((v) => ({
      ...v,
      label: translate(v.label),
    }));
  }

  static async exchangeMTGFromMetaGamesToMetaniex(payload: any) {
    return RequestMainService.post(`/exchange-game/refund`, payload);
  }

  static async exchangeMTGFromMetaniexToMetaGames(payload: any) {
    return RequestMainService.post(`/exchange-game/payment`, payload);
  }

  static async getInfoExchangeFromMetaniexToMetaGames(param: any) {
    return RequestMainService.get(`/exchange-game/payment/${param?.orderNum}`);
  }

  static async getMTGBalanceFomMetaniex(symbol: string) {
    return RequestMainService.get(`/exchange-game/accountBalance/` + symbol);
  }

  static async getTokenStandard(store: Store) {
    return RequestMainService.get("/token-standard").then(({ result }) =>
      store.dispatch(
        setNetworkOptions(
          result
            ?.filter((item: any) => item?.ENABLE)
            ?.map((item: any) => ({
              label: item?.TOKEN_STANDARD_NAME,
              value: item?.TOKEN_STANDARD_NAME,
            }))
        )
      )
    );
  }

  static async depositPromotion() {
    return RequestMainService.post("/deposit/promotion");
  }
}
