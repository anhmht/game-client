"use client";

import React, { FC, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import { CreateAlert, ObjectUtils, Message, EAlertType, Button } from "@/src/modules";
import { Icon, QRCodeWalletAddress, InputSelect, PopupWraper } from "@/src/components";
import { translate } from "@/src/languages";
import { ENetWork } from "@/src/types";
import { BankService, UserService } from "@/src/services";
import { store } from "@/src/redux/store";
import ReactSelect, { components } from "react-select";
import { IActionForm } from "../../../assets/page";
import { useSelector } from "react-redux";

export const DepositForm: FC<IActionForm> = ({ isVisible, coinCode }) => {
  let tokenOptions: any = [{ label: "USDT", value: "USDT" }];

  const [popupPromotionAlert, setPopupPromotionAlert] = useState<boolean>(false);
  const [tokenSelected, setTokenSelected] = useState<any>(tokenOptions[0]);
  const [network, setNetwork] = useState<any>({});
  const userInternalWallets = useSelector((state:any) => state.userInternalWallets);
  const userNetworkOptions = useSelector((state:any) => state.main.networkOptions);

  useEffect(() => {
    BankService.getTokenStandard(store).then((res) => {
      let defaultNetwork = res?.payload?.[0];
      setNetwork({
        label: `${tokenSelected != null ? `${tokenSelected?.label} - ${defaultNetwork?.label}` : `${defaultNetwork?.label}`}`,
        value: defaultNetwork?.value,
      });
    });
  }, []);

  if (!isVisible) return null;

  if (!userInternalWallets) return <Message type="loading" />;
  if (userInternalWallets.error) return <Message type="error" {...userInternalWallets.error} />;

  const internalWallet = userInternalWallets.data.find((v: any) => v.code === coinCode);
  const internalWalletByNetwork = ObjectUtils.getIn(internalWallet, network?.value?.toLowerCase());

  if (!ObjectUtils.getIn(internalWalletByNetwork, "address")) return <div className="text-center"><Icon.Loading /></div>;

  const displayNetworkName = () => {
    switch (network?.value) {
      case ENetWork.BEP20: {
        return "BEP-20";
      }
      // case ENetWork.TRC20: { // tạm ẩn
      //   return "TRC-20";
      // }
      default: {
        return "BEP-20";
      }
    }
  };

  let CustomOption = (props: any) => {
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

  let SingleValue = (props: any) => {
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

  const DropdownIndicator = (props: any) => {
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

  const CustomIndicatorSeparator = (props: any) => null;

  return (
    <>
      <div className="deposit-form">
        <div className="deposit-form__step-1">
          <div className="deposit-form__step-1__title">
            <div className="deposit-form__step-1__title__label">{translate("Select token to deposit")}</div>
          </div>
          <div className="deposit-form__step-1__content">
            <ReactSelect
              options={tokenOptions}
              value={tokenSelected}
              onChange={setTokenSelected}
              className="token-select"
              classNamePrefix="token-select"
              placeholder={translate("Please select currency...")}
              components={{
                Option: CustomOption,
                SingleValue: SingleValue,
                DropdownIndicator,
                IndicatorSeparator: CustomIndicatorSeparator,
              }}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="deposit-form__step-2">
          <div className="deposit-form__step-2__title">
            <div className="deposit-form__step-2__title__label">
              {translate(`Select {tokenName} deposit network`, { tokenName: tokenSelected?.label })}
            </div>
          </div>
          <div className="deposit-form__step-2__content">
            <div className="deposit-zone">
              <div className="deposit-zone__network-select">
                <ReactSelect
                  options={userNetworkOptions?.map((element:any) => ({
                    label: `${tokenSelected != null ? `${tokenSelected?.label} - ${element?.label}` : `${element?.label}`}`,
                    value: element?.value,
                  }))}
                  value={network}
                  onChange={(element) => setNetwork(element)}
                  className="network-select"
                  classNamePrefix="network-select"
                  components={{
                    // Option: CustomOption,
                    // SingleValue: SingleValue,
                    DropdownIndicator,
                    IndicatorSeparator: CustomIndicatorSeparator,
                  }}
                  isSearchable={false}
                />
              </div>
              <div className="deposit-zone__address-label">{translate("Click to copy assets address")}</div>
              {/* @ts-ignore */}
              <CopyToClipboard
                text={internalWalletByNetwork.address}
                onCopy={() => {
                  CreateAlert({
                    message: translate("Copied asset address"),
                    type: EAlertType.SUCCESS,
                  });
                }}
              >
                <div className="deposit-zone__address-content">
                  <div className="deposit-zone__address-content__value">{internalWalletByNetwork.address}</div>
                  <div className="deposit-zone__address-content__icon">
                    <div className="deposit-zone__address-content__icon__icon"><Icon.CopyIcon /></div>
                    <div className="deposit-zone__address-content__icon__label">Copy</div>
                  </div>
                </div>
              </CopyToClipboard>
              <div className="deposit-zone__warning">
                <strong>{`${translate("Warning")}:`}</strong>
                {` ${translate("The network must be")} ${displayNetworkName()} ${translate("Make sure your network matches the network address")}.`}
              </div>
              <div className="deposit-zone__qr">
                <QRCodeWalletAddress value={internalWalletByNetwork.address} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {popupPromotionAlert && (
        <PopupWraper className="deposit-promotion-popup" title={translate("special_deposit_bonus")} onClose={() => setPopupPromotionAlert(false)}>
          <div className="text-center">
            <p>{translate("special_deposit_bonus_content_success")}</p>
          </div>
        </PopupWraper>
      )}
    </>
  );
};
