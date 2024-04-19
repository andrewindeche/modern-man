import React from 'react';
import NotificationBar from '../components/NotificationBar';
import SearchBar from '../components/SearchBar'; 
import NavButtons from '../components/NavButtons';
import Cover from '../components/Cover';
const HomePage = () => {
    return(
        <>
        <NotificationBar />
        <SearchBar />
        <NavButtons />
        <Cover />
        </>
     )
    }
export default HomePage;
