import { RequestMainService } from "../request";
import { Store } from "redux";
import { ObjectUtils } from "../../modules";
import { store } from "@/src/redux/store";
import { setUserAffiliate } from "@/src/redux/slices/userAffiliateSlice";

export default class AffiliateService {
  static async getInfo() {
    return RequestMainService.get(`/affiliation-system`)
      .then(async ({ result }) => {
        const totalMemebers = await this.getTotalMembers();

        store.dispatch(setUserAffiliate({ ...result, totalMemebers }));
      })
      .catch((res) => store.dispatch(setUserAffiliate(res.error)));
  }

  static async getTotalMembers() {
    const userId = store.getState().user.userId;
    return RequestMainService.get(`/tree/99/${userId}`).then((res) => res.result.filter((v: any) => v.userId !== userId).length);
  }

  static async buyAgencyLicense() {
    // return RequestMainService.post(`/agency-license`).then(() => this.getInfo(getClientStore()));
    return RequestMainService.post(`/agency-license`).then(() => this.getInfo());
  }

  static getRankImage(rank: number): string {
    let rankNumber = 0;

    if (typeof rank === "number") {
      if (rank > 5) rankNumber = 5;
      if (rank < 0) rankNumber = 0;
      rankNumber = rank;
    }

    return `/assets/images/rank/_${rankNumber}.png`;
  }

  static async getF1List(store: Store, params: any = {}) {
    const userId = store.getState().user.userId;
    return RequestMainService.get(`/tree/1/${userId}`).then((res) => {
      const data = res.result.filter((v: any) => v.presenterId === userId);

      const offset = ObjectUtils.getIn(params, "offset", 0);
      const limit = ObjectUtils.getIn(params, "limit", 10);

      return {
        count: data.length,
        data: data.slice(offset, offset + limit),
      };
    });
  }

  static async getAffiliation(numberOflevelsFromRoot: any, rootUserId: any) {
    return RequestMainService.get(`/tree/${numberOflevelsFromRoot}/${rootUserId}`).then((res) => res.result);
  }

  static async getUserDetailByDisplayName(DisplayName: string) {
    return await RequestMainService.get(`/user/public-info/${DisplayName}`);
    // return {
    //     userInfo: userInfoRes.result,
    // };
  }

  static async getStatisticAffiliateByUserId(rootUserId: any) {
    return RequestMainService.get(`/affiliation-by-user`, { userId: rootUserId });
  }

  static async getTableDownLine(params: any) {
    return RequestMainService.get(`/down-line`, params).then(({ result }) => ({
      count: result?.total,
      data: result?.data,
    }));
  }

  static async getTableLevelTier(params: any) {
    return RequestMainService.get("/affiliation-rank-config", params).then(({ result }) => ({
      count: result?.length + 1,
      data: [
        {
          rank: 0,
          volume: 0,
          volumeF1: 0,
          totalVolume: 0,
          commissionPercent: 0,
          active: true,
        },
        ...result,
      ],
    }));
  }

  static async getConfigWithdrawFee() {
    return RequestMainService.get("/withdraw-fee-config").then(({ result }) => result);
  }

  static async getReferralLevels(params: any = {}) {
    return RequestMainService.get(`/refferal-levels`, params).then(({ result }) => ({
      count: result?.length,
      data: result,
    }));
  }
}
