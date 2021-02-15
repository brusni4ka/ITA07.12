import React from 'react';


interface ISortProps {
    sortBy: string;
    setSortByDate(): void;
    setSortByRating(): void;  
}



const SortBlock = (props: ISortProps) => {
    console.log(props);
    const {sortBy, setSortByDate, setSortByRating} = props; 
    return (
        <div className ="sortBlock">
            <p className = "sortBlockCaption">Sort by</p>
            <button type = "button" className = {
                                       sortBy === "release_date" ? "sortBlockButtonActive" : "sortBlockButtonNotActive"}                                                  
                                    onClick = {setSortByDate}>release date</button>
                                    
            <button type="button" className = {
                                       sortBy === "rating" ? "sortBlockButtonActive" : "sortBlockButtonNotActive"}                                                  
                                    onClick = {setSortByRating}>rating</button>
        </div>
    );
    
};



export default SortBlock;