import { parseCookies, setCookie } from "nookies";

export enum ECookieVariable {
  // ======================= User related =======================
  USER_ACCESS_TOKEN = "app_usr_ac_tk",
  USER_REFRESH_TOKEN = "app_usr_rf_tk",
  USER_LOCALE = "app_locale",
  USER_SYMBOL_ACTIVE_NAME = "app_symbol_active_name",
  USER_SYMBOL_ACTIVE_ID = "app_symbol_active_id",
  USER_TRADE_COIN = "app_trade_coin",
  USER_NOTIFY_TWO_FA = "notify_two_fa",
  REFERRAL_CODE = "referral_code",
  OPEN_POPUP_NEWS = "open_popup_news",
}

export class CookieService {
  static context = null;

  static setContext(newContext: any) {
    this.context = newContext;
  }

  static get(name: ECookieVariable) {
    const isServer = typeof window === "undefined";

    if (!isServer) {
      // ======================= From Client Side =======================
      const value = "; " + document.cookie;
      const parts: any = value.split("; " + name + "=");
      if (parts.length == 2) {
        return parts.pop().split(";").shift() || "";
      }
    } else {
      // ======================= From Server Side =======================
      const cookies = parseCookies(this.context);
      return cookies[name] || "";
    }
  }

  static parseCookies() {
    return parseCookies(this.context);
  }

  static set(name: ECookieVariable, value: string, options = {}) {
    try {
      const ONE_DAY = 86400;
      options = {
        maxAge: ONE_DAY * 120,
        path: "/",
        // sameSite: 'Strict',
        ...options,
      };

      setCookie(this.context, name, value, options);
    } catch (error) {}
  }

  static remove(name: ECookieVariable) {
    try {
      this.set(name, "");
    } catch (error) {}
  }
}
