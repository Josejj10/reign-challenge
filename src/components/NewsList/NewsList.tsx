import { useState } from "react";
import "./NewsList.css";

export interface INewsListProps {
  list: any[];
}

const NewsList = ({ list }: INewsListProps) => {
  return (
    <div className="NewsList">
      {list &&
        list.length > 0 &&
        list.map(() => <div className="NewsCard">News Card</div>)}
    </div>
  );
};

export default NewsList;
