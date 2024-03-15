import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '../App/App.jsx';

const appNode = createRoot(document.getElementById('modernman'));

appNode.render(<App />);
