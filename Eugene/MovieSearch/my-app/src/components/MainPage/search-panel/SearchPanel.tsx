import { parse, stringify } from "querystring";
import React from "react";
import "./SearchPanel.css";
import { Location } from "history";

interface ISearchPanelProps {
  handleSearch(input: string, searchBy: string): void;
  location: Location;
}

interface ISearchPanelState {
  input: string;
  searchBy: SearchBy;
}

enum SearchBy {
  Title = "title",
  Genre = "genres",
}

class SearchPanel extends React.Component<
  ISearchPanelProps,
  ISearchPanelState
> {
  state: ISearchPanelState = {
    input: "",
    searchBy: SearchBy.Title,
  };

  componentDidMount() {
    const searchParams = this.props.location.search.slice(1);
    const parsed = parse(searchParams) as {
      search: string;
      searchBy: string;
    };

    if (parsed.search) {
      this.setState({ input: parsed.search });
    } else {
      this.setState({ input: "" });
    }

    if (parsed.searchBy) {
      if (parsed.searchBy == "title") {
        this.setState({ searchBy: SearchBy.Title });
      } else {
        this.setState({ searchBy: SearchBy.Genre });
      }
    } else {
      this.setState({ searchBy: SearchBy.Title });
    }
  }

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleSearchByBtn = (btnType: SearchBy) => {
    this.setState({
      input: "",
      searchBy: btnType,
    });
  };

  handleSearchBtn = () => {
    this.props.handleSearch(this.state.input, this.state.searchBy);
  };

  render() {
    return (
      <div className="search-panel-wrapper">
        <h2 className="search-panel-label">FIND YOUR MOVIE</h2>
        <input
          onChange={this.handleSearchChange}
          type="text"
          name=""
          value={this.state.input}
          className="search-panel-input"
        />
        <div className="search-by">
          <div className="search-by-btns">
            <p>SEARCH BY</p>
            <button
              onClick={() => this.handleSearchByBtn(SearchBy.Title)}
              className={
                this.state.searchBy === SearchBy.Title
                  ? "search-by-btn-active"
                  : "search-by-btn"
              }
            >
              TITLE
            </button>
            <button
              onClick={() => this.handleSearchByBtn(SearchBy.Genre)}
              className={
                this.state.searchBy === SearchBy.Genre
                  ? "search-by-btn-active"
                  : "search-by-btn"
              }
            >
              GENRE
            </button>
          </div>
          <div>
            <button onClick={this.handleSearchBtn} className="search-btn">
              SEARCH
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPanel;
