import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Registration from 'pages/Registration';
import { render, screen } from './test-utils';
import store from './store/store';

describe('registration page', () => {
  it('renders the registration page', () => {
    const { getByText } = render(
      <Router>
        <Registration />
      </Router>
    );

    expect(getByText(/Registration: Create User Account/i)).toBeInTheDocument();
  })
});
