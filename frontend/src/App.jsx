import React from 'react';
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/HomePage.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import Forgot from "./pages/Forgot.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Checkout from "./pages/Checkout.jsx"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/login" component={<Login />}/>
                <Route path="/registration" component={<Registration/>} />
                <Route path="/forgot" component={<Forgot/>}/>
                <Route path="/searchpage" component={<SearchPage/>}/>
                <Route path="/checkout" component={<Checkout/>}/>
        </Routes>
    </Router>
        );
    };
export default App;
