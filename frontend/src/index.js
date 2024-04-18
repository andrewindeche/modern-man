import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const appNode = createRoot(document.getElementById('ModernMan'));

appNode.render(<App />);
