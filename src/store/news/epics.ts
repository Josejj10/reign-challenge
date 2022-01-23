import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { from, Observable, of } from "rxjs";
import { newsLoadAction } from "./actions/load.actions";
import { NewsService } from "../../services/news.service";
import { newsSetFiltersAction } from "./actions/set-filters";
import { newsGetFiltersAction } from "./actions/get-filters";

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
