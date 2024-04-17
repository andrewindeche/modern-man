import React from 'react';
import "../style.css";
import NotificationBar from '../src/components/NotificationBar';
import SearchBar from '../src/components/SearchBar';
import NavButtons from '../src/components/NavButtons';
import Cover from '../src/components/Cover';
const homepage = () => {
    return(
        <>
        <NotificationBar />
        <SearchBar />
        <NavButtons />
        <Cover />
        </>
     )
    }
export default homepage;
