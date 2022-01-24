import { createAction, createReducer } from "typesafe-actions";
import { NewsModel } from "../../../models";
import { INewsState, NewsActionTypes, newsInitialState } from "../types";

export const newsToggleFavoriteAction = createAction(
  NewsActionTypes.TOGGLE_FAVORITE
)<NewsModel>();

export const newsToggleFavoriteReducer = createReducer(
  newsInitialState
).handleAction(
  newsToggleFavoriteAction,
  (state: INewsState, action: { payload: NewsModel }) => ({
    ...state,
  })
);
