export enum ELocale {
  ENGLISH = "en-US",
  VIETNAM = "vi-VN",
  KOREAN = "ko-KR",
  CHINA = "zh-CN",
  INDIA = "hi-IN",
  INDONESIA = "id-ID",
  FRENCH = "fr-FR",
  SPAIN = "es-ES",
  RUSSIAN = "ru-RU",
  MYANMAR = "my-MM"
}

export interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export enum EDeviceType {
  DESKTOP = "Desktop",
  MOBILE = "Mobile",
}

export enum EOrderStatus {
  OPEN = "OPEN",
  WIN = "WIN",
  LOSE = "LOSE",
  DRAW = "DRAW",
}

export enum EOrderOption {
  HIGHER = "HIGHER",
  LOWER = "LOWER",
}

export interface IOrder {
  orderId: number;
  userId: number;
  symbolId: number;
  coinId: number;
  amount: number;
  profit: number;
  status: EOrderStatus;
  option: EOrderOption;
  created: Date;
  modified: Date;
}

export enum ETypeApplication {
  DOC = "doc",
  DOCX = "docx",
  PDF = "pdf",
  JPG = "jpg",
  PNG = "png",
  JPEG = "jpeg",
}

export enum ENetWork {
  BEP20 = "BEP20",
  TRC20 = "TRC20",
  QCASH = "QCash"
}

export enum EToken {
  USDT = "USDT",
}
