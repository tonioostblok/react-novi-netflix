import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
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
        <Form
          onSubmit={(e) => this.submitHandler(e)}
        >
          <Form.Field>
            <label>First Name</label>
            <input placeholder="First Name" onChange={(value) => this.props.updateUserName(value.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder="Last Name" onChange={(value) => this.props.updatePassword(value.target.value)} />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
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
