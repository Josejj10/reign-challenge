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

function App() {
  // Use News Facade
  const {
    loadNews,
    getFilters,
    setFilters,
    error,
    loading,
    loadingFilters,
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
        .map((newsData: NewsModel) => {
          return { news: newsData, favorite: searchFavoriteById(newsData.id) };
        })
    );
  }, [news, searchFavoriteById]);

  // =========
  // Effects
  // =========

  // Effect: Log if error
  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  // Effect: Get filters and favorites when component is rendered
  useEffect(() => {
    getFilters();
    getFavorites();
  }, [getFilters, getFavorites]);

  // Effect: Set filters whenever page or query changes
  // so this effect will go after getFilters finishes and
  // retrieves them from Local Storage
  useEffect(() => {
    if (query) setFilters({ page, query });
  }, [page, query]);

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
    if (query) setFilters({ page, query: value });
  };

  const onChangeTab = (value: ETabOptions) => {
    setSelectedTab(value);
  };

  const toggleFavoriteNews = (value: NewsModel) => {
    toggleFavorite(value);
  };

  return (
    <div className="App">
      <header>
        <div className="header__content">
          <h1>{"HACKER NEWS"}</h1>
        </div>
      </header>
      <main>
        {loadingFilters ? (
          <div>Loading filters...</div>
        ) : (
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
                <Dropdown
                  list={dropdownOptionList}
                  selectedValue={query}
                  onChange={onChangeQuery}
                />
              )}
            </div>
            <div className="main__content-list">
              {!loading ? (
                <NewsList list={newsList} toggleFavorite={toggleFavoriteNews} />
              ) : (
                <div>TODO add loading spinner...</div>
              )}
            </div>
            <div className="main__content-pagination">
              <div>Pagination</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
