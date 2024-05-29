"use client";

import { PopupWraper } from "@/src/components";
import { translate } from "@/src/languages";
import { Button, CreateAlert, CustomTable, EAlertType } from "@/src/modules";
import { UserService } from "@/src/services";
import moment from "moment";
import React, { useEffect, useState } from "react";
import FormRequest from "./form-request";

type Props = {};

function page({}: Props) {
  const [forceUpdateTable, setForceUpdateTable] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [dataClaimToday, setDataClaimToday] = useState<any>();
  const [dataTopOrders, setDataTopOrders] = useState<any>();

  let OrdersTableStructure = [
    {
      className: "col-md-12 col-6 order-md-1 order-1 hide-mobile-header",
      name: translate("Date time"),
      key: "created",
      render: (item: any) => moment(item?.created).format("YYYY/MM/DD HH:mm"),
    },
    {
      className: "col-md-12 col-6 order-md-1 order-2",
      name: translate("Amount"),
      render: (item: any) => new Intl.NumberFormat("en").format(item?.amount) + "$",
    },
    {
      className: "col-md-12 col-6 order-md-1 order-1 hide-mobile-header",
      name: translate("Result"),
      render: (item: any) => (
        <span className={`status status--${item?.status?.toLowerCase()}`}>
          {item.status == "LOSE"
            ? item.profit > 0
              ? new Intl.NumberFormat("en").format(item.amount - item.profit)
              : new Intl.NumberFormat("en").format(item.amount)
            : item.status == "WIN"
            ? new Intl.NumberFormat("en").format(item.profit - item.amount)
            : new Intl.NumberFormat("en").format(item.profit)}
          $
        </span>
      ),
    },
  ];

  let TableStructure = [
    {
      className: "col-md-12 col-6 order-md-1 order-1 hide-mobile-header",
      name: translate("Date time"),
      key: "created",
      render: (item: any) => moment(item?.created).format("YYYY/MM/DD HH:mm"),
    },
    {
      className: "col-md-12 col-4 order-md-1 order-3",
      name: translate("Package Price"),
      render: (item: any) => new Intl.NumberFormat("en").format(item?.packageValue),
    },
    {
      className: "col-md-12 col-4 order-md-1 order-2",
      name: translate("Refund"),
      render: (item: any) => new Intl.NumberFormat("en").format(item?.refundValue),
    },
    {
      className: "col-md-12 col-4 order-md-1 order-3",
      name: translate("Proof Photo 1"),
      key: "proofImage1",
      render: (item: any) => (
        <a className="proof-image-1" href={item?.proofImage1} target="_blank">
          <img className="proof-photo-1" src={item?.proofImage1} alt="" />
        </a>
      ),
    },
    {
      className: "col-md-12 col-4 order-md-1 order-3",
      name: translate("Proof Photo 2"),
      key: "proofImage2",
      render: (item: any) => (
        <a className="proof-image-2" href={item?.proofImage2} target="_blank">
          <img className="proof-photo-2" src={item?.proofImage2} alt="" />
        </a>
      ),
    },
    {
      className: "col-md-12 col-6 order-md-1 order-1 hide-mobile-header",
      name: translate("Status"),
      key: "status",
      render: (item: any) => <span className={`status status--${item?.status?.toLowerCase()}`}>{translate(item?.status)}</span>,
    },
  ];

  useEffect(() => {
    UserService.getInfoClaimToday()
      .then((res: any) => {
        UserService.getOrdersForClaim(res?.result[0]?.experienceGameId).then((res2) => {
          setDataTopOrders(res2?.data);
        });
        setDataClaimToday(res?.result[0]);
      })
      .catch((err: any) => CreateAlert({ message: err.message, type: EAlertType.ERROR }))
      .finally(() => null);
  }, []);

  return (
    <div className="claim">
      <div className="claim-banner">
        <div className="d-block d-xl-flex align-items-center">
          <span className="claim-banner_title mr24">{translate("Refund 100% are easy with")}</span>
          <Button label={translate("Request Claim")} buttonType="primary" onClick={() => setOpenPopup(true)} />
        </div>
        <img src="/assets/images/claimBanner.png" alt="" />
      </div>

      <CustomTable
        title={translate("Orders")}
        className="mt12 mb12 order-table"
        classNameNoColumn="col-md-12 col-6 order-md-1 order-2"
        forceUpdateTable={forceUpdateTable}
        enableReinitialize
        isHighLightHeader
        isTextCenter
        hasOrderColumn
        structure={OrdersTableStructure}
        fetchData={async (state) => UserService.getOrdersForClaim(dataClaimToday?.experienceGameId)}
      />

      <CustomTable
        className="request-list-table"
        classNameNoColumn="col-md-12 col-4 order-md-1 order-2"
        isHighLightHeader
        isTextCenter
        hasOrderColumn
        forceUpdateTable={forceUpdateTable}
        title={translate("Request List")}
        structure={TableStructure}
        fetchData={async (state) =>
          UserService.getListRequestClaim({
            ...state,
            numberOfTransactionsPerPage: state.limit,
            page: state.pageNumber,
            fromDate: "0",
            toDate: moment().endOf("day").toISOString(),
          })
        }
      />

      {openPopup && (
        <PopupWraper className="request-claim-popup" title={translate("Request Claim")} onClose={() => setOpenPopup(false)}>
          <FormRequest
            dataClaimToday={dataClaimToday}
            dataTopOrders={dataTopOrders}
            setOpenPopup={setOpenPopup}
            setForceUpdateTable={setForceUpdateTable}
          />
        </PopupWraper>
      )}
    </div>
  );
}

export default page;
