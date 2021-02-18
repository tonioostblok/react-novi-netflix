import React from 'react';
import PropTypes from 'prop-types';
import '../../css/login.css';

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
    const { authentication, login } = this.props;
    if (authentication.username !== '' && authentication.password !== '') {
      login(authentication.username, authentication.password);
    }
  }

  redirectIfLoggedIn() {
    const { history } = this.props;
    const userId = localStorage.getItem('user_id');
    if (userId) {
      history.push('/home');
    }
  }

  handleInputChange(event, type = '') {
    const { updateUserName, updatePassword } = this.props;
    if (type === 'username') {
      updateUserName(event.target.value);
    } else {
      updatePassword(event.target.value);
    }

    if (event.target.value === '') {
      // eslint-disable-next-line no-param-reassign
      event.target.className += ' empty-input';
    } else {
      // eslint-disable-next-line no-param-reassign
      event.target.className = 'form-input';
    }
  }

  render() {
    const {
      history,
      authentication,
    } = this.props;
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
                {
                  authentication.message && (
                  <div className="flash-message">
                    <p>{authentication.message}</p>
                  </div>
                  )
                }
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name
                    <input
                      id="firstName"
                      className="form-input"
                      onChange={(event) => this.handleInputChange(event, 'username')}
                    />
                  </label>
                  <label htmlFor="password">
                    Password
                    <input
                      id="password"
                      className="form-input"
                      type="password"
                      onChange={(event) => this.handleInputChange(event)}
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
  authentication: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};
export default Login;
