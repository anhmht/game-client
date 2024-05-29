"use client";

import { Routes } from "@/src/AppRoutes";
import { useTradeCoin } from "@/src/hook";
import { getLocaleKey, translate } from "@/src/languages";
import { Button, CustomTable, NumberUtils, ObjectUtils } from "@/src/modules";
import { OrderService } from "@/src/services";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { TableFilterRangeTimeInput } from "@/src/components/table-filter-inputs";
import { addAlertWinCustom } from "@/src/components";
const DynamicChart: any = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {};

function page({}: Props) {
  const router = useRouter();
  const { coinActive, coins } = useTradeCoin();

  const walletBalances = useSelector((state: any) => state.userWalletBalances);
  const walletBalance = ObjectUtils.getIn(walletBalances, "data", [], (arr) => arr.find((item: any) => item.code === coins?.[0]?.code));
  const availableAmount: number = +ObjectUtils.getIn(walletBalance, "amount", 0);

  const user = useSelector((state: any) => state.user);

  const [dataChartLose, setDataChartLose] = useState([] as any);
  const [dataChartProfit, setDataCharProfit] = useState([] as any);
  const [typeTabActive, setTypeTabActive] = useState("deposit");

  const [rangeTimeTable, setRangeTimeTable] = useState<any>({
    fromDate: moment().startOf("week"),
    toDate: moment().endOf("week"),
  });

  const [dataTable, setDataTable] = useState(null as any);
  const [forceUpdateTable, setForceUpdateTable] = useState(false);
  const [result, setResult] = useState(null as any);

  useEffect(() => {
    (async () => {
      setDataTable(null);
      setDataChartLose([]);
      setDataCharProfit([]);
      setForceUpdateTable((prev) => !prev);

      try {
        const status = ["WIN", "LOSE", "DRAW", "CANCEL"];

        let params: any = {
          coinId: coinActive.coinId,
          ...rangeTimeTable,
        };

        await OrderService.getOrderSumary(
          {
            ...params,
          },
          status
        ).then((res: any) => {
          setResult(res?.result);
        });

        const allData: any[] = await OrderService.getOrderList({ ...params }, status).then((res: any) => res?.result?.orders);

        let output: any[] = [];

        for (let i = 0; i < allData.length; i++) {
          const item = allData[i];
          const dateString = new Date(item.created).toLocaleDateString(getLocaleKey());

          const existed = output.findIndex((v) => v.dateString === dateString);
          if (existed !== -1) {
            output[existed] = {
              dateString,
              orders: [...output[existed].orders, item],
            };
          } else {
            output.push({ dateString, orders: [item] });
          }
        }

        // const { winRevenue, loseProfit, type, winProfit } = TradeService.exportReportFromOrders(allData);
        // setDataTable({
        //   count: output.length,
        //   data: output,
        //   totalReport: {
        //     winRevenue,
        //     winProfit,
        //     loseProfit,
        //     profitTotal: winRevenue - loseProfit,
        //     type,
        //   },
        // });

        setDataTable({
          count: allData?.length,
          data: allData,
        });
        setDataCharProfit(() =>
          output
            .slice(0, 9)
            .map((item: any) => {
              const sumProfit = +item?.orders?.filter((el: any) => el?.status === "WIN")?.reduce((sum: number, el: any) => (sum += el?.profit), 0);
              const sumAmount = +item?.orders?.filter((el: any) => el?.status === "WIN")?.reduce((sum: number, el: any) => (sum += el?.amount), 0);

              return {
                ...item,
                profit: sumProfit - sumAmount,
              };
            })
            .sort((a: any, b: any) => {
              const timeA: any = new Date(a.dateString);
              const timeB: any = new Date(b.dateString);

              return timeA - timeB;
            })
        );
        setDataChartLose(() =>
          output
            .slice(0, 9)
            .map((item: any) => {
              const sumLose = +item?.orders?.filter((el: any) => el?.status === "LOSE")?.reduce((sum: number, el: any) => (sum += el?.amount), 0);

              return {
                ...item,
                lose: sumLose,
              };
            })
            .sort((a: any, b: any) => {
              const timeA: any = new Date(a.dateString);
              const timeB: any = new Date(b.dateString);

              return timeA - timeB;
            })
        );
        setForceUpdateTable((prev) => !prev);
      } catch (error: any) {
        setDataTable({ error: { message: error?.message } });
        setDataChartLose([]);
        setDataCharProfit([]);
      }
    })();
  }, [rangeTimeTable]);

  return (
    <div className="overview">
      <div className="overview-banner">
        <div className="overview-banner_left">
          <div className="avatar">
            <img src={`/images/level${user?.rank}.png`} alt="" />
          </div>
          <div className="content">
            <div className="item">
              <p>{translate("Name")}</p>
              <span>{user?.firstName}</span>
            </div>
            <div className="item">
              <p>{translate("Current balance")}</p>
              <span>${NumberUtils.toFormatNumber(availableAmount, 4)}</span>
            </div>
            <div className="item">
              <p>UID</p>
              <span>{user?.userId}</span>
            </div>
          </div>
        </div>
        <div className="overview-banner_right">
          <Button label={translate("Deposit")} buttonType="primary" onClick={() => router.push(Routes.userDeposit.href)} />
          <Button
            className="mx8"
            label={translate("Withdraw")}
            buttonType="primary"
            style={{
              background: "#fff",
            }}
            onClick={() => router.push(Routes.userWithdraw.href)}
          />
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => window.open("https://bezon.gitbook.io/promotion/", "_blank")}
          >
            <img className="animation-img" width={80} height={60} src="/images/promotion.png" alt="" />
          </span>
        </div>
      </div>

      <div className="overview-banner_mobile">
        <div className="d-flex align-items-center justify-content-between">
          <div className="avatar">
            <img src={`/images/level${user?.rank}.png`} alt="" />
          </div>
          <div className="d-flex align-items-center">
            <Button label={translate("Deposit")} buttonType="primary" onClick={() => router.push(Routes.userDeposit.href)} />
            <Button
              className="mx8"
              label={translate("Withdraw")}
              buttonType="primary"
              style={{
                background: "#fff",
              }}
              onClick={() => router.push(Routes.userWithdraw.href)}
            />
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => window.open("https://bezon.gitbook.io/promotion/", "_blank")}
            >
              <img className="animation-img" width={60} height={40} src="/images/promotion.png" alt="" />
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt5">
          <p>{translate("Name")}</p>
          <span>{user?.firstName}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between mt16 mb16">
          <p>{translate("Current balance")}</p>
          <span>${NumberUtils.toFormatNumber(availableAmount, 4)}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p>UID</p>
          <span>{user?.userId}</span>
        </div>
      </div>

      <div className="overview-content">
        <div className="overview-content_info d-block d-lg-flex">
          <div className="d-flex">
            <div className="item item-border">
              <p>{translate("Total deposit")}</p>
              <span>{`$${NumberUtils.toFormatNumber(result?.totalDeposit, 2)}`}</span>
            </div>
            <div className="item item-border">
              <p>{translate("Total withdraw")}</p>
              <span>{`$${NumberUtils.toFormatNumber(result?.totalWithdraw, 2)}`}</span>
            </div>
          </div>
          <div className="d-flex">
            <div className="item item-border">
              <p>{translate("Total orders")}</p>
              <span>{`$${NumberUtils.toFormatNumber(result?.totalOrder, 2)}`}</span>
            </div>
            <div className="item">
              <p>{translate("Total commission")}</p>
              <span>{`$${NumberUtils.toFormatNumber(result?.totalCommission, 2)}`}</span>
            </div>
          </div>
        </div>

        <div className="filter">
          <TableFilterRangeTimeInput
            fromKey="fromDate"
            toKey="toDate"
            params={rangeTimeTable}
            paramKey=""
            onChange={(e) => {
              setRangeTimeTable(e);
            }}
          />
        </div>

        <CustomTable
          otherType
          title={translate("Recent transactions")}
          isTextCenter
          className="mt16"
          forceUpdateTable={forceUpdateTable}
          structure={[
            {
              className: "col-md-12 col-6 order-md-1 order-1 hide-mobile-header",
              name: translate("Time"),
              key: "created",
              render: (item) => {
                const date = new Date(item.created);
                return (
                  <>
                    {date.toLocaleTimeString(getLocaleKey())} <br />
                    {date.toLocaleDateString(getLocaleKey())}
                  </>
                );
              },
            },
            {
              className: "col-md-12 col-6 order-md-1 order-2",
              name: translate("Order ID"),
              key: "orderId",
            },
            {
              className: "col-md-12 col-6 order-md-1 order-2",
              name: translate("Amount"),
              key: "amount",
              render: (item) => `$${NumberUtils.toFormatNumber(item.amount, 4)}`,
            },
            {
              className: "col-md-12 col-6 order-md-1 order-2",
              name: translate("Profit"),
              key: "profit",
              render: (item) => `$${NumberUtils.toFormatNumber(item.profit, 4)}`,
            },
            {
              className: "col-md-12 col-6 order-md-1 order-1 hide-mobile-header",
              name: translate("Status"),
              key: "status",
              render: (item: any) => (
                <span style={{ width: "max-content" }} className={`status status--${item?.status?.toLowerCase()}`}>
                  {translate(`${item.status.charAt(0) + item.status.slice(1).toLowerCase()}`).toUpperCase()}
                </span>
              ),
            },
            {
              className: "col-md-12 col-6 order-md-1 order-2",
              name: translate("Balance"),
              key: "balanceBefore",
              render: (item) => `$${NumberUtils.toFormatNumber(item.balanceBefore - item?.amount, 4)}`,
            },

            // {
            //   name: translate("Date"),
            //   key: "dateString",
            // },
            // {
            //   name: `${translate("Win")} / ${translate("Amount")}`,
            //   className: "textSuccess",
            //   render: ({ orders }) => {
            //     const { winOrders, winProfit } = TradeService.exportReportFromOrders(orders);
            //     // console.log('abc', orders)
            //     if (winOrders.length) return `${winOrders.length} / +$${NumberUtils.toFormatNumber(winProfit, 4)}`;
            //     return `-- / --`;
            //   },
            // },
            // {
            //   name: `${translate("Lose")} / ${translate("Amount")}`,
            //   className: "textDanger",
            //   render: ({ orders }) => {
            //     const { loseOrders, loseProfit } = TradeService.exportReportFromOrders(orders);
            //     if (loseOrders.length) return `${loseOrders.length} / -$${NumberUtils.toFormatNumber(loseProfit, 4)}`;
            //     return `-- / --`;
            //   },
            // },
            // {
            //   name: `${translate("Draw")} / ${translate("Amount")}`,
            //   className: "textWarning",
            //   render: ({ orders }) => {
            //     const { drawAmount, drawOrders } = TradeService.exportReportFromOrders(orders);
            //     if (drawOrders.length) return `${drawOrders.length} / $${NumberUtils.toFormatNumber(drawAmount, 4)}`;
            //     return `-- / --`;
            //   },
            // },
            // {
            //   name: translate("Total orders"),
            //   render: ({ orders }) => orders.length,
            // },
            // {
            //   name: translate("Total profit"),
            //   render: ({ orders }) => {
            //     const { winProfit, loseProfit, type } = TradeService.exportReportFromOrders(orders);
            //     return (
            //       <span
            //         className={ClassNames({
            //           profitType: true,
            //         })}
            //       >
            //         {`${type === "win" ? "+" : type === "lose" ? "-" : ""}$${NumberUtils.toFormatNumber(Math.abs(winProfit - loseProfit), 4)}`}
            //       </span>
            //     );
            //   },
            // },
          ]}
          fetchData={async (state) => {
            const newData = dataTable?.data?.slice((state.pageNumber - 1) * state.limit, state.pageNumber * state.limit);
            return {
              count: dataTable?.count,
              data: newData,
            };
          }}
        />

        <div className="overview-content_chart">
          <DynamicChart
            options={{
              xaxis: {
                categories:
                  dataChartLose?.length > 0
                    ? dataChartLose?.length > 1
                      ? dataChartLose.map((item: any) => item.dateString)
                      : ["", ...dataChartLose.map((item: any) => item.dateString)]
                    : [],
                labels: {
                  style: {
                    colors: "#A2A3A5",
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    colors: "#A2A3A5",
                  },
                },
              },
              chart: {
                toolbar: {
                  show: false,
                },
              },
              colors: ["#e5e5e5", "#CFD959"],
            }}
            series={[
              {
                name: `<span style="color: #e5e5e5; font-size: 12px">${translate("Lose")}</span>`,
                data:
                  dataChartLose?.length > 0
                    ? dataChartLose?.length > 1
                      ? dataChartLose.map((item: any) => item.lose)
                      : [0, ...dataChartLose.map((item: any) => item.lose)]
                    : [],
              },
              {
                name: `<span style="color: #CFD959; font-size: 12px">${translate("Profit")}</span>`,
                data:
                  dataChartProfit?.length > 0
                    ? dataChartProfit?.length > 1
                      ? dataChartProfit.map((item: any) => item.profit)
                      : [0, ...dataChartProfit.map((item: any) => item.profit)]
                    : [],
              },
            ]}
            type="line"
            height={400}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
