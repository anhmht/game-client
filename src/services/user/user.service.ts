import { Store } from "redux";

import { setUserExternalWallets } from "@/src/redux/slices/userExternalWalletsSlice";
import { logOut, setAuth } from "@/src/redux/slices/userSlice";
import { store } from "@/src/redux/store";
import { ENetWork } from "../../types";
import { CookieService, ECookieVariable } from "../cookie";
import { MainService } from "../main";
import { RequestMainService } from "../request";
// import { SET_USER_KYC } from "./userKYC.reducer";
import { setUserWalletBalances } from "@/src/redux/slices/userWalletBalancesSlice";
import { setUserInternalWallets } from "@/src/redux/slices/userInternalWalletSlice";
import { SocketService } from "../socket";
import { setListCategory, setListProviders } from "@/src/redux/slices/gameSlice";
import { setUserPageInitializeStatus } from "@/src/redux/slices/mainSlice";

export class UserService {
  static async login(payload: any) {
    // const store = getClientStore();
    return RequestMainService.post(`/signin`, payload).then(async ({ result }) => {
      SocketService.disconnect();
      const { token, refreshToken } = result;
      CookieService.set(ECookieVariable.USER_ACCESS_TOKEN, token);
      CookieService.set(ECookieVariable.USER_REFRESH_TOKEN, refreshToken);
      if (!result.isTwoFa) {
        CookieService.set(ECookieVariable.USER_NOTIFY_TWO_FA, "true");
      }

      // await this.getUserData(getClientStore());
      await this.getUserData(store);

      // store.dispatch({ type: SET_AUTH, data: result });
      store.dispatch(setAuth(result));
      // store.dispatch({ type: SET_CURRENT_AUTH_SCREEN_TYPE, data: null });
      store.dispatch(setUserPageInitializeStatus("pending"));
      MainService.forceUpdateApp();
      return;
    });
  }

  static async loginFromThirdParty(payload: any) {
    // const store = getClientStore();

    return RequestMainService.post(`/user/login-with-game`, payload).then(async ({ result }) => {
      const { token } = result;
      CookieService.set(ECookieVariable.USER_ACCESS_TOKEN, token);

      // await this.getUserData(getClientStore());
      await this.getUserData(store);

      // store.dispatch({ type: SET_AUTH, data: result });
      store.dispatch(setAuth(result));
      MainService.forceUpdateApp();
      return result;
    });
  }

  static async auth(store: Store) {
    const token = CookieService.get(ECookieVariable.USER_ACCESS_TOKEN);
    if (token)
      return RequestMainService.get("/ping")
        .then(({ result }) => {
          // store.dispatch({ type: SET_AUTH, data: result });
          store.dispatch(setAuth(result));
          return this.getUserData(store);
        })
        .catch(() => false);
  }

  static async getUserData(store: Store) {
    // this.getKYC(store);
    this.getInternalWallets(store);
    // await Promise.all([this.getExternalWallets(store), this.getWalletBalances(store)]);
    await Promise.all([this.getWalletBalances(store)]);
  }

  static logout() {
    CookieService.remove(ECookieVariable.USER_ACCESS_TOKEN);
    CookieService.remove(ECookieVariable.USER_REFRESH_TOKEN);
    // const store = getClientStore();
    // store.dispatch({ type: LOG_OUT });
    store.dispatch(logOut(null));
    MainService.forceUpdateApp();
  }

  static async register(payload: any) {
    return RequestMainService.post(`/signup`, payload);
  }

  static async verifyRegister(code: string) {
    return RequestMainService.post(`/verify-signup/${code}`);
  }

  static async resendMailVerifyAccount() {
    return RequestMainService.post(`/resend-signup-email`);
  }

  static async getInternalWallets(store: Store) {
    return RequestMainService.get(`/deposit-address`)
      .then(({ result }) =>
        store.dispatch(
          setUserInternalWallets({
            count: Object.keys(result).length,
            data: Object.keys(result).reduce((output: any[], key) => {
              return [
                ...output,
                {
                  code: key.toUpperCase(),
                  ...result[key],
                },
              ];
            }, []),
          })
        )
      )
      .catch((res) =>
        store.dispatch(
          setUserInternalWallets({
            error: res.error,
          })
        )
      );
  }

  static async getExternalWallets(store: Store) {
    return RequestMainService.get(`/withdraw-address`)
      .then(({ result }) =>
        // store.dispatch({
        //   type: SET_USER_EXTERNAL_WALLETS,
        //   data: {
        //     count: Object.keys(result).length,
        //     data: Object.keys(result).reduce((output: any[], key) => {
        //       return [
        //         ...output,
        //         {
        //           code: key.toUpperCase(),
        //           ...result[key],
        //         },
        //       ];
        //     }, []),
        //   },
        // })
        store.dispatch(
          setUserExternalWallets({
            count: Object.keys(result).length,
            data: Object.keys(result).reduce((output: any[], key) => {
              return [
                ...output,
                {
                  code: key.toUpperCase(),
                  ...result[key],
                },
              ];
            }, []),
          })
        )
      )
      .catch((res) =>
        // store.dispatch({
        //   type: SET_USER_EXTERNAL_WALLETS,
        //   error: res.error,
        // })
        store.dispatch(
          setUserExternalWallets({
            error: res.error,
          })
        )
      );
  }

  static async getWalletBalances(store: Store) {
    return RequestMainService.get(`/balance`)
      .then(({ result }) => {
        return store.dispatch(
          setUserWalletBalances({
            count: Object.keys(result).length,
            data: Object.keys(result).reduce((output: any[], key) => {
              return [
                ...output,
                {
                  code: key.toUpperCase(),
                  amount: result[key],
                },
              ];
            }, []),
          })
        );
      })
      .catch((res) =>
        store.dispatch(
          setUserWalletBalances({
            error: res.error,
          })
        )
      );
  }

  static async changeExternalWalletAddress(coinCode: string, address: string, network: ENetWork) {
    return RequestMainService.post(`/bank/external-wallet`, {
      coin: coinCode,
      address,
      network,
    }).then(() => this.getExternalWallets(store));
  }

  // static async getKYC(store: Store) {
  //   return RequestMainService.get(`/user/kyc`)
  //     .then(({ result }) =>
  //       store.dispatch({
  //         type: SET_USER_KYC,
  //         data: result,
  //       })
  //     )
  //     .catch((res) =>
  //       store.dispatch({
  //         type: SET_USER_KYC,
  //         error: res.error,
  //       })
  //     );
  // }

  static async updateProfile(payload: any) {
    // return RequestMainService.post(`/user/profile`, payload).then(() => this.auth(getClientStore()));
    return RequestMainService.post(`/user/profile`, payload).then(() => this.auth(store));
  }

  static async sendRequestResetPasswordEmail(payload: any) {
    return RequestMainService.post(`/forgot-password`, payload);
  }

  static async resetPassword(newPassword: string, code: string) {
    return RequestMainService.post(`/reset-password`, {
      newPassword,
      code,
    });
  }

  static async updatePinCode(payload: any) {
    return RequestMainService.put(`/user/pin-code`, payload);
  }

  static async getPublicInfoByEmail(email: string) {
    return RequestMainService.get(`/user/public-info/${email}`).then(({ result }) => result);
  }

  static async changePassword(currentPassword: string, newPassword: string) {
    return RequestMainService.post(`/user/change-password`, {
      currentPassword,
      newPassword,
    });
  }

  static async getDataTwoFa() {
    return RequestMainService.get(`/user/get-two-fa-infomation`).then(({ result }) => result);
  }

  static async enableTwoFa(password: string, twoFaCode: string, secretCode: string) {
    return RequestMainService.post(`/user/enable-two-fa`, {
      password,
      twoFaCode,
      secretCode,
    });
  }

  static async disableTwoFa(password: string, twoFaCode: string) {
    return RequestMainService.post(`/user/disable-two-fa`, {
      password,
      twoFaCode,
    });
  }

  static async ExperienceRegister(payload: any) {
    return RequestMainService.post(`/experience-game`, payload);
  }

  static async BetsOfExperience(id: number) {
    return RequestMainService.get(`/experience-game/${id}/bet`);
  }

  static async getListExperienceRegister(params: any = {}) {
    return RequestMainService.get(`/experience-game`, params).then(({ result }) => ({
      count: result.total,
      data: result.data,
    }));
  }

  static async RequestClaim(payload: any) {
    return RequestMainService.post(`/request-claim`, payload);
  }

  static async handleReferralCodeRequired(payload: any) {
    return RequestMainService.post(`/user/create-aff`, payload);
  }

  static async getListRequestClaim(params: any = {}) {
    return RequestMainService.get(`/request-claim`, params).then(({ result }) => ({
      count: result.total,
      data: result.data,
    }));
  }

  static async checkUserByAccessToken() {
    return RequestMainService.get("/ping");
  }

  static async getListSupplier() {
    return RequestMainService.get("/suppliers").then(({ result }) => {
      store.dispatch(setListProviders(result));
    });
  }

  static async getListCategory() {
    return RequestMainService.get("/get-all-category").then(({ result }) => {
      store.dispatch(setListCategory(result));
    });
  }

  static async getListGame(param: any) {
    if (param?.categoryId === 0) delete param.categoryId;
    if (param?.supplierId === 0) delete param.supplierId;
    return RequestMainService.get("/game", param);
  }

  static async getLinkToPlay(payload: any) {
    const access_token = await RequestMainService.refreshAccessToken();
    await CookieService.set(ECookieVariable.USER_ACCESS_TOKEN, access_token);
    return RequestMainService.post(`/game/authentication`, payload);
  }

  static async getInfoClaimToday() {
    return RequestMainService.get(`/experience-game/today`);
  }

  static async getOrdersForClaim(experienceGameId: any) {
    return RequestMainService.get(`/experience-game/${experienceGameId}/bet`)
      .then(({ result }) => ({
        count: result?.length,
        data: result,
      }))
      .catch((err) => ({
        count: 0,
        data: [],
      }));
  }

  static async getOrderLatest(params: Object) {
    return RequestMainService.get("/order/latest", params);
  }

  // static async getGameTop(params: Object) {
  //   return RequestMainService.get("/game/top", params);
  // }

  static async getAirdropCIC() {
    return RequestMainService.get("/airdrop");
  }

  static async getTopAirdropCIC() {
    return RequestMainService.get("/bank/transaction?transactionTypeId=63&transactionTypeId=64", {
      page: 1,
      numberOfTransactionsPerPage: 6,
    });
  }

  static async getDepositMethod() {
    return RequestMainService.get("/qcash/deposit/get-availability");
  }

  static async getExchangeRateGateway(payload: any) {
    return RequestMainService.get("/qcash/deposit/get-exchange-rate", payload);
  }

  static async getWithdrawExchangeRateGateway(payload: any) {
    return RequestMainService.get("/qcash/payout/get-exchange-rate", payload);
  }

  static async handleDeposit(payload: any) {
    return RequestMainService.postXWwwFormUrlencoded("/qcash/deposit/submit-deposit", payload);
  }

  static async getDepositStatusDetail(payload: any) {
    return RequestMainService.get("/qcash/deposit/get-detail", payload);
  }

  static async getWithdrawStatusDetail(payload: any) {
    return RequestMainService.post("/qcash/payout/confirmed", payload);
  }

  static async getWithdrawMethod() {
    return RequestMainService.get("/qcash/payout/get-availability");
  }

  static async getBalanceEnquiry(payload: any) {
    return RequestMainService.get("/qcash/payout/balance-enquiry", payload);
  }

  static async handleWithdraw(payload: any) {
    return RequestMainService.postXWwwFormUrlencoded("/qcash/payout/submit", payload);
  }

  static async setWithdrawalPinCode(payload: any) {
    return RequestMainService.post("/pin-withdraw", payload);
  }

  static async changeWithdrawalPinCode(payload: any) {
    return RequestMainService.put("/pin-withdraw", payload);
  }

  static async resetWithdrawalPinCode(payload: any) {
    return RequestMainService.put("/pin-withdraw/forgot", payload);
  }

  static async checkAvailableExpGame(userId: number) {
    return RequestMainService.get(`/admin/experience-game/available/${userId}`)
      .then(() => true)
      .catch(() => false);
  }

  static async toggleSendEmail(value: boolean) {
    if (value === true) {
      return RequestMainService.post(`/send-email-withdraw/enable`);
    } else {
      return RequestMainService.post(`/send-email-withdraw/disable`);
    }
  }

  static async getPuzzleCaptcha(payload: any) {
    return RequestMainService.get("/puzzle-captcha", payload);
  }

  static async getTopProfit() {
    return RequestMainService.get("/game/top-profit").then(({ result }) => result);
  }

  static async getLastedProfit() {
    return RequestMainService.get("/game/lasted-profit").then(({ result }) => result);
  }

  static async getPrivateSaleList(params: any = {}) {
    return RequestMainService.get(`/private-sale`, params);
  }

  static async buyPrivateSale(payload:any) {
    return RequestMainService.post(`/private-sale`, payload);
  }

  static async getPrivateSalePurchaseHistory(params: any = {}) {
    return RequestMainService.get(`/token-sell`, params).then(({ result }) => ({
      count: result.total,
      data: result.data,
    }));
  }

  static async getOverviewDateReport(params: any = {}) {
    return RequestMainService.get(`/overview-data-report`, params);
  }

  static async getTotalPrivateSalePurchased() {
    return RequestMainService.get(`/token-sell/total`);
  }

  static async getAirdropHistory(params: any) {
    return RequestMainService.get(`/bank/transaction-commission-airdrop`, params).then(({ result }) => ({
      count: result.total,
      data: result.transactions,
      totalAmount: result.totalAmount,
    }));
  }
}
