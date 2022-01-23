import reduceReducers from "reduce-reducers";
import { combineEpics } from "redux-observable";
import { newsLoadReducer } from "./actions/load.actions";
import * as epics from "./epics";
import { newsInitialState } from "./types";

export const NewsEpics = combineEpics(...Object.values(epics));

export const NewsReducer = reduceReducers(newsInitialState, newsLoadReducer);
