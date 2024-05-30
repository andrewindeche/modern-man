import React from 'react';
import Error from '../images/Error.webp';

const ErrorPage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px', fontWeight: 'bolder' }}>
    <img src={Error} alt="Error" className="Error" />
    <h1>404</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <a href="/">Go back to Home</a>
  </div>
);

export default ErrorPage;
