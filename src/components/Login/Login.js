import React from 'react';
import PropTypes from 'prop-types';
import '../../css/login.css';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message:""
    }
  }
  componentDidMount() {
    this.redirectIfLoggedIn();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.redirectIfLoggedIn();
  }

  submitHandler(event) {
    event.preventDefault();
    const { username, password } = this.props.user;
    if (username !== '' && password !== '') {
      this.props.login(username, password);
    }
  }

  redirectIfLoggedIn() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.props.history.push('/home');
    }
  }

  renderFlashMessage() {
    const params = new URLSearchParams(this.props.location.search);
    const message = params.get('message');
    if(message){
      return(
          <div>
            <p>{message}</p>
          </div>
      )
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
                <h1>Login</h1>
                { this.renderFlashMessage() }
                <div className="form-group">
                  <label>First Name</label>
                  <input className={"form-input"} onChange={(value) => this.props.updateUserName(value.target.value)} />
                  <label>Password</label>
                  <input className={"form-input"} type="password" onChange={(value) => this.props.updatePassword(value.target.value)} />
                </div>
                <button type="submit">Submit</button>
                <p onClick={() => this.props.history.push("/register")}>No account? Register here!</p>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
}
Login.propTypes = {
  // eslint-disable-next-line no-undef,react/require-default-props
  login: PropTypes.func,
  // eslint-disable-next-line no-undef,react/require-default-props
  updateUserName: PropTypes.func,
  // eslint-disable-next-line no-undef,react/require-default-props
  updatePassword: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  user: PropTypes.object,
};
export default Login;
