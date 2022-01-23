import { catchError, filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { from, Observable, of } from "rxjs";
import { newsLoadAction } from "./actions/load.actions";
import { NewsService } from "../../services/news.service";

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
