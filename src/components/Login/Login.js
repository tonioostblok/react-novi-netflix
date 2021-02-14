import React from 'react';
import PropTypes from 'prop-types';
import '../../css/login.css';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.redirectIfLoggedIn();
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  submitHandler(event) {
    event.preventDefault();
    const { user, login } = this.props;
    if (user.username !== '' && user.password !== '') {
      login(user.username, user.password);
    }
  }

  redirectIfLoggedIn() {
    const { history } = this.props;
    const userId = localStorage.getItem('user_id');
    if (userId) {
      history.push('/home');
    }
  }

  renderFlashMessage() {
    const { location } = this.props;
    const params = new URLSearchParams(location.search);
    const message = params.get('message');
    if (message) {
      return (
        <div className="flash-message">
          <p>{message}</p>
        </div>
      );
    }
    return '';
  }

  render() {
    const { updateUserName, updatePassword, history } = this.props;
    return (
      <>
        <section className="user-login">
          <div className="section-inner">
            <div className="form">
              <form
                onSubmit={(e) => this.submitHandler(e)}
                className="login"
              >
                <h1>Login</h1>
                { this.renderFlashMessage() }
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name
                    <input
                      id="firstName"
                      className="form-input"
                      onChange={(value) => updateUserName(value.target.value)}
                    />
                  </label>
                  <label htmlFor="password">
                    Password
                    <input
                      id="password"
                      className="form-input"
                      type="password"
                      onChange={(value) => updatePassword(value.target.value)}
                    />
                  </label>
                </div>
                <button type="submit">Submit</button>
                <button
                  type="button"
                  className="link navigation-button"
                  onClick={() => history.push('/register')}
                >
                  No account? Register here!
                </button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  updateUserName: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};
export default Login;
