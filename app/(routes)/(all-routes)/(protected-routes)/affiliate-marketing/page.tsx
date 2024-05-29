"use client";

import { translate } from "@/src/languages";
import { Button } from "@/src/modules";
import React, { useEffect, useState } from "react";
import Overview from "./overview";
import { useSelector } from "react-redux";
import AffiliateService from "@/src/services/affiliate/affiliate.service";
import { Tree } from "./tree";
import Commission from "./commission";

type Props = {};

function page({}: Props) {
    const user = useSelector((state: any) => state.user);
    const userAffiliate = useSelector((state: any) => state.userAffiliate);

    // const listTab = [
    //     {
    //         label: translate("Overview"),
    //         value: "General",
    //     },
    //     {
    //         label: translate("Commissions"),
    //         value: "Commission",
    //     },
    // ];

    // const [tab, setTab] = useState<any>(listTab?.[0]?.value);

    useEffect(() => {
        if (!userAffiliate && user) AffiliateService.getInfo();
    }, [userAffiliate, user]);

    return (
        <div className="aff">
            <Overview />
            {/* <div className="tab-content"> */}
                {/* <div
                    className={`tab-pane fade ${listTab?.[0]?.value === tab && "show active"}`}
                    id={listTab?.[0]?.value}
                    role="tabpanel"
                    aria-labelledby={`${listTab?.[0]?.value}-tab`}
                >
                    <Overview />
                </div> */}
                {/* <div
                    className={`tab-pane fade ${listTab?.[1]?.value === tab && "show active"}`}
                    id={listTab?.[1]?.value}
                    role="tabpanel"
                    aria-labelledby={`${listTab?.[1]?.value}-tab`}
                >
                    <Commission />
                </div> */}
            {/* </div> */}
        </div>
    );
}

export default page;
