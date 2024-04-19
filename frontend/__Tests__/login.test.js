import React from 'react';
import Login from 'pages/Login.jsx';
import renderer from 'react-test-renderer';


describe("login page",() =>{
  it('renders the login page', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})