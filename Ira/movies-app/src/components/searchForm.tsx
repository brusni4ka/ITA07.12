import React from 'react';



interface ISearchFormProps {
    searchInputValue: string;
    searchBy: string;
    changeSearchInputValue(e: React.ChangeEvent<HTMLInputElement>): void;
    setSearchByTitle(): void;
    setSearchByGenre(): void;
}

const SearchForm = (props: ISearchFormProps) => {
    const {searchInputValue, searchBy, changeSearchInputValue, setSearchByTitle, setSearchByGenre} = props;
    return (
        <div>
            <form className="searchForm" name="searchForm" method="post" action="handler.php"> 
                <p className="searchFormCaption">find your movie</p>                      
                <input className="searchFormInput" type="text" id="searchInput" name="findedMovie"
                           placeholder="comedy" value = {searchInputValue} onChange = {changeSearchInputValue}/>
                <div className="searchFormControls">
                    <div className="filterBlock">
                        <p className="filterBlockCaption">search by</p>
                        <button type="button" className="filterBlockButton" onClick = {setSearchByTitle}>title</button>
                        <button type="button" className="filterBlockButton" onClick = {setSearchByGenre}>genre</button>
                    </div>
                    <button type="submit" className="searchButton">search</button>     
                </div>                   
            </form>
        </div>
    );


}


export default SearchForm;