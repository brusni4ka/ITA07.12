import React, {Component} from 'react';
import {RouteComponentProps} from "react-router-dom";
const queryString = require('query-string');


 
interface ISearchFormState {  
    searchValue: string;
    searchBy: string;    
}


class SearchForm extends React.Component<RouteComponentProps, ISearchFormState> {
    state = {        
        searchValue: "",
        searchBy: "title"        
    }
   

    changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchValue: e.target.value });
    }
      
    setSearchByTitle = () => {
        this.setState({ searchBy: "title", searchValue: "" });
    }
      
    setSearchByGenre = () => {
        this.setState({ searchBy: "genre", searchValue: "" });
    }
      
    submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();        
        this.props.history.push(`/search?searchBy=${this.state.searchBy}&searchValue=${this.state.searchValue}`);
    }
    
    componentDidMount() {    
        const { searchBy, searchValue } = queryString.parse(this.props.location.search);
        this.setState({ searchBy: searchBy || "title", searchValue:  searchValue || ""});
    }

    componentDidUpdate(prevProps: RouteComponentProps) {
        if (this.props.location.search !== prevProps.location.search) {
           const {searchBy, searchValue} = queryString.parse(this.props.location.search);
           this.setState({ searchBy: searchBy || "title", searchValue:  searchValue || ""});
        }
    }   

    render() {
        const { searchValue, searchBy } = this.state;
        return (
            <div>
                <form className ="searchForm" name = "searchForm" method = "get"  onSubmit = {this.submitSearch}> 
                    <p className = "searchFormCaption">find your movie</p>                      
                    <input className = "searchFormInput" type = "text" id = "searchInput" name = "searchValue"
                       value = {searchValue} onChange = {this.changeSearchValue}/>
                    <div className = "searchFormControls">
                        <div className = "filterBlock">
                            <p className = "filterBlockCaption">search by</p>
                            <button type = "button" className = {
                                                  searchBy === "title"? "filterBlockButtonActive" : "filterBlockButtonNotActive"}                                                  
                                              onClick = {this.setSearchByTitle}>title</button>
                            <button type = "button" className = {
                                                  searchBy === "genre"? "filterBlockButtonActive" : "filterBlockButtonNotActive"}
                                              onClick = {this.setSearchByGenre}>genre</button>
                        </div>
                        <button type="submit" className = "searchButton">search</button>     
                    </div>                   
                </form>
            </div>
        );
    }

}


export default SearchForm;