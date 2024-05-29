"use client";

import { Routes } from '@/src/AppRoutes';
import { InputNumber, InputText } from '@/src/components';
import { translate } from '@/src/languages';
import { Button, CreateAlert, CustomTable, EAlertType, Icon, InputWraper, ObjectUtils, StringUtils, Table, useForm } from '@/src/modules';
import { store } from '@/src/redux/store';
import { TradeService, UserService } from '@/src/services';
import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import moment from 'moment';
import { TableFilterRangeTimeInput } from '@/src/components/table-filter-inputs';
import { useSelector } from 'react-redux';
import { ENetWork } from '@/src/types';

const page = () => {
    enum ETokenInformationStatus {
        READY = "READY",
        EXPIRED = "EXPIRED",
        SOLD_OUT = "SOLD_OUT",
        COMMING_SOON = "COMMING_SOON"
    }
    
    enum ETokenSellHistoryStatus {
        PENDING = 'PENDING',
        ACCEPTED = 'ACCEPTED',
        REJECTED = 'REJECTED',
        SENT = 'SENT',
    }
    const router = useRouter();

    const walletBalances = useSelector((state: any) => state.userWalletBalances);
    const walletBalance = ObjectUtils.getIn(walletBalances, "data", [], (arr) => arr.find((item: any) => item.code === "USDT"));
    const availableAmount: number = +ObjectUtils.getIn(walletBalance, "amount", 0);

    const userNetworkOptions = useSelector((state:any) => state.main.networkOptions);
    const userInternalWallets = useSelector((state:any) => state.userInternalWallets);
    const internalWallet = userInternalWallets?.data?.find((v: any) => v.code === "USDT");
    const internalWalletByNetwork = ObjectUtils.getIn(internalWallet, userNetworkOptions?.[0]?.value?.toLowerCase());
    
    const [privateSaleList, setPrivateSaleList] = useState<any>();
    const [privateSaleInfo, setPrivateSaleInfo] = useState<any>();
    const [isShowBuyPrivateSaleModal, setIsShowBuyPrivateSaleModal] = useState(false);
    const [isShowMaxButton, setIsShowMaxButton] = useState<boolean>(true);
    const [totalPrivateSalePurchased, setTotalPrivateSalePurchased] = useState<any>();

    let filters:any = [
        {
            name: translate('Time'),
            input: (e:any) => <TableFilterRangeTimeInput {...e} fromKey="fromDate" toKey="toDate" />,
            defaultValue: {
                fromDate: moment().startOf('month'),
                toDate: moment().endOf('day')
            }
        },
    ]

    let structure = [
        {
            className: "col-md-12 col-6 order-md-1 order-1 time",
            name: "TIME",
            key: "created",
            render: (item: any) => (item?.created ? moment(item?.created).format("L HH:mm:ss") : "N/A"),
        },
        {
            className: "col-md-12 col-6 order-md-1 order-2",
            name: "AMOUNT",
            key: "amount",
            render: (item: any) => (item?.amount ? `${new Intl.NumberFormat("en-US").format(item?.amount)} USDT` : "N/A"),
        },
        {
            className: "col-md-12 col-6 order-md-1 order-3",
            name: "PRICE",
            key: "price",
            render: (item: any) => (item?.price ? `${new Intl.NumberFormat("en-US").format(item?.price)} USDT` : "N/A"),
        },
        {
            className: "col-md-12 col-6 order-md-1 order-3 address",
            name: "ADDRESS",
            key: "address",
            render: (item: any) => (StringUtils.secretHex(item?.address, 10) ?? "N/A"),
        },
        {
            className: "col-md-12 col-6 order-md-1 order-4",
            name: "TOKEN",
            key: "token",
            render: (item: any) => (item?.token ? `${new Intl.NumberFormat("en-US").format(item?.token)} MUT` : "N/A"),
        },
        {
            className: "col-md-12 col-6 order-md-1 order-2 status",
            name: "STATUS",
            render: (item: any) => {
                return <span className={`status status--${item?.status?.toLowerCase()}`}>{item?.status ?? "N/A"}</span>;
            },
        },
        {
            className: "col-md-12 col-6 order-md-1 order-4 txhash",
            name: "TXHASH",
            key: "txHash",
            render: (item:any) => {
                const hash = ObjectUtils.getIn(item, "transactionHash");
                if (hash) {
                    switch (item.network) {
                        case ENetWork.BEP20: {
                            return (
                                <div className="txhash">
                                    <a
                                        href={`${process.env["NEXT_PUBLIC_BSC_SCAN"]}${hash}`}
                                        target="__blank"
                                    >
                                        {StringUtils.secretHex(hash, 10)} ({ENetWork.BEP20})
                                    </a>
                                </div>
                            );
                        }

                        case ENetWork.TRC20: {
                            return (
                                <div className="txhash">
                                    <a
                                        href={`${process.env["NEXT_PUBLIC_TRON_SCAN"]}${hash}`}
                                        target="__blank"
                                    >
                                        {StringUtils.secretHex(hash, 10)} ({ENetWork.TRC20})
                                    </a>
                                </div>
                            );
                        }

                        default: {
                            return (
                                <div className="txhash">
                                    <a
                                        href={`${process.env["NEXT_PUBLIC_BSC_SCAN"]}${hash}`}
                                        target="__blank"
                                    >
                                        {StringUtils.secretHex(hash, 10)} ({ENetWork.BEP20})
                                    </a>
                                </div>
                            );
                        }
                    }
                }
                return "--";
            },
        },
    ];

    const { handleSubmit, getInputProps, isSubmitting, resetForm } = useForm({
        enableReinitialize: true,
        structure: [
            {
                name: "address",
                validate: Yup.string()
                    .required(translate("Must be provided"))
            },
            {
                name: "amount",
                validate: Yup.number()
                    .typeError(translate("Must be a number"))
                    .required(translate("Must be provided"))
                    .positive(translate("Amount must be greater than 0"))
            },
        ],
        onSubmit: async (values: any) => {
            let payload = {
                tokenInformationId: privateSaleInfo?.tokenInformationId,
                address: values?.address,
                amount: +values?.amount
            }
            return UserService.buyPrivateSale(payload).then((res:any) => {
                UserService.getWalletBalances(store);
                router.push(Routes.userAccountAssets.href);
                CreateAlert({ message: translate('Buy successfully'), type: EAlertType.SUCCESS});
            }).catch((err:any) => {
                CreateAlert({ message: translate(err?.message), type: EAlertType.ERROR });
            }).finally(() => {
                setIsShowBuyPrivateSaleModal(false);
            });
        }
    });

    const handleOnClickMaxButton = (value: any) => {
        setIsShowMaxButton(false);
        getInputProps("amount").onChange(value);
    };

    useEffect(() => {
        UserService.getPrivateSaleList().then((res:any) => {
            setPrivateSaleList(res?.result?.data);
            setPrivateSaleInfo(res?.result?.data?.find((item:any) => item?.status === ETokenInformationStatus.READY));
        });

        UserService.getTotalPrivateSalePurchased().then((res:any) => {
            setTotalPrivateSalePurchased(res?.result);
        });
    }, []);

    useEffect(() => {
        getInputProps("amount").value ? setIsShowMaxButton(false) : setIsShowMaxButton(true);
    }, [getInputProps("amount")]);

    return (
        <div className="private-sale-page">
            <div className="private-sale__info">
                <div className="private-sale__info__main-title">MEMELOTTO PRIVATE</div>
                <div className="private-sale__info__content">
                    <div className="private-sale__info__content__time">
                        <div className="private-sale__info__content__time__label">PRIVATE ENDED:</div>
                        <div className="private-sale__info__content__time__value">
                            <div className="private-sale__info__content__time__value__icon">
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.3335 3.16675V2.33341H15.8335V0.666748H15.0002V4.83341H13.3335V0.666748H12.5002V2.33341H7.50016V0.666748H6.66683V4.83341H5.00016V0.666748H4.16683V2.33341H1.66683V3.16675H0.833496V17.3334H1.66683V18.1667H18.3335V17.3334H19.1668V3.16675H18.3335ZM17.5002 5.66675V8.16675H15.0002V5.66675H17.5002ZM17.5002 12.3334H15.0002V9.83341H17.5002V12.3334ZM17.5002 16.5001H15.0002V14.0001H17.5002V16.5001ZM2.50016 14.0001H5.00016V16.5001H2.50016V14.0001ZM2.50016 9.83341H5.00016V12.3334H2.50016V9.83341ZM13.3335 12.3334H10.8335V9.83341H13.3335V12.3334ZM9.16683 12.3334H6.66683V9.83341H9.16683V12.3334ZM6.66683 14.0001H9.16683V16.5001H6.66683V14.0001ZM10.8335 14.0001H13.3335V16.5001H10.8335V14.0001ZM13.3335 8.16675H10.8335V5.66675H13.3335V8.16675ZM9.16683 5.66675V8.16675H6.66683V5.66675H9.16683ZM5.00016 8.16675H2.50016V5.66675H5.00016V8.16675Z" fill="#FFD91D"/>
                                </svg>
                            </div>
                            <div className="private-sale__info__content__time__value__text">{moment(privateSaleList?.find((element:any) => element?.name == 'BLOCK 3')?.saleTo).utc(false).format('DD MMM YYYY')}</div>
                        </div>
                    </div>
                    <div className="row row-cols-md-5 row-cols-1 private-sale__info__content__info">
                        <div className="col private-sale__info__content__info__item">
                            <div className="private-sale__info__content__info__item__label">Block</div>
                            <div className="private-sale__info__content__info__item__value">{privateSaleInfo?.name ?? 'N/A'}</div>
                        </div>
                        <div className="col private-sale__info__content__info__item">
                            <div className="private-sale__info__content__info__item__label">Price (USDT)</div>
                            <div className="private-sale__info__content__info__item__value">{privateSaleInfo?.price ? new Intl.NumberFormat('en-US').format(privateSaleInfo?.price) : 'N/A'}</div>
                        </div>
                        <div className="col private-sale__info__content__info__item">
                            <div className="private-sale__info__content__info__item__label">Tokens for sale</div>
                            <div className="private-sale__info__content__info__item__value">{privateSaleInfo?.saleAmount ? new Intl.NumberFormat('en-US').format(privateSaleInfo?.saleAmount) : 'N/A'}</div>
                        </div>
                        <div className="col private-sale__info__content__info__item">
                            <div className="private-sale__info__content__info__item__label">Time for sale</div>
                            <div className="private-sale__info__content__info__item__value">{privateSaleInfo?.saleTo ? `${moment(privateSaleInfo?.saleFrom).utc(false).format('DD/MM/YYYY HH:mm')} UTC` : 'N/A'}</div>
                        </div>
                        <div className={`col private-sale__info__content__info__item private-sale__info__content__info__item__status private-sale__info__content__info__item__status--${privateSaleInfo?.status?.toLowerCase()}`}>
                            <div className="private-sale__info__content__info__item__label">Status</div>
                            <div className="private-sale__info__content__info__item__value">{privateSaleInfo?.status?.replace(/_/g, ' ') ?? 'N/A'}</div>
                        </div>
                    </div>
                </div>
                <div className="private-sale__info__button">
                    <Button
                        className="private-sale__info__button__buy-now"
                        label={'BUY NOW'}
                        onClick={() => setIsShowBuyPrivateSaleModal(true)}
                    />
                </div>
                <div className="private-sale__info__all-info">
                    <div className="private-sale__info__all-info__title">
                        <div className="private-sale__info__all-info__title__icon">
                            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 5.5V6.5H9.5V7H9V7.5H8V8H7V8.5H6.5V9H5.5V9.5H4.5V10H4V10.5H3V11H2V11.5H0.5V11H0V1H0.5V0.5H2V1H3V1.5H4V2H4.5V2.5H5.5V3H6.5V3.5H7V4H8V4.5H9V5H9.5V5.5H10Z" fill="#6B6072"/>
                            </svg>
                        </div>
                        <div className="private-sale__info__all-info__title__text">INFORMATION</div>
                    </div>
                    <div className="private-sale__info__all-info__table">
                        <div className="Table Custom">
                            <table>
                                <thead className="Table__Header">
                                    <tr className="mx-0">
                                        <th></th>
                                        <th>PRICE</th>
                                        <th>AMOUNT</th>
                                        <th>FROM DATE</th>
                                        <th>TO DATE</th>
                                        <th>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="Table__Body">
                                    {privateSaleList?.map((element:any, index:number) => {
                                        return (
                                            <tr key={index} className="mx-0">
                                                <td>{element?.name ?? 'N/A'}</td>
                                                <td>{element?.price ? new Intl.NumberFormat('en-US').format(element?.price) : 'N/A'}</td>
                                                <td>{element?.saleAmount ? new Intl.NumberFormat('en-US').format(element?.saleAmount) : 'N/A'}</td>
                                                <td>{element?.saleFrom ? `${moment(element?.saleFrom).utc(false).format('DD/MM/YYYY HH:mm')} UTC` : 'N/A'}</td>
                                                <td>{element?.saleTo ? `${moment(element?.saleTo).utc(false).format('DD/MM/YYYY HH:mm')} UTC` : 'N/A'}</td>
                                                <td>{element?.status ? <span className={`private-sale__info__all-info__table__status private-sale__info__all-info__table__status--${element?.status?.toLowerCase()}`}>{element?.status?.replace(/_/g, ' ')}</span> : 'N/A'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="private-sale__history">
                <CustomTable
                    enableReinitialize
                    hasOrderColumn
                    title={'HISTORY'}
                    classNameNoColumn="col-md-12 col-6 order-md-1 order-1"
                    filters={filters}
                    injectFilter={[<span className="total-sub-title">{translate('Total').toUpperCase()}: <span className="mr8">{totalPrivateSalePurchased?.token ? new Intl.NumberFormat("en-US").format(totalPrivateSalePurchased?.token) : '0'}</span> <img src={TradeService.getCoinImageSrc('MUT')}/></span>]}
                    structure={structure}
                    fetchData={async (state) => UserService.getPrivateSalePurchaseHistory({
                            ...state,
                            page: state.pageNumber,
                            pageSize: state.limit,
                        })
                    }
                />
            </div>
            {isShowBuyPrivateSaleModal && (
                <div className="buy-modal-overlay">
                    <div className="buy-modal">
                        <div className="buy-modal__close-indicator" onClick={() => setIsShowBuyPrivateSaleModal(false)}><Icon.CloseModalIcon /></div>
                        <div className="buy-modal__header-title">BUY PRIVATE SALE</div>
                        <div className="private-sale-form">
                            <div className="private-sale-form__price">PRICE: {privateSaleInfo?.price} USDT</div>
                            <div className="private-sale-form__address">
                                <InputWraper
                                    label={translate("Address")}
                                    placeholder={`Input your wallet address`}
                                    inputProps={getInputProps("address")}
                                    component={InputText}
                                />
                            </div>
                            <div className="private-sale-form__address-warning">*Make sure the address must be a BEP-20 network</div>
                            <div className="private-sale-form__amount">
                                <InputWraper
                                    label={translate("Amount")}
                                    placeholder={`Minimum: 0`}
                                    inputProps={getInputProps("amount")}
                                    renderInput={(state) => {
                                        return (
                                            <>
                                                <InputNumber {...state} decimalScale={4} />
                                                {isShowMaxButton && (
                                                    <div className="fill-max" onClick={() => handleOnClickMaxButton(availableAmount)}>
                                                    {translate("MAX")}
                                                    </div>
                                                )}
                                            </>
                                        );
                                    }}
                                />
                            </div>
                            <div className="private-sale-form__extra">
                                <div className="private-sale-form__extra__available-balance">Available: <strong>{availableAmount} USDT</strong></div>
                                <div className="private-sale-form__extra__fee">Fee: 0</div>
                            </div>
                            <div className="private-sale-form__actual-receive">
                                <div className="private-sale-form__actual-receive__label">RECEIVE QUANTITY</div>
                                <div className="private-sale-form__actual-receive__input">
                                    <div className="private-sale-form__actual-receive__input__prefix">
                                        <div className="private-sale-form__actual-receive__input__prefix__icon">
                                            <img width={18} height={18} src="/assets/images/coins/mut.png" alt="" />
                                        </div>
                                        <div className="private-sale-form__actual-receive__input__prefix__text">MUT</div>
                                    </div>
                                    <div className="private-sale-form__actual-receive__input__main">{getInputProps("amount").value / privateSaleInfo?.price}</div>
                                </div>
                            </div>
                            <div className="private-sale-form__indicator-button">
                                <Button
                                    className="private-sale-form__indicator-button__buy"
                                    label={translate("Buy")}
                                    onClick={handleSubmit}
                                    isLoading={isSubmitting}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;