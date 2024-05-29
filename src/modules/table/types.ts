import { CSSProperties, FC } from "react";

export interface ITableStructureItem {
  name: string;
  key?: string;
  render?: (rowValue: any, fetchData: (params?: IFetchDataParameters) => void, column: ITableStructureItem) => any;
  style?: CSSProperties;
  className?: string;
  sort?: ITableStructureSort;
}

export interface ITableStructureSort {
  key?: string;
  increaseValue?: any;
  descreaseValue?: any;
}

export interface ITableStructureItemFilter {
  name: string;
  key: string;
  defaultValue?: any;
  input: FC<ITableFilterInputProps>;
}

export interface ITableFilterInputProps {
  paramKey: string;
  params: any;
  onChange: (value: any) => void;
}

export interface ITableResponse {
  count: number;
  data: any[];
}

export interface ITableProps {
  structure: ITableStructureItem[];
  filters?: ITableStructureItemFilter[];
  injectFilter?: any;
  className?: string;
  isShowLoading?: boolean;
  isShowMessageEmpty?: boolean;
  isNotShowPagination?: boolean;
  itemPerPages?: number;
  enableReinitialize?: boolean;
  id?: string;
  data?: any;
  fetchData?: (params: any) => Promise<ITableResponse>;
  searchBox?: ITableSearchBox;
  title?: any;
  isTextCenter?: boolean;
  hasOrderColumn?: boolean;
  classNameNoColumn?: string;
  hasOrderColumnRevert?: boolean;
  isHighLightHeader?: boolean;
  otherType?: boolean;
  scroll?: boolean;
  forceUpdateTable?: boolean;
  titleFooter?: string;
}

export interface ITableStatePagination {
  isVisible: boolean;
  pageNumber: number;
  itemsPerPage: number;
  totalPage: number;
}

export interface ITableState {
  isFetching: boolean;
  count: number;
  data: any[];
  error: string;
  params: any;
  pagination: ITableStatePagination;
  isShowTable: boolean;
  isOpenFilter: boolean;
}

export interface IFetchDataParameters {
  pagination?: ITableStatePagination;
  params?: any;
}

export interface ITableScrollProps {
  structure: ITableStructureItem[];
  filters?: ITableStructureItemFilter[];
  isScrollInside?: boolean;
  className?: string;
  itemPerPages?: number;
  fetchData: (params: any) => Promise<ITableResponse>;
  searchBox?: ITableSearchBox;
}

export interface ITableSearchBox {
  placeholder?: string;
  fetchData: (q: string) => Promise<any[]>;
  onSelect: (value: any) => void;
}
