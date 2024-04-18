import React from 'react';
import "./style.css";
import { Routes, Route } from 'react-router-dom';
import Homepage from "./pages/HomePage.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import Forgot from "./pages/Forgot.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Checkout from "./pages/Checkout.jsx"

const App = () => {
    return (
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/login" element={<Login />}/>
                <Route path="/registration" element={<Registration/>} />
                <Route path="/forgot" element={<Forgot/>}/>
                <Route path="/searchpage" element={<SearchPage/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
            </Routes>
        );
    };
export default App;
