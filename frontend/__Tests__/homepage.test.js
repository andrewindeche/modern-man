import React from 'react';
import HomePage from 'Homepage.jsx';
import renderer from 'react-test-renderer';


describe("home page",() =>{
  it('renders the landing page', () => {
    const tree = renderer.create(<HomePage />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})