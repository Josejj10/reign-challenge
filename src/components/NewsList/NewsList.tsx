import { useCallback, useMemo, useRef } from "react";
import { NewsModel } from "../../models";
import { useNews } from "../../store";
import Button from "../Button/Button";
import NewsCard, { INewsCardProps } from "../NewsCard/NewsCard";
import NewsCardSkeleton from "../NewsCardSkeleton/NewsCardSkeleton";
import "./NewsList.css";

export interface INewsListProps {
  list: INewsCardProps[];
  toggleFavorite: (value: NewsModel) => void;
  viewFavorites: boolean;
  restartPage: () => void;
}

const NewsList = ({
  list,
  toggleFavorite,
  viewFavorites,
  restartPage,
}: INewsListProps) => {
  const { loadInfinite, query, loading, page, maxPages } = useNews();
  const observer = useRef<any>();

  const hasMore = useMemo(() => maxPages > page, [maxPages, page]);

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadInfinite({ query, page: page + 1 });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="NewsList">
      {list &&
        list.length > 0 &&
        list.map(({ news, favorite }: INewsCardProps, index: number) => {
          const isLastElement = list.length === index + 1;

          if (hasMore && isLastElement && !viewFavorites)
            return (
              <div ref={lastBookElementRef} key={news.id}>
                <NewsCard
                  news={news}
                  favorite={favorite}
                  toggleFavorite={toggleFavorite}
                />
              </div>
            );

          return (
            <NewsCard
              key={news.id}
              news={news}
              favorite={favorite}
              toggleFavorite={toggleFavorite}
            />
          );
        })}
      {!viewFavorites && loading && <NewsCardSkeleton />}
      {!hasMore && (
        <div className="NewsList__empty">
          <p>No more pages can be loaded by API.</p>
          <Button text="Load again from first page" onClick={restartPage} />
        </div>
      )}
    </div>
  );
};

export default NewsList;
