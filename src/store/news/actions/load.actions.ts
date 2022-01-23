import { createAsyncAction, createReducer } from "typesafe-actions";
import { NewsModel } from "../../../models";
import { NewsActionTypes, newsInitialState } from "../types";

export const newsLoadAction = createAsyncAction(
  NewsActionTypes.LOAD_NEWS,
  NewsActionTypes.LOAD_NEWS_SUCCESS,
  NewsActionTypes.LOAD_NEWS_FAIL
)<{ query: string; page: number }, NewsModel[], any>();

export const newsLoadReducer = createReducer(newsInitialState)
  .handleAction(newsLoadAction.request, (state: any) => ({
    ...state,
    loading: true,
  }))
  .handleAction(newsLoadAction.success, (state: any, action: any) => ({
    ...state,
    loading: false,
    news: action.payload,
  }))
  .handleAction(newsLoadAction.failure, (state: any, action: any) => ({
    ...state,
    loading: false,
    error: action.payload,
  }));
