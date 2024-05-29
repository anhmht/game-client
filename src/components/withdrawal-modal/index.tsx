import { ObjectUtils } from "@/src/modules";
import AffiliateService from "@/src/services/affiliate/affiliate.service";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WithdrawForm } from "./component";
// import { useHistory } from 'react-router-dom';

export const WithdrawalModalContext:any = createContext(null);

export function WithdrawalModal(props:any) {
    const walletBalances = useSelector((state: any) => state.userWalletBalances);
    const walletBalance = ObjectUtils.getIn(walletBalances, "data", [], (arr) => arr.find((item: any) => item.code === "USDT"));
    const availableAmount: number = +ObjectUtils.getIn(walletBalance, "amount", 0);
    const networkOptions = useSelector((state: any) => state.main.networkOptions);
    
    const { isShowWithdrawalModal, setIsShowWithdrawalModal } = useContext<any>(WithdrawalModalContext);

    const [configFee, setConfigFee] = useState<any>({});
    //   const history = useHistory();

    function closeModal() {
        setIsShowWithdrawalModal(false);
        // history.goBack();
    }

    useEffect(() => {
        AffiliateService.getConfigWithdrawFee().then((res) => setConfigFee(res));
    }, [])

    if (!isShowWithdrawalModal) return null;

    return (
        <div className="withdrawal-overlay">
            <div className="withdrawal-modal">
                <div className="withdrawal-modal__close-indicator" onClick={() => setIsShowWithdrawalModal(false)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 11H14V12H15V13H16V14H17V15H18V16H19V17H20V18H19V19H18V20H17V19H16V18H15V17H14V16H13V15H12V14H11V13H9V14H8V15H7V16H6V17H5V18H4V19H3V20H2V19H1V18H0V17H1V16H2V15H3V14H4V13H5V12H6V11H7V9H6V8H5V7H4V6H3V5H2V4H1V3H0V2H1V1H2V0H3V1H4V2H5V3H6V4H7V5H8V6H9V7H11V6H12V5H13V4H14V3H15V2H16V1H17V0H18V1H19V2H20V3H19V4H18V5H17V6H16V7H15V8H14V9H13V11Z" fill="white"/>
                    </svg>
                </div>
                <div className="withdrawal-modal__header-title">WITHDRAW</div>
                <WithdrawForm
                    isVisible
                    availableAmount={availableAmount}
                    coinCode={"USDT"}
                    coinId={3}
                    onClose={() => setIsShowWithdrawalModal(false)}
                    isAvailableExpGame={false}
                    configFee={configFee}
                    networkOptions={networkOptions}
                    onOpenPupup={(value:any) => props.onOpenPupup(value)}
                />
            </div>
        </div>
    );
}
