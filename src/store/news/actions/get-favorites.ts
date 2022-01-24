import { createAsyncAction, createReducer } from "typesafe-actions";
import { NewsModel } from "../../../models";
import { newsInitialState, NewsActionTypes, INewsState } from "../types";

export const newsGetFavoritesAction = createAsyncAction(
  NewsActionTypes.GET_FAVORITES,
  NewsActionTypes.GET_FAVORITES_SUCCESS,
  NewsActionTypes.GET_FAVORITES_FAIL
)<void, { [id: string]: NewsModel }, any>();

export const newsGetFavoritesReducer = createReducer(newsInitialState)
  .handleAction(newsGetFavoritesAction.request, (state: INewsState) => ({
    ...state,
  }))
  .handleAction(
    newsGetFavoritesAction.success,
    (state: INewsState, action: { payload: { [id: string]: NewsModel } }) => ({
      ...state,
      favorites: action.payload, // spreads action props (query, page) to state
    })
  )
  .handleAction(
    newsGetFavoritesAction.failure,
    (state: INewsState, action: any) => ({
      ...state,
      error: action.payload,
    })
  );
