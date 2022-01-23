import { useEffect, useState } from "react";
import "./App.css";
import NewsList from "./components/NewsList/NewsList";
import { NewsModel } from "./models";
import { useNews } from "./store";

function App() {
  // Use News Facade
  const { loadNews, error, loading, news } = useNews();

  // =========
  // State
  // =========

  // Component State
  const [viewFavorites, setViewFavorites] = useState(false);
  const [newsList, setNewsList] = useState<NewsModel[]>([]);

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
    setNewsList(news.slice(0, 8));
  }, [news]);

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
              <div>Dropdown</div>
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
