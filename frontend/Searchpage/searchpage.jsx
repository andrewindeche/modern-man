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
        <h3>Suits and Tuxedos</h3>
        </div>
        </>
    )         
}

export default Searchpage;