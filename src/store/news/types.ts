import { NewsModel } from "../../models";

export enum NewsActionTypes {
  LOAD_NEWS = "[NEWS] Load",
  LOAD_NEWS_SUCCESS = "[NEWS] Load Success",
  LOAD_NEWS_FAIL = "[NEWS] Load Fail",

  INFINITE_SCROLL_NEWS = "[NEWS] Infinite scroll ",
  INFINITE_SCROLL_NEWS_SUCCESS = "[NEWS] Infinite scroll Success",
  INFINITE_SCROLL_NEWS_FAIL = "[NEWS] Infinite scroll Fail",

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
  filtersLoaded: boolean;
  error: any;
  query: string;
  page: number;
  maxPages: number;
}

export const newsInitialState = {
  news: [],
  favorites: {},
  loading: false,
  filtersLoaded: false,
  error: null,
  query: "",
  page: 0,
  maxPages: 50,
};
