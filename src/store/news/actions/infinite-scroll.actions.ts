import { action, createAsyncAction, createReducer } from "typesafe-actions";
import { NewsModel } from "../../../models";
import { INewsState, NewsActionTypes, newsInitialState } from "../types";

export const newsInfiniteScrollAction = createAsyncAction(
  NewsActionTypes.INFINITE_SCROLL_NEWS,
  NewsActionTypes.INFINITE_SCROLL_NEWS_SUCCESS,
  NewsActionTypes.INFINITE_SCROLL_NEWS_FAIL
)<{ query: string; page: number }, NewsModel[], any>();

export const newsInfiniteScrollReducer = createReducer(newsInitialState)
  .handleAction(
    newsInfiniteScrollAction.request,
    (state: INewsState, action: any) => ({
      ...state,
      loading: true,
      page: action.payload.page,
    })
  )
  .handleAction(
    newsInfiniteScrollAction.success,
    (state: INewsState, action: any) => ({
      ...state,
      loading: false,
      news: [...state.news, ...action.payload],
    })
  )
  .handleAction(
    newsInfiniteScrollAction.failure,
    (state: INewsState, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    })
  );
