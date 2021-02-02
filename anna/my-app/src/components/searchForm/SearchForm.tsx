import React from 'react';
import './searchForm.css';
import Button from '../../components/button';

interface ISearchFormProps {
  onSubmit(arg0: ISearchFormState): void;
}

export interface ISearchFormState {
  search: string;
  searchBy: string
}

enum SearchType {
  Title = "title",
  Ganre = "genres"
}

class SearchForm extends React.Component<ISearchFormProps, ISearchFormState> {
  state: ISearchFormState = {
    search: '',
    searchBy: SearchType.Title
  };

  changeValue = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ search: e.target.value });

  handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ 
      search: "",
      searchBy: e.target.value,
     });
  }

  handleSubmit = () => {
    this.props.onSubmit({
      search: this.state.search,
      searchBy: this.state.searchBy
    });
  }
  // search=drama&searchBy=genres

  render() {
    const { search } = this.state;

    return (
      <form className="search-form container">
        <input
          className="search-form-input"
          type="text"
          value={search}
          onChange={this.changeValue}
        />

        <div className="searchby-wrapper">
          <span>Search by</span>
          <input
            id="input-title"
            type="radio"
            name="react-tips"
            value={SearchType.Title}
            checked={this.state.searchBy === SearchType.Title}
            onChange={this.handleOptionChange}
            className="form-check-input"
          />
          <label htmlFor="input-title"></label>

          <input
            id="input-ganre"
            type="radio"
            name="react-tips"
            value={SearchType.Ganre}
            checked={this.state.searchBy === SearchType.Ganre}
            onChange={this.handleOptionChange}
            className="form-check-input"
          />
          <label htmlFor="input-ganre"></label>
          <Button onClick={this.handleSubmit} className="btn-primary search-form-btn">Search</Button>
        </div>


      </form>
    );
  };
}

export default SearchForm;

