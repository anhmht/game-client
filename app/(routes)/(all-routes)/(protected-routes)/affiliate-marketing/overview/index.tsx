import { Routes } from "@/src/AppRoutes";
import { Icon } from "@/src/components";
import { getLocaleKey, translate } from "@/src/languages";
import { CreateAlert, CustomTable, EAlertType, ITableStructureItem, NumberUtils, ObjectUtils } from "@/src/modules";
import AffiliateService from "@/src/services/affiliate/affiliate.service";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import { TableTeamNetwork } from "../tableTeam";
import { Tree } from "../tree";
import Commission from "../commission";
import ReferralLevels from "../referralLevels";

type Props = {};

const Overview = (props: Props) => {
  const userAffiliate = useSelector((state: any) => state.userAffiliate);

  const user = useSelector((state: any) => state.user);
  const affiliationCode = ObjectUtils.getIn(user, "obscuredId", "");
  const affiliationLink = `${process.env["NEXT_PUBLIC_PUBLIC_URL"]}` + Routes.register.renderPath() + "/" + affiliationCode;
  const [totalCommission, setTotalCommission] = useState<any>(0);
  const [personalSales, setPersonalSales] = useState<any>(0);
  const [teamSales, setTeamSales] = useState<any>(0);

  const listTab = [
    {
      label: translate("Team"),
      value: "Team",
    },
    {
      label: translate("Commission"),
      value: "Tree",
    },
    {
      label: translate("referral_levels"),
      value: "ReferralLevels",
    },
  ];

  const [tab, setTab] = useState<any>(listTab?.[0]?.value);

  let structure: ITableStructureItem[] = [];

  structure = [
    {
      name: "Rank",
      key: "rank",
      render: (item) => <div className="text-center">{item?.rank}</div>,
    },
    {
      name: "L1",
      key: "l1",
    },
    {
      name: "L2",
      key: "l2",
    },
    {
      name: "L3",
      key: "l3",
    },
    {
      name: "L4",
      key: "l4",
    },
    {
      name: "L5",
      key: "l5",
    },
    {
      name: "L6",
      key: "l6",
    },
    {
      name: "L7",
      key: "l7",
    },
  ];

  return (
    <div className="aff-overview">
      <div className="aff-overview-top">
        <div className="row">
          <div className="col-md-7 col-12 flex-grow-1 d-flex flex-column aff-overview__banner__wrapper">
            <div className="aff-overview__banner">
              <div className="d-flex justify-content-center flex-wrap">
                <div className="item item--left">
                  <div className="aff-overview__banner__label">Total Commission</div>
                  <div className="aff-overview__banner__logo">
                    <img width={48} src="/assets/images/coins/usdt.png" alt="" />
                  </div>
                  <div className="aff-overview__banner__value">{new Intl.NumberFormat("en-US").format(totalCommission)} USDT</div>
                </div>
                <div className="item item--right">
                  <div className="aff-overview__banner__label personal-sales row">
                    <div style={{textAlign: 'left', whiteSpace: 'nowrap'}} className="col-6">Personal Sales:&nbsp;</div>
                    <div style={{textAlign: 'left', color: '#FCCB25'}} className="col-6">{new Intl.NumberFormat("en-US").format(personalSales)} USDT</div>
                  </div>
                  <div className="aff-overview__banner__label team-sales row">
                    <div style={{textAlign: 'left', whiteSpace: 'nowrap'}} className="col-6">Team Sales:&nbsp;</div>
                    <div style={{textAlign: 'left', color: '#FCCB25'}} className="col-6">{new Intl.NumberFormat("en-US").format(teamSales)} USDT</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="aff-overview__share">
              <div className="aff-overview__share__main-title">REFER YOUR FRIEND</div>
              <div className="aff-overview__share__sub-title">{translate("All for One, One for All.")}</div>
              <div className="aff-overview__share__content">
                <div className="aff-overview__share__content__cover">
                  <img src="/assets/images/aff-cover.png" alt="" />
                </div>
                <div className="aff-overview__share__content__input">
                  <div className="aff-overview__share__content__input__item aff-overview__share__content__input__item--link">
                    <div className="aff-overview__share__content__input__item__text">{affiliationLink}</div>
                    <CopyToClipboard
                      text={affiliationLink}
                      onCopy={() => {
                        CreateAlert({
                          message: "Copied affiliation code",
                          type: EAlertType.SUCCESS,
                        });
                      }}
                    >
                      <div className="aff-overview__share__content__input__item__indicator">
                        <div className="aff-overview__share__content__input__item__indicator__icon">
                          <Icon.CopyIcon />
                        </div>
                        <div className="aff-overview__share__content__input__item__indicator__text">Copy</div>
                      </div>
                    </CopyToClipboard>
                  </div>
                  <div className="aff-overview__share__content__input__item aff-overview__share__content__input__item--code">
                    <div className="aff-overview__share__content__input__item__text">{affiliationCode}</div>
                    {/* @ts-ignore */}
                    <CopyToClipboard
                      text={affiliationCode}
                      onCopy={() => {
                        CreateAlert({
                          message: "Copied affiliation code",
                          type: EAlertType.SUCCESS,
                        });
                      }}
                    >
                      <div className="aff-overview__share__content__input__item__indicator">
                        <div className="aff-overview__share__content__input__item__indicator__icon">
                          <Icon.CopyIcon />
                        </div>
                        <div className="aff-overview__share__content__input__item__indicator__text">Copy</div>
                      </div>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5 col-12 aff-overview__level-table__wrapper">
            <div className="aff-overview__level-table">
              <div className="aff-overview__level-table__info">
                <div className="aff-overview__level-table__info__title">CONDITIONS</div>
                <div className="Table Custom Desktop">
                  <table>
                    <tbody className="Table__Body">
                      <tr className="mx-0">
                        <td>
                          Direct
                          <br />
                          Sales
                        </td>
                        <td>100</td>
                        <td>200</td>
                        <td>300</td>
                        <td>400</td>
                        <td>500</td>
                        <td>600</td>
                        <td>700</td>
                      </tr>
                      <tr className="mx-0">
                        <td>
                          Team
                          <br />
                          Sales
                        </td>
                        <td>0</td>
                        <td>500</td>
                        <td>1,500</td>
                        <td>5,000</td>
                        <td>10,000</td>
                        <td>25,000</td>
                        <td>50,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="Table Custom Mobile">
                  <table>
                    <thead className="Table__Head">
                      <tr className="mx-0">
                        <th>RANK</th>
                        <th>Direct Sale</th>
                        <th>Team Sale</th>
                      </tr>
                    </thead>
                    <tbody className="Table__Body">
                      <tr className="mx-0">
                        <td>LV1</td>
                        <td>100</td>
                        <td>0</td>
                      </tr>
                      <tr className="mx-0">
                        <td>LV2</td>
                        <td>200</td>
                        <td>500</td>
                      </tr>
                      <tr className="mx-0">
                        <td>LV3</td>
                        <td>300</td>
                        <td>1,500</td>
                      </tr>
                      <tr className="mx-0">
                        <td>LV4</td>
                        <td>400</td>
                        <td>5,000</td>
                      </tr>
                      <tr className="mx-0">
                        <td>LV5</td>
                        <td>500</td>
                        <td>10,000</td>
                      </tr>
                      <tr className="mx-0">
                        <td>LV6</td>
                        <td>600</td>
                        <td>25,000</td>
                      </tr>
                      <tr className="mx-0">
                        <td>LV7</td>
                        <td>700</td>
                        <td>50,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="aff-overview__level-table__table">
                <div className="aff-overview__level-table__table__title">COMMISSION</div>
                <CustomTable
                  isHighLightHeader
                  isTextCenter
                  isNotShowPagination
                  structure={structure}
                  // title={translate("Level tier")}
                  // fetchData={(state) =>
                  //     AffiliateService.getTableLevelTier({
                  //         ...state,
                  //         page: state.pageNumber,
                  //         pageSize: 99999,
                  //     })
                  // }
                  data={{
                    data: [
                      {
                        rank: "LV1",
                        l1: "8%",
                        l2: "8%",
                        l3: "8%",
                        l4: "8%",
                        l5: "8%",
                        l6: "8%",
                        l7: "8%",
                      },
                      {
                        rank: "LV2",
                        l1: "0",
                        l2: "6%",
                        l3: "6%",
                        l4: "6%",
                        l5: "6%",
                        l6: "6%",
                        l7: "6%",
                      },
                      {
                        rank: "LV3",
                        l1: "0",
                        l2: "0",
                        l3: "4%",
                        l4: "4%",
                        l5: "4%",
                        l6: "4%",
                        l7: "4%",
                      },
                      {
                        rank: "LV4",
                        l1: "0",
                        l2: "0",
                        l3: "0",
                        l4: "2%",
                        l5: "2%",
                        l6: "2%",
                        l7: "2%",
                      },
                      {
                        rank: "LV5",
                        l1: "0",
                        l2: "0",
                        l3: "0",
                        l4: "0",
                        l5: "2%",
                        l6: "2%",
                        l7: "2%",
                      },
                      {
                        rank: "LV6",
                        l1: "0",
                        l2: "0",
                        l3: "0",
                        l4: "0",
                        l5: "0",
                        l6: "2%",
                        l7: "2%",
                      },
                      {
                        rank: "LV7",
                        l1: "0",
                        l2: "0",
                        l3: "0",
                        l4: "0",
                        l5: "0",
                        l6: "0",
                        l7: "1%",
                      },
                      {
                        rank: "Total",
                        l1: "8%",
                        l2: "14%",
                        l3: "18%",
                        l4: "20%",
                        l5: "22%",
                        l6: "24%",
                        l7: "25%",
                      },
                    ],
                    count: 7,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-tabs">
        <div className="table-tabs_title">
          <ul className="btn-tabs" role="tablist">
            {listTab?.map((item: any, idx: number) => (
              <li
                key={idx}
                role="presentation"
                id={`${item?.label}-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#${item?.label}`}
                aria-controls={item?.label}
                aria-selected="true"
                className={`btn-tabs_item ${tab === item?.value && "active"}`}
                onClick={() => setTab(item?.value)}
              >
                {item?.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="table-tabs_content">
          <div className="tab-content">
            <div
              className={`tab-pane fade ${listTab?.[0]?.value === tab && "show active"}`}
              id={listTab?.[0]?.value}
              role="tabpanel"
              aria-labelledby={`${listTab?.[0]?.value}-tab`}
            >
              <TableTeamNetwork />
            </div>
            <div
              className={`tab-pane fade ${listTab?.[1]?.value === tab && "show active"}`}
              id={listTab?.[1]?.value}
              role="tabpanel"
              aria-labelledby={`${listTab?.[1]?.value}-tab`}
            >
              <Commission 
                onChangeTotalCommission={(value: any) => setTotalCommission(value)}
                onChangePersonalSales={(value: any) => setPersonalSales(value)}
                onChangeTeamSales={(value: any) => setTeamSales(value)}
              />
            </div>
            <div
              className={`tab-pane fade ${listTab?.[2]?.value === tab && "show active"}`}
              id={listTab?.[2]?.value}
              role="tabpanel"
              aria-labelledby={`${listTab?.[2]?.value}-tab`}
            >
              <ReferralLevels />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
