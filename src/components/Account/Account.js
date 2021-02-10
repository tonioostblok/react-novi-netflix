import React from 'react';
import '../../css/login.css';
import PropTypes from 'prop-types';

import '../../css/login.css';
import CountrySelect from "../CountrySelect/CountrySelect";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:null,
      password:null,
      country:null,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getMe(localStorage.getItem('user_id'))
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.props.history.push('/login');
    }
    if(this.props.user.username === ""){
      this.props.getMe(userId)
    }
    this.props.fetchCountries()
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.updateUser({
      username: this.state.username ? this.state.username : this.props.user.username,
      password: this.state.password ? this.state.password : this.props.user.password,
      country: this.state.country ? this.state.country : this.props.user.country,
    })


  }

  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  render() {
    return (
      <div className={"app-wrapper"}>
       <p onClick={() => {this.props.history.goBack()}}>Go Back</p>
       <h1>Account settings</h1>
        <div className={"form"}>
          <form className="form" onSubmit={(e) => this.submitHandler(e)}>
            <div className="form-group">
              <label>Username</label>
              <input
                  className={"form-input"}
                  type="text"
                  name="username"
                  value={(this.state.username) ? this.state.username : this.props.user.username}
                  onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                  className={"form-input"}
                  type="text"
                  name="password"
                  value={(this.state.password) ? this.state.password : this.props.user.password}
                  onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <CountrySelect
                  selectedCountry={(this.state.country) ? this.state.country : this.props.user.country}
                  countries={this.props.countries}
                  handleChange={this.handleChange}
              />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
Account.propTypes = {
  user: PropTypes.any,
  getMe: PropTypes.func,
  fetchCountries: PropTypes.func,
  countries: PropTypes.any,
  updateUser: PropTypes.func,
};
export default Account;
