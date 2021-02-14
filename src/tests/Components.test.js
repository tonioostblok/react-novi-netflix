import React from 'react';
import { mount } from 'enzyme';
import CountrySelect from '../components/CountrySelect/CountrySelect.js';
import Show from '../components/Shows/Show.js';

describe('Country select component test', () => {
  it('should put the country in the dropdown', () => {
    const countryArray = [{
      key: 67,
      text: 'Netherlands',
    }];
    const wrapper = mount(
      <CountrySelect countries={countryArray} handleChange={() => {}} />,
    );
    const option = wrapper.find('.country-value');
    // console.log(option)
    expect(option.text()).toBe('Netherlands');
  });
  it('should create a show component with the information provided inside of it', () => {
    const wrapper = mount(
      <Show
        title="Breaking bad"
        synopsis="Walter white is a science teacher who has a big turning point in his live"
        year={2014}
        img="https://picsum.photos/200/300"
      />,
    );
    const title = wrapper.find('.show-title');
    const synopsis = wrapper.find('.show-synopsis');
    const year = wrapper.find('.show-year');

    expect(title.text()).toBe('Breaking bad');
    expect(synopsis.text()).toBe('Walter white is a science teacher who has a big turning point in his live');
    expect(year.text()).toBe('Year: 2014');
  });
});
