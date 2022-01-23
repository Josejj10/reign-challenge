import { createAction, createReducer } from "typesafe-actions";
import { newsInitialState, NewsActionTypes } from "../types";

export const newsSetFiltersAction = createAction(NewsActionTypes.SET_FILTERS)<{
  query: string;
  page: number;
}>();

export const newsSetFiltersReducer = createReducer(
  newsInitialState
).handleAction(
  newsSetFiltersAction,
  (state: any, action: { payload: { query: string; page: number } }) => ({
    ...state,
    ...action.payload, // spreads action props (query, page) to state
  })
);
