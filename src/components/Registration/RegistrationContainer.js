import { connect } from 'react-redux';
// eslint-disable-next-line import/no-named-as-default
import Registration from './Registration';
import { fetchCountries } from '../../store/netflix';
import { registerUser } from '../../store/authentication';

const mapStateToProps = (state) => ({
  countries: state.netflix.countries,
});

const actions = {
  fetchCountries,
  registerUser,
};

export default connect(mapStateToProps, actions)(Registration);
