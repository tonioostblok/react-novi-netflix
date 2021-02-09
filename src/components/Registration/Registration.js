import React from 'react';
import PropTypes from 'prop-types';
import '../../css/login.css';
import {fetchCountries} from "../../store/netflix";
import {registerUser} from "../../store/authentication";

// eslint-disable-next-line react/prefer-stateless-function
class Registration extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:"",
      passwordConfirm:"",
      country:"",
    }
  }
  componentDidMount() {
    this.props.fetchCountries();
  }

  submitHandler(event) {
    event.preventDefault();
    if(!this.isFormValid()){
      this.props.registerUser(this.state)
      this.props.history.replace("/login?message=Successfully registred, you can now log in!")
    }
  }

  getPasswordErrors = () => {
    const errors = []
    const { password, passwordConfirm } = this.state

    if(password.length > 0){
      if(password !== passwordConfirm){
        errors.push("The password does not match the one in the second password field.")
      }else{
        if(password.length < 8){
          errors.push("The password needs to have at least 8 characters.")
        }
        if(password.toLowerCase() === password){
          errors.push("The password needs to have at least one capital letter.")
        }
      }
    }
    return errors;
  }

  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  inputFieldsFilled = () => {
    const { username, password, passwordConfirm, country } = this.state

    return username && password && passwordConfirm && country
  }

  isFormValid(){
    if(this.inputFieldsFilled() && this.getPasswordErrors().length === 0){
      return false;
    }else{
      return true;
    }
  }
  render() {
    return (
      <>
        <section className={"user-login"}>
          <div className={"section-inner"}>
            <div className={"form"}>
              <form
                  onSubmit={(e) => this.submitHandler(e)}
                  className={"login"}
              >
                <h1>Register</h1>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className={"form-input"}
                      onChange={(e) => this.handleChange(e)}
                  />
                  <label>Password</label>
                  <input
                      className={"form-input"}
                      name="password"
                      type="password"
                      onChange={(e) => this.handleChange(e)}
                  />
                  <label>Confirm password</label>
                  <input
                      className={"form-input"}
                      name="passwordConfirm"
                      type="password"
                      onChange={(e) => this.handleChange(e)}
                  />
                  <ul className='error-list'>
                    {this.getPasswordErrors().map((e, i) => <li className='error-points' key={i}>{e}</li>)}
                  </ul>
                  <label>Country</label>
                  <select
                      onChange={(e) => this.handleChange(e)}
                      name={"country"}
                      className={"form-input"}
                  >
                    <option disabled selected>Select a country</option>
                    {
                      this.props.countries.map((val,key) => {
                        return(
                            <option value={val.key}>{val.text}</option>
                        )
                      })
                    }
                  </select>
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
  fetchCountries: PropTypes.func,
  registerUser: PropTypes.func
};
export default Registration;
