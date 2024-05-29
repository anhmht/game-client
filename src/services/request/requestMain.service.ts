import Axios, { AxiosError } from "axios";

import { getLocale, translate } from "../../languages";
import { CreateAlert, EAlertType, IAlertPayload, ObjectUtils } from "../../modules";
import { CookieService, ECookieVariable } from "../cookie";
import { UserService } from "../user";
import { store } from "@/src/redux/store";

const qs = require("qs");

Axios.interceptors.request.use((x: any) => {
  x.meta = x.meta || {};
  x.meta.requestStartedAt = new Date().getTime();
  const token = CookieService.get(ECookieVariable.USER_ACCESS_TOKEN);
  x.headers = {
    ...x.headers,
    token: token,
  };
  return x;
});

Axios.interceptors.response.use(
  (x: any) => {
    x.config.meta.responseTime = new Date().getTime() - x.config.meta.requestStartedAt;
    return x;
  },
  // Handle 4xx & 5xx responses
  async (x) => {
    x.config.meta.responseTime = new Date().getTime() - x.config.meta.requestStartedAt;
    const originalRequest = x.config;
    if (x.response?.status !== 401 && !originalRequest._retry && x.response?.data?.message === "MUST_BE_USER") {
      const access_token = await RequestMainService.refreshAccessToken();
      if (access_token) {
        CookieService.set(ECookieVariable.USER_ACCESS_TOKEN, access_token);
        originalRequest._retry = true;
        return Axios(originalRequest);
      }
      return Promise.reject(x);
    }
    if (x.response?.status === 401) {
      // CookieService.remove(ECookieVariable.USER_ACCESS_TOKEN);
      // CookieService.remove(ECookieVariable.USER_REFRESH_TOKEN);
      // window.location.reload();
      UserService.logout();
    }

    return Promise.reject(x);
  }
);

export class RequestMainError extends Error {
  status: number;
  message: string;
  errors: any;
  error: any;
  alert: IAlertPayload;
  constructor(error: AxiosError) {
    super(error as any);
    this.message =
      ObjectUtils.getIn(error, "response.data.message", (message: string) => translate(message)) || translate("unknown-error-from-the-system");
    this.errors = ObjectUtils.getIn(error, "response.data.errors");
    this.status = ObjectUtils.getIn(error, "response.status", 3001);

    // Handle axios error
    if (error.code === "ECONNABORTED" || error.message === "Network Error" || this.status === 3001) this.message = translate("network-error");
    else if (error.response && typeof error.response.data === "string") this.message = error.response.data;
    else if (this.status === 900) this.message = translate("SERVER_MAINTENANCE");
    this.error = {
      message: this.message,
      errors: this.errors,
      status: this.status,
    };
    //console.log('this.message ', error.message );
    this.alert = {
      message: this.message,
      type: EAlertType.ERROR,
    };
  }
}

export class RequestMainService {
  static getURL(subURL: string) {
    return `${process.env["NEXT_PUBLIC_URL_API_MAIN_CLIENT_SIDE"]}${subURL}`;
  }

  static getConfigs(params = {}) {
    return {
      params: Object.assign(ObjectUtils.cleanObj(params), {}),
      timeout: 20000,
      headers: ObjectUtils.cleanObj({
        locale: getLocale(),
        token: CookieService.get(ECookieVariable.USER_ACCESS_TOKEN) || "",
      }),
    };
  }

  static async getTime(subURL: string) {
    return Axios.get(this.getURL(subURL))
      .then((res) => ({
        ...res.data,
        _responseTime: ObjectUtils.getIn(res, "config.meta.responseTime"),
      }))
      .catch((err) => {
        throw new RequestMainError(err);
      });
  }

  static async get(subURL: string, params = {}, isGetResponseTime = false) {
    return Axios.get(this.getURL(subURL), this.getConfigs(params))
      .then((res) => {
        if (isGetResponseTime)
          return {
            ...res.data,
            _responseTime: ObjectUtils.getIn(res, "config.meta.responseTime"),
          };

        return res.data;
      })
      .catch((err) => {
        throw new RequestMainError(err);
      });
  }

  static async post(subURL: string, payload = {}) {
    return Axios.post(this.getURL(subURL), payload, this.getConfigs())
      .then((res) => res.data)
      .catch((err) => {
        throw new RequestMainError(err);
      });
  }

  static async postXWwwFormUrlencoded(subURL: string, payload = {}) {
    return Axios.post(this.getURL(subURL), qs.stringify(payload), {
      ...this.getConfigs(),
      headers: { ...this.getConfigs().headers, "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.data)
      .catch((err) => {
        throw new RequestMainError(err);
      });
  }

  static async put(subURL: string, payload = {}) {
    return Axios.put(this.getURL(subURL), payload, this.getConfigs())
      .then((res) => res.data)
      .catch((err) => {
        throw new RequestMainError(err);
      });
  }

  static async delete(subURL: string) {
    return Axios.delete(this.getURL(subURL), this.getConfigs())
      .then((res) => res.data)
      .catch((err) => {
        throw new RequestMainError(err);
      });
  }

  static async refreshAccessToken() {
    const refreshToken = CookieService.get(ECookieVariable.USER_REFRESH_TOKEN);
    return this.post(`/user/token`, {
      refreshToken,
    })
      .then(({ result }) => result.token)
      .catch((err) => {
        throw new RequestMainError(err);
      });
  }
}
