import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

function render(ui, options = {}) {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';

export { render };
