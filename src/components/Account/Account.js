import React from 'react';
import '../../css/login.css';
import PropTypes from 'prop-types';

import CountrySelect from '../CountrySelect/CountrySelect';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      country: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const {
      getMe,
      history,
      fetchCountries,
      user,
    } = this.props;
    getMe(localStorage.getItem('user_id'));
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      history.push('/');
    }
    if (user.username === '') {
      getMe(userId);
    }
    fetchCountries();
  }

  submitHandler(event) {
    event.preventDefault();
    const {
      updateUser,
      user,
    } = this.props;

    const { username, password, country } = this.state;
    updateUser({
      username: username || user.username,
      password: password || user.password,
      country: country || user.country,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const {
      history,
      user,
      countries,
    } = this.props;
    const {
      username,
      password,
      country,
    } = this.state;
    return (
      <div className="app-wrapper">
        <button className="navigation-button" type="button" onClick={() => { history.goBack(); }}>Go Back</button>
        <h1>Account settings</h1>
        <div className="form">
          <form className="form" onSubmit={(e) => this.submitHandler(e)}>
            <div className="form-group">
              <label htmlFor="username">
                Username
                <input
                  id="username"
                  className="form-input"
                  type="text"
                  name="username"
                  value={username || user.username}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password
                <input
                  id="password"
                  className="form-input"
                  type="text"
                  name="password"
                  value={password || user.password}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Country</label>
              <CountrySelect
                selectedCountry={country || user.country}
                countries={countries}
                handleChange={this.handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
Account.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  getMe: PropTypes.func.isRequired,
  fetchCountries: PropTypes.func.isRequired,
  countries: PropTypes.instanceOf(Array).isRequired,
  updateUser: PropTypes.func.isRequired,
};
export default Account;
