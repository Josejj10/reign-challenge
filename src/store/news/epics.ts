import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { from, Observable, of, EMPTY } from "rxjs";
import { newsLoadAction } from "./actions/load.actions";
import { NewsService } from "../../services/news.service";
import { newsSetFiltersAction } from "./actions/set-filters";
import { newsGetFiltersAction } from "./actions/get-filters";
import { newsGetFavoritesAction } from "./actions/get-favorites";
import { newsToggleFavoriteAction } from "./actions/toggle-favorite";
import { newsInfiniteScrollAction } from "./actions/infinite-scroll.actions";

// Load news asynchronously after set filters
export const newsLoadEpic = (action$: Observable<any>) =>
  action$.pipe(
    filter(isActionOf(newsLoadAction.request)),
    switchMap(({ payload }) =>
      from(NewsService.getNews(payload)).pipe(
        map(newsLoadAction.success),
        catchError((error) => of(newsLoadAction.failure(error)))
      )
    )
  );

// Infinite scroll news asynchronously after set filters
export const infiniteScrollEpic = (action$: Observable<any>) =>
  action$.pipe(
    filter(isActionOf(newsInfiniteScrollAction.request)),
    switchMap(({ payload }) =>
      from(NewsService.getNews(payload, true)).pipe(
        map(newsInfiniteScrollAction.success),
        catchError((error) => of(newsInfiniteScrollAction.failure(error)))
      )
    )
  );

// Set filters in local storage
export const newsSetFiltersEpic = (action$: Observable<any>) =>
  action$.pipe(
    filter(isActionOf(newsSetFiltersAction)),
    map(({ payload }) => {
      NewsService.saveFilters(payload);
      return newsLoadAction.request(payload);
    })
  );

// Get filters from local storage to store
export const newsGetFiltersEpic = (action$: Observable<any>) =>
  action$.pipe(
    filter(isActionOf(newsGetFiltersAction.request)),
    switchMap(() =>
      from(NewsService.getFilters()).pipe(
        map(newsGetFiltersAction.success),
        catchError((error) => of(newsGetFiltersAction.failure(error)))
      )
    )
  );

// Get filters from local storage to store
export const newsGetFavoritesEpic = (action$: Observable<any>) =>
  action$.pipe(
    filter(isActionOf(newsGetFavoritesAction.request)),
    switchMap(() =>
      from(NewsService.getFavorites()).pipe(
        map(newsGetFavoritesAction.success),
        catchError((error) => of(newsGetFavoritesAction.failure(error)))
      )
    )
  );

// Toggle favorite in local storage and then get favorites again
export const newsToggleFavoriteEpic = (action$: Observable<any>) =>
  action$.pipe(
    filter(isActionOf(newsToggleFavoriteAction)),
    switchMap(({ payload }) =>
      from(NewsService.toggleFavorite(payload)).pipe(
        map(newsGetFavoritesAction.request),
        catchError(() => of(EMPTY))
      )
    )
  );
