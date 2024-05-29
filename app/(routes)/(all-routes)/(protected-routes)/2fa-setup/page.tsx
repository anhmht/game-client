"use client";

import { translate } from "@/src/languages";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EnableTwoFaBox from "./component/enable-2fa";
import DisableTwoFaBox from "./component/disable-2fa";

const page = () => {
    const user = useSelector((state:any) => state.user);

    return (
        <div className="two-fa-page">
            <div className="two-fa__header">{translate('Two-Factor Authentication Setup')}</div>
            <div className="two-fa__body">
                {/* <div className="two-fa__body__title">{translate("Enable Google Authentication")}</div> */}
                <div className="two-fa__body__content">
                    {!user.isTwoFa ? <EnableTwoFaBox /> : <DisableTwoFaBox />}
                </div>
            </div>
        </div>
    );
};

export default page;
