import { createAsyncAction, createReducer } from "typesafe-actions";
import { NewsModel } from "../../../models";
import { RoleActionTypes, newsInitialState } from "../types";

export const newsLoadAction = createAsyncAction(
  RoleActionTypes.LOAD_NEWS,
  RoleActionTypes.LOAD_NEWS_SUCCESS,
  RoleActionTypes.LOAD_NEWS_FAIL
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
