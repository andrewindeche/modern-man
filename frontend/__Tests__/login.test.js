import React from 'react';
import Login from 'Login.jsx';
import renderer from 'react-test-renderer';


describe("login page",() =>{
  it('renders the login page', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})