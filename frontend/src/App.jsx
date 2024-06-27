import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Homepage from './pages/HomePage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import SearchPage from './pages/SearchPage';
import Checkout from './pages/Checkout';
import ErrorPage from './pages/ErrorPage';

const App = () => (
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/forgot" element={<Forgot />} />
    <Route path="/searchpage" element={<SearchPage />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);
export default App;
