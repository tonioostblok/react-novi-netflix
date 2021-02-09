import { connect } from 'react-redux';
import Registration from './Registration';
import {fetchCountries} from "../../store/netflix";
import { registerUser } from "../../store/authentication"

const mapStateToProps = (state) => ({
  countries: state.netflix.countries,
});

const actions = {
  fetchCountries,
  registerUser
};

export default connect(mapStateToProps, actions)(Registration);
