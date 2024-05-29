import { TableFilterRangeTimeInput } from "@/src/components/table-filter-inputs";
import { TableFilterInputSelect } from "@/src/components/table-filter-inputs/select";
import { useDeviceType } from "@/src/hook";
import { getLocaleKey, translate } from "@/src/languages";
import { CustomTable, ITableStructureItem, ITableStructureItemFilter, NumberUtils } from "@/src/modules";
import { BankService } from "@/src/services";
import { EDeviceType } from "@/src/types";
import moment from "moment";
import React, { useState } from "react";

type Props = {};

function Commission(props:any) {
  const deviceType = useDeviceType();
  const [totalAmount, setTotalAmount] = useState<number>(0);

  let structureTop: ITableStructureItem[] = [];
  let filtersTop: ITableStructureItemFilter[] = [
    {
      name: translate("Time"),
      key: "created",
      input: (e) => <TableFilterRangeTimeInput {...e} fromKey="fromDate" toKey="toDate" />,
      defaultValue: {
        fromDate: moment().startOf("month"),
        toDate: moment().endOf("day"),
      },
    },
    // {
    //   name: translate("Type"),
    //   key: "transactionTypeId",
    //   input: (s) => <TableFilterInputSelect {...s} options={BankService.getCommissonTransactionTypeOptions()} />,
    // },
  ];

  structureTop = [
    {
      className: "col-md-12 col-6 order-md-1 order-2",
      name: "NAME",
      key: "firstName",
      render: (item) => item?.firstName ?? 'N/A',
    },
    // {
    //   className: "col-md-12 col-6",
    //   name: translate("Time"),
    //   key: "created",
    //   render: (item) => {
    //     const date = new Date(item.created);
    //     return (
    //       <span>
    //         {date.toLocaleTimeString(getLocaleKey())} <br />
    //         {date.toLocaleDateString(getLocaleKey())}
    //       </span>
    //     );
    //   },
    // },
    {
      className: "col-md-12 col-6 order-md-1 order-1 amount",
      name: "AMOUNT",
      key: "tradingCommission",
    },
    // {
    //   className: "col-md-12 col-6",
    //   name: translate("Type"),
    //   key: "transactionTypeId",
    //   render: (item) => translate(item.transactionType.name),
    // },
    {
      className: "col-md-12 col-6 order-md-1 order-2 level",
      name: "LEVEL",
      key: "userGeneratedRank",
      render: (item) => <img style={{height: '40px', objectFit: 'contain', objectPosition: 'right center'}} src={`/assets/images/rank/${item?.userGeneratedRank}.png`} alt="" />,
    },
  ];

  return (
    <div className="aff-commission">
      <CustomTable
        classNameNoColumn="col-md-12 col-6 order-md-1 order-1"
        isHighLightHeader
        isTextCenter
        hasOrderColumn
        itemPerPages={deviceType === EDeviceType.MOBILE ? 5 : 10}
        filters={filtersTop}
        structure={structureTop}
        fetchData={async (state) =>
          BankService.getTransactionsCommission({
            ...state,
            pageSize: state.limit,
            page: state.pageNumber,
          }).then((res) => {
            props.onChangeTotalCommission(res.totalAmount || 0);
            props.onChangePersonalSales(res.personalSales || 0);
            props.onChangeTeamSales(res.teamSales || 0);
            setTotalAmount(res.totalAmount || 0);
            return res;
          })
        }
      />
    </div>
  );
}

export default Commission;
