import { useState } from "react";
import "./App.css";
import NewsList from "./components/NewsList/NewsList";

function App() {
  const [viewFavorites, setViewFavorites] = useState(false);
  const [newsList, setNewsList] = useState(Array(8).fill(""));

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
            <NewsList list={newsList} />
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
