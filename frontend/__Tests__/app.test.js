import React from 'react';
import App from 'App.jsx';
import renderer from 'react-test-renderer';


describe("landing page",() =>{
  it('renders the landing page', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})