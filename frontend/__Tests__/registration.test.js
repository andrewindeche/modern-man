import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom matchers
import Registration from 'pages/Registration';

describe("registration page", () => {
  it('renders the registration page', () => {
    const { getByText } = render(
      <Router>
        <Registration />
      </Router>
    );

    expect(getByText(/Log into your Account?/i)).toBeInTheDocument();
  })
});
