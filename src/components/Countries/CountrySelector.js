import React from 'react';
import PropTypes from 'prop-types';
import {Button, Dropdown, Form} from 'semantic-ui-react'

import '../../css/components.css';
import {updateUserCountry} from "../../store/authentication";
// eslint-disable-next-line react/prefer-stateless-function
class CountrySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCountry:false,
        }
    }

    handleChange = (event, {value}) => {
        this.setState({
            selectedCountry:value
        })
    }

    handleClick = (event) => {
        if(this.state.selectedCountry){
            this.props.updateUserCountry(this.state.selectedCountry)
        }


    }
    render() {
        return (
            <div>
                <p>Please select the country you live in</p>
                <Dropdown
                    placeholder='Select Country'
                    fluid
                    search
                    selection
                    options={this.props.countries}
                    onChange={this.handleChange}
                />
                <Button
                    type="submit"
                    onClick={this.handleClick}
                    className={"default-button"}>
                    Save country
                </Button>
            </div>
        );
    }
}

CountrySelector.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
    countries: PropTypes.array,
    updateUserCountry: PropTypes.func
};

export default CountrySelector;
