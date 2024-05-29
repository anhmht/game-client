import { CookieService, ECookieVariable } from "./services";
import { ELocale } from "./types";
import dictionary from "../bin/lang/dictionary.min.json";

export type TLocale = {
  id: number;
  key: ELocale;
  locale: ELocale;
  label: string;
  description: string;
  isActive: boolean;
  order: number;
};

export const locales: TLocale[] = [
  {
    id: 1,
    key: ELocale.ENGLISH,
    locale: ELocale.ENGLISH,
    label: "EN",
    description: "English",
    isActive: true,
    order: 1,
  },
  {
    id: 2,
    key: ELocale.VIETNAM,
    locale: ELocale.VIETNAM,
    label: "VI",
    description: "Tiếng Việt",
    isActive: true,
    order: 2,
  },
  {
    id: 3,
    key: ELocale.KOREAN,
    locale: ELocale.KOREAN,
    label: "KR",
    description: "한국인",
    isActive: true,
    order: 3,
  },
  {
    id: 4,
    key: ELocale.MYANMAR,
    locale: ELocale.MYANMAR,
    label: "MY",
    description: "မြန်မာ",
    isActive: true,
    order: 4,
  },
  {
    id: 5,
    key: ELocale.CHINA,
    locale: ELocale.CHINA,
    label: "CH",
    description: "中國人",
    isActive: false,
    order: 4,
  },
  // {
  //   id: 5,
  //   key: ELocale.RUSSIAN,
  //   locale: ELocale.RUSSIAN,
  //   label: "RU",
  //   isActive: false,
  //   order: 5,
  // },

  // {
  //     id: 5,
  //     key: ELocale.INDIA,
  //     locale: ELocale.ENGLISH,
  //     label: "IND",
  //     isActive: true,
  //     order: 5,
  // },
  // {
  //     id: 6,
  //     key: ELocale.INDONESIA,
  //     locale: ELocale.ENGLISH,
  //     label: "ID",
  //     isActive: true,
  //     order: 6,
  // },
  // {
  //     id: 7,
  //     key: ELocale.FRENCH,
  //     locale: ELocale.ENGLISH,
  //     label: "FR",
  //     isActive: true,
  //     order: 7,
  // },
  // {
  //     id: 8,
  //     key: ELocale.SPAIN,
  //     locale: ELocale.ENGLISH,
  //     label: "ESP",
  //     isActive: true,
  //     order: 8,
  // },
].sort((a, b) => a.order - b.order);

export const defaultLocale = locales[0];

export const setLocale = (locale: ELocale): void => {
  CookieService.set(ECookieVariable.USER_LOCALE, locale);
  window.location.reload();
};

export const getLocale = (): TLocale => {
  let locale: TLocale;

  const fromCookie = CookieService.get(ECookieVariable.USER_LOCALE);
  const currentLocale = locales.find((item) => item.key === fromCookie);
  if (!currentLocale) {
    locale = defaultLocale;
    CookieService.set(ECookieVariable.USER_LOCALE, locale.key);
  } else {
    locale = currentLocale;
  }

  return locale;
};

export const getLocaleKey = (): string => getLocale().locale;
export const getLocaleCode = (): string => getLocale().key;

export const translate = (id: string, values?: any): string => {
  const locale: string = getLocaleCode();
  let sentence: string;

  // @ts-ignore
  if (dictionary[id] && dictionary[id][locale]) {
    // @ts-ignore
    sentence = dictionary[id][locale];
  } else {
    console.warn(`Don't have any messages match with id: "${id}"`);
    return `<${id}>`;
  }

  // Match values
  if (typeof values === "object") {
    Object.entries(values).map((item: any) => {
      // @ts-ignore
      sentence = sentence.replace(new RegExp(`{${item[0]}}`, "g"), item[1]);
      return item;
    });
  }

  return sentence;
};
