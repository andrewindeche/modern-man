import React from 'react';
import "../style.css";

const Homepage = () => import('../Homepage/HomePage');
const App = () => <div><Homepage /></div>;
export default App;
