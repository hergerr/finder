import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});


it('passes all users to the UsersList', () => {
  const app = shallow(<App />);
  console.log(app.find('LangingPage').prop('title'));
  expect(app.find('LandingPage').prop('title')).toEqual('Find your room in Wrocław');
})
