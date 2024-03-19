import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from '../App/App.jsx';

const appNode = createRoot(document.getElementById('ModernMan'));

appNode.render(<App />);
