"use client";

import { FC } from "react";

import { TableFilterRangeTimeInput } from "@/src/components/table-filter-inputs";
import { TableFilterInputSelect } from "@/src/components/table-filter-inputs/select";
import { useDeviceType, useTradeCoin } from "@/src/hook";
import { getLocaleKey, translate } from "@/src/languages";
import { CustomTable, ITableStructureItem, ITableStructureItemFilter, NumberUtils, ObjectUtils, StringUtils } from "@/src/modules";
import { BankService } from "@/src/services";
// @ts-ignore
import { ENetWork } from "@/src/types";
import moment from "moment";

export const UserWalletTransactionHistory: FC<any> = ({ title, customTypeFilter, isSwapTransaction = false, setMonthlyProfit, show }) => {
  const deviceType = useDeviceType();
  const { coinsState, getIsDemo, demoCoin } = useTradeCoin();
  const isDemoAccount = getIsDemo();
  const coinsOptions = ObjectUtils.getIn(coinsState, "data", [], (arr) => arr.map((item: any) => ({ label: item.name, value: item.coinId })));
  const UsdId = 2;
  const Gp2Id = 5;
  const DemoId = 4;

  const titleCase = (str: string) => {
    let splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  let structure: ITableStructureItem[] = [];
  let filters: ITableStructureItemFilter[] = [
    {
      name: translate("Time"),
      key: "created",
      input: (e) => <TableFilterRangeTimeInput {...e} fromKey="fromDate" toKey="toDate" />,
      defaultValue: {
        fromDate: moment().startOf("month"),
        toDate: moment().endOf("day"),
      },
    },
    {
      name: translate("Type"),
      key: "transactionTypeId",
      input: (s) => <TableFilterInputSelect {...s} options={customTypeFilter || BankService.getTransactionTypeOptions()} />,
    },
  ];

  // if (!isDemoAccount)
  //   filters = [
  //     {
  //       name: translate("Coin"),
  //       key: "coinId",
  //       input: (e) => <TableFilterInputSelect {...e} options={coinsOptions.filter((item: any) => item.value !== 6)} />,
  //     },
  //     ...filters,
  //   ];

  // if (deviceType === "Desktop")
  structure = [
    {
      className: "col-md-12 col-6 order-md-1 order-1 hide-mobile-header",
      name: translate("TIME"),
      key: "created",
      render: (item) => moment(item?.date).format('L'),
    },
    {
      className: "col-md-12 col-6 order-md-1 order-2 amount",
      name: translate("AMOUNT"),
      key: "value",
      render: (item) => {
        const { balanceAfter, balanceBefore } = item;
        let isIncrease = false;
        if (balanceAfter > balanceBefore) isIncrease = true;
        return (
          <span className={isIncrease ? "textSuccess" : "textDanger"}>
            {isIncrease ? "+" : "-"}
            {NumberUtils.toFormatNumber(+item.value, 4)}
          </span>
        );
      },
    },
    {
      className: "col-md-12 col-6 order-md-1 order-3",
      name: translate("TYPE"),
      key: "transactionTypeId",
      render: (item) =>
        item?.transactionType?.name === "AIRDROP_TOKEN" ||
        item?.transactionType?.name === "AIRDROP_TOKEN_COMMISSION" ||
        item?.transactionType?.name === "AIRDROP_TOKEN_COMMISSION_TO_USER"
          ? titleCase(`${item?.description}`)
          : titleCase(`${translate(item?.transactionType?.name)}`),

      //render: (item) => ObjectUtils.getIn(item.replace(/_/g, ' '), "transactionType.name", "--"),
    },
    // {
    //   name: translate("Description"),
    //   key: "description",
    //   render: (item) => translate(item?.description)
    // },
    {
      className: "col-md-12 col-6 order-md-1 order-4",
      name: "TXHASH",
      key: "description",
      render: (item) => {
        const hash = ObjectUtils.getIn(item, "transactionHash");
        if (hash) {
          switch (item.network) {
            case ENetWork.BEP20: {
              return (
                <div className="txhash">
                  <a href={`${process.env["NEXT_PUBLIC_BSC_SCAN"]}${hash}`} target="__blank">
                    {StringUtils.secretHex(hash, 10)} ({ENetWork.BEP20})
                  </a>
                </div>
              );
            }

            case ENetWork.TRC20: {
              return (
                <div className="txhash">
                  <a href={`${process.env["NEXT_PUBLIC_TRON_SCAN"]}${hash}`} target="__blank">
                    {StringUtils.secretHex(hash, 10)} ({ENetWork.TRC20})
                  </a>
                </div>
              );
            }

            case ENetWork.QCASH: {
              return <div className="txhash">Fiat</div>;
            }

            default: {
              return (
                <div className="txhash">
                  <a href={`${process.env["NEXT_PUBLIC_BSC_SCAN"]}${hash}`} target="__blank">
                    {StringUtils.secretHex(hash, 10)} ({ENetWork.BEP20})
                  </a>
                </div>
              );
            }
          }
        }

        // if (hash) {
        //     if (item.coinId == Gp2Id)
        //         return (
        //             <a
        //                 href={`${process.env["BSC_SCAN"]}${hash}`}
        //                 target="__blank"
        //             >
        //                 {StringUtils.limitCharacters(hash, 10)}
        //             </a>
        //         );
        //     else
        //         return (
        //             <a
        //                 href={`${process.env["TRON_SCAN"]}${hash}`}
        //                 target="__blank"
        //             >
        //                 {StringUtils.limitCharacters(hash, 10)}
        //             </a>
        //         );
        // }

        return "--";
      },
    },
    {
      className: "col-md-12 col-6 order-md-1 order-1 hide-mobile-header status",
      name: translate("STATUS"),
      key: "status",
      render: (item: any) => <span style={{width: 'max-content'}} className={`status status--${item?.status?.toLowerCase()}`}>{translate(item.status)}</span>,
    },
    {
      className: "col-md-12 col-6 order-md-1 order-3 balance",
      name: translate("BALANCE"),
      key: "balanceAfter",
      render: (item: any) => (item.balanceAfter != null) ? NumberUtils.toFormatNumber(item.balanceAfter, 4) : 'N/A',
    },
  ];

  // if (deviceType === "Mobile")
  //   structure = [
  //     {
  //       name: "id",
  //       render: (item) => {
  //         const date = new Date(item.created);
  //         const hash = ObjectUtils.getIn(item, "transactionHash");
  //         const coin = coinsOptions.find((v: any) => v.value === item.coinId);

  //         return (
  //           <div>
  //             <div className="rowInfo">
  //               <div>
  //                 Coin: {ObjectUtils.getIn(coin, "label", "--")} <br />
  //                 {date.toLocaleTimeString(getLocaleKey())} <br />
  //                 {date.toLocaleDateString(getLocaleKey())} <br />
  //               </div>
  //               <div className="textRight">
  //                 {ObjectUtils.getIn(item, "description", "--")} <br />$
  //                 {ObjectUtils.getIn(item, "value", 0, (value) =>
  //                   (+value).toLocaleString(getLocaleKey(), {
  //                     maximumFractionDigits: UsdId == item.coinId || DemoId == item.coinId ? 2 : 8,
  //                     minimumFractionDigits: UsdId == item.coinId || DemoId == item.coinId ? 2 : (ButId == item.coinId ? 0 :8)
  //                   })
  //                 )}
  //               </div>
  //             </div>

  //             {hash ? (
  //               <a href={`https://bscscan.com/tx/${hash}`} target="__blank">
  //                 Txhash: {StringUtils.limitCharacters(hash, 30)}
  //               </a>
  //             ) : null}
  //           </div>
  //         );
  //       },
  //     },
  //   ];

  return (
    <CustomTable
      classNameNoColumn="col-md-12 col-6 order-md-1 order-2"
      isHighLightHeader
      isTextCenter
      hasOrderColumn
      title={title || translate("TRANSACTION RECORDS")}
      filters={filters}
      structure={structure}
      forceUpdateTable={show}
      fetchData={async (state) =>
        BankService.getTransactions({
          ...state,
          numberOfTransactionsPerPage: state.limit,
          page: state.pageNumber,
          coinId: isDemoAccount ? demoCoin.coinId : state.coinId,
          isSwapTransaction: isSwapTransaction ? 1 : 0,
          transactionTypeId: state.transactionTypeId ? [state.transactionTypeId] : BankService.getTransactionTypeOptions()?.map((item) => item.value),
        }).then((res) => {
          setMonthlyProfit({
            value: res.monthlyProfit || 0,
            percent: res.monthlyProfitPercent || 0,
          });
          return res;
        })
      }
    />
  );
};
