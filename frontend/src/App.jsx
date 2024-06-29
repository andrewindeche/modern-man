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
import FavoritedPage from './pages/FavoritedPage';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/searchpage" element={<SearchPage />} />
      <Route
        path="/checkout"
        element={<ProtectedRoute><Checkout /></ProtectedRoute>}
      />
      <Route
        path="/favorite"
        element={<ProtectedRoute><FavoritedPage /></ProtectedRoute>}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </AuthProvider>
);
export default App;
