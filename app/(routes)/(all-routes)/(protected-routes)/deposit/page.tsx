"use client";

import React, { memo, useEffect, useState } from "react";
import { InputDateTime, InputNumber, InputText, UserCol, UserRow } from "@/src/components";
import { InputImageSingle } from "@/src/components/single-image";
import { getLocaleKey, translate } from "@/src/languages";
import {
  Button,
  ClassNames,
  CreateAlert,
  CustomTable,
  EAlertType,
  Icon,
  InputWraper,
  NumberUtils,
  ObjectUtils,
  onError,
  useForm,
} from "@/src/modules";
import * as Yup from "yup";
import { UserService } from "@/src/services";
import { useDeviceType, useTradeCoin } from "@/src/hook";
import _ from "lodash";
import { isEqual } from "@/src/utils";
import { DepositForm } from "@/app/(routes)/(all-routes)/(protected-routes)/deposit/component/deposit-form";
import { Routes } from "@/src/AppRoutes";
import ReactSelect, { components } from "react-select";
// @ts-ignore
import moment from "moment";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const page = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);
  const [depositMethodList, setDepositMethodList] = useState<any>([{ method: "DEFAULT_USDT", title: "USDT", description: translate("Deposit with cryptocurrency"), details: [] }]);
  const [currentMethodSelected, setCurrentMethodSelected] = useState<any>(null);
  const [currentBankSelected, setCurrentBankSelected] = useState<any>(null);
  const [availableCurrencyOption, setAvailableCurrencyOption] = useState<any>([]);
  const [currentCurrencySelected, setCurrentCurrencySelected] = useState<any>(null);
  const [exchangeRate, setExchangeRate] = useState<any>(0);
  const [idxSelectedScreen, setIdxSelectedScreen] = useState<Number>(0);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  // const [depositAmount, setDepositAmount] = useState<any>(null);

  const walletBalances = useSelector((state: any) => state.userWalletBalances);
  const walletBalance = ObjectUtils.getIn(walletBalances, "data", [], (arr) => arr.find((item: any) => item.code === "USDT"));
  const availableAmount: number = +ObjectUtils.getIn(walletBalance, "amount", 0);

  let methodAdditionalInfor = [
    { method: "DIRECT_PAYMENT", description: translate("Deposit via Direct Payment method") },
    { method: "BT_ONLINE", description: translate("Deposit via BT Online") },
    // { method: "", description: "Direct payment via internet banking" },
    { method: "IDR_QR", description: translate("Use IDR QR to deposit") },
    { method: "LBT_ONLINE", description: translate("Deposit via Local Bank Transfer Online") },
    { method: "MOMOPAY", description: translate("Deposit via {method}", { method: "E-Wallet" }) },
    { method: "UPI", description: translate("Deposit via UPI") },
    { method: "UPI_VPA", description: translate("Deposit via UPI VPA") },
    { method: "USDT", description: translate("Deposit with cryptocurrency") },
    { method: "USDT_BEP", description: translate("Deposit with cryptocurrency (BEP Network)") },
    { method: "VIETTELPAY", description: translate("Payment via ViettelPay e-wallet") },
    { method: "VND_QR", description: translate("Deposit via {method}", { method: "QR Code" }) },
  ];

  const renderMethodIcon = (method: string) => {
    switch (method) {
      case "DIRECT_PAYMENT":
        return <Icon.DIRECT_PAYMENT />;
      case "BANK_TRANSFER":
        return <Icon.BANK_TRANSFER />;
      case "MOMOPAY":
        return <Icon.MOMOPAY />;
      case "VND_QR":
        return <Icon.VND_QR />;
      case "DEFAULT_USDT":
        return <Icon.DEFAULT_USDT />;
      default:
        return <Icon.BANK_TRANSFER />;
    }
  };

  // useEffect(() => {
  //   UserService.getDepositMethod().then((res) => {
  //     let mixingMethodList = res?.result?.map((element: any, idx: number) => {
  //       let tempEl = methodAdditionalInfor?.find((element2: any) => element2?.method === element?.method);
  //       if (tempEl == null)
  //         tempEl = { method: element?.method, description: translate(`Deposit via {method}`, { method: element?.method?.replace(/_/g, " ") }) };
  //       return { ...element, description: tempEl?.description, title: element?.method };
  //     });
  //     mixingMethodList = [
  //       //hard code add "DEFAULT_USDT"
  //       ...mixingMethodList,
  //       { method: "DEFAULT_USDT", title: "USDT", description: translate("Deposit with cryptocurrency"), details: [] },
  //     ];

  //     mixingMethodList = mixingMethodList.filter((element: any) =>
  //       [
  //         //show only some method
  //         "BANK_TRANSFER",
  //         "VND_QR",
  //         "DIRECT_PAYMENT",
  //         "LBT_ONLINE",
  //         "MOMOPAY",
  //         "DEFAULT_USDT",
  //       ].includes(element?.method)
  //     );

  //     if (mixingMethodList.find((element: any) => element?.method === "LBT_ONLINE") != null)
  //       mixingMethodList.find((element: any) => element?.method === "LBT_ONLINE")["title"] = "LOCAL_BANK_TRANSFER";
  //     if (mixingMethodList.find((element: any) => element?.method === "MOMOPAY") != null)
  //       mixingMethodList.find((element: any) => element?.method === "MOMOPAY")["title"] = "E-WALLET";
  //     if (mixingMethodList.find((element: any) => element?.method === "VND_QR") != null)
  //       mixingMethodList.find((element: any) => element?.method === "VND_QR")["title"] = "QR_CODE_SCAN";

  //     //[BEGIN] move QR CODE SCAN method to beginning of array
  //     let tempEl = mixingMethodList?.find((element: any) => element?.method === "VND_QR");
  //     if (tempEl) {
  //       _.pull(mixingMethodList, tempEl);
  //       mixingMethodList.unshift(tempEl);
  //     }
  //     //[END] move QR CODE SCAN method to beginning of array

  //     // setCurrentMethodSelected(mixingMethodList[0]); //set as default method
  //     setDepositMethodList(mixingMethodList);
  //   });
  //   // UserService.getExchangeRateGateway({ fromCurrency: "VND", toCurrency: "USD" }).then((res) => {
  //   //     setExchangeRate(res?.result[0]?.exchangeRate);
  //   // });
  //   return () => {};
  // }, []);

  useEffect(() => {
    if (currentCurrencySelected != null) {
      UserService.getExchangeRateGateway({ fromCurrency: currentCurrencySelected?.value, toCurrency: "USD" }).then((res) => {
        setExchangeRate(res?.result[0]?.exchangeRate);
      });
    }
    return () => {};
  }, [currentCurrencySelected?.value]);

  const { getInputProps, handleSubmit, isSubmitting } = useForm({
    structure: [
      {
        name: "amount",
        validate: Yup.number()
          .typeError(translate("Must be a number"))
          .required(translate("Must be provided"))
          .positive(translate("Amount must be greater than 0"))
          .min(
            currentMethodSelected?.details[
              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
            ]?.limits[0]?.minTransactionAmount,
            translate(`Minimum {amount} {currency}`, {
              amount: new Intl.NumberFormat("en").format(
                currentMethodSelected?.details[
                  currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                ]?.limits[0]?.minTransactionAmount
              ),
              currency: currentCurrencySelected?.label,
            })
          )
          .max(
            currentMethodSelected?.details[
              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
            ]?.limits[0]?.maxTransactionAmount,
            translate(`Maximum {amount} {currency}`, {
              amount: new Intl.NumberFormat("en").format(
                currentMethodSelected?.details[
                  currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                ]?.limits[0]?.maxTransactionAmount
              ),
              currency: currentCurrencySelected?.label,
            })
          ),
      },
      // {
      //     name: "IFSC",
      //     validate: (currentCurrencySelected?.value === 'INR') ? Yup.string().typeError("Must be a number").required(translate("Must be provided")) : null,
      // },
    ],
    onSubmit: async (values) => {
      let payload: any = {
        amount: +values?.amount,
        currency: currentCurrencySelected?.value,
        dateTime: moment()
          .toISOString(true)
          .replace(/-/g, "")
          .replace(":", "")
          .replace(":", "")
          .replace(/\..{3}/g, ""),
        language: getLocaleKey(),
        depositMethod: currentMethodSelected?.method,
        depositorUserId: user?.userId,
        depositorEmail: user?.email,
        depositorName: user?.firstName,
        depositorBank: currentBankSelected?.bankCode,
        redirectUrl: `${process.env["NEXT_PUBLIC_PUBLIC_URL"]}${Routes.userDepositStatus.href}`,
      };

      // if (currentCurrencySelected?.value === 'INR') {
      //     payload['bankIFSC'] = values?.IFSC;
      // }

      return UserService.handleDeposit(payload)
        .then((res) => {
          if (res?.result?.success === true) {
            const match = res?.result?.paymentPageSession?.paymentPageUrl?.match(/\/deposit\/(.*?)\//);

            if (match && match.length > 1) {
              const desiredSubstring = match[1];
              localStorage.setItem("current-processing", desiredSubstring);
            }
            window.location.href = res?.result?.paymentPageSession?.paymentPageUrl;
          } else {
            CreateAlert({ message: res?.result?.message, type: EAlertType.ERROR });
          }
        })
        .catch((err) => {
          CreateAlert({ message: translate(err.message), type: EAlertType.ERROR });
        })
        .finally(() => setIsRequesting(false));
    },
  });

  let handleOnClickSubmit = () => {
    if (isRequesting === true) return;
    setIsRequesting(true);
    handleSubmit();
  };

  let handleOnChangeSelectedMethod = (element: any) => {
    getInputProps("amount").defaultValue = 0;
    setCurrentMethodSelected(element);
    let listCurrency = element?.details?.map((element2: any) => ({ label: element2?.currency, value: element2?.currency })); //lấy động bằng API
    // let listCurrency = [
    //   {
    //     label: "INR",
    //     value: "INR",
    //   },
    //   {
    //     label: "IDR",
    //     value: "IDR",
    //   },
    //   {
    //     label: "KRW",
    //     value: "KRW",
    //   },
    //   {
    //     label: "VND",
    //     value: "VND",
    //   },
    // ];
    setAvailableCurrencyOption(listCurrency);
    if (["DIRECT_PAYMENT", "BANK_TRANSFER", "LBT_ONLINE", "MOMOPAY", "VND_QR"].includes(element?.method)) {
      setCurrentCurrencySelected(listCurrency[0]);
    }
    setIdxSelectedScreen(1);
  };

  let handleOnClickIndicatorBack = () => {
    setCurrentMethodSelected(null);
    setCurrentCurrencySelected(null);
    setCurrentBankSelected(null);
    setIdxSelectedScreen(0);
  };

  let handleOnChangeCurrency = async (element: any) => {
    setCurrentBankSelected(null);
    setCurrentCurrencySelected(element);
  };

  let CustomOption = (props: any) => {
    return (
      <components.Option {...props}>
        <div className="currency__container">
          <div className="currency__icon">
            <img className="currency__icon__img" src={`/assets/images/funds/currency/${props?.value}.png`} alt="" />
          </div>
          <div className="currency__label">{props?.children}</div>
        </div>
      </components.Option>
    );
  };

  let SingleValue = (props: any) => {
    return (
      <components.SingleValue {...props}>
        <div className="currency__container">
          <div className="currency__icon">
            <img className="currency__icon__img" src={`/assets/images/funds/currency/${props?.data?.value}.png`} alt="" />
          </div>
          <div className="currency__label">{props?.data?.label}</div>
        </div>
      </components.SingleValue>
    );
  };

  return (
    <div className="deposit-page">
      <div className="row row-cols-xxl-2 row-cols-1">
        <div className="col">
          <div className="deposit-container">
            {idxSelectedScreen === 0 && (
              <div className="deposit-colume-1">
                {/* <div className="indicator-back" onClick={() => Routes.userAccountWallets.push()}> */}
                <div className="indicator-back" onClick={() => router.push(Routes.userAccountAssets.href)}>
                  <div className="indicator-back__icon">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.64814 17.0484C9.17951 17.5171 8.41971 17.5171 7.95108 17.0484L0.751078 9.84843C0.282449 9.3798 0.282449 8.62 0.751078 8.15137L7.95108 0.951375C8.41971 0.482746 9.17951 0.482746 9.64814 0.951375C10.1168 1.42 10.1168 2.1798 9.64814 2.64843L4.49666 7.7999L18.3996 7.7999C19.0623 7.7999 19.5996 8.33716 19.5996 8.9999C19.5996 9.66264 19.0623 10.1999 18.3996 10.1999L4.49666 10.1999L9.64814 15.3514C10.1168 15.82 10.1168 16.5798 9.64814 17.0484Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className="indicator-back__label">{translate("Deposit")}</div>
                </div>
                <div className="method">
                  {depositMethodList?.map((element: any, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className={`method__item ${currentMethodSelected?.method === element?.method ? `active` : ``}`}
                        onClick={() => handleOnChangeSelectedMethod(element)}
                      >
                        {currentMethodSelected?.method === element?.method && (
                          <div className="method__item__active">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                                fill="#323232"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="method__item__left">
                          <div className="method__item__icon">
                            {/* <img className="method__item__icon__img" src={`/assets/images/funds/${element?.method?.toLowerCase()}.png`} alt="" /> */}
                            {renderMethodIcon(element?.method?.toUpperCase())}
                          </div>
                          <div className="method__item__info">
                            <div className="method__item__info__title">{element?.title?.replace(/_/g, " ")}</div>
                            <div className="method__item__info__description" title={element?.description}>
                              {element?.description}
                            </div>
                          </div>
                        </div>
                        <div className="method__item__right">
                          <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 6L1 11" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {idxSelectedScreen === 1 && (
              <div className="deposit-colume-2">
                <div className="indicator-back" onClick={handleOnClickIndicatorBack}>
                  <div className="indicator-back__icon">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.64814 17.0484C9.17951 17.5171 8.41971 17.5171 7.95108 17.0484L0.751078 9.84843C0.282449 9.3798 0.282449 8.62 0.751078 8.15137L7.95108 0.951375C8.41971 0.482746 9.17951 0.482746 9.64814 0.951375C10.1168 1.42 10.1168 2.1798 9.64814 2.64843L4.49666 7.7999L18.3996 7.7999C19.0623 7.7999 19.5996 8.33716 19.5996 8.9999C19.5996 9.66264 19.0623 10.1999 18.3996 10.1999L4.49666 10.1999L9.64814 15.3514C10.1168 15.82 10.1168 16.5798 9.64814 17.0484Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className="indicator-back__label">
                    {translate("Deposit")} - {currentMethodSelected?.title?.replace(/_/g, " ")}
                  </div>
                </div>
                {currentMethodSelected?.method !== "DEFAULT_USDT" && (
                  <div className="currency">
                    <ReactSelect
                      options={availableCurrencyOption}
                      value={currentCurrencySelected}
                      onChange={handleOnChangeCurrency}
                      styles={
                        {
                          // control: (base, state) => ({
                          //     ...base,
                          //     background: "rgba(0,0,0,0.5)",
                          //     border: "none",
                          //     color: "#fff",
                          // }),
                          // option: (provided, state) => ({
                          //     ...provided,
                          //     background: 'rgba(0,0,0,0.5)'
                          // }),
                          // menuList: (provided, state) => ({
                          //     ...provided,
                          //     background: 'rgba(0,0,0,0.5)'
                          // }),
                          // menu: (provided, state) => ({
                          //     ...provided,
                          //     background: "rgba(0,0,0,0.5)",
                          // }),
                        }
                      }
                      className="currentcy-select"
                      classNamePrefix="currentcy-select"
                      placeholder={translate("Please select currency...")}
                      components={{
                        Option: CustomOption,
                        SingleValue: SingleValue,
                        // DropdownIndicator,
                        // IndicatorSeparator: CustomIndicatorSeparator,
                      }}
                      isSearchable={false}
                    />
                  </div>
                )}
                {(currentCurrencySelected != null || currentMethodSelected?.method === "DEFAULT_USDT") && (
                  <div className="method-input">
                    {(() => {
                      switch (currentMethodSelected?.method) {
                        case "DIRECT_PAYMENT": {
                          if (
                            currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ] == null
                          )
                            return <div style={{ textAlign: "center" }}>{translate("Not yet supported. Please choose another currency.")}</div>;
                          let renderBankList =
                            currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ]?.limits[0]?.banks;
                          let excludeArr;
                          if (currentCurrencySelected?.value === "VND") {
                            let mustBeExistBank = ["VCBBVN", "EACBVN", "SHBAVN", "MCOBVN", "SHBKVN", "HSBCVN", "BIDVVN", "OJBAVN"];
                            renderBankList = currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ]?.limits[0]?.banks?.filter((element: any) => {
                              return mustBeExistBank?.includes(element?.bankCode);
                            });
                            excludeArr = currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ]?.limits[0]?.banks?.filter((element: any) => {
                              return !mustBeExistBank?.includes(element?.bankCode);
                            });
                            renderBankList = [...renderBankList, ...excludeArr.slice(0, mustBeExistBank.length - renderBankList.length)];
                          }

                          return (
                            <div className="method-entry">
                              <div className="bank-title">{translate("Bank select")}</div>
                              <div className="bank-list">
                                <div className="row row-cols-xxl-5 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-4 row-cols-3">
                                  {renderBankList?.map((element: any, idx: number) => {
                                    return (
                                      <div key={idx} className="col">
                                        <div
                                          className={`bank-list__item ${currentBankSelected?.bankCode === element?.bankCode ? `active` : ``}`}
                                          onClick={() => setCurrentBankSelected(element)}
                                        >
                                          {currentBankSelected?.bankCode === element?.bankCode && (
                                            <div className="bank-list__item__active">
                                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                  d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                                                  fill="#323232"
                                                />
                                              </svg>
                                            </div>
                                          )}
                                          <img
                                            className="bank-list__item__img"
                                            src={`/assets/images/funds/bank/${element?.bankCode?.toUpperCase()}.png`}
                                            onError={(event: any) => {
                                              // if (!event.target.classList.contains("image-error")) {
                                              //     event.target.classList.add("image-error");
                                              // }
                                              event.target.src = "/assets/images/funds/bank/NO-BANK.png";
                                            }}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="form-input">
                                {/* <div className="form-input__selected">
                                  <div className="form-input__selected__label">{translate("Selected Bank")}</div>
                                  <div className="form-input__selected__value">
                                    {currentBankSelected != null ? (
                                      <>
                                        <div className="form-input__selected__value__icon">
                                          <img
                                            className="form-input__selected__value__icon__img"
                                            src={`/assets/images/funds/bank/${currentBankSelected?.bankCode?.toUpperCase()}.png`}
                                            onError={(event: any) => {
                                              // if (!event.target.classList.contains("image-error")) {
                                              //     event.target.classList.add("image-error");
                                              // }
                                              event.target.src = "/assets/images/funds/bank/NO-BANK.png";
                                            }}
                                            alt=""
                                          />
                                        </div>
                                        <div className="form-input__selected__value__label">
                                          <div className="form-input__selected__value__label__primary">{currentBankSelected?.bankName}</div>
                                          <div className="form-input__selected__value__label__secondary">{currentBankSelected?.englishName}</div>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="form-input__selected__value--no-bank">*{translate("Please select a bank")}</div>
                                      </>
                                    )}
                                  </div>
                                </div> */}
                                <div className="form-input__main">
                                  <div className="user-row">
                                    {/* {(currentCurrencySelected?.value === 'INR') && <div className="user-col-18">
                                                                              <InputWraper
                                                                                  enableReinitialize
                                                                                  label={`IFSC`}
                                                                                  placeholder={"Enter IFSC"}
                                                                                  inputProps={getInputProps("IFSC")}
                                                                                  component={InputText}
                                                                              />
                                                                          </div>} */}
                                    <div className="user-col-18">
                                      <InputWraper
                                        enableReinitialize
                                        className="mb-1"
                                        label={translate("Amount")}
                                        placeholder={translate("Enter amount")}
                                        inputProps={getInputProps("amount")}
                                        component={InputNumber}
                                        decimalScale={0}
                                        suffix={` ${currentCurrencySelected.label}`}
                                      />
                                      {/* {getInputProps("amount").value >=
                                        currentMethodSelected?.details[
                                          currentMethodSelected?.details?.findIndex(
                                            (element: any) => element.currency === currentCurrencySelected.value
                                          )
                                        ]?.limits[0]?.minTransactionAmount &&
                                        getInputProps("amount").value <=
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount && (
                                          <div className="estimated-received">
                                            Estimated received: {getInputProps("amount").value * exchangeRate} USD
                                          </div>
                                        )} */}
                                      <div className="payment-range">
                                        {`(min: ${new Intl.NumberFormat("en").format(
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.minTransactionAmount
                                        )} ${currentCurrencySelected.label} - max: ${new Intl.NumberFormat("en").format(
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount
                                        )} ${currentCurrencySelected.label})`}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-input__button">
                                  <Button
                                    label={translate("Deposit")}
                                    type="button"
                                    buttonType="primary"
                                    isLoading={isSubmitting}
                                    onClick={handleOnClickSubmit}
                                    disabled={currentBankSelected == null}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        }
                        case "BANK_TRANSFER": {
                          if (
                            currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ] == null
                          )
                            return <div style={{ textAlign: "center" }}>{translate("Not yet supported. Please choose another currency.")}</div>;

                          return (
                            <div className="method-entry">
                              <div className="form-input">
                                <div className="form-input__main">
                                  <div className="user-row">
                                    <div className="user-col-18">
                                      <InputWraper
                                        enableReinitialize
                                        className="mb-1"
                                        label={translate("Amount")}
                                        placeholder={translate("Enter amount")}
                                        inputProps={getInputProps("amount")}
                                        component={InputNumber}
                                        decimalScale={0}
                                        suffix={` ${currentCurrencySelected.label}`}
                                      />
                                      {/* {getInputProps("amount").value >=
                                        currentMethodSelected?.details[
                                          currentMethodSelected?.details?.findIndex(
                                            (element: any) => element.currency === currentCurrencySelected.value
                                          )
                                        ]?.limits[0]?.minTransactionAmount &&
                                        getInputProps("amount").value <=
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount && (
                                          <div className="estimated-received">
                                            Estimated received: {getInputProps("amount").value * exchangeRate} USD
                                          </div>
                                        )} */}
                                      <div className="payment-range">
                                        {`(min: ${new Intl.NumberFormat("en").format(
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.minTransactionAmount
                                        )} ${currentCurrencySelected.label} - max: ${new Intl.NumberFormat("en").format(
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount
                                        )} ${currentCurrencySelected.label})`}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-input__button">
                                  <Button
                                    label={translate("Deposit")}
                                    type="button"
                                    buttonType="primary"
                                    isLoading={isSubmitting}
                                    onClick={handleOnClickSubmit}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        }
                        case "LBT_ONLINE": {
                          if (
                            currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ] == null
                          )
                            return <div style={{ textAlign: "center" }}>{translate("Not yet supported. Please choose another currency.")}</div>;
                          let renderBankList =
                            currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ]?.limits[0]?.banks;
                          let excludeArr;
                          if (currentCurrencySelected?.value === "VND") {
                            let mustBeExistBank = ["VCBBVN", "EACBVN", "SHBAVN", "MCOBVN", "SHBKVN", "HSBCVN", "BIDVVN", "OJBAVN"];
                            renderBankList = currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ]?.limits[0]?.banks?.filter((element: any) => {
                              return mustBeExistBank?.includes(element?.bankCode);
                            });
                            excludeArr = currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ]?.limits[0]?.banks?.filter((element: any) => {
                              return !mustBeExistBank?.includes(element?.bankCode);
                            });
                            renderBankList = [...renderBankList, ...excludeArr.slice(0, mustBeExistBank.length - renderBankList.length)];
                          }

                          return (
                            <div className="method-entry">
                              <div className="bank-title">{translate("Bank select")}</div>
                              <div className="bank-list">
                                <div className="row row-cols-xxl-5 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-4 row-cols-3">
                                  {renderBankList?.map((element: any, idx: number) => {
                                    return (
                                      <div key={idx} className="col">
                                        <div
                                          className={`bank-list__item ${currentBankSelected?.bankCode === element?.bankCode ? `active` : ``}`}
                                          onClick={() => setCurrentBankSelected(element)}
                                        >
                                          {currentBankSelected?.bankCode === element?.bankCode && (
                                            <div className="bank-list__item__active">
                                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                  d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                                                  fill="#323232"
                                                />
                                              </svg>
                                            </div>
                                          )}
                                          <img
                                            className="bank-list__item__img"
                                            src={`/assets/images/funds/bank/${element?.bankCode?.toUpperCase()}.png`}
                                            onError={(event: any) => {
                                              // if (!event.target.classList.contains("image-error")) {
                                              //     event.target.classList.add("image-error");
                                              // }
                                              event.target.src = "/assets/images/funds/bank/NO-BANK.png";
                                            }}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="form-input">
                                {/* <div className="form-input__selected">
                                  <div className="form-input__selected__label">Bank Selected</div>
                                  <div className="form-input__selected__value">
                                    {currentBankSelected != null ? (
                                      <>
                                        <div className="form-input__selected__value__icon">
                                          <img
                                            className="form-input__selected__value__icon__img"
                                            src={`/assets/images/funds/bank/${currentBankSelected?.bankCode?.toUpperCase()}.png`}
                                            alt=""
                                          />
                                        </div>
                                        <div className="form-input__selected__value__label">
                                          <div className="form-input__selected__value__label__primary">{currentBankSelected?.bankName}</div>
                                          <div className="form-input__selected__value__label__secondary">{currentBankSelected?.englishName}</div>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="form-input__selected__value--no-bank">*{translate("Please select a bank")}</div>
                                      </>
                                    )}
                                  </div>
                                </div> */}
                                <div className="form-input__main">
                                  <div className="user-row">
                                    <div className="user-col">
                                      <InputWraper
                                        enableReinitialize
                                        className="mb-1"
                                        label={translate("Amount")}
                                        placeholder={translate("Enter amount")}
                                        inputProps={getInputProps("amount")}
                                        component={InputNumber}
                                        decimalScale={0}
                                        suffix={` ${currentCurrencySelected.label}`}
                                      />
                                      {/* {getInputProps("amount").value >=
                                        currentMethodSelected?.details[
                                          currentMethodSelected?.details?.findIndex(
                                            (element: any) => element.currency === currentCurrencySelected.value
                                          )
                                        ]?.limits[0]?.minTransactionAmount &&
                                        getInputProps("amount").value <=
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount && (
                                          <div className="estimated-received">
                                            Estimated received: {getInputProps("amount").value * exchangeRate} USD
                                          </div>
                                        )} */}
                                      <div className="payment-range">
                                        {`(min: ${new Intl.NumberFormat("en").format(
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.minTransactionAmount
                                        )} ${currentCurrencySelected.label} - max: ${new Intl.NumberFormat("en").format(
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount
                                        )} ${currentCurrencySelected.label})`}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-input__button">
                                  <Button
                                    label={translate("Deposit")}
                                    type="button"
                                    buttonType="primary"
                                    isLoading={isSubmitting}
                                    onClick={handleOnClickSubmit}
                                    disabled={currentBankSelected == null}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        }
                        case "VND_QR": {
                          if (
                            currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ] == null
                          )
                            return <div style={{ textAlign: "center" }}>{translate("Not yet supported. Please choose another currency.")}</div>;
                          let renderBankList =
                            currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ]?.limits[0]?.banks;
                          // let excludeArr;
                          // if (currentCurrencySelected?.value === 'VND') {
                          //     let mustBeExistBank = ["VCBBVN", "EACBVN", "SHBAVN", "MCOBVN", "SHBKVN", "HSBCVN", "BIDVVN", "OJBAVN"];
                          //     renderBankList = currentMethodSelected?.details[currentMethodSelected?.details?.findIndex((element:any) => element.currency === currentCurrencySelected.value)]?.limits[0]?.banks?.filter((element: any) => {return mustBeExistBank?.includes(element?.bankCode)});
                          //     excludeArr = currentMethodSelected?.details[currentMethodSelected?.details?.findIndex((element:any) => element.currency === currentCurrencySelected.value)]?.limits[0]?.banks?.filter((element: any) => {return !mustBeExistBank?.includes(element?.bankCode)});
                          //     renderBankList = [...renderBankList, ...excludeArr.slice(0, mustBeExistBank.length - renderBankList.length)]
                          // }

                          return (
                            <div className="method-entry">
                              <div className="bank-title">{translate("Bank select")}</div>
                              <div className="bank-list">
                                <div className="row row-cols-xxl-5 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-4 row-cols-3">
                                  {renderBankList?.map((element: any, idx: number) => {
                                    return (
                                      <div key={idx} className="col">
                                        <div
                                          className={`bank-list__item ${currentBankSelected?.bankCode === element?.bankCode ? `active` : ``}`}
                                          onClick={() => setCurrentBankSelected(element)}
                                        >
                                          {currentBankSelected?.bankCode === element?.bankCode && (
                                            <div className="bank-list__item__active">
                                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                  d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                                                  fill="#323232"
                                                />
                                              </svg>
                                            </div>
                                          )}
                                          <img
                                            className="bank-list__item__img"
                                            src={`/assets/images/funds/bank/${element?.bankCode?.toUpperCase()}.png`}
                                            onError={(event: any) => {
                                              // if (!event.target.classList.contains("image-error")) {
                                              //     event.target.classList.add("image-error");
                                              // }
                                              event.target.src = "/assets/images/funds/bank/NO-BANK.png";
                                            }}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="form-input">
                                {/* <div className="form-input__selected">
                                  <div className="form-input__selected__label">Bank Selected</div>
                                  <div className="form-input__selected__value">
                                    {currentBankSelected != null ? (
                                      <>
                                        <div className="form-input__selected__value__icon">
                                          <img
                                            className="form-input__selected__value__icon__img"
                                            src={`/assets/images/funds/bank/${currentBankSelected?.bankCode?.toUpperCase()}.png`}
                                            alt=""
                                          />
                                        </div>
                                        <div className="form-input__selected__value__label">
                                          <div className="form-input__selected__value__label__primary">{currentBankSelected?.bankName}</div>
                                          <div className="form-input__selected__value__label__secondary">{currentBankSelected?.englishName}</div>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="form-input__selected__value--no-bank">*{translate("Please select a bank")}</div>
                                      </>
                                    )}
                                  </div>
                                </div> */}
                                <div className="form-input__main">
                                  <div className="user-row">
                                    <div className="user-col">
                                      <InputWraper
                                        enableReinitialize
                                        className="mb-1"
                                        label={translate("Amount")}
                                        placeholder={translate("Enter amount")}
                                        inputProps={getInputProps("amount")}
                                        component={InputNumber}
                                        decimalScale={0}
                                        suffix={` ${currentCurrencySelected.label}`}
                                      />
                                      {/* {getInputProps("amount").value >=
                                        currentMethodSelected?.details[
                                          currentMethodSelected?.details?.findIndex(
                                            (element: any) => element.currency === currentCurrencySelected.value
                                          )
                                        ]?.limits[0]?.minTransactionAmount &&
                                        getInputProps("amount").value <=
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount && (
                                          <div className="estimated-received">
                                            Estimated received: {getInputProps("amount").value * exchangeRate} USD
                                          </div>
                                        )} */}
                                      <div className="payment-range">
                                        {`(min: ${new Intl.NumberFormat("en").format(
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.minTransactionAmount
                                        )} ${currentCurrencySelected.label} - max: ${new Intl.NumberFormat("en").format(
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount
                                        )} ${currentCurrencySelected.label})`}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-input__button">
                                  <Button
                                    label={translate("Deposit")}
                                    type="button"
                                    buttonType="primary"
                                    isLoading={isSubmitting}
                                    onClick={handleOnClickSubmit}
                                    disabled={currentBankSelected == null}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        }
                        case "MOMOPAY": {
                          if (
                            currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ] == null
                          )
                            return <div style={{ textAlign: "center" }}>{translate("Not yet supported. Please choose another currency.")}</div>;
                          return (
                            <div className="method-entry">
                              <div className="e-wallet">
                                <div className="e-wallet__banner">
                                  <img className="e-wallet__banner__img" src="/assets/images/funds/momopay-icon.png" alt="" />
                                </div>
                              </div>
                              <div className="form-input">
                                <div className="form-input__main">
                                  <div className="user-row">
                                    <div className="user-col">
                                      <InputWraper
                                        enableReinitialize
                                        className="mb-1"
                                        label={translate("Amount")}
                                        placeholder={translate("Enter amount")}
                                        inputProps={getInputProps("amount")}
                                        component={InputNumber}
                                        decimalScale={0}
                                        suffix={` ${currentCurrencySelected.label}`}
                                      />
                                      {/* {getInputProps("amount").value >=
                                        currentMethodSelected?.details[
                                          currentMethodSelected?.details?.findIndex(
                                            (element: any) => element.currency === currentCurrencySelected.value
                                          )
                                        ]?.limits[0]?.minTransactionAmount &&
                                        getInputProps("amount").value <=
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount && (
                                          <div className="estimated-received">
                                            Estimated received: {getInputProps("amount").value * exchangeRate} USD
                                          </div>
                                        )} */}
                                      <div className="payment-range">
                                        {`(min: ${new Intl.NumberFormat("en").format(
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.minTransactionAmount
                                        )} ${currentCurrencySelected.label} - max: ${new Intl.NumberFormat("en").format(
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount
                                        )} ${currentCurrencySelected.label})`}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-input__button">
                                  <Button
                                    label={translate("Deposit")}
                                    type="button"
                                    buttonType="primary"
                                    isLoading={isSubmitting}
                                    onClick={handleOnClickSubmit}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        }
                        case "DEFAULT_USDT": {
                          return (
                            <div className="method-entry">
                              <div className="usdt-container">
                                <DepositForm
                                  isVisible
                                  availableAmount={availableAmount}
                                  coinCode={"USDT"}
                                  coinId={3}
                                  onClose={() => null}
                                />
                              </div>
                            </div>
                          );
                        }
                      }
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
