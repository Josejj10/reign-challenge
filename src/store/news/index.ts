import reduceReducers from "reduce-reducers";
import { combineEpics } from "redux-observable";
import { newsGetFavoritesReducer } from "./actions/get-favorites";
import { newsGetFiltersReducer } from "./actions/get-filters";
import { newsLoadReducer } from "./actions/load.actions";
import { newsSetFiltersReducer } from "./actions/set-filters";
import { newsToggleFavoriteReducer } from "./actions/toggle-favorite";
import * as epics from "./epics";
import { newsInitialState } from "./types";

export const NewsEpics = combineEpics(...(Object.values(epics) as any));

export const NewsReducer = reduceReducers(
  newsInitialState,
  newsLoadReducer,
  newsGetFiltersReducer,
  newsSetFiltersReducer,
  newsGetFavoritesReducer,
  newsToggleFavoriteReducer
);
