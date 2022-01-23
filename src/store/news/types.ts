import { NewsModel } from "../../models";

export enum NewsActionTypes {
  LOAD_NEWS = "[NEWS] Load",
  LOAD_NEWS_SUCCESS = "[NEWS] Load Success",
  LOAD_NEWS_FAIL = "[NEWS] Load Fail",

  SET_FILTERS = "[NEWS] Set filters",
  GET_FILTERS = "[NEWS] Get filters",
  GET_FILTERS_SUCCESS = "[NEWS] Get filters sucess",
  GET_FILTERS_FAIL = "[NEWS] Get filters fail",
}

export interface INewsState {
  news: NewsModel[];
  loading: boolean;
  loadingFilters: boolean;
  error: any;
  query: string;
  page: number;
}

export const newsInitialState = {
  news: [],
  loading: false,
  loadingFilters: false,
  error: null,
  query: "",
  page: 0,
};
