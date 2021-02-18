import React from 'react';
import PropTypes from 'prop-types';
import NetflixShows from '../NetflixShows';

class UpcomingExpiring extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      netflixShowsFilter: false,
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem('user_id');
    const { history, fetchCountries, getMe } = this.props;
    if (!userId) {
      history.push('/');
    }

    fetchCountries();
    getMe(userId);
  }

  handleButtonClick(value) {
    this.setState({
      netflixShowsFilter: value,
    });
  }

  signOut() {
    const { history, signOut } = this.props;
    signOut(history);
  }

  render() {
    const { history } = this.props;
    const { searchQuery, netflixShowsFilter } = this.state;
    return (
      <div className="app-wrapper">
        <div>
          <div className="menu-bar">
            <button
              className="navigation-button"
              type="button"
              onClick={() => { history.push('/account'); }}
            >
              Account settings
            </button>
            <button
              className="navigation-button"
              type="button"
              onClick={() => { history.push('/home'); }}
            >
              Search all
            </button>
            <button
              type="button"
              className="navigation-button"
              onClick={() => this.signOut()}
            >
              Sign out
            </button>
          </div>
          <div className="button-wrapper">
            <button type="button" onClick={() => this.handleButtonClick('new')}>NEW SHOWS</button>
            <button type="button" onClick={() => this.handleButtonClick('deleted')}>EXPIRING SHOWS</button>
          </div>
          {netflixShowsFilter && <NetflixShows searchQuery={searchQuery} fetchDeleted={(netflixShowsFilter === 'deleted')} />}
        </div>
      </div>
    );
  }
}

UpcomingExpiring.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  fetchCountries: PropTypes.func.isRequired,
  getMe: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default UpcomingExpiring;
