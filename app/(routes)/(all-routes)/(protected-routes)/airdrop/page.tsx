"use client";

import { TableFilterRangeTimeInput } from "@/src/components/table-filter-inputs";
import { translate } from "@/src/languages";
import { CustomTable, ObjectUtils, StringUtils } from "@/src/modules";
import { UserService } from "@/src/services";
import { ENetWork } from "@/src/types";
import moment from "moment";
import React, { useEffect, useState } from "react";

const page = () => {
    const [totalAmount, setTotalAmount] = useState<number>();
    let filters:any = [
        {
            name: translate('Time'),
            input: (e:any) => <TableFilterRangeTimeInput {...e} fromKey="fromDate" toKey="toDate" format="dd/MM/y" />,
            defaultValue: {
                fromDate: moment().startOf('month'),
                toDate: moment().endOf('day')
            }
        },
    ]

    let structure = [
        {
            className: "col-md-12 col-6 order-md-1 order-1 time",
            name: "EMAIL",
            key: "userGeneratedEmail",
            render: (item: any) => item?.userGeneratedEmail ?? "N/A",
        },
        {
            className: "col-md-12 col-6 order-md-1 order-2",
            name: "Bonus",
            key: "airdropCommission",
            render: (item: any) => (item?.airdropCommission ? new Intl.NumberFormat("en-US").format(item?.airdropCommission) : "N/A"),
        },
        {
            className: "col-md-12 col-6 order-md-1 order-3",
            name: "MRT",
            key: "mainBalance",
            render: (item: any) => (item?.mainBalance ? new Intl.NumberFormat("en-US").format(item?.mainBalance) : "N/A"),
        },
    ];

    return (
        <div className="airdrop">
            <div className="airdrop__banner">
                <div className="airdrop__banner__logo">
                    <img
                        width={48}
                        src="/assets/images/coins/mrt.png"
                        alt=""
                    />
                </div>
                <div className="airdrop__banner__label">Total Bonus Point Amount</div>
                <div className="airdrop__banner__value">{(totalAmount != null) ? new Intl.NumberFormat("en-US").format(totalAmount) : 'N/A'} MRT</div>
            </div>
            <div className="airdrop__detail-info">
                {`12 billion MRT tokens are being airdropped.
                Only 9.600.000 accounts receive airdrop.
                Sign Up successful will receive 1.000 MRT.
                For each New member joining MemeLotto with your referral link, you will receive a lot of bonus points.`}
            </div>
            <div className="airdrop__rules">
                <CustomTable
                    isHighLightHeader
                    isTextCenter
                    isNotShowPagination
                    title={'RULES FOR BONUS POINT:'}
                    structure={[
                        {
                            name: "F1",
                            key: "f1",
                        },
                        {
                            name: "F2",
                            key: "f2",
                        },
                        {
                            name: "F3",
                            key: "f3",
                        },
                        {
                            name: "F4",
                            key: "f4",
                        },
                        {
                            name: "F5",
                            key: "f5",
                        },
                        {
                            name: "F6",
                            key: "f6",
                        },
                        {
                            name: "F7",
                            key: "f7",
                        },
                    ]}
                    data={{
                        data: [
                            {
                                f1: "80 MRT",
                                f2: "60 MRT",
                                f3: "40 MRT",
                                f4: "20 MRT",
                                f5: "20 MRT",
                                f6: "20 MRT",
                                f7: "10 MRT",
                            }
                        ],
                        count: 1,
                    }}
                />
            </div>
            <div className="airdrop__history">
                <CustomTable
                    enableReinitialize
                    hasOrderColumn
                    title={'HISTORY'}
                    classNameNoColumn="col-md-12 col-6 order-md-1 order-1"
                    filters={filters}
                    structure={structure}
                    fetchData={async (state) => UserService.getAirdropHistory({
                        ...state,
                        page: state.pageNumber,
                        pageSize: state.limit,
                    }).then((res) => {
                        setTotalAmount(res.totalAmount);
                        return res;
                    })}
                />
            </div>
        </div>
    );
};

export default page;
