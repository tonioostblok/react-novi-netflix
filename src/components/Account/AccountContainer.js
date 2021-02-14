import { connect } from 'react-redux';
import Account from './Account';
import { getMe, updateUser } from '../../store/authentication';
import { fetchCountries } from '../../store/netflix';

const mapStateToProps = (state) => ({
  user: state.authentication.user,
  countries: state.netflix.countries,
});

const actions = {
  getMe,
  fetchCountries,
  updateUser,
};

export default connect(mapStateToProps, actions)(Account);
