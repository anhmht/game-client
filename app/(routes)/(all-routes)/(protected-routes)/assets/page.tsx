"use client";

import { Routes } from "@/src/AppRoutes";
import { Icon, DepositModalContext, WithdrawalModalContext } from "@/src/components";
import { useTradeCoin } from "@/src/hook";
import { translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, NumberUtils, ObjectUtils } from "@/src/modules";
import { BankService, OrderService, TradeService, UserService } from "@/src/services";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "@/src/redux/store";
import { UserWalletTransactionHistory } from "./components/transactions-history";
import CopyToClipboard from "react-copy-to-clipboard";
import ChangePasswordForm from "./components/change-password";
import EnableTwoFaBox from "./components/enable-2fa";
import DisableTwoFaBox from "./components/disable-2fa";
import { WithdrawalChangePinCodeForm, WithdrawalCreatePinCodeForm, WithdrawalForgotPinCodeForm } from "./components";
import * as echarts from 'echarts';
import ReactECharts from "echarts-for-react";
import { TableFilterRangeTimeInput } from "@/src/components/table-filter-inputs";
import moment from "moment";

type Props = {};

export interface IActionForm {
  isVisible: boolean;
  coinCode: string;
  coinId: number;
  availableAmount: number;
  onClose: () => void;
  isAvailableExpGame?: boolean;
  configFee?: any;
  networkOptions?: any;
}

const page = (props: Props) => {
    enum EChartMenu {
        DEPOSIT = "DEPOSIT",
        WITHDRAW = "WITHDRAW",
        ORDERS = "ORDERS",
        COMMISSION = "COMMISSION"
    }

    let chartMenuOptions = [
        {label: EChartMenu.DEPOSIT, value: EChartMenu.DEPOSIT},
        {label: EChartMenu.WITHDRAW, value: EChartMenu.WITHDRAW},
        {label: EChartMenu.ORDERS, value: EChartMenu.ORDERS},
        {label: EChartMenu.COMMISSION, value: EChartMenu.COMMISSION}
    ];

    const router = useRouter();
    const user = useSelector((state: any) => state.user);
    const { coins, totalUsdBalance } = useTradeCoin();
    const walletBalances = useSelector((state: any) => state.userWalletBalances);
    const walletBalance = ObjectUtils.getIn(walletBalances, "data", [], (arr) => arr.find((item: any) => item.code === coins?.[0]?.code));
    const userNetworkOptions = useSelector((state:any) => state.main.networkOptions);
    const userInternalWallets = useSelector((state:any) => state.userInternalWallets);
    const internalWallet = userInternalWallets?.data?.find((v: any) => v.code === "USDT");
    const internalWalletByNetwork = ObjectUtils.getIn(internalWallet, userNetworkOptions?.[0]?.value?.toLowerCase());
    const availableAmount: number = +ObjectUtils.getIn(walletBalance, "amount", 0);
    
    const { setIsShowDepositModal } = useContext<any>(DepositModalContext);
    const { setIsShowWithdrawalModal } = useContext<any>(WithdrawalModalContext);

    const [isShowChangePasswordModal, setIsShowChangePasswordModal] = useState<boolean>(false);
    const [isShow2FAModal, setIsShow2FAModal] = useState<boolean>(false);
    const [isShowWithdrawalCodeModal, setIsShowWithdrawalCodeModal] = useState<boolean>(false);
    const [isShowForgotPinCode, setIsShowForgotPinCode] = useState<boolean>(false);
    const [currentChartMenu, setCurrentChartMenu] = useState<string>(EChartMenu.DEPOSIT);
    const [chartTimeRange, setChartTimeRange] = useState<any>({
        fromDate: moment().startOf("week").format(),
        toDate: moment().endOf("week").format(),
    });
    const [chartData, setChartData] = useState<any>();

    const [show, setShow] = useState(false);

    const [monthlyProfit, setMonthlyProfit] = useState({
        value: 0,
        percent: 0,
    });

    let renderChartLineColor = (currentChartMenu: string) => {
        switch (currentChartMenu) {
            case EChartMenu.DEPOSIT: {
                return "12, 186, 105";
            }
            case EChartMenu.WITHDRAW: {
                return "253, 83, 83";
            }
            case EChartMenu.ORDERS: {
                return "1, 163, 255";
            }
            case EChartMenu.COMMISSION: {
                return "251, 194, 23";
            }
            default: {
                return "251, 194, 23";
            }
        }
    }

    let ChartOptions = {
        color: [`rgba(${renderChartLineColor(currentChartMenu)})`],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        legend: {
            data: [currentChartMenu],
            textStyle: {
                color: '#fff'
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {},
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: chartData?.map((element: any) => element?.date) || [],
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                name: currentChartMenu,
                type: "line",
                stack: "Total",
                smooth: true,
                lineStyle: {
                    width: 4,
                    color: `rgba(${renderChartLineColor(currentChartMenu)})`, // Change the color here
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: `rgb(${renderChartLineColor(currentChartMenu)}, 0.25)`,
                        },
                        {
                            offset: 1,
                            color: `rgb(${renderChartLineColor(currentChartMenu)}, 0)`,
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: chartData?.map((element: any) => element?.value) || [],
            }
        ],
    };

    let handleOnClickChartMenu = async (element: any) => {
        await UserService.getOverviewDateReport({...chartTimeRange, fieldToGet: element?.value}).then((res) => {
            setChartData(res?.result);
        });
        setCurrentChartMenu(element?.value);
    };

    useEffect(() => {
        BankService.getTokenStandard(store);
        TradeService.getCoins(store);
    }, []);

    useEffect(() => {
        UserService.getOverviewDateReport({...chartTimeRange, fieldToGet: currentChartMenu}).then((res) => {
            setChartData(res?.result);
        });
    }, [chartTimeRange]);

    return (
        <div className="assets">
            <div className="assets__profile">
                <div className="row assets__profile__section">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-12 d-flex align-items-center">
                        <div className="assets__profile__section__user">
                            <div className="assets__profile__section__user__avatar">
                                <img className="assets__profile__section__user__avatar__img" src={`/assets/images/rank/${user?.rank}.png`} alt="" />
                            </div>
                            <div className="assets__profile__section__user__text">
                                <div className="assets__profile__section__user__text__label">Name</div>
                                <div className="assets__profile__section__user__text__value">{user?.firstName}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-6 col-md-6 col-12 d-flex align-items-center">
                        <div className="assets__profile__section__email">
                            <div className="assets__profile__section__email__label">Email</div>
                            <div className="assets__profile__section__email__value">{user?.email}</div>
                        </div>
                    </div>
                </div>
                <div className="assets__profile__feature">
                    <div className="assets__profile__feature__item" onClick={() => setIsShowChangePasswordModal(true)}>
                        <div className="assets__profile__feature__item__icon">
                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.3333 7.99996V7.33329H10.6667V3.99996H10V2.66663H9.33333V1.99996H8.66667V1.33329H7.33333V0.666626H4.66667V1.33329H3.33333V1.99996H2.66667V2.66663H2V3.99996H1.33333V7.33329H0.666667V7.99996H0V14.6666H0.666667V15.3333H11.3333V14.6666H12V7.99996H11.3333ZM3.33333 3.99996H4V3.33329H4.66667V2.66663H7.33333V3.33329H8V3.99996H8.66667V7.33329H3.33333V3.99996Z" fill="white"/>
                            </svg>
                        </div>
                        <div className="assets__profile__feature__item__text">Change password</div>
                    </div>
                    <div className="assets__profile__feature__item" onClick={() => setIsShow2FAModal(true)}>
                        <div className="assets__profile__feature__item__icon">
                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.3333 7.99996V7.33329H10.6667V3.99996H10V2.66663H9.33333V1.99996H8.66667V1.33329H7.33333V0.666626H4.66667V1.33329H3.33333V1.99996H2.66667V2.66663H2V3.99996H1.33333V7.33329H0.666667V7.99996H0V14.6666H0.666667V15.3333H11.3333V14.6666H12V7.99996H11.3333ZM3.33333 3.99996H4V3.33329H4.66667V2.66663H7.33333V3.33329H8V3.99996H8.66667V7.33329H3.33333V3.99996Z" fill="white"/>
                            </svg>
                        </div>
                        <div className="assets__profile__feature__item__text">2FA Setup</div>
                    </div>
                    <div className="assets__profile__feature__item" onClick={() => setIsShowWithdrawalCodeModal(true)}>
                        <div className="assets__profile__feature__item__icon">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.6665 5.99996V4.66663H13.9998V3.33329H13.3332V2.66663H12.6665V1.99996H11.3332V1.33329H9.99984V0.666626H5.99984V1.33329H4.6665V1.99996H3.33317V2.66663H2.6665V3.33329H1.99984V4.66663H1.33317V5.99996H0.666504V9.99996H1.33317V11.3333H1.99984V12.6666H2.6665V13.3333H3.33317V14H4.6665V14.6666H5.99984V15.3333H9.99984V14.6666H11.3332V14H12.6665V13.3333H13.3332V12.6666H13.9998V11.3333H14.6665V9.99996H15.3332V5.99996H14.6665ZM7.33317 3.99996H8.6665V5.33329H7.33317V3.99996ZM6.6665 9.99996H7.33317V6.66663H6.6665V5.99996H8.6665V9.99996H9.33317V11.3333H6.6665V9.99996Z" fill="white"/>
                            </svg>
                        </div>
                        <div className="assets__profile__feature__item__text">Withdrawal code</div>
                    </div>
                </div>
            </div>
            <div className="assets-banner">
                <div className="assets-banner_left">
                    <div className="top">
                        <Icon.Wallet />
                        <span>{translate("Estimated Balance")}</span>
                        <div
                            className="assets-banner_left__toggle-balance"
                            onClick={() => setShow((prev) => !prev)}
                        >
                            {show ? <Icon.Visible /> : <Icon.Invisible />}
                        </div>
                    </div>
                    <div className="center1 text-left">
                        <h1 className="mb12">{show ? `${NumberUtils.toFormatNumber(totalUsdBalance, 4)} USDT` : "********"}</h1>
                        {/* <div className="assets-banner_left__wallet-addr">
                            <div className="assets-banner_left__wallet-addr__label">Address:</div>
                            <div className="assets-banner_left__wallet-addr__value">{internalWalletByNetwork?.address}</div>
                            <div className="assets-banner_left__wallet-addr__icon">
                                <CopyToClipboard
                                    text={internalWalletByNetwork?.address}
                                    onCopy={() => {
                                        CreateAlert({
                                            message: translate('Copied to clipboard!'),
                                            type: EAlertType.SUCCESS,
                                        });
                                    }}
                                >
                                    <div><Icon.CopyIcon /></div>
                                </CopyToClipboard>
                            </div>
                        </div> */}
                    </div>
                    <div className="bottom">
                        <div className="coin-array">
                            <div className="row coin-array__header">
                                <div className="col-xl-2 col-lg-3 col-md-3 col-6 coin-array__header__item">{translate("Wallet")}</div>
                                <div className="col-xl-2 col-lg-3 col-md-3 col-3 coin-array__header__item">{translate("Amount")}</div>
                                <div className="col-xl-2 col-lg-3 col-md-3 col-3 coin-array__header__item">{translate("Total")}</div>
                                <div className="col-xl-2 col-lg-3 col-3 d-md-flex d-none coin-array__header__item">{translate("Available")}</div>
                            </div>
                            <div className="coin-array__body">
                                {coins?.filter((item:any) => item?.coinId != 10)?.map((element: any, idx: number) => {
                                    let balance = walletBalances?.data?.find((item: any) => item.code === element?.code);
                                    return (
                                        <div key={idx} className="row coin-array__body__item">
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-6 coin-array__body__item__value">
                                                <img
                                                    className="mr8"
                                                    width={32}
                                                    height={32}
                                                    src={TradeService.getCoinImageSrc(element?.code)}
                                                    alt=""
                                                />
                                                {element?.code}
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-3 coin-array__body__item__value">
                                                {show ? `${NumberUtils.toFormatNumber(balance?.amount, 4)}` : "*******"}
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-3 coin-array__body__item__value">
                                                {show ? `${NumberUtils.toFormatNumber(balance?.amount*element?.toUsd, 4)}` : "*******"}
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-3 d-md-flex d-none coin-array__body__item__value">
                                                {show ? `${NumberUtils.toFormatNumber(balance?.amount*element?.toUsd, 4)}` : "*******"}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="assets-banner_right">
                    <div className="d-flex align-items-center">
                        <Button
                            className="assets-banner_right__deposit-btn"
                            label={translate("Deposit")}
                            buttonType="primary"
                            onClick={() => setIsShowDepositModal(true)}
                        />
                        <Button
                            className="assets-banner_right__withdraw-btn"
                            label={translate("Withdraw")}
                            buttonType="secondary"
                            onClick={() => setIsShowWithdrawalModal(true)}
                        />
                    </div>
                </div>
            </div>
            <div className="assets__chart">
                <div className="assets__chart__header">
                    <div className="assets__chart__header__button-group">
                        {chartMenuOptions.map((element, idx) => {
                            return (
                                <div key={idx} className={`assets__chart__header__button-group__item ${(element?.label === currentChartMenu) ? 'active' : ''}`} onClick={() => handleOnClickChartMenu(element)}>{element.label}</div>
                            )
                        })}
                    </div>
                    <div className="assets__chart__header__time-group">
                        <TableFilterRangeTimeInput
                            fromKey="fromDate"
                            toKey="toDate"
                            params={chartTimeRange}
                            paramKey=""
                            onChange={(e) => setChartTimeRange(e)}
                        />
                    </div>
                </div>
                <div className="assets__chart__body">
                    <ReactECharts
                        option={ChartOptions}
                        style={{ height: "500px" }}
                    />
                </div>
            </div>
            <UserWalletTransactionHistory setMonthlyProfit={setMonthlyProfit} show={show} />
            {isShowChangePasswordModal && (
                <div className="change-password-modal-overlay">
                    <div className="change-password-modal">
                        <div className="change-password-modal__close-indicator" onClick={() => setIsShowChangePasswordModal(false)}><Icon.CloseModalIcon /></div>
                        <div className="change-password-modal__header-title">CHANGE PASSWORD</div>
                        <ChangePasswordForm />
                    </div>
                </div>
            )}
            {isShow2FAModal && (
                <div className="two-fa-modal-overlay">
                    <div className="two-fa-modal">
                        <div className="two-fa-modal__close-indicator" onClick={() => setIsShow2FAModal(false)}><Icon.CloseModalIcon /></div>
                        <div className="two-fa-modal__header-title">2FA SETUP</div>
                        {!user.isTwoFa ? <EnableTwoFaBox onClose={() => setIsShow2FAModal(false)} /> : <DisableTwoFaBox onClose={() => setIsShow2FAModal(false)} />}
                    </div>
                </div>
            )}
            {isShowWithdrawalCodeModal && (
                <div className="withdrawal-code-modal-overlay">
                    <div className="withdrawal-code-modal">
                        <div className="withdrawal-code-modal__close-indicator" onClick={() => setIsShowWithdrawalCodeModal(false)}><Icon.CloseModalIcon /></div>
                        <div className="withdrawal-code-modal__header-title">{(user?.isPinWithdraw === false) ? 'WITHDRAWAL CODE' : (isShowForgotPinCode === false) ? 'CHANGE WITHDRAWAL CODE' : 'RESET WITHDRAWAL CODE'}</div>
                        {user?.isPinWithdraw === false && <WithdrawalCreatePinCodeForm onClose={() => setIsShowWithdrawalCodeModal(false)} />}
                        {user?.isPinWithdraw === true && isShowForgotPinCode === false && (
                            <WithdrawalChangePinCodeForm onClose={() => setIsShowWithdrawalCodeModal(false)} onChangeShowForgotPinCode={(value: boolean) => setIsShowForgotPinCode(value)} />
                        )}
                        {user?.isPinWithdraw === true && isShowForgotPinCode === true && (
                            <WithdrawalForgotPinCodeForm onClose={() => setIsShowWithdrawalCodeModal(false)} onChangeShowForgotPinCode={(value: boolean) => setIsShowForgotPinCode(value)} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;
