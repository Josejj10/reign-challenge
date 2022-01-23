import { createAsyncAction, createReducer } from "typesafe-actions";
import { newsInitialState, NewsActionTypes } from "../types";

export const newsGetFiltersAction = createAsyncAction(
  NewsActionTypes.GET_FILTERS,
  NewsActionTypes.GET_FILTERS_SUCCESS,
  NewsActionTypes.GET_FILTERS_FAIL
)<void, { query: string; page: number }, any>();

export const newsGetFiltersReducer = createReducer(newsInitialState)
  .handleAction(newsGetFiltersAction.request, (state: any) => ({
    ...state,
    loadingFilters: true,
  }))
  .handleAction(
    newsGetFiltersAction.success,
    (state: any, action: { payload: { query: string; page: number } }) => ({
      ...state,
      loadingFilters: false,
      ...action.payload, // spreads action props (query, page) to state
    })
  )
  .handleAction(newsGetFiltersAction.failure, (state: any, action: any) => ({
    ...state,
    loadingFilters: false,
    error: action.payload,
  }));
