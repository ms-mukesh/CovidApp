import React from 'react';

import Test1 from '../components/test1';

import renderer from 'react-test-renderer'

test('render Correctily',()=>{
    const tree=renderer.create(<Test1/>).toJSON();
    expect(tree).toMatchSnapshot();

})
