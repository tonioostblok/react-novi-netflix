import { connect } from 'react-redux';
import Account from './Account';
import { getMe } from '../../store/authentication';

const mapStateToProps = (state) => ({
  user: state.authentication.user,
});

const actions = {
  getMe,
};

export default connect(mapStateToProps, actions)(Account);
