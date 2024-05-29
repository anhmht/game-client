"use client";
import { Routes } from "@/src/AppRoutes";
import { getLocaleKey, translate } from "@/src/languages";
import { CreateAlert, EAlertType } from "@/src/modules";
import { UserService } from "@/src/services";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { push } = useRouter();

  const [dataTableHistory, setDataTableHistory] = useState(null as any);

  const formatCurrency = (value: number) => {
    return Intl.NumberFormat(getLocaleKey(), {
      currency: "USD",
      style: "currency",
    }).format(value);
  };

  const formatDateTime = (value: string) => {
    const date = new Date(value);
    return (
      <span>
        {date.toLocaleDateString(getLocaleKey())} {date.toLocaleTimeString(getLocaleKey(), { hour12: false })}
      </span>
    );
  };

  // useEffect(() => {
  //   UserService.BetsOfExperience(+params.id)
  //     .then((res) => {
  //       setDataTableHistory(res.result);
  //     })
  //     .catch((err) => {
  //       push(Routes.gameExperience.href);
  //       CreateAlert({
  //         message: err.message,
  //         type: EAlertType.ERROR,
  //       });
  //     });
  // }, [params.id]);

  return (
    <div className="single-content">
      <div className="head-area d-flex align-items-center justify-content-between">
        <h5>{translate('Game Experience History')}</h5>
      </div>
      <div className="main-content table-area">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">.No</th>
                <th scope="col">{translate('Date')}</th>
                <th scope="col">{translate('Amount')}</th>
                <th scope="col">{translate('Result')}</th>
              </tr>
            </thead>
            <tbody>
              {dataTableHistory && dataTableHistory?.length > 0 ? (
                dataTableHistory?.map((item: any, idx: number) => {
                  return (
                    <tr key={idx} onClick={() => item.status == "EXPIRED" && push(`${Routes.gameExperienceHistory}/${item.experienceGameId}`)}>
                      <th> {++idx}</th>
                      <td> {formatDateTime(item.created)}</td>
                      <td> {formatCurrency(item.amount)}</td>
                      <td> {item.status == "LOSE" ? formatCurrency(item.amount) : formatCurrency(item.profit)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr className="position-relative">
                  <td className="position-absolute start-0 end-0 text-center">{translate('Empty')}</td>
                  <td>{translate('Empty')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
