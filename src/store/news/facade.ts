import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewsModel } from "../../models";
import { IState } from "../reducers";
import { newsGetFavoritesAction } from "./actions/get-favorites";
import { newsGetFiltersAction } from "./actions/get-filters";
import { newsLoadAction } from "./actions/load.actions";
import { newsSetFiltersAction } from "./actions/set-filters";
import { newsToggleFavoriteAction } from "./actions/toggle-favorite";

export const useNews = () => {
  const { news, loading, loadingFilters, error, page, query, favorites } =
    useSelector((state: IState) => state.news);
  const dispatch = useDispatch();

  const loadNews = useCallback(
    (data: { page: number; query: string }) =>
      dispatch(newsLoadAction.request(data)),
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
    loading,
    error,
    getFilters,
    setFilters,
    loadingFilters,
    page,
    query,
    getFavorites,
    toggleFavorite,
    favorites,
  };
};
