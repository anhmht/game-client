import moment from "moment";
import { getLocaleCode } from "../../languages";
import { RequestMainService } from "../request";
import { CookieService, ECookieVariable } from "../cookie";
import { setDetailNews, setDetailNewsPopup, setListNews } from "@/src/redux/slices/newsSlice";
import { store } from "@/src/redux/store";
export class NewsService {
  static async getListNews() {
    return RequestMainService.get(`/news`, {
      lang: getLocaleCode(),
    }).then(({ result }) => {
      store.dispatch(setListNews(result?.data));

      (async () => {
        const currentTimeDay = moment();
        const lastOpenPopup = moment.unix(CookieService.get(ECookieVariable.OPEN_POPUP_NEWS)).add(30, "minutes");

        const openPopup = (await CookieService.get(ECookieVariable.OPEN_POPUP_NEWS)) ? moment(currentTimeDay).isAfter(lastOpenPopup) : true;

        // this.getNewsDetailPopup(openPopup ? result?.data?.[0]?.newsId : "");
      })();
      // this.getNewsDetail(result?.data?.[0]?.newsId);
    });
  }

  static async getNewsDetail(id: any) {
    if (id !== "")
      return RequestMainService.get(`/news/${id}`, {
        lang: getLocaleCode(),
      })
        .then(({ result }) => {
          store.dispatch(setDetailNews(result?.data));
        })
        .catch((res) => {
          return null;
        });
  }

  static async getNewsDetailPopup(id: any) {
    if (id !== "")
      return RequestMainService.get(`/news/${id}`, {
        lang: getLocaleCode(),
      })
        .then(({ result }) => {
          store.dispatch(setDetailNewsPopup(result?.data));
        })
        .catch((res) => {
          return null;
        });
  }

  static async getNewsBySlug(slug: string) {
    return RequestMainService.get(`/get-news-by-slug`, {
      slug,
      lang: getLocaleCode(),
    }).then(({ result }) => result?.data?.[0]);
  }
}
