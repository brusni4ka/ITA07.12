import { parse } from "querystring";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
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

  useEffect(() => {
    checkParams();
  }, [props.history.location]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearchByBtn = (btnType: SearchBy) => {
    setInput("");
    setSearchBy(btnType);
  };

  const checkParams = () => {
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

// class SearchPanel extends React.Component<
//   ISearchPanelProps,
//   ISearchPanelState
// > {
//   state: ISearchPanelState = {
//     input: "",
//     searchBy: SearchBy.Title,
//   };

//   componentDidMount() {
//     this.checkParams();
//   }

//   componentDidUpdate(prevprops: RouteComponentProps) {
//     if (this.props.location.search !== prevprops.location.search) {
//       this.checkParams();
//     }
//   }

//   handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       input: e.target.value,
//     });
//   };

//   handleSearchByBtn = (btnType: SearchBy) => {
//     this.setState({
//       input: "",
//       searchBy: btnType,
//     });
//   };

//   checkParams = () => {
//     const searchParams = this.props.location.search.slice(1);
//     const parsed = parse(searchParams) as {
//       search: string;
//       searchBy: string;
//     };

//     this.setState({ input: parsed.search || "" });

//     if (parsed.searchBy === SearchBy.Genre) {
//       this.setState({ searchBy: SearchBy.Genre });
//     } else {
//       this.setState({ searchBy: SearchBy.Title });
//     }
//   }

//   handleSearchSubmit = () => {
//     this.props.handleSearch(this.state.input, this.state.searchBy);
//   };

//   keyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       this.props.handleSearch(this.state.input, this.state.searchBy);
//     }
//   };

//   render() {
//     return (
//       <div className="search-panel-wrapper">
//         <h2 className="search-panel-label">FIND YOUR MOVIE</h2>
//         <input
//           onKeyPress={this.keyPress}
//           onChange={this.handleSearchChange}
//           type="text"
//           name=""
//           value={this.state.input}
//           className="search-panel-input"
//         />
//         <div className="search-by">
//           <div className="search-by-btns">
//             <p>SEARCH BY</p>
//             <button
//               onClick={() => this.handleSearchByBtn(SearchBy.Title)}
//               className={
//                 this.state.searchBy === SearchBy.Title
//                   ? "search-by-btn-active"
//                   : "search-by-btn"
//               }
//             >
//               TITLE
//             </button>
//             <button
//               onClick={() => this.handleSearchByBtn(SearchBy.Genre)}
//               className={
//                 this.state.searchBy === SearchBy.Genre
//                   ? "search-by-btn-active"
//                   : "search-by-btn"
//               }
//             >
//               GENRE
//             </button>
//           </div>
//           <div>
//             <button onClick={this.handleSearchSubmit} className="search-btn">
//               SEARCH
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default withRouter(SearchPanel);
