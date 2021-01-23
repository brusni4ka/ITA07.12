import React from 'react';
import './searchForm.css';
import Button from '../../components/button';

interface ISearchFormProps {
  onSubmit({ }: ISearchFormState): void;
}

export interface ISearchFormState {
  value: string;
  searchBy: string
}

class SearchForm extends React.Component<ISearchFormProps, ISearchFormState> {
  state: ISearchFormState = {
    value: '',
    searchBy: 'title'
  };

  changeValue = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ value: e.target.value });
  handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ searchBy: e.target.value });

  handleSubmit = () => this.props.onSubmit({
    value: this.state.value,
    searchBy: this.state.searchBy
  });

  render() {
    const { value } = this.state;

    return (
      <form className="search-form container">
        <input
        className="search-form-input"
          type="text"
          value={value}
          onChange={this.changeValue}
        />

        <div className="searchby-wrapper">
          <span>Search by</span>
          <input
            id="input-title"
            type="radio"
            name="react-tips"
            value="title"
            checked={this.state.searchBy === "title"}
            onChange={this.handleOptionChange}
            className="form-check-input"
          />
          <label htmlFor="input-title"></label>

          <input
            id="input-ganre"
            type="radio"
            name="react-tips"
            value="ganre"
            checked={this.state.searchBy === "ganre"}
            onChange={this.handleOptionChange}
            className="form-check-input"
          />
          <label htmlFor="input-ganre"></label>
          <Button onClick={this.handleSubmit} className="btn-primary search-form-btn" active={false}>Search</Button>
        </div>

        
      </form>
    );
  };
}

export default SearchForm;

