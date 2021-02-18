import { connect } from 'react-redux';
import Home from './Home';
import { fetchCountries, fetchActualShows } from '../../store/netflix';
import { getMe, signOut } from '../../store/authentication';

const mapStateToProps = (state) => ({
  countries: state.netflix.countries,
  user: state.authentication.user,
});

const actions = {
  fetchCountries,
  fetchActualShows,
  getMe,
  signOut,
};

export default connect(mapStateToProps, actions)(Home);
