"use client";

import { InputNumber, InputText, PopupWraper, TwoFaPopup } from "@/src/components";
import { getLocaleKey, translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, Icon, InputWraper, NumberUtils, ObjectUtils, useForm } from "@/src/modules";
import { UserService } from "@/src/services";
import { useEffect, useState } from "react";
import * as Yup from "yup";
// @ts-ignore
import { WithdrawForm } from "@/app/(routes)/(all-routes)/(protected-routes)/withdraw/component/withdraw-form";
import { Routes } from "@/src/AppRoutes";
import AffiliateService from "@/src/services/affiliate/affiliate.service";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ReactSelect, { components } from "react-select";
import { PinCodeForm } from "./component/pin-code-form";

const page = () => {
  enum EVerifyMethod {
    PIN_CODE = "PIN_CODE",
    EMAIL = "EMAIL",
    AUTHEN = "AUTHEN",
  }

  const router = useRouter();
  const user = useSelector((state: any) => state.user);
  const [withdrawMethodList, setWithdrawMethodList] = useState<any>([]);
  const [currentMethodSelected, setCurrentMethodSelected] = useState<any>(null);
  const [currentBankSelected, setCurrentBankSelected] = useState<any>(null);
  const [availableCurrencyOption, setAvailableCurrencyOption] = useState<any>([]);
  const [currentCurrencySelected, setCurrentCurrencySelected] = useState<any>(null);
  const [idxSelectedScreen, setIdxSelectedScreen] = useState<Number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<any>(null);
  const [exchangeRate, setExchangeRate] = useState<any>(0);
  const [isShowTwoFa, setIsShowTwoFa] = useState(false);
  const [twoFaCode, setTwoFaCode] = useState("");
  const [isShowVerifyMethod, setIsShowVerifyMethod] = useState<boolean>(false);
  const [currentVerifyMethod, setCurrentVerifyMethod] = useState<any>({
    label: "AUTHEN",
    value: EVerifyMethod.AUTHEN,
    image: "/assets/images/funds/2fa-method.png",
  });
  const [isShowPinCodePopup, setIsShowPinCodePopup] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<any>();
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  // const [balanceEnquiry, setBalanceEnquiry] = useState<any>(0);
  const [isAvailableExpGame, setAvailableExpGame] = useState(false);
  const [isShowMaxButton, setIsShowMaxButton] = useState<boolean>(true);
  const [configFee, setConfigFee] = useState<any>({});

  const networkOptions = useSelector((state: any) => state.main.networkOptions);
  const walletBalances = useSelector((state: any) => state.userWalletBalances);
  const walletBalance = ObjectUtils.getIn(walletBalances, "data", [], (arr) => arr.find((item: any) => item.code === "USDT"));
  const availableAmount: number = +ObjectUtils.getIn(walletBalance, "amount", 0);

  let methodDescription = [
    { method: "LOCAL_BANK_TRANSFER", description: translate("Withdraw money to local bank account") },
    { method: "USDT", description: translate("Withdraw with cryptocurrency") },
    { method: "USDT_BEP", description: translate("Withdraw with cryptocurrency (BEP Network)") },
  ];

  let verifyMethodOptions = [
    { label: "AUTHEN", value: EVerifyMethod.AUTHEN, image: "/assets/images/funds/2fa-method.png" },
    { label: "EMAIL", value: EVerifyMethod.EMAIL, image: "/assets/images/funds/email-method.png" },
    { label: "WITHDRAWAL CODE", value: EVerifyMethod.PIN_CODE, image: "/assets/images/funds/pincode-method.png" },
  ];

  let MIN_VND_WITHDRAWAL_AMOUNT = Math.round(+configFee?.withdrawMinAmount / (+exchangeRate * 1.01));
  let MAX_VND_WITHDRAWAL_AMOUNT = 1500000000;

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

  useEffect(() => {
    UserService.getWithdrawMethod().then((res) => {
      let mixingMethodList = res?.result?.map((element: any, idx: number) => {
        let tempEl = methodDescription?.find((element2: any) => element2?.method === element?.method);
        if (tempEl == null)
          tempEl = { method: element?.method, description: translate(`Withdraw via {method}`, { method: element?.method?.replace(/_/g, " ") }) };
        return { ...element, description: tempEl?.description, title: element?.method };
      });
      mixingMethodList = [
        ...mixingMethodList,
        { method: "DEFAULT_USDT", title: "USDT", description: translate("Withdraw with cryptocurrency"), details: [] },
      ]; //hard code add "DEFAULT_USDT"
      mixingMethodList = mixingMethodList.filter((element: any) => ["LOCAL_BANK_TRANSFER", "DEFAULT_USDT"].includes(element?.method)); //show only some mothod
      // setCurrentMethodSelected(mixingMethodList[0]);
      setWithdrawMethodList(mixingMethodList);
    });
    // UserService.getBalanceEnquiry({ currency: "VND" }).then((res) => {
    //     setBalanceEnquiry(res?.result[0]);
    // });
    UserService.checkAvailableExpGame(user?.userId).then((res) => setAvailableExpGame(res));
    AffiliateService.getConfigWithdrawFee().then((res) => setConfigFee(res));

    return () => {};
  }, []);

  useEffect(() => {
    if (currentCurrencySelected != null) {
      UserService.getWithdrawExchangeRateGateway({ fromCurrency: currentCurrencySelected?.value, toCurrency: "USD" }).then((res) => {
        setExchangeRate(res?.result[0]?.exchangeRate);
      });
    }
    return () => {};
  }, [currentCurrencySelected?.value]);

  const { getInputProps, handleSubmit, isSubmitting, isValid } = useForm({
    structure: [
      {
        name: "amount",
        validate: Yup.number()
          .typeError(translate("Must be a number"))
          .required(translate("Must be provided"))
          .positive(translate("Amount must be greater than 0"))
          .min(
            MIN_VND_WITHDRAWAL_AMOUNT,
            `${translate(`Minimum {amount} {currency}`, {
              amount: new Intl.NumberFormat("en").format(MIN_VND_WITHDRAWAL_AMOUNT),
              currency: currentCurrencySelected?.label,
            })}`
          )
          .max(
            currentCurrencySelected?.value === "VND"
              ? MAX_VND_WITHDRAWAL_AMOUNT
              : currentMethodSelected?.details[
                  currentMethodSelected?.details?.findIndex((element: any) => element?.currency === currentCurrencySelected?.value)
                ]?.limits[0]?.maxTransactionAmount,
            `${translate(`Maximum {amount} {currency}`, {
              amount: new Intl.NumberFormat("en").format(
                currentCurrencySelected?.value === "VND"
                  ? MAX_VND_WITHDRAWAL_AMOUNT
                  : currentMethodSelected?.details[
                      currentMethodSelected?.details?.findIndex((element: any) => element?.currency === currentCurrencySelected?.value)
                    ]?.limits[0]?.maxTransactionAmount
              ),
              currency: currentCurrencySelected?.label,
            })}`
          ),
      },
      {
        name: "IFSC",
        validate:
          currentCurrencySelected?.value === "INR"
            ? Yup.string()
                .typeError(translate("Invalid"))
                .required(translate("Must be provided"))
                .test({
                  message: translate("Invalid IFSC"),
                  test: function (value) {
                    if (value?.length != 11) return false;
                    return true;
                  },
                })
            : null,
      },
      {
        name: "accountNumber",
        validate:
          currentCurrencySelected?.value !== "KRW" ? Yup.string().typeError(translate("Invalid")).required(translate("Must be provided")) : null,
      },
      {
        name: "beneficiaryName",
        validate:
          currentCurrencySelected?.value !== "KRW" ? Yup.string().typeError(translate("Invalid")).required(translate("Must be provided")) : null,
      },
      {
        name: "availableAmount",
      },
    ],
    onSubmit: async (values) => {
      let payload: any = {
        amount: +values?.amount,
        accountNumber: values?.accountNumber,
        beneficiaryName: values?.beneficiaryName,
        currency: currentCurrencySelected?.value,
        dateTime: moment()
          .toISOString(true)
          .replace(/-/g, "")
          .replace(":", "")
          .replace(":", "")
          .replace(/\..{3}/g, ""),
        language: getLocaleKey(),
        userId: user?.userId,
        payoutMethod: currentMethodSelected?.method,
        bank: currentBankSelected?.bankCode,
        redirectUrl: `${process.env["NEXT_PUBLIC_PUBLIC_URL"]}/witdraw-status`,
        methodVerify: currentVerifyMethod?.value,
        twoFaCode: twoFaCode,
        pinCode: +pinCode,
        // depositorEmail: user?.email,
      };

      if (currentCurrencySelected?.value === "INR") {
        payload["bankIFSC"] = values?.IFSC;
      }

      return UserService.handleWithdraw(payload)
        .then((res) => {
          if (currentVerifyMethod?.value === EVerifyMethod.EMAIL) {
            CreateAlert({ message: translate("Please check your mailbox to withdraw"), type: EAlertType.SUCCESS });
          } else {
            CreateAlert({ message: translate("Withdrawal request sent successfully"), type: EAlertType.SUCCESS });
          }
          router.push(Routes.userAccountAssets.href);
        })
        .catch((err) => {
          if (err.message == "REQUIRED_TWO_FA") {
            setIsShowTwoFa(true);
            return;
          }
          CreateAlert({ message: translate(err.message), type: EAlertType.ERROR });
        })
        .finally(() => setIsRequesting(false));
    },
  });

  let handleOnChangeSelectedMethod = (element: any) => {
    getInputProps("amount").defaultValue = 0;
    getInputProps("accountNumber").defaultValue = "";
    getInputProps("beneficiaryName").defaultValue = "";
    setCurrentMethodSelected(element);
    let listCurrency = element?.details?.map((element2: any) => ({ label: element2?.currency, value: element2?.currency }));
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
    if (["LOCAL_BANK_TRANSFER"].includes(element?.method)) {
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

  let handleOnChangeCurrency = (value: any) => {
    setCurrentBankSelected(null);
    setCurrentCurrencySelected(value);
    getInputProps("amount").onChange(null);
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

  const onVerifyTwoFa = (code: any) => {
    setTwoFaCode(code);
    if (isRequesting === true) return;
    setIsRequesting(true);
    handleSubmit();
  };

  let handleOnChangeVerifyMethod = (element: any) => {
    setCurrentVerifyMethod(element);
  };

  let handleOnClickContinue = () => {
    setIsShowVerifyMethod(false);
    if (currentVerifyMethod?.value === EVerifyMethod.PIN_CODE) {
      if (user?.isPinWithdraw === true) {
        setIsShowPinCodePopup(true);
      } else {
        CreateAlert({ message: "Please setup Withdrawal Code first", type: EAlertType.ERROR });
        // Routes.userAccountProfile.push("four-panel");
        router.push(Routes.withdrawalCode.href);
      }
    }

    if (currentVerifyMethod?.value === EVerifyMethod.EMAIL) {
      if (isRequesting === true) return;
      setIsRequesting(true);
      handleSubmit();
    }

    if (currentVerifyMethod?.value === EVerifyMethod.AUTHEN) {
      if (user?.isTwoFa === true) {
        setIsShowTwoFa(true);
      } else {
        router.push(Routes.twoFactorAuthen.href);
        CreateAlert({ message: translate("Please setup Two-Factor Authentication first"), type: EAlertType.WARNING });
      }
    }
  };

  let handleOnClickWithdraw = () => {
    if (isValid === false) {
      CreateAlert({ message: translate("Please fill in all fields"), type: EAlertType.WARNING });
      return;
    }
    setIsShowVerifyMethod(true);
  };

  let CustomOptionVerifyMethod = (props: any) => {
    return (
      <>
        <components.Option {...props}>
          <div className="verify-method__container">
            <div className="verify-method__icon">
              <img className="verify-method__icon__img" src={props?.data?.image} alt="" />
            </div>
            <div className="verify-method__label">{props?.children}</div>
          </div>
        </components.Option>
      </>
    );
  };

  let SingleValueVerifyMethod = (props: any) => {
    return (
      <>
        <components.SingleValue {...props}>
          <div className="verify-method__container">
            <div className="verify-method__icon">
              <img className="verify-method__icon__img" src={props?.data?.image} alt="" />
            </div>
            <div className="verify-method__label">{props?.data?.label}</div>
          </div>
        </components.SingleValue>
      </>
    );
  };

  let handleOnSubmitPinCode = (code: any) => {
    setPinCode(code);
    if (isRequesting === true) return;
    setIsRequesting(true);
    handleSubmit();
  };

  const handleOnClickMaxButton = (value: any) => {
    getInputProps("amount").onChange(Math.floor(value / exchangeRate));
  };

  useEffect(() => {
    getInputProps("amount").value ? setIsShowMaxButton(false) : setIsShowMaxButton(true);
  }, [getInputProps("amount")]);

  return (
    <div className="withdraw-page">
      <div className="row row-cols-xxl-2 row-cols-1">
        <div className="col">
          <div className="withdraw-container">
            {/* <div className="toggle-send-email">
              <InputToggleSwitch
                onChange={async (value, e) => {
                  await UserService.toggleSendEmail(value)
                    .then(async () => {
                      await UserService.auth(store);
                      CreateAlert({ message: translate("Change successfully"), type: EAlertType.SUCCESS });
                    })
                    .catch((err) => {
                      CreateAlert({ message: translate(err.message), type: EAlertType.ERROR });
                    });
                }}
                value={user?.isSendWithdrawEmail}
                onTouched={() => false}
                label={translate("Send withdrawal notification to email")}
                name=""
              />
            </div> */}
            {idxSelectedScreen === 0 && (
              <div className="withdraw-colume-1">
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
                  <div className="indicator-back__label">{translate("Withdrawal")}</div>
                </div>
                <div className="method">
                  {withdrawMethodList?.map((element: any, idx: number) => {
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
              <div className="withdraw-colume-2">
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
                    {translate("Withdrawal")} - {currentMethodSelected?.title?.replace(/_/g, " ")}
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
                        case "LOCAL_BANK_TRANSFER": {
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
                              return mustBeExistBank.includes(element?.bankCode);
                            });
                            excludeArr = currentMethodSelected?.details[
                              currentMethodSelected?.details?.findIndex((element: any) => element.currency === currentCurrencySelected.value)
                            ]?.limits[0]?.banks?.filter((element: any) => {
                              return !mustBeExistBank.includes(element?.bankCode);
                            });
                            renderBankList = [...renderBankList, ...excludeArr.slice(0, mustBeExistBank.length - renderBankList.length)];
                          }

                          // if (currentCurrencySelected?.value === "KRW") return (
                          //   <div className="method-entry">
                          //     <div className="form-input">
                          //       <InputWraper
                          //         label={`${translate("AVAILABLE")} ${translate("Balance").toLowerCase()}`}
                          //         inputProps={getInputProps("availableAmount")}
                          //         isDisable
                          //         renderInput={(state) => (
                          //           <InputText {...state} value={`${NumberUtils.toFormatNumber(availableAmount, 4)}`} isDisabled isClear={true} />
                          //         )}
                          //       />
                          //       <div className="form-input__main">
                          //         <div className="user-row">
                          //           <div className="user-col-18">
                          //             <InputWraper
                          //               label={
                          //                 translate("Withdrawal Amount") +
                          //                 ` ${
                          //                   currentCurrencySelected.value === "VND" //special case
                          //                     ? `(min: ${new Intl.NumberFormat("en").format(
                          //                         MIN_VND_WITHDRAWAL_AMOUNT
                          //                       )} VND - max: ${new Intl.NumberFormat("en").format(MAX_VND_WITHDRAWAL_AMOUNT)} VND)`
                          //                     : `(min: 10 USD - max: ${new Intl.NumberFormat("en").format(
                          //                         currentMethodSelected?.details[
                          //                           currentMethodSelected?.details?.findIndex(
                          //                             (element: any) => element.currency === currentCurrencySelected.value
                          //                           )
                          //                         ]?.limits[0]?.maxTransactionAmount * exchangeRate
                          //                       )} USD)`
                          //                 }`
                          //               }
                          //               placeholder={translate("Enter amount")}
                          //               inputProps={getInputProps("amount")}
                          //               component={InputNumber}
                          //             />
                          //           </div>
                          //           <div className="extra-info">
                          //             {getInputProps("amount").value * exchangeRate * 1.01 >= 10 &&
                          //               getInputProps("amount").value <=
                          //                 currentMethodSelected?.details[
                          //                   currentMethodSelected?.details?.findIndex(
                          //                     (element: any) => element.currency === currentCurrencySelected.value
                          //                   )
                          //                 ]?.limits[0]?.maxTransactionAmount && (
                          //                 <div className="estimated-received">
                          //                   {translate("Estimated received")}: {getInputProps("amount").value * exchangeRate * 1.01} USD
                          //                 </div>
                          //               )}
                          //             {getInputProps("amount").value * exchangeRate * 1.01 >= 10 &&
                          //               getInputProps("amount").value <=
                          //                 currentMethodSelected?.details[
                          //                   currentMethodSelected?.details?.findIndex(
                          //                     (element: any) => element.currency === currentCurrencySelected.value
                          //                   )
                          //                 ]?.limits[0]?.maxTransactionAmount && (
                          //                 <div className="withdraw-fee">
                          //                   {translate("Withdraw Fee")}
                          //                   {": 0"}
                          //                   {/* {isAvailableExpGame ?getInputProps("amount").value * exchangeRate * 0.01 <= 0.5
                          //                     ? (0.5).toLocaleString(getLocaleKey(), { maximumFractionDigits: 4, minimumFractionDigits: 4 })
                          //                     : (getInputProps("amount").value * exchangeRate * 0.01).toLocaleString(getLocaleKey(), {
                          //                         maximumFractionDigits: 4,
                          //                         minimumFractionDigits: 4,
                          //                       }):'0'} */}
                          //                   {" USD"}
                          //                 </div>
                          //               )}
                          //           </div>
                          //         </div>
                          //       </div>
                          //       <div className="form-input__button">
                          //         <Button
                          //           label={translate("Withdraw")}
                          //           type="button"
                          //           buttonType="primary"
                          //           isLoading={isSubmitting}
                          //           onClick={handleOnClickWithdraw}
                          //         />
                          //       </div>
                          //     </div>
                          //   </div>
                          // )
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
                                {/* <InputWraper
                                  label={`${translate("AVAILABLE")} ${translate("Balance").toLowerCase()}`}
                                  inputProps={getInputProps("availableAmount")}
                                  isDisable
                                  renderInput={(state) => (
                                    <InputText {...state} value={`${NumberUtils.toFormatNumber(availableAmount, 4)}`} isDisabled isClear={true} />
                                  )}
                                /> */}
                                {/* <div className="form-input__balance-enquiry">Balance: {`${new Intl.NumberFormat("en").format(balanceEnquiry?.availableBalance)} ${balanceEnquiry?.currency}`}</div> */}
                                <div className="form-input__main">
                                  <div className="user-row">
                                    {currentCurrencySelected?.value === "INR" && (
                                      <div className="user-col-18">
                                        <InputWraper
                                          enableReinitialize
                                          label={translate(`IFS Code (Indian Financial System Code)`)}
                                          placeholder={translate("Enter IFSC")}
                                          inputProps={getInputProps("IFSC")}
                                          component={InputText}
                                        />
                                      </div>
                                    )}
                                    <div className="user-col-18">
                                      <InputWraper
                                        label={translate("Bank Account Number")}
                                        placeholder={translate("Enter account number")}
                                        inputProps={getInputProps("accountNumber")}
                                        component={InputText}
                                      />
                                    </div>
                                    <div className="user-col-18">
                                      <InputWraper
                                        label={translate("Beneficiary Name")}
                                        placeholder={translate("Enter beneficiary name")}
                                        inputProps={getInputProps("beneficiaryName")}
                                        component={InputText}
                                      />
                                    </div>
                                    <div className="user-col-18">
                                      <InputWraper
                                        className="mb-1"
                                        label={translate("Withdrawal Amount")}
                                        placeholder={`${`Min: ${new Intl.NumberFormat("en").format(MIN_VND_WITHDRAWAL_AMOUNT)}`}`}
                                        inputProps={getInputProps("amount")}
                                        renderInput={(state) => {
                                          return (
                                            <>
                                              <InputNumber {...state} decimalScale={0} />
                                              {isShowMaxButton && (
                                                <div className="fill-max" onClick={() => handleOnClickMaxButton(availableAmount)}>
                                                  {translate("MAX")}
                                                </div>
                                              )}
                                            </>
                                          );
                                        }}
                                        customSuffix={currentCurrencySelected?.label}
                                        // renderInput={(props) => (
                                        //     <InputNumber
                                        //         {...props}
                                        //         value={depositAmount}
                                        //         onChange={(amount) => setDepositAmount(amount)}
                                        //     />
                                        // )}
                                      />
                                    </div>
                                    {/* <div className="extra-info">
                                      {getInputProps("amount").value * exchangeRate * 1.01 >= 10 &&
                                        getInputProps("amount").value <=
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount && (
                                          <div className="estimated-received">
                                            {translate("Estimated received")}: {getInputProps("amount").value * exchangeRate * 1.01} USD
                                          </div>
                                        )}
                                      {getInputProps("amount").value * exchangeRate * 1.01 >= 10 &&
                                        getInputProps("amount").value <=
                                          currentMethodSelected?.details[
                                            currentMethodSelected?.details?.findIndex(
                                              (element: any) => element.currency === currentCurrencySelected.value
                                            )
                                          ]?.limits[0]?.maxTransactionAmount && (
                                          <div className="withdraw-fee">
                                            {translate("Withdraw Fee")}
                                            {": 0"}
                                            {" USD"}
                                          </div>
                                        )}
                                    </div> */}
                                    <div className="extra-info">
                                      <div className="extra-info__available-balance">
                                        <div className="extra-info__available-balance__label">{translate("Available")}:&nbsp;</div>
                                        <div className="extra-info__available-balance__value">{`${NumberUtils.toFormatNumber(
                                          availableAmount,
                                          4
                                        )} ${ObjectUtils.getIn(walletBalance, "code", "N/A")}`}</div>
                                      </div>
                                      <div className="extra-info__payment-range">
                                        {`${
                                          currentCurrencySelected.value === "VND" //special case
                                            ? `Min: ${new Intl.NumberFormat("en").format(
                                                MIN_VND_WITHDRAWAL_AMOUNT
                                              )} VND - Max: ${new Intl.NumberFormat("en").format(MAX_VND_WITHDRAWAL_AMOUNT)} VND)`
                                            : `Min:  ${new Intl.NumberFormat("en").format(MIN_VND_WITHDRAWAL_AMOUNT)}  ${
                                                currentCurrencySelected?.label
                                              } - Max: ${new Intl.NumberFormat("en").format(
                                                currentMethodSelected?.details[
                                                  currentMethodSelected?.details?.findIndex(
                                                    (element: any) => element.currency === currentCurrencySelected.value
                                                  )
                                                ]?.limits[0]?.maxTransactionAmount
                                              )} ${currentCurrencySelected?.label}`
                                        }`}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-input__button">
                                  <Button
                                    label={translate("Withdraw")}
                                    type="button"
                                    buttonType="primary"
                                    isLoading={isSubmitting}
                                    onClick={handleOnClickWithdraw}
                                    disabled={currentBankSelected == null}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        }
                        case "DEFAULT_USDT": {
                          return (
                            <div className="row d-flex justify-content-center">
                              <div className="col-12 col-lg-12">
                                <div className="method-entry">
                                  <div className="usdt-container">
                                    <WithdrawForm
                                      isVisible
                                      availableAmount={availableAmount}
                                      coinCode={"USDT"}
                                      coinId={3}
                                      onClose={() => null}
                                      isAvailableExpGame={isAvailableExpGame}
                                      configFee={configFee}
                                      networkOptions={networkOptions}
                                    />
                                  </div>
                                </div>
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
      {isShowTwoFa && (
        <TwoFaPopup
          isRequesting={isRequesting}
          onClose={() => {
            setIsShowTwoFa(false);
            setTwoFaCode("");
          }}
          onVerify={(code) => {
            onVerifyTwoFa(code);
          }}
        />
      )}
      {isShowPinCodePopup && (
        <PopupWraper title={translate("WITHDRAWAL CODE")} onClose={() => setIsShowPinCodePopup(false)}>
          <PinCodeForm isRequesting={isRequesting} onSubmit={(code: any) => handleOnSubmitPinCode(code)} />
        </PopupWraper>
      )}
      {isShowVerifyMethod && (
        <PopupWraper title={translate("Verify Method")} onClose={() => setIsShowVerifyMethod(false)}>
          <div className="verify-method-body">
            <div className="control-input">
              {/* <ReactSelect
                options={[
                  { label: "AUTHEN", value: EVerifyMethod.AUTHEN, image: "/assets/images/funds/2fa-method.png" },
                  { label: "EMAIL", value: EVerifyMethod.EMAIL, image: "/assets/images/funds/email-method.png" },
                  { label: "WITHDRAWAL CODE", value: EVerifyMethod.PIN_CODE, image: "/assets/images/funds/pincode-method.png" },
                ]}
                value={currentVerifyMethod}
                onChange={handleOnChangeVerifyMethod}
                className="verify-method-select"
                classNamePrefix="verify-method-select"
                placeholder={translate("Please select verify method...")}
                components={{
                  Option: CustomOptionVerifyMethod,
                  SingleValue: SingleValueVerifyMethod,
                }}
                isSearchable={false}
              /> */}
              {verifyMethodOptions?.map((element: any, idx: number) => {
                return (
                  <div
                    key={idx}
                    className={`control-input__item ${currentVerifyMethod?.value === element?.value ? "active" : ""}`}
                    onClick={() => handleOnChangeVerifyMethod(element)}
                  >
                    <div className="control-input__item__bubble"></div>
                    <div className="control-input__item__icon">
                      <img src={element?.image} alt="" />
                    </div>
                    <div className="control-input__item__label">{translate(element?.label)}</div>
                  </div>
                );
              })}
            </div>
            <div className="control-indicator">
              <Button
                label={translate("Continue")}
                // buttonType="grey-outline"
                type="button"
                onClick={handleOnClickContinue}
                disabled={currentVerifyMethod == null}
                isLoading={isRequesting}
              />
            </div>
          </div>
        </PopupWraper>
      )}
    </div>
  );
};

export default page;
