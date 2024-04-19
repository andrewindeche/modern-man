import React from 'react';
import SearchPage from 'pages/SearchPage.jsx';
import renderer from 'react-test-renderer';
describe("search page",() =>{
  it('renders the landing page', () => {
    const tree = renderer.create(<SearchPage />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
