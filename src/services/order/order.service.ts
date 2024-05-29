import { RequestMainService } from "../request";
import { UserService } from "../user";
import { CookieService, ECookieVariable } from "../cookie";
import { Store } from "redux";
// import { SET_TOTAL_OPEN_ORDER } from "./totalOpenOrder.reducer";
import { store } from "@/src/redux/store";

export class OrderService {
  // static async getAll

  static async placeOrder(payload: any) {
    return RequestMainService.post(`/order`, payload).then(() => {
      UserService.getWalletBalances(store);
    });
  }

  static async getTransactionHistory() {
    return RequestMainService.get(`/order/v1`);
  }

  static async getTransactionHistoryByDate(value: string) {
    return RequestMainService.get(`/order/v1/${value}`);
  }

  static async getUserList(params: any, status: string[]) {
    let statusString = "";

    status.map((item) => {
      statusString += `&status=${item}`;
      return item;
    });

    return RequestMainService.get(`/order?${statusString}`, {
      ...params,
      symbolId: CookieService.get(ECookieVariable.USER_SYMBOL_ACTIVE_ID),
    }).then(({ result }) => ({
      count: result.total,
      data: result.orders,
      result
    }));
  }

  static async cancel(orderId: any) {
    return RequestMainService.delete(`/order/${orderId}`);
  }

  // static async getTotalOpenOrder(store: Store, coinActive: any, clear: number) {
  //   const result =  {
  //     totalOrderUp: 0,
  //     totalOrderDown: 0,
  //     totalOrderAmountDown: 0,
  //     totalOrderAmountUp: 0
  //   };
  //   OrderService.getUserList({
  //     coinId: coinActive?.coinId,
  //     page: 1,
  //     pageSize: clear
  //   }, ['OPEN']).then(res=>{
  //       const count = res?.count || 0;
  //       if(res.data.length > 0){
  //         OrderService.getUserList({
  //           coinId: coinActive.coinId,
  //           page: 1,
  //           pageSize: count
  //       }, ['OPEN']).then((res)=>{
  //           let items = res.data;
  //           if(items){
  //               if(items.length > 0){
  //                   items.forEach((item:any) => {
  //                       if(item.option === "HIGHER") {
  //                         result.totalOrderAmountUp += item.amount;
  //                         result.totalOrderUp++;
  //                       }
  //                       if(item.option === "LOWER") {
  //                         result.totalOrderAmountDown += item.amount;
  //                         result.totalOrderDown++;
  //                       }
  //                   });
  //               }
  //           }

  //           store.dispatch({
  //             type: SET_TOTAL_OPEN_ORDER,
  //             data: result,
  //           })
  //       })
  //     }
  //     else{
  //       store.dispatch({
  //         type: SET_TOTAL_OPEN_ORDER,
  //         data: result,
  //       })
  //     }
  //   });
  //   return true;
  // }

  static async getOrderList(payload: any, status: string[]) {
    let statusString = "";

    status.map((item) => {
      statusString += `&status=${item}`;
      return item;
    });

    return RequestMainService.get(`/order/list?${statusString}`, {...payload, symbolId: CookieService.get(ECookieVariable.USER_SYMBOL_ACTIVE_ID)});
  }

  static async getOrderSumary(payload: any, status: string[]) {
    let statusString = "";

    status.map((item) => {
      statusString += `&status=${item}`;
      return item;
    });

    return RequestMainService.get(`/order/summary?${statusString}`, {...payload, symbolId: CookieService.get(ECookieVariable.USER_SYMBOL_ACTIVE_ID)});
  }
}
