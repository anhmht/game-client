const defaultState = null;

export const SET_LIST_NEWS = "SET_LIST_NEWS";

export const listNewsReducer = (state = defaultState, action: any) => {
  const { type, data, error } = action;
  if (type === SET_LIST_NEWS) {
    if (error) return { error };
    if (data) return data;
  }
  return state;
};
