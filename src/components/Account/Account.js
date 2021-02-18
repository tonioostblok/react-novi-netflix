import React from 'react';
import PropTypes from 'prop-types';

import CountrySelect from '../CountrySelect/CountrySelect';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      country: '',
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
    const { username, password, country } = user;
    getMe(localStorage.getItem('user_id'));
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      history.push('/');
    }

    if (user.username === '') {
      getMe(userId);
    } else {
      this.setState({
        username,
        password,
        country,
      });
    }
    fetchCountries();
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    const { username, password, country } = user;
    if (prevProps.user.username !== username) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        username,
        password,
        country,
      });
    }
  }

  submitHandler(event) {
    event.preventDefault();
    const {
      updateUser,
    } = this.props;

    const { username, password, country } = this.state;
    if (username === '' || password === '' || country === '') {
      return false;
    }
    return updateUser({
      username,
      password,
      country,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value === '') {
      // eslint-disable-next-line no-param-reassign
      e.target.className += ' empty-input';
    } else {
      // eslint-disable-next-line no-param-reassign
      e.target.className = 'form-input';
    }
  }

  render() {
    const {
      history,
      countries,
      message,
      emptyMessage,
    } = this.props;
    const {
      username,
      country,
    } = this.state;
    return (
      <div className="app-wrapper">
        <button
          className="navigation-button"
          type="button"
          onClick={() => {
            emptyMessage();
            history.push('/home');
          }}
        >
          Go Back
        </button>
        {
          message && (
            <div className="flash-message">
              <p>{message}</p>
            </div>
          )
        }
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
                  value={username}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Country</label>
              <CountrySelect
                selectedCountry={country}
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
  emptyMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
export default Account;
