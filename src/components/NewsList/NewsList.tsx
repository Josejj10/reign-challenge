import { NewsModel } from "../../models";
import NewsCard, { INewsCardProps } from "../NewsCard/NewsCard";
import "./NewsList.css";

export interface INewsListProps {
  list: INewsCardProps[];
  toggleFavorite: (value: NewsModel) => void;
}

const NewsList = ({ list, toggleFavorite }: INewsListProps) => {
  return (
    <div className="NewsList">
      {list &&
        list.length > 0 &&
        list.map(({ news, favorite }: INewsCardProps) => (
          <NewsCard
            key={news.id}
            news={news}
            favorite={favorite}
            toggleFavorite={toggleFavorite}
          />
        ))}
    </div>
  );
};

export default NewsList;
