import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../reducers";
import { newsGetFiltersAction } from "./actions/get-filters";
import { newsLoadAction } from "./actions/load.actions";
import { newsSetFiltersAction } from "./actions/set-filters";

export const useNews = () => {
  const { news, loading, loadingFilters, error, page, query } = useSelector(
    (state: IState) => state.news
  );
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
  };
};
