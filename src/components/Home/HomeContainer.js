import { connect } from 'react-redux';
import Home from './Home';
import { fetchCountries } from '../../store/netflix';
import { getMe } from '../../store/authentication'

const mapStateToProps = (state) => ({
    countries: state.netflix.countries,
    user: state.authentication.user
});

const actions = {
    fetchCountries,
    getMe
};

export default connect(mapStateToProps, actions)(Home);
