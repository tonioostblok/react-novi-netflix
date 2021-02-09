import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../css/login.css';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends React.Component {
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

  render() {
    return (
      <>
        <section className={"user-login"}>
          <div className={"section-inner"}>
            <div className={"form"}>
              <Form
                  onSubmit={(e) => this.submitHandler(e)}
                  className={"login"}
              >
                <h1>Login</h1>
                <div className="form-group">
                  <label>First Name</label>
                  <input className={"form-input"} onChange={(value) => this.props.updateUserName(value.target.value)} />
                  <label>Password</label>
                  <input className={"form-input"} type="password" onChange={(value) => this.props.updatePassword(value.target.value)} />
                </div>
                <Button type="submit">Submit</Button>
              </Form>
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
