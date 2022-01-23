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
}

const NewsCard = ({ news, favorite }: INewsCardProps) => {
  // Simulate the favorite effect,
  // Should be remove in favor of dispatching an action
  // to set favorite in local storage
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(favorite);
  }, [favorite]);

  const setFavorite = () => {
    setFav((f) => !f);
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
