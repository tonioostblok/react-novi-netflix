import { connect } from 'react-redux';
import CountrySelector from './CountrySelector';
import { updateUserCountry } from '../../store/authentication'

const mapStateToProps = (state) => ({
});

const actions = {
    updateUserCountry,
};

export default connect(mapStateToProps, actions)(CountrySelector);
