"use client";

import { memo, useEffect, useState } from "react";
import { getLocaleKey, translate } from "@/src/languages";
import { Button, ClassNames, CreateAlert, CustomTable, Icon, InputWraper, NumberUtils, useForm } from "@/src/modules";
import * as Yup from "yup";
import { UserService } from "@/src/services";
import moment from "moment";
import "moment/min/locales";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { Routes } from "@/src/AppRoutes";

const page = () => {
    const router = useRouter();
    const [depositStatusDetail, setDepositStatusDetail] = useState<any>(null);
    useEffect(() => {
        UserService.getDepositStatusDetail({ orderId: localStorage.getItem("current-processing") }).then((res: any) => {
            setDepositStatusDetail(res?.result);
        });

        return () => {};
    }, []);

    if (depositStatusDetail == null) return (
        <div className="deposit-status-detail-page">
            <div className="page-loading">
                <Icon.Loading/>
            </div>
        </div>
    )

    return (
        <div className="deposit-status-detail-page">
            <div className="indicator-back" onClick={() => router.push(Routes.userDeposit.href)}>
                <div className="indicator-back__icon">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.64814 17.0484C9.17951 17.5171 8.41971 17.5171 7.95108 17.0484L0.751078 9.84843C0.282449 9.3798 0.282449 8.62 0.751078 8.15137L7.95108 0.951375C8.41971 0.482746 9.17951 0.482746 9.64814 0.951375C10.1168 1.42 10.1168 2.1798 9.64814 2.64843L4.49666 7.7999L18.3996 7.7999C19.0623 7.7999 19.5996 8.33716 19.5996 8.9999C19.5996 9.66264 19.0623 10.1999 18.3996 10.1999L4.49666 10.1999L9.64814 15.3514C10.1168 15.82 10.1168 16.5798 9.64814 17.0484Z" fill="black"/>
                    </svg>
                </div>
                <div className="indicator-back__label">{translate("Deposit")}</div>
            </div>
            <div className="row justify-content-center">
                <div className="col-xxl-6 col-xl-8 col-12 ">
                    <div className="deposit-status-detail-container">
                        <div className={`deposit-status-detail__icon deposit-status-detail__icon--${depositStatusDetail?.status?.toLowerCase()}`}>
                            {(depositStatusDetail?.status === "SUCCESS") ? (
                                <>
                                    <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M40.5002 76.9015C60.8804 76.9015 77.4018 60.3801 77.4018 40C77.4018 19.6198 60.8804 3.09839 40.5002 3.09839C20.12 3.09839 3.59863 19.6198 3.59863 40C3.59863 60.3801 20.12 76.9015 40.5002 76.9015Z" fill="#0DA200"/>
                                        <path d="M40.5 80C18.4458 80 0.5 62.0573 0.5 40C0.5 17.9458 18.4458 0 40.5 0C62.5573 0 80.5 17.9458 80.5 40C80.5 62.0573 62.5573 80 40.5 80ZM40.5 6.19672C21.8602 6.19672 6.69672 21.3602 6.69672 40C6.69672 58.6398 21.8602 73.8033 40.5 73.8033C59.1398 73.8033 74.3033 58.6367 74.3033 40C74.3033 21.3602 59.1398 6.19672 40.5 6.19672Z" fill="#0DA200"/>
                                        <path d="M35.6669 54.7174C34.8366 54.7174 34.0433 54.3858 33.4577 53.7909L22.0247 42.172C20.8256 40.9513 20.8411 38.9931 22.0619 37.7909C23.2827 36.595 25.2439 36.6074 26.443 37.8281L35.577 47.1108L54.4741 26.2991C55.6297 25.0319 57.588 24.942 58.8489 26.0884C60.1161 27.238 60.2091 29.1961 59.0595 30.4664L37.9597 53.7041C37.3866 54.3361 36.5809 54.7017 35.7289 54.7203C35.7072 54.7174 35.6886 54.7174 35.6669 54.7174Z" fill="white"/>
                                    </svg>
                                </>
                            ) : (
                                <>
                                    <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M40.5 0C18.4431 0 0.5 17.9431 0.5 40C0.5 62.0569 18.4431 80 40.5 80C62.5569 80 80.5 62.0569 80.5 40C80.5 17.9431 62.5569 0 40.5 0Z" fill="#F44336"/>
                                        <path d="M55.2307 50.0165C56.5338 51.3202 56.5338 53.4265 55.2307 54.7303C54.5807 55.3803 53.7274 55.7068 52.8736 55.7068C52.0203 55.7068 51.167 55.3803 50.517 54.7303L40.5005 44.7132L30.484 54.7303C29.834 55.3803 28.9807 55.7068 28.1275 55.7068C27.2736 55.7068 26.4203 55.3803 25.7703 54.7303C24.4672 53.4265 24.4672 51.3202 25.7703 50.0165L35.7874 40L25.7703 29.9836C24.4672 28.6798 24.4672 26.5735 25.7703 25.2698C27.074 23.9667 29.1803 23.9667 30.484 25.2698L40.5005 35.2869L50.517 25.2698C51.8207 23.9667 53.927 23.9667 55.2307 25.2698C56.5338 26.5735 56.5338 28.6798 55.2307 29.9836L45.2137 40L55.2307 50.0165Z" fill="#FAFAFA"/>
                                    </svg>
                                </>
                            )}
                        </div>
                        <div className={`deposit-status-detail__primary-title deposit-status-detail__primary-title--${depositStatusDetail?.status?.toLowerCase()}`}>{(depositStatusDetail?.status === "SUCCESS") ? translate('Payment success') : translate('Payment failed')}</div>
                        <div className={`deposit-status-detail__secondary-title deposit-status-detail__secondary-title--${depositStatusDetail?.status?.toLowerCase()}`}>{(depositStatusDetail?.status === "SUCCESS") ? translate('The transaction is done successfully. Thank you for using the service.') : translate('Transaction failed. Please try again.')}</div>
                        {/* <div className={`deposit-status-detail__break-line deposit-status-detail__break-line--${depositStatusDetail?.status?.toLowerCase()}`}></div> */}
                        <div className="deposit-status-detail__body-title">{translate('Transaction information')}</div>
                        <div className="deposit-status-detail__form">
                            {/* <div className="deposit-status-detail__form-item deposit-status-detail__supplier">
                                <div className="deposit-status-detail__form-item__label">{translate('Providers')}</div>
                                <div className="deposit-status-detail__form-item__value">{depositStatusDetail?.processor}</div>
                            </div> */}
                            <div className="deposit-status-detail__form-item deposit-status-detail__order">
                                <div className="deposit-status-detail__form-item__label">{translate('Order code')}</div>
                                <div className="deposit-status-detail__form-item__value">{depositStatusDetail?.orderId}</div>
                            </div>
                            <div className="deposit-status-detail__form-item deposit-status-detail__transaction">
                                <div className="deposit-status-detail__form-item__label">{translate('Transaction code')}</div>
                                <div className="deposit-status-detail__form-item__value">{depositStatusDetail?.transactionId}</div>
                            </div>
                            <div className="deposit-status-detail__form-item deposit-status-detail__payment-method">
                                <div className="deposit-status-detail__form-item__label">{translate('Payment methods')}</div>
                                <div className="deposit-status-detail__form-item__value">{depositStatusDetail?.depositMethod}</div>
                            </div>
                            {/* <div className="deposit-status-detail__form-item deposit-status-detail__bank">
                                <div className="deposit-status-detail__form-item__label">{translate('Bank')}</div>
                                <div className="deposit-status-detail__form-item__value">{depositStatusDetail?.depositMethod}</div>
                            </div> */}
                            <div className="deposit-status-detail__form-item deposit-status-detail__payment-time">
                                <div className="deposit-status-detail__form-item__label">{translate('Payment time')}</div>
                                <div className="deposit-status-detail__form-item__value">{moment(depositStatusDetail?.dateCreated).locale(getLocaleKey()).format("L HH:mm:ss ([GMT]Z)")}</div>
                            </div>
                            <div className="deposit-status-detail__form-item deposit-status-detail__payment-total">
                                <div className="deposit-status-detail__form-item__label">{translate('Total payment')}</div>
                                <div className="deposit-status-detail__form-item__value">{`${new Intl.NumberFormat("en").format(depositStatusDetail?.processingAmount)} ${depositStatusDetail?.currency}`}</div>
                            </div>
                        </div>
                        <div className="deposit-status-detail__main-button">
                            <Button 
                                label={(depositStatusDetail?.status === "SUCCESS") ? translate('GO TO ASSET') : translate('TRY AGAIN')}
                                onClick={() => router.push(Routes.userAccountAssets.href)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;