import React from 'react';
import Forgot from 'pages/Forgot.jsx';
import renderer from 'react-test-renderer';

describe("forgot page",() =>{
  it('renders the forgot page', () => {
    const tree = renderer.create(<Forgot />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
