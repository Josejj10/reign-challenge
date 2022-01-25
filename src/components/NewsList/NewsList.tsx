import { useCallback, useRef } from "react";
import { NewsModel } from "../../models";
import { useNews } from "../../store";
import NewsCard, { INewsCardProps } from "../NewsCard/NewsCard";
import "./NewsList.css";

export interface INewsListProps {
  list: INewsCardProps[];
  toggleFavorite: (value: NewsModel) => void;
}

const NewsList = ({ list, toggleFavorite }: INewsListProps) => {
  const { loadInfinite, query, loading, page } = useNews();

  const observer = useRef<any>();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadInfinite({ query, page: page + 1 });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="NewsList">
      {list &&
        list.length > 0 &&
        list.map(({ news, favorite }: INewsCardProps, index: number) => {
          const isLastElement = list.length === index + 1;

          if (isLastElement)
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
    </div>
  );
};

export default NewsList;
