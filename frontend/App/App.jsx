import React from 'react';
import "../style.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "../Homepage/HomePage.jsx";
import Registration from "../Registration/Registration.jsx";
import Login from "../Login/Login.jsx";
import Forgot from "../Forgot/Forgot.jsx";
import SearchPage from "../Searchpage/SearchPage.jsx";
import Checkout from "../Checkout/Checkout.jsx"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/searchpage" element={<SearchPage />} />
                <Route path="/checkout" element={<Checkout />} />
        </Routes>
    </Router>
        );
    };
export default App;
