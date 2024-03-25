import React from "react";
import NotificationBar from '../src/components/NotificationBar';
import SearchBar from '../src/components/SearchBar';
import NavButtons from '../src/components/NavButtons';

const Searchpage = () => {
    return (
        <>
        <NotificationBar />
        <NavButtons />
        <SearchBar />
        <div className="searchresults">
        <h4>Suits and Tuxedos</h4>
        </div>
        </>
    )         
}

export default Searchpage;