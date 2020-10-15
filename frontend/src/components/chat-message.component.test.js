import React from 'react';
import { shallow } from 'enzyme';
import { ChatMessage } from './chat-message.component';

it('renders without crashing', () => {
    shallow(<ChatMessage/>);
});

it('renders message content', () => {
    const component = shallow(<ChatMessage content="example" />);
    expect(component.text()).toContain('example');
});

it('has paragraph with text', () => {
    const component = shallow(<ChatMessage content="example" />);
    expect(component.containsMatchingElement(<p>example</p>)).toEqual(true);
});
