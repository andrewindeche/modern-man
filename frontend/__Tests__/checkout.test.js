import React from 'react';
import Checkout from 'pages/Checkout.jsx'; 
import renderer from 'react-test-renderer';

describe("checkout page",() =>{
  it('renders the checkout page', () => {
    const tree = renderer.create(<Checkout />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})