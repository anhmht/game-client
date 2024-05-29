import { TableFilterRangeTimeInput } from "@/src/components/table-filter-inputs";
import { useDeviceType } from "@/src/hook";
import { translate } from "@/src/languages";
import { CustomTable, ITableStructureItem, ITableStructureItemFilter } from "@/src/modules";
import { BankService } from "@/src/services";
import AffiliateService from "@/src/services/affiliate/affiliate.service";
import { EDeviceType } from "@/src/types";
import moment from "moment";
import { useState } from "react";

type Props = {};

function ReferralLevels(props: any) {
  const deviceType = useDeviceType();

  let structureTop: ITableStructureItem[] = [];

  structureTop = [
    {
      className: "col-md-12 col-6",
      name: "LEVEL",
      key: "level",
    },
    {
      className: "col-md-12 col-6",
      name: "REFERRALS",
      key: "refferals",
    },
    {
      className: "col-md-12 col-6",
      name: "RATE",
      key: "rate",
      render: (item) => `${new Intl.NumberFormat("en-US").format(item?.rate)}%`,
    },
    {
      className: "col-md-12 col-6",
      name: "BONUS POINTS",
      key: "bounsPoint",
    },
  ];

  return (
    <div className="referral-levels">
      <CustomTable
        classNameNoColumn="col-md-12 col-6 order-md-1 order-1"
        isHighLightHeader
        isTextCenter
        isNotShowPagination
        itemPerPages={deviceType === EDeviceType.MOBILE ? 5 : 10}
        structure={structureTop}
        fetchData={async (state) =>
          AffiliateService.getReferralLevels({
            ...state,
            pageSize: state.limit,
            page: state.pageNumber,
          })
        }
      />
    </div>
  );
}

export default ReferralLevels;
