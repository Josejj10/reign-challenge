import { useState } from "react";
import { NewsModel } from "../../models";
import "./NewsList.css";

export interface INewsListProps {
  list: NewsModel[];
}

const NewsList = ({ list }: INewsListProps) => {
  return (
    <div className="NewsList">
      {list &&
        list.length > 0 &&
        list.map((news: NewsModel) => (
          <div className="NewsCard" key={news.id}>
            <div>
              {news.created_at} by {news.author}
            </div>
            <a target="_blank" rel="noreferrer" href={news.story_url}>
              {news.story_title}
            </a>
          </div>
        ))}
    </div>
  );
};

export default NewsList;
