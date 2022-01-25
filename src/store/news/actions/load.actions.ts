import { createAsyncAction, createReducer } from "typesafe-actions";
import { NewsModel } from "../../../models";
import { INewsState, NewsActionTypes, newsInitialState } from "../types";

export const newsLoadAction = createAsyncAction(
  NewsActionTypes.LOAD_NEWS,
  NewsActionTypes.LOAD_NEWS_SUCCESS,
  NewsActionTypes.LOAD_NEWS_FAIL
)<
  { query: string; page: number },
  { news: NewsModel[]; maxPages: number },
  any
>();

export const newsLoadReducer = createReducer(newsInitialState)
  .handleAction(newsLoadAction.request, (state: INewsState) => ({
    ...state,
    loading: true,
  }))
  .handleAction(
    newsLoadAction.success,
    (
      state: INewsState,
      action: { payload: { news: NewsModel[]; maxPages: number } }
    ) => ({
      ...state,
      loading: false,
      news: action.payload.news,
      maxPages: action.payload.maxPages,
    })
  )
  .handleAction(newsLoadAction.failure, (state: INewsState, action: any) => ({
    ...state,
    loading: false,
    error: action.payload,
  }));
