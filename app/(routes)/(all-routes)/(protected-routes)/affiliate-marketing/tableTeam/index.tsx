import { TableFilterRangeTimeInput } from "@/src/components/table-filter-inputs";
import { useDeviceType } from "@/src/hook";
import { translate } from "@/src/languages";
import { CustomTable, ITableStructureItem, NumberUtils } from "@/src/modules";
import AffiliateService from "@/src/services/affiliate/affiliate.service";
import { EDeviceType } from "@/src/types";
import moment from "moment";

type Props = {};

export const TableTeamNetwork = ({}: Props) => {
  const deviceType = useDeviceType();
  let structure: ITableStructureItem[] = [];

  structure = [
    {
      className: "col-md-12 col-6 order-md-1 order-2",
      name: "NAME",
      key: "firstName",
    },
    {
      className: "col-md-12 col-6 order-md-1 order-1 register",
      name: "REGISTER",
      key: "registrationDate",
      render: (item) => moment(item?.registrationDate).format("L"),
    },
    // {
    //   className: "col-md-12 col-4",
    //   name: translate("Sponsor"),
    //   key: "sponsorFirstName",
    // },
    // {
    //   className: "col-md-12 col-4",
    //   name: translate("Personal"),
    //   key: "personalBet",
    //   render: (item) => {
    //     return <span style={{flex: '1'}} className="d-flex align-items-center">${NumberUtils.toFormatNumber(+item.personalBet, 4)}</span>;
    //   },
    // },
    // {
    //   className: "col-md-12 col-4",
    //   name: translate("Team"),
    //   key: "teamVolume",
    //   render: (item) => {
    //     return <span style={{flex: '1'}} className="d-flex align-items-center">${NumberUtils.toFormatNumber(+item.teamVolume, 4)}</span>;
    //   },
    // },
    {
      className: "col-md-12 col-6 order-md-1 order-2 level",
      name: "LEVEL",
      key: "vip",
      render: (item) => (item?.vip != null) ? <img style={{height: '40px', objectFit: 'contain', objectPosition: 'right center'}} src={`/assets/images/rank/${item?.vip}.png`} alt="" /> : 'N/A',
    },
  ];

  return (
    <CustomTable
      classNameNoColumn="col-md-12 col-6 order-md-1 order-1"
      hasOrderColumn
      hasOrderColumnRevert
      isHighLightHeader
      isTextCenter
      itemPerPages={deviceType === EDeviceType.MOBILE ? 5 : 10}
      filters={[
        {
          name: translate("Time"),
          key: "created",
          input: (e) => <TableFilterRangeTimeInput {...e} fromKey="fromDate" toKey="toDate" />,
          defaultValue: {
            fromDate: moment().startOf("month"),
            toDate: moment().endOf("day"),
          },
        },
      ]}
      structure={structure}
      fetchData={(state) =>
        AffiliateService.getTableDownLine({
          ...state,
          page: state.pageNumber,
          pageSize: state.limit,
        })
      }
    />
  );
};
