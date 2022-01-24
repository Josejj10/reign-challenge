import { NewsModel } from "../../models";

export enum NewsActionTypes {
  LOAD_NEWS = "[NEWS] Load",
  LOAD_NEWS_SUCCESS = "[NEWS] Load Success",
  LOAD_NEWS_FAIL = "[NEWS] Load Fail",

  SET_FILTERS = "[NEWS] Set filters",

  GET_FILTERS = "[NEWS] Get filters",
  GET_FILTERS_SUCCESS = "[NEWS] Get filters sucess",
  GET_FILTERS_FAIL = "[NEWS] Get filters fail",

  TOGGLE_FAVORITE = "[NEWS] Toggle favorite",

  GET_FAVORITES = "[NEWS] Get favorites",
  GET_FAVORITES_SUCCESS = "[NEWS] Get favorites success",
  GET_FAVORITES_FAIL = "[NEWS] Get favorites fail",
}

export interface INewsState {
  news: NewsModel[];
  favorites: { [id: string]: NewsModel };
  loading: boolean;
  loadingFilters: boolean;
  error: any;
  query: string;
  page: number;
}

export const newsInitialState = {
  news: [],
  favorites: {},
  loading: false,
  loadingFilters: false,
  error: null,
  query: "",
  page: 0,
};
