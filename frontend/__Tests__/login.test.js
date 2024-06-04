import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from 'pages/Login.jsx';
describe('Forgot component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <Router>
        <Login />
      </Router>
    );
    expect(getByText(/Log into your Account?/i)).toBeInTheDocument();
  });
});
