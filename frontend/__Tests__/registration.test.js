import React from 'react';
import Registration from 'Registration.jsx';
import renderer from 'react-test-renderer';


describe("registration page",() =>{
  it('renders the registration page', () => {
    const tree = renderer.create(<Registration />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})