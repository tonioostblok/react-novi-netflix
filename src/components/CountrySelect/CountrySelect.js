import React from 'react';
import PropTypes from 'prop-types';

class CountrySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { selectedCountry, countries, handleChange } = this.props;
    return (
      <select
        onChange={(e) => handleChange(e)}
        name="country"
        className="form-input"
        value={(selectedCountry !== '') ? selectedCountry : 'disabled'}
      >
        <option disabled value="disabled">Select a country</option>
        {
            countries.map((val) => (
              <option className="country-value" key={val.key} value={val.key}>{val.text}</option>
            ))
        }
      </select>
    );
  }
}

CountrySelect.propTypes = {
  countries: PropTypes.instanceOf(Array).isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedCountry: PropTypes.string,
};

CountrySelect.defaultProps = {
  selectedCountry: '',
};

export default CountrySelect;
