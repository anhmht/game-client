import React, { FC, useRef, useState } from 'react'

import { ITableSearchBox } from './types';
import { ObjectUtils, ClassNames } from '../utils';
import { Icon } from '../icon';
import { Message } from '../message';
import moduleConfig from '../../module.config';

interface ITableSearchBoxProps extends ITableSearchBox {
    onActive: () => void,
    onOffSearch: () => void,
}

export const TableSearchBox: FC<ITableSearchBoxProps> = (props) => {
    const inputRef: any = useRef(null);
    let delayCheckTyping: any;

    const [isLoading, setIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([] as any[]);
    const [indexSelect, setIndexSelect] = useState(-1);
    const isHasValue = !!ObjectUtils.getIn(inputRef, 'current.value');
    const [initSearch, setInitSearch] = useState(false);

    const handleChange = (e: any) => {
        clearTimeout(delayCheckTyping);
        const value = e.target.value;
        delayCheckTyping = setTimeout(async () => {
            if (inputRef && inputRef.current && inputRef.current.value === value) {
                if (value) {
                    props.onActive();

                    setIsLoading(true);
                    setSearchResult([]);

                    let data: any[] = [];

                    try {
                        const temp = await props.fetchData(value) as any[];
                        temp.map(item => {
                            const value = ObjectUtils.getIn(item, 'value', undefined);
                            const label = ObjectUtils.getIn(item, 'label', undefined);
                            if (typeof value === 'undefined') throw Error(`Invalid value: ${JSON.stringify(item, null, 2)}`);
                            if (typeof label === 'undefined') throw Error(`Invalid value: ${JSON.stringify(item, null, 2)}`);

                            data.push({ value, label })
                            return item
                        })
                    } catch (error:any) { console.warn(`Table search box error: ${error.message}`) }

                    setSearchResult(data);
                    setIsLoading(false);
                    if (!initSearch) setInitSearch(true);
                } else {
                    handleClear();
                }
            }
        }, 500);
    }

    const handleClear = () => {
        inputRef.current.value = '';
        setSearchResult([]);
        props.onOffSearch();
        setInitSearch(false);
    }

    const handleInputKeyDown = (e: any) => {
        // Up
        if (e.which === 38) {
            e.preventDefault();
            setIndexSelect(state => state === -1 ? state : state === 0 ? -1 : state - 1)
        }

        // Down
        if (e.which === 40) {
            e.preventDefault();
            setIndexSelect(state => state === -1 || searchResult.length - 1 === state ? 0 : state + 1);
        }
    }

    const handleSubmit = async (e?: any) => {
        if (e) e.preventDefault();
        const selectItem = searchResult[indexSelect];

        if (selectItem) {
            props.onSelect(selectItem);
        }
    }

    return (
        <form className={ClassNames({ Table__SearchBox: true, hasValue: isHasValue })} onSubmit={handleSubmit}>
            <div className="input">
                <div className="icon">
                    <Icon.Search />
                </div>
                <input
                    type="text"
                    ref={inputRef}
                    onChange={handleChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder={props.placeholder || 'Type to search'}
                />

                {isHasValue ? <div className="btnClear" onClick={handleClear}>
                    <Icon.Remove />
                </div> : null}
            </div>

            {(() => {
                if (isLoading) return <Message type="loading" message={moduleConfig.translate('loading-search-result')} />
                if (initSearch && !searchResult.length) return <Message type="emptyData" />
                if (searchResult.length) return <div className="suggests">
                    {searchResult.map((item, key) => {
                        return (
                            <div
                                key={key}
                                className={ClassNames({ item: true, focused: key === indexSelect })}
                                onMouseEnter={() => setIndexSelect(key)}
                                onClick={handleSubmit}
                            >
                                {item.label}
                            </div>
                        )
                    })}
                </div>
            })()}
        </form>
    )
}