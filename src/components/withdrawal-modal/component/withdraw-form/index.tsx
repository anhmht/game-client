"use client";

import { FC, useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { PinCodeForm } from "@/app/(routes)/(all-routes)/(protected-routes)/withdraw/component/pin-code-form";
import { Routes } from "@/src/AppRoutes";
import { InputNumber, InputToggleSwitch, PopupWraper, TwoFaPopup } from "@/src/components";
import { InputWalletAddress } from "@/src/components/input/walletAddress";
import { useTradeCoin } from "@/src/hook";
import { getLocaleKey, translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, InputWraper, NumberUtils, ObjectUtils, useForm } from "@/src/modules";
import { store } from "@/src/redux/store";
import { BankService, UserService } from "@/src/services";
import { ENetWork, EToken } from "@/src/types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ReactSelect, { components } from "react-select";
import AffiliateService from "@/src/services/affiliate/affiliate.service";
import { IActionForm } from "@/app/(routes)/(all-routes)/(protected-routes)/assets/page";

// export const networkOptions: any = [
//   { label: "BEP20", value: ENetWork.BEP20 },
//   { label: "TRC20", value: ENetWork.TRC20 },
// ];

export const WithdrawForm: FC<any> = ({
  isVisible,
  coinCode,
  availableAmount,
  coinId,
  onClose,
  isAvailableExpGame,
  configFee,
  networkOptions,
  onOpenPupup
}) => {
  enum EVerifyMethod {
    PIN_CODE = "PIN_CODE",
    EMAIL = "EMAIL",
    AUTHEN = "AUTHEN",
  }

  let verifyMethodOptions = [
    { label: "AUTHEN", value: EVerifyMethod.AUTHEN, image: "/assets/images/funds/2fa-method.png" },
    { label: "EMAIL", value: EVerifyMethod.EMAIL, image: "/assets/images/funds/email-method.png" },
    { label: "WITHDRAWAL CODE", value: EVerifyMethod.PIN_CODE, image: "/assets/images/funds/pincode-method.png" },
  ];

  const router = useRouter();
  const { coins } = useTradeCoin();
  const user = useSelector((state: any) => state.user);
  const userExternalWallets = useSelector((state: any) => state.userExternalWallets);

  const [isShowTwoFa, setIsShowTwoFa] = useState(false);
  const [isShowMaxButton, setIsShowMaxButton] = useState<boolean>(true);
  const [isShowVerifyMethod, setIsShowVerifyMethod] = useState<boolean>(false);
  const [currentVerifyMethod, setCurrentVerifyMethod] = useState<any>({
    label: "AUTHEN",
    value: EVerifyMethod.AUTHEN,
    image: "/assets/images/funds/2fa-method.png",
  });
  const [isShowPinCodePopup, setIsShowPinCodePopup] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<any>();
  const [twoFaCode, setTwoFaCode] = useState("");
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const externalWallet = ObjectUtils.getIn(userExternalWallets, "data", []).find((item: any) => item.code === coinCode);
  // var minAmount = 0;
  // const minWithdraw = JSON.parse(`${process.env["NEXT_PUBLIC_MIN_WITHDRAW"]}`);
  // switch (coinId) {
  //   case 1:
  //     minAmount = Number(minWithdraw.ETH) || 0.01;
  //     break;
  //   case 3:
  //     minAmount = Number(minWithdraw.USDT) || 10;
  //     break;
  //   case 8:
  //     minAmount = Number(minWithdraw.VLT) || 10;
  //     break;
  // }

  const [optionsToken, setOptionsToken] = useState([{ label: EToken.USDT, value: EToken.USDT }]);
  const [arrCoin, setArrCoin] = useState<Array<EToken>>([EToken.USDT]);

  const sourceCoin = coins.filter((item) => item.code === coinCode)?.[0];
  const destinationCoin = coins.filter((item) => item.code === "USDT")?.[0];

  // const rate = (sourceCoin.toUsd / destinationCoin.toUsd).toLocaleString(getLocaleKey(), {
  //   maximumFractionDigits: 4,
  //   minimumFractionDigits: 4,
  // });

  const { getInputProps, handleSubmit, isSubmitting, isValid } = useForm({
    enableReinitialize: true,
    structure: [
      {
        name: "network",
        defaultValue: ENetWork.BEP20,
      },
      {
        name: "token",
        defaultValue: EToken.USDT,
      },
      {
        name: "walletAddress",
        defaultValue: ObjectUtils.getIn(externalWallet, "address", ""),
        validate: Yup.string().required(translate("Must be provided")),
      },
      {
        name: "amount",
        defaultValue: configFee?.withdrawMinAmount,
        validate: Yup.number()
          .required(translate("Must be provided"))
          .min(
            configFee?.withdrawMinAmount,
            translate("Minimum is {amount}", {
              amount: `${configFee?.withdrawMinAmount} ${coinCode}`,
            })
          )
          .max(availableAmount, translate("The amount in the asset is not enough")),
      },
      {
        name: "availableAmount",
      },
    ],
    onSubmit: async (values) => {
      return BankService.requestWithdraw({
        coinId,
        feeCoinId: sourceCoin?.coinId,
        value: values.amount,
        token: getInputProps("token").value,
        twoFaCode,
        network: getInputProps("network").value,
        address: values.walletAddress,
        methodVerify: currentVerifyMethod?.value,
        pinCode: +pinCode,
      })
        .then(() => {
          localStorage.setItem("withdraw-redirect-url-href", window.location.href);

          if (currentVerifyMethod?.value === EVerifyMethod.EMAIL) {
            CreateAlert({
              message: translate("Please check your mailbox to withdraw"),
              type: EAlertType.SUCCESS,
            });
          } else {
            CreateAlert({
              message: translate("Withdrawal request sent successfully"),
              type: EAlertType.SUCCESS,
            });
          }
          // Routes.userAccountWallets.push();
        })
        .catch((err) => {
          if (err.status === 455) {
            return CreateAlert({
              message: translate("You need to bet more {amount} USDT to withdraw", {
                amount: (+err.message).toFixed(4),
              }),
              type: EAlertType.ERROR,
            });
          }
          if (err.status === 456) {
            return CreateAlert({
              message: translate("Withdrawal limit for the day is {amount}", {
                amount: NumberUtils.toFormatNumber(+err.message, 4),
              }),
              type: EAlertType.ERROR,
            });
          }
          if (err.status === 457) {
            return CreateAlert({
              message: translate("Withdrawal limit for the week is {amount}", {
                amount: NumberUtils.toFormatNumber(+err.message, 4),
              }),
              type: EAlertType.ERROR,
            });
          }
          if (err.message == "REQUIRED_TWO_FA") {
            setIsShowTwoFa(true);
            return;
          }
          CreateAlert({ message: err.message, type: EAlertType.ERROR });
        })
        .finally(() => {
          setIsRequesting(false);
          onClose();
        });
    },
  });

  const onVerifyTwoFa = (code: any) => {
    setTwoFaCode(code);
    if (isRequesting === true) return;
    setIsRequesting(true);
    handleSubmit();
  };

  let handleOnClickContinue = () => {
    setIsShowVerifyMethod(false);
    if (currentVerifyMethod?.value === EVerifyMethod.PIN_CODE) {
      if (user?.isPinWithdraw === true) {
        setIsShowPinCodePopup(true);
      } else {
        CreateAlert({ message: translate("Please setup Withdrawal Code first"), type: EAlertType.WARNING });
        onOpenPupup('withdrawal-code');
      }
    }
    if (currentVerifyMethod?.value === EVerifyMethod.EMAIL) {
      if (isRequesting === true) return;
      setIsRequesting(true);
      handleSubmit();
    }
    if (currentVerifyMethod?.value === EVerifyMethod.AUTHEN) {
      setIsShowVerifyMethod(false);
      if (user?.isTwoFa === true) {
        setIsShowTwoFa(true);
      } else {
        CreateAlert({ message: translate("Please setup Two-Factor Authentication first"), type: EAlertType.WARNING });
        onOpenPupup('two-fa');
      }
    }
  };

  let handleOnChangeVerifyMethod = (element: any) => {
    setCurrentVerifyMethod(element);
  };

  let handleOnClickWithdraw = () => {
    if (isValid === false) {
      CreateAlert({ message: translate("Please fill in all fields"), type: EAlertType.WARNING });
      return;
    }
    setIsShowVerifyMethod(true);

  };

  let CustomOption = (props: any) => {
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

  let SingleValue = (props: any) => {
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

  let CustomOption2 = (props: any) => {
    return (
      <components.Option {...props}>
        <div className="custom-option__container">
          <div className="custom-option__icon">
            <img src={`/assets/images/funds/${props?.data?.value?.toLowerCase()}.png`} alt="" />
          </div>
          <div className="custom-option__label">{props?.data?.label}</div>
        </div>
      </components.Option>
    );
  };

  let SingleValue2 = (props: any) => {
    return (
      <components.SingleValue {...props}>
        <div className="single-value__container">
          <div className="single-value__icon">
            <img src={`/assets/images/funds/${props?.data?.value?.toLowerCase()}.png`} alt="" />
          </div>
          <div className="single-value__label">{props?.data?.label}</div>
        </div>
      </components.SingleValue>
    );
  };

  const DropdownIndicator2 = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.86198 0.195312L3.99998 3.05731L1.13798 0.195312L0.195312 1.13798L3.99998 4.94265L7.80465 1.13798L6.86198 0.195312Z"
            fill="black"
          />
        </svg>
      </components.DropdownIndicator>
    );
  };

  const CustomIndicatorSeparator2 = (props: any) => null;

  useEffect(() => {
    UserService.getExternalWallets(store);
  }, []);

  if (!isVisible) return null;

  const inputPropsNetwork = getInputProps("network");
  const inputPropsToken = getInputProps("token");

  const displayNetworkName = () => {
    switch (inputPropsNetwork?.value) {
      case ENetWork.BEP20: {
        return "BEP-20";
      }
      // case ENetWork.TRC20: {
      //   return "TRC-20";
      // } // tạm ẩn
      default: {
        return "BEP-20";
      }
    }
  };

  const displayCoinName = () => {
    return arrCoin?.map((item: string, idx: number) => {
      if (idx === 0) return item;
      return " " + item;
    });
  };

  const handleOnClickMaxButton = (value: any) => {
    getInputProps("amount").onChange(value);
  };

  useEffect(() => {
    getInputProps("amount").value ? setIsShowMaxButton(false) : setIsShowMaxButton(true);
  }, [getInputProps("amount")]);

  const handleChangeNetwork = (network: string) => {
    inputPropsNetwork?.onChange(network);
    setOptionsToken(() => {
      return network === ENetWork.BEP20 ? [{ label: EToken.USDT, value: EToken.USDT }] : [{ label: EToken.USDT, value: EToken.USDT }];
    });
    setArrCoin(() => {
      return [EToken.USDT];
    });
    handleChangeToken(EToken.USDT);
  };

  const handleChangeToken = (token: any) => {
    inputPropsToken?.onChange(token);
  };

  let handleOnSubmitPinCode = (code: any) => {
    setPinCode(code);
    if (isRequesting === true) return;
    setIsRequesting(true);
    handleSubmit();
  };

  return (
    <div className="withdraw-form">
      <div className="withdraw-form__step-1">
        <div className="withdraw-form__step-1__title">
          <div className="withdraw-form__step-1__title__label">{translate("Select token to withdrawal")}</div>
        </div>
        <div className="withdraw-form__step-1__content">
          <ReactSelect
            options={optionsToken}
            value={optionsToken?.find((element) => element?.value === inputPropsToken?.value)}
            onChange={(element) => handleChangeToken(element?.value)}
            className="token-select"
            classNamePrefix="token-select"
            components={{
              Option: CustomOption2,
              SingleValue: SingleValue2,
              DropdownIndicator: DropdownIndicator2,
              IndicatorSeparator: CustomIndicatorSeparator2,
            }}
            isSearchable={false}
          />
        </div>
      </div>
      <div className="withdraw-form__step-2">
        <div className="withdraw-form__step-2__title">
          <div className="withdraw-form__step-2__title__label">{translate("Select {coinSymbol} Withdraw Network", {coinSymbol: 'USDT'})}</div>
        </div>
        <div className="withdraw-form__step-2__content">
          <div className="withdraw-zone">
            <div className="withdraw-zone__network-select">
              <ReactSelect
                options={networkOptions?.map((element:any) => ({
                  label: `${inputPropsToken?.value != null ? `${inputPropsToken?.value} - ${element?.label}` : `${element?.label}`}`,
                  value: element?.value,
                }))}
                value={networkOptions?.map((element:any) => ({
                  label: `${inputPropsToken?.value != null ? `${inputPropsToken?.value} - ${element?.label}` : `${element?.label}`}`,
                  value: element?.value,
                }))?.find((element: any) => element?.value === inputPropsNetwork?.value)}
                onChange={(element) => handleChangeNetwork(element?.value)}
                className="network-select"
                classNamePrefix="network-select"
                components={{
                  // Option: CustomOption,
                  // SingleValue: SingleValue,
                  DropdownIndicator: DropdownIndicator2,
                  IndicatorSeparator: CustomIndicatorSeparator2,
                }}
                isSearchable={false}
                isDisabled={coinCode !== "USDT"}
              />
            </div>
            <div className="withdraw-zone__asset-address">
              <InputWraper
                label={translate("Address")}
                placeholder={translate("Input address")}
                inputProps={getInputProps("walletAddress")}
                renderInput={(state) => <InputWalletAddress {...state} coinCode={coinCode} network={inputPropsNetwork.value} />}
              />
            </div>
            <div className="withdraw-zone__asset-amount">
              <InputWraper
                className="mb-1"
                label={translate("Amount")}
                placeholder={`Min: 0`}
                inputProps={getInputProps("amount")}
                renderInput={(state) => {
                  return (
                    <>
                      <div className="prefix-token">
                        <div className="prefix-token__icon">
                          <img width={18} height={18} src={`/assets/images/coins/${inputPropsToken.value.toLowerCase()}.png`} alt="" />
                        </div>
                        <div className="prefix-token__label">{inputPropsToken.value}</div>
                      </div>
                      <InputNumber {...state} decimalScale={4} />
                      {isShowMaxButton && (
                        <div className="fill-max" onClick={() => handleOnClickMaxButton(availableAmount)}>
                          {translate("MAX")}
                        </div>
                      )}
                    </>
                  );
                }}
                // customSuffix={inputPropsToken.value}
                // suffix={` ${inputPropsToken.value}`}
              />
            </div>
            <div className="withdraw-zone__asset-info">
              <div className="withdraw-zone__asset-info__available">
                <div className="withdraw-zone__asset-info__available__label">{translate("Available")}:&nbsp;</div>
                <div className="withdraw-zone__asset-info__available__value">${NumberUtils.toFormatNumber(availableAmount, 4)} USDT</div>
              </div>
              <div className="withdraw-zone__asset-info__fee">
                {translate("Withdraw Fee")}:{" "}
                {getInputProps("amount").value * (configFee?.withdrawFeePercent / 100) <= configFee?.withdrawFeeMin
                    ? (configFee?.withdrawFeeMin).toLocaleString(getLocaleKey(), { maximumFractionDigits: 4, minimumFractionDigits: 4 })
                    : (getInputProps("amount").value * (configFee?.withdrawFeePercent / 100)).toLocaleString(getLocaleKey(), {
                        maximumFractionDigits: 4,
                        minimumFractionDigits: 4,
                      })}{" "}
                {coinCode}
              </div>
            </div>
            <div className="withdraw-zone__warning">
              <strong>{`${translate("Warning")}: `}</strong>
              {translate("Only withdraw") +
                " " +
                displayCoinName() +
                ". " +
                translate("The network must be") +
                " " +
                displayNetworkName() +
                ". " +
                translate("Make sure the network matches the network address entered") +
                "."}
            </div>
            <div className="withdraw-zone__main-button">
              <Button
                type="button"
                label={translate("Withdraw")}
                // icon={Icon.Deposit}
                onClick={handleOnClickWithdraw}
                // onClick={handleSubmit}
                isLoading={isSubmitting}
              />
            </div>
            <div className="withdraw-zone__toggle-notification">
              <div className="toggle-send-email">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShowTwoFa ? (
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
      ) : null}
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
                                    Option: CustomOption,
                                    SingleValue: SingleValue,
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
              />
            </div>
          </div>
        </PopupWraper>
      )}
    </div>
  );
};
