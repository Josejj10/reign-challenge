import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewsModel } from "../../models";
import { IState } from "../reducers";
import { newsGetFavoritesAction } from "./actions/get-favorites";
import { newsGetFiltersAction } from "./actions/get-filters";
import { newsInfiniteScrollAction } from "./actions/infinite-scroll.actions";
import { newsLoadAction } from "./actions/load.actions";
import { newsSetFiltersAction } from "./actions/set-filters";
import { newsToggleFavoriteAction } from "./actions/toggle-favorite";

export const useNews = () => {
  const { news, loading, filtersLoaded, error, page, query, favorites } =
    useSelector((state: IState) => state.news);
  const dispatch = useDispatch();

  const loadNews = useCallback(
    (data: { page: number; query: string }) =>
      dispatch(newsLoadAction.request(data)),
    [dispatch]
  );

  const loadInfinite = useCallback(
    (data: { page: number; query: string }) =>
      dispatch(newsInfiniteScrollAction.request(data)),
    [dispatch]
  );

  const setFilters = useCallback(
    (data: { page: number; query: string }) =>
      dispatch(newsSetFiltersAction(data)),
    [dispatch]
  );

  const getFilters = useCallback(
    () => dispatch(newsGetFiltersAction.request()),
    [dispatch]
  );

  const getFavorites = useCallback(
    () => dispatch(newsGetFavoritesAction.request()),
    [dispatch]
  );

  const toggleFavorite = useCallback(
    (favorite: NewsModel) => dispatch(newsToggleFavoriteAction(favorite)),
    [dispatch]
  );

  return {
    news,
    loadNews,
    loadInfinite,
    loading,
    error,
    getFilters,
    setFilters,
    filtersLoaded,
    page,
    query,
    getFavorites,
    toggleFavorite,
    favorites,
  };
};
