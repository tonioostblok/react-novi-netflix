import { connect } from 'react-redux';
import Home from './Home';
import { fetchCountries, fetchActualShows } from '../../store/netflix';
import { getMe, signOut, emptyMessage } from '../../store/authentication';

const mapStateToProps = (state) => ({
  countries: state.netflix.countries,
  user: state.authentication.user,
  message: state.authentication.message,
});

const actions = {
  fetchCountries,
  fetchActualShows,
  getMe,
  signOut,
  emptyMessage,
};

export default connect(mapStateToProps, actions)(Home);
