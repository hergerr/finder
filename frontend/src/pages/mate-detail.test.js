import React from 'react';
import { shallow } from 'enzyme';
import { MateDetailPage } from './mate-detail.page';

it('checks if it passes props correctly', () => {
  const component = shallow(<MateDetailPage />);
  component.setState({
    data:
    {
      id: 9, title: "Peaceful IT student", age: 21,
      location: "Grunwald", field_of_study: "Computer Science",
      features: "peaceful;quiet;gaming;cycling",
      customs: "no smoking;no partying;wakes up at 11-12;goes to bed 23-24",
      phone: "123123123", owner: 5
    }
  });
  expect(component.find('ContactBox').prop('phone')).toEqual('123123123');
})