import React from 'react';
import "../style.css";
import NotificationBar from '../src/components/NotificationBar';
import SearchBar from '../src/components/SearchBar';
import NavButtons from '../src/components/NavButtons';

const homepage = () => <div>
                    <NotificationBar />
                    <SearchBar />
                    <NavButtons />
                     </div>;

export default homepage;