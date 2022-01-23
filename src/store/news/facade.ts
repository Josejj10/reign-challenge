import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../reducers";
import { newsLoadAction } from "./actions/load.actions";

export const useNews = () => {
  const { news, loading, error } = useSelector((state: IState) => state.news);
  const dispatch = useDispatch();

  const loadNews = useCallback(
    (data: { page: number; query: string }) =>
      dispatch(newsLoadAction.request(data)),
    [dispatch]
  );

  return {
    news,
    loadNews,
    loading,
    error,
  };
};
