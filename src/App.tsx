import { useEffect, useMemo, useState } from "react";
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
  // Effects
  // =========

  // Effect: Log if error
  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  // Effect: Get filters when component is rendered
  useEffect(() => {
    getFilters();
  }, [getFilters]);

  // Effect: Set filters whenever page or query changes
  // so this effect will go after getFilters finishes and
  // retrieves them from Local Storage
  useEffect(() => {
    if (query) setFilters({ page, query });
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

  // Set in Local Storage and then call the API
  // (see: newsSetFiltersEpic)
  const onChangeQuery = (value: EDropdownOptions) => {
    if (query) setFilters({ page, query: value });
  };

  const onChangeTab = (value: ETabOptions) => {
    setSelectedTab(value);
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
                <NewsList list={newsList} />
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
