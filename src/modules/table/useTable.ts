import { useState, useEffect, useRef } from "react";

import { ITableProps, ITableState, IFetchDataParameters, ITableScrollProps } from "./types";
import { ObjectUtils } from "../utils";
import moment from "moment";

export const useTableState = (props: ITableProps) => {
    const defaultState: ITableState = {
        isFetching: false,
        count: -1,
        data: [],
        error: '',
        params: props.filters ? props.filters.reduce((output, item) => {
            if (item.defaultValue) {
                const defaultValue = item.defaultValue;
                if (defaultValue?.hasOwnProperty('fromDate') && defaultValue?.hasOwnProperty('toDate')) {
                    defaultValue.fromDate = moment(defaultValue.fromDate).format();
                    defaultValue.toDate = moment(defaultValue.toDate).format();
                }
                if (typeof defaultValue === 'object') output = { ...output, ...defaultValue }
                else output = { ...output, [item.key || '']: defaultValue }
            }
            return output;
        }, {}) : {},
        pagination: {
            isVisible: true,
            pageNumber: 1,
            itemsPerPage: props.itemPerPages || 10,
            totalPage: 0,
        },
        isShowTable: true,
        isOpenFilter: props.filters ? !!props.filters.find(v => v.defaultValue) : false,
    }

    const [state, setState] = useState(defaultState);

    const handleShowTable = () => setState(s => ({ ...s, isShowTable: true }));
    const handleHideTable = () => setState(s => ({ ...s, isShowTable: false }));
    const handleToggleOpenFilter = () => setState(s => ({ ...s, isOpenFilter: !s.isOpenFilter }));

    return {
        state,
        setState,
        defaultState,

        handleShowTable,
        handleHideTable,
        handleToggleOpenFilter,
    }
}

export const useTable = (props: ITableProps) => {
    const { state, setState, defaultState, handleHideTable, handleShowTable, handleToggleOpenFilter } = useTableState(props);
    const [isSearchBoxActive, setIsSearchBoxActive] = useState(false);

    // ======================= Functions =======================
    const fetchData = async (parameters?: IFetchDataParameters, isForceUpdate = false) => {
        try {
            const currentState: ITableState = isForceUpdate ? { ...defaultState, isOpenFilter: state.isOpenFilter } : state;

            if ((!isForceUpdate && currentState.error) || currentState.isFetching || !props.fetchData) return
            setState({ ...currentState, isFetching: true });

            let pagination = { ...state.pagination, ...ObjectUtils.getIn(parameters, 'pagination', {}) };
            let params = { ...state.params, ...ObjectUtils.getIn(parameters, 'params', {}) };

            const dataFetched = await props.fetchData(Object.assign(params, {
                limit: pagination.itemsPerPage,
                offset: (pagination.pageNumber - 1) * pagination.itemsPerPage,
                pageNumber: pagination.pageNumber
            }));

            const count = ObjectUtils.getIn(dataFetched, 'count', 0);
            const data = ObjectUtils.getIn(dataFetched, 'data', []);
            const error = ObjectUtils.getIn(dataFetched, 'error.message', '');

            setState(state => ({
                ...state,
                data,
                count,
                params,
                error,
                pagination: {
                    ...pagination,
                    totalPage: Math.ceil(count / pagination.itemsPerPage)
                },
                isFetching: false,
            }));

        } catch (error:any) {
            setState(state => ({ ...state, error: error.message, isFetching: false }));
        }
    }

    const handlePage = (pageNumber : number) => {
        const newPaging = { ...state.pagination, pageNumber };
        setState({ ...state, pagination: newPaging });
        return fetchData({ pagination: newPaging })
    }

    const handleNextPage = () => {
        const newPaging = { ...state.pagination, pageNumber: state.pagination.pageNumber + 1 };
        setState({ ...state, pagination: newPaging });
        return fetchData({ pagination: newPaging })
    }

    const handlePrevPage = () => {
        if (state.pagination.pageNumber === 1) return;
        const newPaging = { ...state.pagination, pageNumber: state.pagination.pageNumber - 1 };
        setState({ ...state, pagination: newPaging });
        return fetchData({ pagination: newPaging })
    }

    // ======================= Effects =======================
    useEffect(() => {
        if (!props.fetchData) {
            if (!props.data) setState(state => ({ ...state, isFetching: true }));
            if (props.data) setState(state => ({
                ...state,
                isFetching: false,
                data: ObjectUtils.getIn(props.data, 'data', []),
                count: ObjectUtils.getIn(props.data, 'count', 0),
                error: ObjectUtils.getIn(props.data, 'error.message', ''),
                pagination: {
                    ...state.pagination,
                    isVisible: false,
                }
            }))
        } else {
            fetchData();
        }
        // eslint-disable-next-line
    }, [props.data, props.fetchData, props.structure])

    useEffect(() => {
        if (props.enableReinitialize) fetchData({}, true)
        // eslint-disable-next-line
    }, [props])

    return {
        state,
        fetchData,
        handleNextPage,
        handlePrevPage,
        handlePage,
        isSearchBoxActive,
        setIsSearchBoxActive,

        handleShowTable,
        handleHideTable,
        handleToggleOpenFilter,
    }
}

export const useTableScroll = (props: ITableScrollProps) => {
    const refTable = useRef(null);
    const { state, setState, defaultState, handleHideTable, handleShowTable, handleToggleOpenFilter } = useTableState(props);
    const [isSearchBoxActive, setIsSearchBoxActive] = useState(false);

    const fetchData = async (parameters?: IFetchDataParameters, isForceUpdate = false) => {
        try {
            let currentState: ITableState = state;

            const action = async () => {
                setState(isForceUpdate ? { ...defaultState, isFetching: true } : { ...state, isFetching: true });

                let pagination = { ...currentState.pagination, ...ObjectUtils.getIn(parameters, 'pagination', {}) };
                let params = { ...currentState.params, ...ObjectUtils.getIn(parameters, 'params', {}) };

                const dataFetched = await props.fetchData(Object.assign(params, {
                    limit: pagination.itemsPerPage,
                    offset: isForceUpdate ? 0 : currentState.data.length,
                    pageNumber: isForceUpdate ? 1 : Math.ceil(currentState.data.length / pagination.itemsPerPage) + 1,
                }));

                const count = ObjectUtils.getIn(dataFetched, 'count', 0);
                const data = ObjectUtils.getIn(dataFetched, 'data', [], arr => isForceUpdate ? [...arr] : [...currentState.data, ...arr]);
                const error = ObjectUtils.getIn(dataFetched, 'error.message', '');

                setState(state => ({
                    ...state,
                    data,
                    count,
                    params,
                    error,
                    pagination: {
                        ...pagination,
                        totalPage: Math.ceil(count / pagination.itemsPerPage),
                    },
                    isFetching: false,
                }));
            }

            if (!currentState.isFetching && (props.fetchData as any)) {
                if (isForceUpdate) await action()
                else if (!currentState.error && currentState.data.length < currentState.count) await action()
            }
        } catch (error:any) {
            setState(state => ({ ...state, error: error.message, isFetching: false }));
        }
    }

    const handleTableScroll = () => {
        // @ts-ignore
        const tableElement: HTMLDivElement = refTable.current;
        const tableOffsetHeight = tableElement.offsetHeight;
        const tableScrollHeight = tableElement.scrollHeight;
        const tableScrollTop = tableElement.scrollTop;
        const isReadyToFetchData = (tableScrollTop + 100) >= (tableScrollHeight - tableOffsetHeight)
        if (isReadyToFetchData) fetchData()
    }

    const handleBodyScroll = () => {
        // @ts-ignore
        const tableElement: HTMLDivElement = refTable.current, body: HTMLBodyElement = window.document.body;
        const positionBodyBottom = body.scrollTop + window.innerHeight;
        const positionTableBottom = tableElement.offsetTop + tableElement.offsetHeight;
        const isReadyToFetchData = (positionTableBottom - 80) <= positionBodyBottom;
        if (isReadyToFetchData) fetchData()
    }

    useEffect(() => {
        // @ts-ignore
        const tableElement: HTMLDivElement = refTable.current, body: HTMLBodyElement = window.document.body;

        if (state.data.length !== state.count) {
            if (!props.isScrollInside) {
                handleBodyScroll();
                body.removeEventListener('scroll', handleBodyScroll)
                body.addEventListener('scroll', handleBodyScroll)
            } else {
                tableElement.removeEventListener('scroll', handleTableScroll)
                tableElement.addEventListener('scroll', handleTableScroll)
            }
        }

        return () => {
            if (!props.isScrollInside) body.removeEventListener('scroll', handleBodyScroll)
            else tableElement.addEventListener('scroll', handleTableScroll)
        }

        // eslint-disable-next-line
    }, [props.isScrollInside, state])

    useEffect(() => {
        setState({ ...defaultState });
        fetchData({}, true);
        // eslint-disable-next-line
    }, [])

    return {
        refTable,
        handleBodyScroll,
        handleTableScroll,
        state,
        fetchData,

        isSearchBoxActive,
        setIsSearchBoxActive,

        handleShowTable,
        handleHideTable,
        handleToggleOpenFilter,
    }
}