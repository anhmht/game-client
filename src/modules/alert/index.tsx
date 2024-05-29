import React, { FC, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { translate } from "../../languages";
import { Icon } from "../icon";
import capitalize from "lodash/capitalize";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export enum EAlertType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}
interface IAlertItem {
  id?: any;
  type?: EAlertType;
  title?: string;
  message: string;
  secondTimeout?: number;
  isHover?: boolean;
}

export interface IAlertPayload {
  type?: EAlertType;
  title?: string;
  message: string;
}

export const onError = (res: any) => CreateAlert({ ...res.alert, type: EAlertType.ERROR });

export function CreateAlert(payload: IAlertPayload, secondTimeout: number = 5, theme: any = "colored") {
  let message = translate(payload.message).replace(/</g, "").replace(/>/g, "");
  try {
    switch (payload?.type) {
      case EAlertType.SUCCESS: {
        toast.success(message, {
          position: "top-right",
          autoClose: secondTimeout * 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          style: {
            background: "#55B938",
            alignItems: "center",
            fontFamily: "Pixel Operator",
            fontSize: "16px",
            fontWeight: "700",
          },
          closeButton: (
            <svg className="mr10" width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.99967 7.66659H9.66634V8.33325H10.333V8.99992H10.9997V9.66659H11.6663V10.3333H12.333V10.9999H12.9997V11.6666H13.6663V12.3333H12.9997V12.9999H12.333V13.6666H11.6663V12.9999H10.9997V12.3333H10.333V11.6666H9.66634V10.9999H8.99967V10.3333H8.33301V9.66659H7.66634V8.99992H6.33301V9.66659H5.66634V10.3333H4.99967V10.9999H4.33301V11.6666H3.66634V12.3333H2.99967V12.9999H2.33301V13.6666H1.66634V12.9999H0.999674V12.3333H0.333008V11.6666H0.999674V10.9999H1.66634V10.3333H2.33301V9.66659H2.99967V8.99992H3.66634V8.33325H4.33301V7.66659H4.99967V6.33325H4.33301V5.66659H3.66634V4.99992H2.99967V4.33325H2.33301V3.66659H1.66634V2.99992H0.999674V2.33325H0.333008V1.66659H0.999674V0.999919H1.66634V0.333252H2.33301V0.999919H2.99967V1.66659H3.66634V2.33325H4.33301V2.99992H4.99967V3.66659H5.66634V4.33325H6.33301V4.99992H7.66634V4.33325H8.33301V3.66659H8.99967V2.99992H9.66634V2.33325H10.333V1.66659H10.9997V0.999919H11.6663V0.333252H12.333V0.999919H12.9997V1.66659H13.6663V2.33325H12.9997V2.99992H12.333V3.66659H11.6663V4.33325H10.9997V4.99992H10.333V5.66659H9.66634V6.33325H8.99967V7.66659Z"
                fill="white"
                fillOpacity="0.941176"
              />
            </svg>
          ),
          icon: (
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1068_17044)">
                <path
                  d="M18.333 6.66658V5.83325H17.4997V4.99992H16.6663V4.16658H15.833V3.33325H14.9997V2.49992H14.1663V1.66659H13.333V0.833252H6.66634V1.66659H5.83301V2.49992H4.99967V3.33325H4.16634V4.16658H3.33301V4.99992H2.49967V5.83325H1.66634V6.66658H0.833008V13.3333H1.66634V14.1666H2.49967V14.9999H3.33301V15.8333H4.16634V16.6666H4.99967V17.4999H5.83301V18.3333H6.66634V19.1666H13.333V18.3333H14.1663V17.4999H14.9997V16.6666H15.833V15.8333H16.6663V14.9999H17.4997V14.1666H18.333V13.3333H19.1663V6.66658H18.333ZM8.33301 8.33325V9.16658H9.99967V8.33325H10.833V7.49992H11.6663V6.66658H13.333V7.49992H14.1663V9.16658H13.333V9.99992H12.4997V10.8333H11.6663V11.6666H10.833V12.4999H9.99967V13.3333H8.33301V12.4999H7.49967V11.6666H6.66634V10.8333H5.83301V9.16658H6.66634V8.33325H8.33301Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1068_17044">
                  <rect width={20} height={20} fill="white" />
                </clipPath>
              </defs>
            </svg>
          ),
        });
        break;
      }
      case EAlertType.WARNING: {
        toast.warn(message, {
          position: "top-right",
          autoClose: secondTimeout * 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          style: {
            background: "#E8B714",
            alignItems: "center",
            fontFamily: "Pixel Operator",
            fontSize: "16px",
            fontWeight: "700",
          },
          closeButton: (
            <svg className="mr10" width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.99967 7.66659H9.66634V8.33325H10.333V8.99992H10.9997V9.66659H11.6663V10.3333H12.333V10.9999H12.9997V11.6666H13.6663V12.3333H12.9997V12.9999H12.333V13.6666H11.6663V12.9999H10.9997V12.3333H10.333V11.6666H9.66634V10.9999H8.99967V10.3333H8.33301V9.66659H7.66634V8.99992H6.33301V9.66659H5.66634V10.3333H4.99967V10.9999H4.33301V11.6666H3.66634V12.3333H2.99967V12.9999H2.33301V13.6666H1.66634V12.9999H0.999674V12.3333H0.333008V11.6666H0.999674V10.9999H1.66634V10.3333H2.33301V9.66659H2.99967V8.99992H3.66634V8.33325H4.33301V7.66659H4.99967V6.33325H4.33301V5.66659H3.66634V4.99992H2.99967V4.33325H2.33301V3.66659H1.66634V2.99992H0.999674V2.33325H0.333008V1.66659H0.999674V0.999919H1.66634V0.333252H2.33301V0.999919H2.99967V1.66659H3.66634V2.33325H4.33301V2.99992H4.99967V3.66659H5.66634V4.33325H6.33301V4.99992H7.66634V4.33325H8.33301V3.66659H8.99967V2.99992H9.66634V2.33325H10.333V1.66659H10.9997V0.999919H11.6663V0.333252H12.333V0.999919H12.9997V1.66659H13.6663V2.33325H12.9997V2.99992H12.333V3.66659H11.6663V4.33325H10.9997V4.99992H10.333V5.66659H9.66634V6.33325H8.99967V7.66659Z"
                fill="white"
                fillOpacity="0.941176"
              />
            </svg>
          ),
          icon: (
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1068_17056)">
                <path
                  d="M18.333 16.6666V14.9999H17.4997V13.3333H16.6663V11.6666H15.833V9.99992H14.9997V8.33325H14.1663V6.66658H13.333V4.99992H12.4997V3.33325H11.6663V1.66659H10.833V0.833252H9.16634V1.66659H8.33301V3.33325H7.49967V4.99992H6.66634V6.66658H5.83301V8.33325H4.99967V9.99992H4.16634V11.6666H3.33301V13.3333H2.49967V14.9999H1.66634V16.6666H0.833008V18.3333H1.66634V19.1666H18.333V18.3333H19.1663V16.6666H18.333ZM8.33301 9.16658H11.6663V11.6666H10.833V14.1666H9.16634V11.6666H8.33301V9.16658ZM9.16634 14.9999H10.833V16.6666H9.16634V14.9999Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1068_17056">
                  <rect width={20} height={20} fill="white" />
                </clipPath>
              </defs>
            </svg>
          ),
        });
        break;
      }
      case EAlertType.ERROR: {
        toast.error(message, {
          position: "top-right",
          autoClose: secondTimeout * 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          style: {
            background: "#EB423A",
            alignItems: "center",
            fontFamily: "Pixel Operator",
            fontSize: "16px",
            fontWeight: "700",
          },
          closeButton: (
            <svg className="mr10" width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.99967 7.66659H9.66634V8.33325H10.333V8.99992H10.9997V9.66659H11.6663V10.3333H12.333V10.9999H12.9997V11.6666H13.6663V12.3333H12.9997V12.9999H12.333V13.6666H11.6663V12.9999H10.9997V12.3333H10.333V11.6666H9.66634V10.9999H8.99967V10.3333H8.33301V9.66659H7.66634V8.99992H6.33301V9.66659H5.66634V10.3333H4.99967V10.9999H4.33301V11.6666H3.66634V12.3333H2.99967V12.9999H2.33301V13.6666H1.66634V12.9999H0.999674V12.3333H0.333008V11.6666H0.999674V10.9999H1.66634V10.3333H2.33301V9.66659H2.99967V8.99992H3.66634V8.33325H4.33301V7.66659H4.99967V6.33325H4.33301V5.66659H3.66634V4.99992H2.99967V4.33325H2.33301V3.66659H1.66634V2.99992H0.999674V2.33325H0.333008V1.66659H0.999674V0.999919H1.66634V0.333252H2.33301V0.999919H2.99967V1.66659H3.66634V2.33325H4.33301V2.99992H4.99967V3.66659H5.66634V4.33325H6.33301V4.99992H7.66634V4.33325H8.33301V3.66659H8.99967V2.99992H9.66634V2.33325H10.333V1.66659H10.9997V0.999919H11.6663V0.333252H12.333V0.999919H12.9997V1.66659H13.6663V2.33325H12.9997V2.99992H12.333V3.66659H11.6663V4.33325H10.9997V4.99992H10.333V5.66659H9.66634V6.33325H8.99967V7.66659Z"
                fill="white"
                fillOpacity="0.941176"
              />
            </svg>
          ),
          icon: (
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1068_17050)">
                <path
                  d="M18.333 6.66658V5.83325H17.4997V4.99992H16.6663V4.16658H15.833V3.33325H14.9997V2.49992H14.1663V1.66659H13.333V0.833252H6.66634V1.66659H5.83301V2.49992H4.99967V3.33325H4.16634V4.16658H3.33301V4.99992H2.49967V5.83325H1.66634V6.66658H0.833008V13.3333H1.66634V14.1666H2.49967V14.9999H3.33301V15.8333H4.16634V16.6666H4.99967V17.4999H5.83301V18.3333H6.66634V19.1666H13.333V18.3333H14.1663V17.4999H14.9997V16.6666H15.833V15.8333H16.6663V14.9999H17.4997V14.1666H18.333V13.3333H19.1663V6.66658H18.333ZM13.333 14.1666H11.6663V13.3333H10.833V12.4999H9.16634V13.3333H8.33301V14.1666H6.66634V13.3333H5.83301V11.6666H6.66634V10.8333H7.49967V9.16658H6.66634V8.33325H5.83301V6.66658H6.66634V5.83325H8.33301V6.66658H9.16634V7.49992H10.833V6.66658H11.6663V5.83325H13.333V6.66658H14.1663V8.33325H13.333V9.16658H12.4997V10.8333H13.333V11.6666H14.1663V13.3333H13.333V14.1666Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1068_17050">
                  <rect width={20} height={20} fill="white" />
                </clipPath>
              </defs>
            </svg>
          ),
        });
        break;
      }
      default:
        toast.success(message, {
          position: "top-right",
          autoClose: secondTimeout * 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          style: {
            background: "#55B938",
            alignItems: "center",
            fontFamily: "Pixel Operator",
            fontSize: "16px",
            fontWeight: "700",
          },
          closeButton: (
            <svg className="mr10" width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.99967 7.66659H9.66634V8.33325H10.333V8.99992H10.9997V9.66659H11.6663V10.3333H12.333V10.9999H12.9997V11.6666H13.6663V12.3333H12.9997V12.9999H12.333V13.6666H11.6663V12.9999H10.9997V12.3333H10.333V11.6666H9.66634V10.9999H8.99967V10.3333H8.33301V9.66659H7.66634V8.99992H6.33301V9.66659H5.66634V10.3333H4.99967V10.9999H4.33301V11.6666H3.66634V12.3333H2.99967V12.9999H2.33301V13.6666H1.66634V12.9999H0.999674V12.3333H0.333008V11.6666H0.999674V10.9999H1.66634V10.3333H2.33301V9.66659H2.99967V8.99992H3.66634V8.33325H4.33301V7.66659H4.99967V6.33325H4.33301V5.66659H3.66634V4.99992H2.99967V4.33325H2.33301V3.66659H1.66634V2.99992H0.999674V2.33325H0.333008V1.66659H0.999674V0.999919H1.66634V0.333252H2.33301V0.999919H2.99967V1.66659H3.66634V2.33325H4.33301V2.99992H4.99967V3.66659H5.66634V4.33325H6.33301V4.99992H7.66634V4.33325H8.33301V3.66659H8.99967V2.99992H9.66634V2.33325H10.333V1.66659H10.9997V0.999919H11.6663V0.333252H12.333V0.999919H12.9997V1.66659H13.6663V2.33325H12.9997V2.99992H12.333V3.66659H11.6663V4.33325H10.9997V4.99992H10.333V5.66659H9.66634V6.33325H8.99967V7.66659Z"
                fill="white"
                fillOpacity="0.941176"
              />
            </svg>
          ),
          icon: (
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1068_17044)">
                <path
                  d="M18.333 6.66658V5.83325H17.4997V4.99992H16.6663V4.16658H15.833V3.33325H14.9997V2.49992H14.1663V1.66659H13.333V0.833252H6.66634V1.66659H5.83301V2.49992H4.99967V3.33325H4.16634V4.16658H3.33301V4.99992H2.49967V5.83325H1.66634V6.66658H0.833008V13.3333H1.66634V14.1666H2.49967V14.9999H3.33301V15.8333H4.16634V16.6666H4.99967V17.4999H5.83301V18.3333H6.66634V19.1666H13.333V18.3333H14.1663V17.4999H14.9997V16.6666H15.833V15.8333H16.6663V14.9999H17.4997V14.1666H18.333V13.3333H19.1663V6.66658H18.333ZM8.33301 8.33325V9.16658H9.99967V8.33325H10.833V7.49992H11.6663V6.66658H13.333V7.49992H14.1663V9.16658H13.333V9.99992H12.4997V10.8333H11.6663V11.6666H10.833V12.4999H9.99967V13.3333H8.33301V12.4999H7.49967V11.6666H6.66634V10.8333H5.83301V9.16658H6.66634V8.33325H8.33301Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1068_17044">
                  <rect width={20} height={20} fill="white" />
                </clipPath>
              </defs>
            </svg>
          ),
        });
    }
  } catch (error) {
    console.error(error);
  }
}
