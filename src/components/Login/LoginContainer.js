import { connect } from 'react-redux';
import Login from './Login';
import { login, updateUserName, updatePassword } from '../../store/authentication';

const mapStateToProps = (state) => ({
  authentication: state.authentication,
});

const actions = {
  login,
  updateUserName,
  updatePassword,
};

export default connect(mapStateToProps, actions)(Login);
