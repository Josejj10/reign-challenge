import { useEffect, useState } from "react";
import "./App.css";
import Dropdown, { IOption } from "./components/Dropdown/Dropdown";
import { INewsCardProps } from "./components/NewsCard/NewsCard";
import NewsList from "./components/NewsList/NewsList";
import { useNews } from "./store";
import AngularImage from "./assets/angular.png";
import ReactImage from "./assets/react.png";
import VueImage from "./assets/vue.png";
import { NewsModel } from "./models";

const dropdownOptionList: IOption[] = [
  {
    icon: AngularImage,
    label: "Angular",
    value: "angular",
  },
  {
    icon: ReactImage,
    label: "Reactjs",
    value: "reactjs",
  },
  {
    icon: VueImage,
    label: "Vuejs",
    value: "vuejs",
  },
];

function App() {
  // Use News Facade
  const { loadNews, error, loading, news } = useNews();

  // =========
  // State
  // =========

  // Component State
  const [viewFavorites, setViewFavorites] = useState(false);
  const [newsList, setNewsList] = useState<INewsCardProps[]>([]);

  // Filters state
  const [query, setQuery] = useState("angular");
  const [page, setPage] = useState(0);

  // =========
  // Effects
  // =========

  // Effect: Load news whenever page or query changes
  useEffect(() => {
    loadNews({ page, query });
  }, [loadNews, page, query]);

  // Effect: Set newsList object
  // This list is different from the news model class because
  // its object will have a prop to determine if
  // its a favorite article or not

  useEffect(() => {
    // Just in case the API returns more, slice the first 8 elements
    setNewsList(
      news
        .slice(0, 8)
        .filter((newsItem: NewsModel) => {
          // Discard data if any of the attributes aren't present
          return (
            newsItem.author &&
            newsItem.created_at &&
            newsItem.story_title &&
            newsItem.story_url
          );
        })
        .map((newsData) => {
          return { news: newsData, favorite: false };
        })
    );
  }, [news]);

  // ===========
  // Functions
  // ===========
  const onChangeQuery = (value: string) => {
    setQuery(value);
  };

  return (
    <div className="App">
      <header>
        <div className="header__content">
          <h1>{"HACKER NEWS"}</h1>
        </div>
      </header>
      <main>
        <div
          className={`main__content ${
            viewFavorites ? " main__content-favorites" : ""
          }`}
        >
          <div className="main__content-tabs">
            <div>Tabs</div>
          </div>
          {!viewFavorites && (
            <div className="main__content-dropdown">
              <Dropdown
                list={dropdownOptionList}
                selectedValue={query}
                onChange={onChangeQuery}
              />
            </div>
          )}
          <div className="main__content-list">
            {!loading ? (
              <NewsList list={newsList} />
            ) : (
              <div>TODO add loading spinner...</div>
            )}
          </div>
          <div className="main__content-pagination">
            <div>Pagination</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
