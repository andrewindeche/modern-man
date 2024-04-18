import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const appNode = createRoot(document.getElementById('ModernMan'));

appNode.render(<BrowserRouter><App /></BrowserRouter>);
