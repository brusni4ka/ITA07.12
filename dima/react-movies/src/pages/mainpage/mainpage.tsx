import React from "react";
import ContentContainer from "../../components/contentContainer";
import Header from "../../components/header";
import SearchBar from "../../components/searchBar";
import MoviesContainer from "../../components/moviesContainer";
import ErrorBoundary from "../../components/errorBoundary";
import MoviesResult from "../../components/moviesResult";
import SortFilter from "../../components/sortFilter";
import Footer from "../../components/footer";
import QueryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
import SortProperty from "../../enums/SortProperty";
import FilterProperty from "../../enums/FilterPropery";
import ParamsToPush from "../../interfaces/paramsToPush";
import { MainConnectProps } from ".";
import "./mainpage.css";

type MainPageProps = MainConnectProps &
  RouteComponentProps<{ searchBy: FilterProperty }>;

interface MainPageState {
  currentSortType: SortProperty;
}
class MainPage extends React.Component<
  MainPageProps & RouteComponentProps<{ searchBy: string }>,
  MainPageState
> {
  state: MainPageState = {
    currentSortType: SortProperty.date,
  };
  componentDidMount() {
    const params = QueryString.parse(this.props.history.location.search);
    let pageNum = params.page ? Number(params.page.toString()) - 1 : 0;
    this.fetchMovies(pageNum);
  }

  componentDidUpdate(
    prevProps: MainPageProps & RouteComponentProps & MainConnectProps
  ) {
    if (prevProps.location.search !== this.props.location.search) {
      const params = QueryString.parse(this.props.history.location.search);
      let pageNum = params.page ? Number(params.page.toString()) - 1 : 0;
      this.fetchMovies(pageNum);
    }
  }
  componentWillUnmount(): void {
    this.props.resetMovies();
  }

  setCurrentSortType = (currentSortType: SortProperty): void => {
    this.setState({ currentSortType });
  };
  pushParams = (urlParams: ParamsToPush): void => {
    const { history } = this.props;
    history.push({
      pathname: "/search",
      search: QueryString.stringify({ ...urlParams, page: 1 }),
    });
  };

  compareSortFromUrlToState = (sortBy: string | string[] | null) =>
    sortBy !== this.state.currentSortType;

  fetchMovies = (pageNum: number): void => {
    let defaultParams = {
      limit: 9,
      sortBy: "release_date",
      sortOrder: "desc",
      offset: 0,
    };
    const { location } = this.props;
    const { currentSortType } = this.state;
    const oldParamsObj = QueryString.parse(location.search);
    const { sortBy } = oldParamsObj;
    if (sortBy && this.compareSortFromUrlToState(sortBy))
      this.setCurrentSortType(
        sortBy === SortProperty.date ? SortProperty.date : SortProperty.rating
      );

    this.props.fetchMovies({
      ...defaultParams,
      ...oldParamsObj,
      sortBy: oldParamsObj.sortBy ? oldParamsObj.sortBy : currentSortType,
      offset: pageNum * 9,
    });
  };

  switchCurrentSortType = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const { currentSortType } = this.state;
    const { location, history } = this.props;
    const oldParam = QueryString.parse(location.search);
    const { value } = e.currentTarget;
    if (
      !oldParam.sortBy ||
      (oldParam.sortBy !== value && currentSortType !== value)
    ) {
      const newParamString = QueryString.stringify({
        ...oldParam,
        sortBy: value,
      });
      history.push({
        pathname: location.pathname,
        search: newParamString,
      });
      this.setCurrentSortType(
        value === SortProperty.date ? SortProperty.date : SortProperty.rating
      );
    }
  };
  getPage = (): number => {
    const { history } = this.props;
    const params = QueryString.parse(history.location.search);
    const numPage =
      params.page && Number(params.page.toString()) - 1 >= 0
        ? Number(params.page.toString()) - 1
        : 0;
    return numPage;
  };
  onPageChanged = (selected: number): void => {
    const { history } = this.props;
    const params = QueryString.parse(history.location.search);
    history.push({
      pathname: history.location.pathname,
      search: QueryString.stringify({ ...params, page: selected + 1 }),
    });
  };

  render() {
    const { movies, loading } = this.props;
    const { currentSortType } = this.state;
    const { data, total } = movies;

    return (
      <div className="app">
        <div className="first-screen-wrapper">
          <ContentContainer>
            <Header />
            <ErrorBoundary>
              <SearchBar
                location={this.props.location}
                pushParamsOnSubmit={this.pushParams}
              />
            </ErrorBoundary>
          </ContentContainer>
        </div>
        <div className="second-screen-wrapper">
          <ContentContainer>
            <div className="flex-wrapper">
              {data?.length !== 0 && (
                <>
                  <ErrorBoundary>
                    <MoviesResult total={movies.total} loading={loading} />
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <SortFilter
                      currentSortType={currentSortType}
                      switchCurrentSortType={this.switchCurrentSortType}
                    />
                  </ErrorBoundary>
                </>
              )}
            </div>
          </ContentContainer>
        </div>
        <div className="third-screen-wrapper">
          <ContentContainer>
            <ErrorBoundary>
              <MoviesContainer
                movies={data}
                total={total}
                page={this.getPage()}
                loading={loading}
                onPageChanged={this.onPageChanged}
              />
            </ErrorBoundary>
          </ContentContainer>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MainPage;
