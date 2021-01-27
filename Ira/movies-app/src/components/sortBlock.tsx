import React from 'react';


const SortBlock = () => {    
    return (
        <div className="sortBlock">
            <p className="sortBlockCaption">Sort by</p>
            <button type="button" className="sortBlockButton">release date</button>
            <button type="button" className="sortBlockButton">rating</button>
        </div>
    );
    
};



export default SortBlock;