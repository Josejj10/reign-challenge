import { NewsModel } from "../../models";
import "./NewsCard.css";
// Ignore for importing components with vite loader
// @ts-ignore
import HeartStrokeSvg from "../../assets/favorite-stroke.svg?component";
// @ts-ignore
import HeartFillSvg from "../../assets/favorite.svg?component";
// @ts-ignore
import ClockSvg from "../../assets/time.svg?component";
import { useEffect, useState } from "react";

export interface INewsCardProps {
  news: NewsModel;
  favorite: boolean;
  toggleFavorite?: (value: NewsModel) => void;
}

const NewsCard = ({ news, favorite, toggleFavorite }: INewsCardProps) => {
  const [fav, setFav] = useState(favorite);

  useEffect(() => {
    setFav(favorite);
  }, [favorite]);

  const setFavorite = () => {
    setFav((f) => !f);
    if (toggleFavorite) toggleFavorite(news);
  };

  return (
    <div className="NewsCard">
      <a
        target="_blank"
        rel="noreferrer"
        href={news.story_url}
        className="NewsCard__content"
      >
        <div className="NewsCard__content-time">
          <ClockSvg />
          <span>
            {news.created_at} by {news.author}
          </span>
        </div>
        <p>{news.story_title}</p>
      </a>
      <div className="NewsCard__favorite">
        {fav ? (
          <HeartFillSvg onClick={setFavorite} />
        ) : (
          <HeartStrokeSvg onClick={setFavorite} />
        )}
      </div>
    </div>
  );
};

export default NewsCard;
