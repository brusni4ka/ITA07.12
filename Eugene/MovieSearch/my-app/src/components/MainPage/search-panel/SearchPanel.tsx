import { parse, stringify } from "querystring";
import React from "react";
import { withRouter } from "react-router";
import "./SearchPanel.css";
import { RouteComponentProps } from "react-router-dom";

interface ISearchPanelProps extends RouteComponentProps {
  handleSearch(input: string, searchBy: string): void;
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
    console.log(this.props.history);
    
    const searchParams = this.props.location.search.slice(1);
    const parsed = parse(searchParams) as {
      search: string;
      searchBy: string;
    };

    this.setState({ input: parsed.search || "" });

    if (parsed.searchBy && parsed.searchBy === SearchBy.Genre) {
      this.setState({ searchBy: SearchBy.Genre });
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
    this.setState({ input: "" });
  };

  keyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      this.props.handleSearch(this.state.input, this.state.searchBy);
      this.setState({ input: "" });
    }
  };
  render() {
    return (
      <div className="search-panel-wrapper">
        <h2 className="search-panel-label">FIND YOUR MOVIE</h2>
        <input
          onKeyPress={this.keyPress}
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

export default withRouter(SearchPanel);
