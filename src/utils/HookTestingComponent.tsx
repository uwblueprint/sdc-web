import React from 'react';
import { shallow } from 'enzyme';

export const HookTestingComponent = (hook) => {
  function HookWrapper() {
    const output = hook();
    return <span output={output} />;
  }

  const wrapper = shallow(<HookWrapper />);

  return wrapper.find('span').props().output;
};
