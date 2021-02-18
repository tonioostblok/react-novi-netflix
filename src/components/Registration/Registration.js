import React from 'react';
import PropTypes from 'prop-types';
import CountrySelect from '../CountrySelect/CountrySelect';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      country: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCountries } = this.props;
    fetchCountries();
  }

  getPasswordErrors() {
    const errors = [];
    const { password, passwordConfirm } = this.state;

    // eslint-disable-next-line no-useless-escape
    const specialCharactersFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (password.length > 0) {
      if (password !== passwordConfirm) {
        errors.push('The password does not match the one in the second password field.');
      }
      if (password.length < 8) {
        errors.push('The password needs to have at least 8 characters.');
      }
      if (password.toLowerCase() === password) {
        errors.push('The password needs to have at least one capital letter.');
      }
      if (!/\d/.test(password)) {
        errors.push('The password needs to have at least one number letter.');
      }
      if (!specialCharactersFormat.test(password)) {
        errors.push('The password needs to have at least one special character.');
      }
    }
    return errors;
  }

  submitHandler(event) {
    event.preventDefault();
    const { history, registerUser } = this.props;
    if (!this.isFormValid()) {
      registerUser(this.state, history);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value === '') {
      e.target.className += ' empty-input';
    } else {
      e.target.className = 'form-input';
    }
  }

  inputFieldsFilled() {
    const {
      username,
      password,
      passwordConfirm,
      country,
    } = this.state;

    return username && password && passwordConfirm && country;
  }

  isFormValid() {
    return !(this.inputFieldsFilled() && this.getPasswordErrors().length === 0);
  }

  render() {
    const { countries, message } = this.props;
    const { country } = this.state;
    return (
      <>
        <section className="user-login">
          <div className="section-inner">
            <div className="form">
              <form
                onSubmit={(e) => this.submitHandler(e)}
                className="login"
              >
                <h1>Register</h1>
                {
                  message && (
                    <div className="flash-message">
                      <p>{message}</p>
                    </div>
                  )
                }
                <div className="form-group">
                  <label htmlFor="username">
                    Username
                    <input
                      id="username"
                      name="username"
                      className="form-input"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </label>
                  <label htmlFor="password">
                    Password
                    <input
                      id="password"
                      className="form-input"
                      name="password"
                      type="password"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </label>
                  <label htmlFor="passwordConfirm">
                    Confirm password
                    <input
                      id="passwordConfirm"
                      className="form-input"
                      name="passwordConfirm"
                      type="password"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </label>
                  <ul className="error-list">
                    {this.getPasswordErrors().map((e) => <li className="error-points" key={e}>{e}</li>)}
                  </ul>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>Country</label>
                  <CountrySelect
                    countries={countries}
                    handleChange={this.handleChange}
                    selectedCountry={country}
                  />
                </div>
                <button disabled={this.isFormValid()} type="submit">Submit</button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
}
Registration.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  fetchCountries: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  countries: PropTypes.instanceOf(Object).isRequired,
  message: PropTypes.string.isRequired,
};
export default Registration;
