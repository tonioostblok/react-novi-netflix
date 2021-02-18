import React from 'react';
import PropTypes from 'prop-types';
import NetflixShows from '../NetflixShows';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      netflixShowsFilter: false,
      searchQuery: '',
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

  handleTitleSearch() {
    const searchInput = document.getElementById('search-input');
    this.setState({
      netflixShowsFilter: 'search',
      searchQuery: `query=${searchInput.value}`,
    });
  }

  signOut() {
    const { history, signOut } = this.props;
    signOut(history);
  }

  render() {
    const { history, message } = this.props;
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
              onClick={() => { history.push('/upcoming-and-expiring'); }}
            >
              Upcoming & Expiring
            </button>
            <button
              type="button"
              className="navigation-button"
              onClick={() => this.signOut()}
            >
              Sign out
            </button>
          </div>
          {
            message && (
              <div className="flash-message">
                <p>{message}</p>
              </div>
            )
          }
          <div className="button-wrapper">
            <div className="search-wrapper">
              <input
                id="search-input"
                className="form-input"
                placeholder="Search for specific shows"
                name="search-shows"
              />
              <button type="button" onClick={() => this.handleTitleSearch()}>Search</button>
            </div>
          </div>
          {netflixShowsFilter && <NetflixShows searchQuery={searchQuery} />}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  fetchCountries: PropTypes.func.isRequired,
  getMe: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default Home;
