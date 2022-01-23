import { combineReducers } from "redux";
import { NewsReducer } from "./news";
import { INewsState, newsInitialState } from "./news/types";

export interface IState {
  news: INewsState;
}

export const initialState: IState = {
  news: newsInitialState,
};

export const RootReducer = combineReducers({
  news: NewsReducer,
});
