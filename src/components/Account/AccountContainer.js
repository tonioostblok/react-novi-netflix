import { connect } from 'react-redux';
import Account from './Account';
import {getMe, updateUser, emptyMessage } from '../../store/authentication';
import { fetchCountries } from '../../store/netflix';

const mapStateToProps = (state) => ({
  user: state.authentication.user,
  message: state.authentication.message,
  countries: state.netflix.countries,
});

const actions = {
  getMe,
  fetchCountries,
  updateUser,
  emptyMessage,
};

export default connect(mapStateToProps, actions)(Account);
