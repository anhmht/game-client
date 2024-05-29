const defaultState: any = [];

export const SET_DETAIL_NEWS = "SET_DETAIL_NEWS";

export const detailNewsReducer = (state = defaultState, action: any) => {
  const { type, data, error } = action;
  if (type === SET_DETAIL_NEWS) {
    if (error) return { error };
    if (data?.length > 0) return data;
    return [];
  }
  return state;
};
