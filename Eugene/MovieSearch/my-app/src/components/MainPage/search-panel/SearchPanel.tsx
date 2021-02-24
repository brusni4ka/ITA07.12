import { parse } from "querystring";
import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import "./SearchPanel.css";
import { RouteComponentProps } from "react-router-dom";

interface ISearchPanelProps extends RouteComponentProps {
  handleSearch(input: string, searchBy: SearchBy): void;
}

interface ISearchPanelState {
  input: string;
  searchBy: SearchBy;
}

enum SearchBy {
  Title = "title",
  Genre = "genres",
}

function SearchPanel(props: ISearchPanelProps) {
  const [input, setInput] = useState("");
  const [searchBy, setSearchBy] = useState(SearchBy.Title);

  const location = useLocation();

  useEffect(() => {
    setParamsFromUrl();
  }, [location.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearchByBtn = (btnType: SearchBy) => {
    setInput("");
    setSearchBy(btnType);
  };

  const setParamsFromUrl = () => {
    const searchParams = props.location.search.slice(1);
    const parsed = parse(searchParams) as {
      search: string;
      searchBy: string;
    };

    setInput(parsed.search || "");
    if (parsed.searchBy === SearchBy.Genre) {
      setSearchBy(SearchBy.Genre);
    } else {
      setSearchBy(SearchBy.Title);
    }
  };

  const handleSearchSubmit = () => {
    props.handleSearch(input, searchBy);
  };

  const keyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      props.handleSearch(input, searchBy);
    }
  };

  return (
    <div className="search-panel-wrapper">
      <h2 className="search-panel-label">FIND YOUR MOVIE</h2>
      <input
        onKeyPress={keyPress}
        onChange={handleSearchChange}
        type="text"
        name=""
        value={input}
        className="search-panel-input"
      />
      <div className="search-by">
        <div className="search-by-btns">
          <p>SEARCH BY</p>
          <button
            onClick={() => handleSearchByBtn(SearchBy.Title)}
            className={
              searchBy === SearchBy.Title
                ? "search-by-btn-active"
                : "search-by-btn"
            }
          >
            TITLE
          </button>
          <button
            onClick={() => handleSearchByBtn(SearchBy.Genre)}
            className={
              searchBy === SearchBy.Genre
                ? "search-by-btn-active"
                : "search-by-btn"
            }
          >
            GENRE
          </button>
        </div>
        <div>
          <button onClick={handleSearchSubmit} className="search-btn">
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SearchPanel);
