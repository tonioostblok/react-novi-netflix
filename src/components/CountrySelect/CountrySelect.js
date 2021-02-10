import React from 'react';
import PropTypes from 'prop-types';

class CountrySelect extends React.Component {

    render() {
        return (
            <select
                onChange={(e) => this.props.handleChange(e)}
                name={"country"}
                className={"form-input"}
            >
                <option disabled selected={!this.props.selectedCountry}>Select a country</option>
                {
                    this.props.countries.map((val) => {
                        return(
                            <option key={val.key} selected={String(val.key) === this.props.selectedCountry} value={val.key}>{val.text}</option>
                        )
                    })
                }
            </select>
        );
    }
}

CountrySelect.propTypes = {
    countries: PropTypes.array,
    handleChange: PropTypes.func,
};

export default CountrySelect;
