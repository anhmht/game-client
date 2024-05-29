"use client";

import { translate } from "@/src/languages";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { WithdrawalChangePinCodeForm, WithdrawalCreatePinCodeForm, WithdrawalForgotPinCodeForm } from "./components";

const personalInfo = () => {
    const user = useSelector((state:any) => state.user);

    const [isShowForgotPinCode, setIsShowForgotPinCode] = useState<boolean>(false);

    return (
        <div className="withdrawal-code-page">
            <div className="withdrawal-code__header">{translate("Withdrawal Code")}</div>
            <div className="withdrawal-code__body">
                <div className="row">
                    <div className="col-xl-6 col-md-9 col-12">
                        {user?.isPinWithdraw === false && <WithdrawalCreatePinCodeForm />}
                        {user?.isPinWithdraw === true && isShowForgotPinCode === false && (
                            <WithdrawalChangePinCodeForm onChangeShowForgotPinCode={(value: boolean) => setIsShowForgotPinCode(value)} />
                        )}
                        {user?.isPinWithdraw === true && isShowForgotPinCode === true && (
                            <WithdrawalForgotPinCodeForm onChangeShowForgotPinCode={(value: boolean) => setIsShowForgotPinCode(value)} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default personalInfo;
