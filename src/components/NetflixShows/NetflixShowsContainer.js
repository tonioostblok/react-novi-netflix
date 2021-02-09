import { connect } from 'react-redux';
import NetflixShows from './NetflixShows';
import {fetchActualShows, fetchDeletedShows} from "../../store/netflix";

const mapStateToProps = (state) => ({
    shows: state.netflix.shows,
    fetching: state.netflix.fetching,
    user: state.authentication.user,
});

const actions = {
    fetchActualShows,
    fetchDeletedShows
};

export default connect(mapStateToProps, actions)(NetflixShows);
