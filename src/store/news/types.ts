import { NewsModel } from "../../models";

export enum RoleActionTypes {
  LOAD_NEWS = "[NEWS] Load",
  LOAD_NEWS_SUCCESS = "[NEWS] Load Success",
  LOAD_NEWS_FAIL = "[NEWS] Load Fail",
}

export interface INewsState {
  news: NewsModel[];
  loading: boolean;
  error: any;
}

export const newsInitialState = {
  news: [],
  loading: false,
  error: null,
};
