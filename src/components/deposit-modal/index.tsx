import { DepositForm } from "@/app/(routes)/(all-routes)/(protected-routes)/deposit/component/deposit-form";
import { Icon, ObjectUtils } from "@/src/modules";
import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";
// import { useHistory } from 'react-router-dom';

export const DepositModalContext:any = createContext(null);

export function DepositModal() {
    const walletBalances = useSelector((state: any) => state.userWalletBalances);
    const walletBalance = ObjectUtils.getIn(walletBalances, "data", [], (arr) => arr.find((item: any) => item.code === "USDT"));
    const availableAmount: number = +ObjectUtils.getIn(walletBalance, "amount", 0);
    
    const { isShowDepositModal, setIsShowDepositModal } = useContext<any>(DepositModalContext);
    //   const history = useHistory();

    function closeModal() {
        setIsShowDepositModal(false);
        // history.goBack();
    }

    if (!isShowDepositModal) return null;

    return (
        <div className="deposit-overlay">
            <div className="deposit-modal">
                <div className="deposit-modal__close-indicator" onClick={() => setIsShowDepositModal(false)}><Icon.CloseModalIcon /></div>
                <div className="deposit-modal__header-title">DEPOSIT</div>
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
