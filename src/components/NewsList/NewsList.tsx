import { NewsModel } from "../../models";
import NewsCard, { INewsCardProps } from "../NewsCard/NewsCard";
import "./NewsList.css";

export interface INewsListProps {
  list: INewsCardProps[];
}

const NewsList = ({ list }: INewsListProps) => {
  return (
    <div className="NewsList">
      {list &&
        list.length > 0 &&
        list.map(({ news, favorite }: INewsCardProps) => (
          <NewsCard key={news.id} news={news} favorite={favorite} />
        ))}
    </div>
  );
};

export default NewsList;
