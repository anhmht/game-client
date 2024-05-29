import React, { FC, memo, useRef, Fragment } from "react";

import { ITableProps } from "./types";
import { useTable } from "./useTable";
import { ObjectUtils, isEqual, ClassNames } from "../utils";
import { Icon } from "../icon";
import { moduleConfig } from "../module.config";
import { Message } from "../message";
import { TableSearchBox } from "./TableSearchBox";
import Pagination from "react-js-pagination";
export const CustomTable: FC<ITableProps> = memo(
  (props) => {
    const { isShowLoading = true, isShowMessageEmpty = true } = props;
    const { state, handleNextPage, handlePrevPage, handlePage, fetchData, handleHideTable, handleShowTable, handleToggleOpenFilter } =
      useTable(props);

    const tbody = useRef(null);
    const tbodyHeight = ObjectUtils.getIn(tbody, "current.offsetHeight");
    const footer = useRef(null);
    const footerHeight = ObjectUtils.getIn(footer, "current.offsetHeight");
    const colSpanFull = props.hasOrderColumn ? props.structure.length + 1 : props.structure.length;
    const sortObj = props.structure
      .filter((v) => v.sort)
      .reduce((obj: any, item) => {
        if (item.sort) {
          const key = item.key || item.sort.key || "";
          obj[key] = "";
        }
        return obj;
      }, {});

    return (
      <Fragment>
        {props.searchBox ? <TableSearchBox {...props.searchBox} onActive={() => handleHideTable()} onOffSearch={() => handleShowTable()} /> : null}

        {/* {props.filters ? (
          <div className="TableTitle">
            <div className="btnFilter" onClick={handleToggleOpenFilter}>
              <span className="btnFilter__label">{moduleConfig.translate("Filter box")}</span>
              <span className="btnFilter__icon">
                <Icon.Filter />
              </span>
            </div>
          </div>
        ) : null} */}
        <div
          className={ClassNames({
            Table: true,
            hide: !state.isShowTable,
            [props.className as string]: !!props.className,
            Custom: true,
            otherType: props.otherType,
            textCenter: props.isTextCenter,
            highLightHeader: props.isHighLightHeader,
          })}
        >
          {props.title && <h3 className="title">{props.title}</h3>}

          {/* =====FILTER===== */}
          {props.filters ? (
            <div
              className={ClassNames({
                Table__FilterBox: true,
                hideFilter: !state.isOpenFilter,
              })}
            >
              <div className="List">
                {props.filters.map((item, key) => {
                  return (
                    <div key={key} className="Item">
                      <div className="label">{item.name}:</div>
                      <item.input
                        paramKey={item.key || ""}
                        onChange={(params) =>
                          fetchData(
                            {
                              params: {
                                ...params,
                              },
                            },
                            true
                          )
                        }
                        params={state.params}
                      />
                    </div>
                  );
                })}
              </div>
              {props?.injectFilter}
              {/* {state.isOpenFilter ? (
                <div className="List">
                  {props.filters.map((item, key) => {
                    return (
                      <div key={key} className="Item">
                        <div className="label">{item.name}:</div>
                        <item.input
                          paramKey={item.key || ""}
                          onChange={(params) =>
                            fetchData({ params: { ...params } }, true)
                          }
                          params={state.params}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : null} */}
            </div>
          ) : null}

          {/* ===== END_FILTER===== */}

          <div className="scroll">
            <table>
              <thead className="Table__Head">
                <tr>
                  {props.hasOrderColumn && <th>NO</th>}
                  {props.structure.map((item, key) => {
                    const enableSort = !!item.sort;
                    const sortKey = ObjectUtils.getIn(item, "key") || ObjectUtils.getIn(item, "sort.key");
                    const sortValue = state.params[sortKey];

                    const increaseValue = ObjectUtils.getIn(item, "sort.increaseValue", "increase");
                    const isIncrease = sortValue === increaseValue;

                    const descreaseValue = ObjectUtils.getIn(item, "sort.descreaseValue", "descrease");
                    const isDescrease = sortValue === descreaseValue;

                    return (
                      <th
                        key={key}
                        style={item.style}
                        className={ClassNames({
                          [item.className as string]: !!item.className,
                          enableSort,
                          increase: isIncrease,
                          descrease: isDescrease,
                        })}
                        onClick={() => {
                          if (enableSort) {
                            if (isDescrease)
                              return fetchData(
                                {
                                  params: {
                                    ...sortObj,
                                    [sortKey]: increaseValue,
                                  },
                                },
                                true
                              );
                            return fetchData(
                              {
                                params: {
                                  ...sortObj,
                                  [sortKey]: descreaseValue,
                                },
                              },
                              true
                            );
                          }
                        }}
                      >
                        {item.name}
                      </th>
                    );
                  })}
                </tr>
                {/* <tr>
                <td className="fakeLine" colSpan={colSpanFull}></td>
              </tr> */}
              </thead>

              <tbody ref={tbody} className="Table__Body">
                {(() => {
                  if (!state.data) return null;

                  return state.data.map((item, itemKey) => {
                    item["_order"] = (state.pagination.pageNumber - 1) * state.pagination.itemsPerPage + itemKey + 1;

                    return (
                      <tr className="row mx-0" key={itemKey}>
                        {props.hasOrderColumn && <td className={`${props?.classNameNoColumn || ''}`} data-header="NO">{itemKey + 1}</td>}
                        {props.structure.map((column, columnKey) => {
                          return (
                            <td className={column.className || ""} style={column.style} key={columnKey} data-header={column.name}>
                              {(() => {
                                if (column.render) return column.render(item, fetchData, column);
                                if (column.key) return `${ObjectUtils.getIn(item, column.key, "")}`;
                                return "--";
                              })()}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  });
                })()}

                {state.isFetching && isShowLoading ? (
                  <tr>
                    <td colSpan={colSpanFull}>
                      <div
                        className={ClassNames({
                          fetching: true,
                          float: state.count > 0,
                        })}
                        style={
                          state.count > 0
                            ? {
                                left: 0,
                                height: tbodyHeight,
                                bottom: footerHeight,
                              }
                            : undefined
                        }
                      >
                        <Icon.Loading />
                      </div>
                    </td>
                  </tr>
                ) : null}

                {state.error ? (
                  <tr>
                    <td colSpan={colSpanFull}>
                      <Message type="error" message={state.error} />
                    </td>
                  </tr>
                ) : null}
                {!state.error && !state.count && isShowMessageEmpty ? (
                  <tr>
                    <td colSpan={colSpanFull}>
                      <Message type="emptyData" message={moduleConfig.translate("Empty")} />
                    </td>
                  </tr>
                ) : null}
              </tbody>

              {(() => {
                if (state.error || !state.count || props.isNotShowPagination) return null;

                return (
                  <tfoot>
                    {/* <tr>
                    <td className="fakeLine" colSpan={colSpanFull}></td>
                  </tr> */}
                    <tr>
                      <td className="footerPadding" colSpan={colSpanFull}>
                        <div className="Footer" ref={footer}>
                          <div className="PaginationInfo">
                            {moduleConfig.translate("Total")}: {state.count || "--"}
                          </div>
                          {state.pagination.isVisible ? (
                            <div className="Pagination">
                              {/* @ts-ignore */}
                              <Pagination
                                activePage={state.pagination.pageNumber}
                                itemsCountPerPage={state.pagination.itemsPerPage}
                                totalItemsCount={state.count}
                                pageRangeDisplayed={5}
                                hideDisabled={true}
                                hideFirstLastPages={true}
                                itemClass="pageNumber"
                                prevPageText={
                                  <button className="btnPagination prev" onClick={handlePrevPage} disabled={state.pagination.pageNumber === 1}>
                                    <svg
                                      viewBox="0 0 6 10"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                      <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                        <g id="Mainboard-Copy-2" transform="translate(-1225.000000, -706.000000)" fill="#989898" fillRule="nonzero">
                                          <g id="Group-11" transform="translate(31.000000, 108.000000)">
                                            <g id="Group-24-Copy" transform="translate(1194.000000, 595.000000)">
                                              <path
                                                d="M5.49527827,8.49505142 L1.19543784,12.7947591 C0.921916047,13.0684136 0.478447351,13.0684136 0.205058349,12.7947591 C-0.0683527831,12.5213479 -0.0683527831,12.0779014 0.205058349,11.8045124 L4.0097533,7.99992807 L0.205169006,4.19547657 C-0.0682421262,3.92195478 -0.0682421262,3.47855247 0.205169006,3.20514134 C0.478580139,2.93161955 0.922026704,2.93161955 1.19554849,3.20514134 L5.49538893,7.50491538 C5.63209449,7.64168734 5.70036982,7.82075238 5.70036982,7.99990594 C5.70036982,8.17914803 5.6319617,8.35834586 5.49527827,8.49505142 Z"
                                                id="Path-Copy"
                                                transform="translate(2.850185, 8.000000) scale(-1, 1) translate(-2.850185, -8.000000) "
                                              />
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </button>
                                }
                                nextPageText={
                                  <button
                                    className="btnPagination next"
                                    onClick={handleNextPage}
                                    disabled={state.pagination.pageNumber === state.pagination.totalPage}
                                  >
                                    <svg
                                      viewBox="0 0 6 10"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                      <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                        <g id="Mainboard-Copy-2" transform="translate(-1315.000000, -706.000000)" fill="#989898" fillRule="nonzero">
                                          <g id="Group-11" transform="translate(31.000000, 108.000000)">
                                            <g id="Group-24-Copy" transform="translate(1194.000000, 595.000000)">
                                              <path
                                                d="M95.4952783,8.49505142 L91.1954378,12.7947591 C90.921916,13.0684136 90.4784474,13.0684136 90.2050583,12.7947591 C89.9316472,12.5213479 89.9316472,12.0779014 90.2050583,11.8045124 L94.0097533,7.99992807 L90.205169,4.19547657 C89.9317579,3.92195478 89.9317579,3.47855247 90.205169,3.20514134 C90.4785801,2.93161955 90.9220267,2.93161955 91.1955485,3.20514134 L95.4953889,7.50491538 C95.6320945,7.64168734 95.7003698,7.82075238 95.7003698,7.99990594 C95.7003698,8.17914803 95.6319617,8.35834586 95.4952783,8.49505142 Z"
                                                id="Path"
                                              />
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </button>
                                }
                                onChange={(value) => {
                                  if (value === state.pagination.pageNumber) return;
                                  handlePage(value);
                                }}
                              />
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                );
              })()}
            </table>
          </div>

          {props.titleFooter && <h3 className="title-footer">{props.titleFooter}</h3>}
        </div>
      </Fragment>
    );
  },
  (prevProps, nextProps) => {
    try {
      if (prevProps.enableReinitialize === true || prevProps.forceUpdateTable != nextProps.forceUpdateTable) return false;
      return isEqual(prevProps.structure, nextProps.structure);
    } catch (error) {
      return true;
    }
  }
);
