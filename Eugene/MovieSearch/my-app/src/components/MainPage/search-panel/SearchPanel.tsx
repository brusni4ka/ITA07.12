import React from "react";
import "./SearchPanel.css";
import IMovie from "../../../interface/IMovie/IMovie";

interface ISearchPanelProps {
  updateData(value: IMovie[]):void;
}

interface ISearchPanelState {
  input: string;
  searchBy: string;
}

class SearchPanel extends React.Component<ISearchPanelProps, ISearchPanelState> {
  state: ISearchPanelState = {
    input: "",
    searchBy: "title",
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleSearchByBtn = (btnType: string) => {
    this.setState({
      input: "",
      searchBy: btnType,
    });
  };

  handleSearchBtn = () => {
    fetch(
      `https://reactjs-cdp.herokuapp.com/movies?search=${this.state.input}&searchBy=${this.state.searchBy}`
    )
      .then((response) => response.json())
      .then((receivedData) => {
        this.props.updateData(receivedData.data)
      });
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
              onClick={() => this.handleSearchByBtn("title")}
              className={
                this.state.searchBy === "title"
                  ? "search-by-btn-active"
                  : "search-by-btn"
              }
            >
              TITLE
            </button>
            <button
              onClick={() => this.handleSearchByBtn("genres")}
              className={
                this.state.searchBy === "genres"
                  ? "search-by-btn-active"
                  : "search-by-btn"
              }
            >
              GENRE
            </button>
          </div>
          <div>
            <button
              onClick={() => this.handleSearchBtn()}
              className="search-btn"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPanel;
