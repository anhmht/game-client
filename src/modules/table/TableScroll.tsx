import React, { FC, Fragment } from 'react'

import { useTableScroll } from './useTable'
import { Message } from '../message';
import { ITableScrollProps } from './types';
import { ObjectUtils, ClassNames } from '../utils';
import { TableSearchBox } from './TableSearchBox';
import { Icon } from '../icon';
import { moduleConfig } from '../module.config';

export const TableScroll: FC<ITableScrollProps> = (props) => {
    const { isScrollInside = false } = props;
    const { refTable, state, fetchData, handleHideTable, handleShowTable, handleToggleOpenFilter } = useTableScroll(props);

    return (
        <Fragment>
            {props.searchBox ? <TableSearchBox
                {...props.searchBox}
                onActive={() => handleHideTable()}
                onOffSearch={() => handleShowTable()}
            /> : null}

            {props.filters ? <div className={ClassNames({ Table__FilterBox: true, openFilter: state.isOpenFilter })}>
                <div className="Table__FilterBox__Label" onClick={handleToggleOpenFilter}>
                    <div className="content">
                        <Icon.Filter />
                        {moduleConfig.translate('Filter box')}
                    </div>

                    <div className="iconToggle">
                        <Icon.Dropdown />
                    </div>
                </div>

                {state.isOpenFilter ? <div className="List">
                    {props.filters.map((item, key) => {
                        return (
                            <div key={key} className="Item">
                                <div className="label">
                                    {item.name}:
                                </div>
                                <item.input
                                    paramKey={item.key || ''}
                                    onChange={(params) => fetchData({ params: { ...params } }, true)}
                                    params={state.params}
                                />
                            </div>
                        )
                    })}
                </div> : null}
            </div> : null}

            <div
                ref={refTable}
                className={ClassNames({
                    Table: true,
                    scroll: true,
                    insideScroll: isScrollInside,
                    hide: !state.isShowTable,
                    [props.className as string]: !!props.className,
                })}
            >
                <table>
                    <thead className="Table__Head">
                        <tr>
                            {props.structure.map((item, key) => <th className={item.className || ''} style={item.style} key={key}>{item.name}</th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {state.data.map((item, itemKey) => {
                            item['_order'] = `${itemKey + 1}`;

                            return (
                                <tr key={itemKey}>
                                    {props.structure.map((column, columnKey) => {
                                        return (
                                            <td className={column.className || ''} style={column.style} key={columnKey}>
                                                {(() => {
                                                    if (column.render) return column.render(item, (params = {}) => fetchData(params, true), column);
                                                    if (column.key) return `${ObjectUtils.getIn(item, column.key, '')}`;
                                                    return '--';
                                                })()}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {(() => {
                    if (state.isFetching) return <Message type="loading" />
                    if (state.error) return <Message type="error" message={state.error} />
                    if (!state.count) return <Message type="emptyData" />
                })()}
            </div>
        </Fragment>
    )
}