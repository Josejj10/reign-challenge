import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown/Dropdown";
import { INewsCardProps } from "./components/NewsCard/NewsCard";
import NewsList from "./components/NewsList/NewsList";
import { useNews } from "./store";
import { NewsModel } from "./models";
import {
  dropdownOptionList,
  EDropdownOptions,
} from "./constants/dropdown.constants";
import Tabs from "./components/Tabs/Tabs";
import { ETabOptions, tabsOptionList } from "./constants/tabs.constants";
import dayjs from "dayjs";
import Button from "./components/Button/Button";

function App() {
  // Use News Facade
  const {
    getFilters,
    setFilters,
    error,
    filtersLoaded,
    news,
    page,
    query,
    getFavorites,
    toggleFavorite,
    favorites,
  } = useNews();

  // =========
  // State
  // =========

  // Component State
  const [newsList, setNewsList] = useState<INewsCardProps[]>([]);
  const [initialPage, setInitialPage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(ETabOptions.ALL);
  // Memoize view favorites to change when selected tab changes
  const viewFavorites = useMemo(
    () => selectedTab === ETabOptions.FAVORITES,
    [selectedTab]
  );

  // =========
  // Callbacks
  // =========

  const searchFavoriteById = useCallback(
    (idSearch: string) => {
      if (favorites[idSearch]) return true;
      return false;
    },
    [favorites]
  );

  const setFavoriteNews = useCallback(() => {
    const favoritesList: NewsModel[] = [];
    for (const [key, value] of Object.entries(favorites)) {
      favoritesList.push(value);
    }

    setNewsList(
      favoritesList
        .map((newsData) => {
          return { news: newsData, favorite: true };
        })
        .sort(
          (
            { news: favoriteA }: { news: NewsModel },
            { news: favoriteB }: { news: NewsModel }
          ) => {
            return dayjs(favoriteB.date).diff(favoriteA.date);
          }
        )
    );
  }, [favorites]);

  const setRegularNews = useCallback(() => {
    const filteredNews = news.filter((newsItem: NewsModel) => {
      // Discard data if any of the attributes aren't present
      return (
        newsItem.author &&
        newsItem.created_at &&
        newsItem.story_title &&
        newsItem.story_url
      );
    });

    if (filteredNews.length === 0) {
      return;
    }
    // Just in case the API returns more, slice the first 8 elements
    setNewsList(
      filteredNews.map((newsData: NewsModel) => {
        return { news: newsData, favorite: searchFavoriteById(newsData.id) };
      })
    );
  }, [news, searchFavoriteById]);

  // =========
  // Effects
  // =========

  // Effect: Get filters and favorites when component is rendered
  useEffect(() => {
    getFilters();
    getFavorites();
  }, [getFilters, getFavorites]);

  // Effect: Log if error
  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  // Effect: Load news from filters
  useEffect(() => {
    if (query && filtersLoaded) {
      setFilters({ query, page });
      setInitialPage(page);
    }
  }, [query, page]);

  // Effect: Set newsList object with favorites or regular news
  // This list is different from the news model class because
  // its object will have a prop to determine if
  // its a favorite article or not

  useEffect(() => {
    if (viewFavorites) setFavoriteNews();
    else setRegularNews();
  }, [viewFavorites, setFavoriteNews, setRegularNews]);

  // ===========
  // Functions
  // ===========

  // Set in Local Storage and then call the API
  // (see: newsSetFiltersEpic)
  const onChangeQuery = (value: EDropdownOptions) => {
    // Page 0 when changing query to load latest news
    setFilters({ page: 0, query: value });
  };

  const onChangeTab = (value: ETabOptions) => {
    setSelectedTab(value);
  };

  const toggleFavoriteNews = (value: NewsModel) => {
    toggleFavorite(value);
  };

  const restartPage = () => {
    setFilters({ page: 0, query });
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
            <Tabs
              list={tabsOptionList}
              selectedValue={selectedTab}
              onChange={onChangeTab}
            />
          </div>
          <div className="main__content-dropdown">
            {!viewFavorites && (
              <>
                <Dropdown
                  list={dropdownOptionList}
                  selectedValue={query}
                  onChange={onChangeQuery}
                />
                <div className="pagination">
                  <div className="pagination-information">
                    <p>
                      Current page loaded: <strong>{page + 1}</strong>
                    </p>
                    <p>
                      Initial page loaded from Local Storage:{" "}
                      <strong>{initialPage + 1}</strong>
                    </p>
                  </div>
                  {page > 0 && (
                    <Button
                      text="Load again from first page"
                      onClick={restartPage}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          <div className="main__content-list">
            <NewsList
              list={newsList}
              toggleFavorite={toggleFavoriteNews}
              viewFavorites={viewFavorites}
              restartPage={restartPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
