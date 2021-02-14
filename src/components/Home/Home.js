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

  handleButtonClick(value) {
    this.setState({
      netflixShowsFilter: value,
    });
  }

  handleTitleSearch(event) {
    const searchTerm = event.target.value;
    this.setState({
      netflixShowsFilter: 'search',
      searchQuery: `query=${searchTerm}`,
    });
  }

  signOut() {
    const { history } = this.props;
    localStorage.removeItem('user_id');
    history.push('/');
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
              type="button"
              className="navigation-button"
              onClick={() => this.signOut()}
            >
              Sign out
            </button>
          </div>
          <div className="button-wrapper">
            <div className="search-wrapper">
              <input
                className="form-input"
                placeholder="Search for specific shows"
                name="search-shows"
                onChange={(e) => this.handleTitleSearch(e)}
              />
            </div>
            <button type="button" onClick={() => this.handleButtonClick('new')}>NEW SHOWS</button>
            <button type="button" onClick={() => this.handleButtonClick('deleted')}>EXPIRING SHOWS</button>
          </div>
          {netflixShowsFilter && <NetflixShows searchQuery={searchQuery} fetchDeleted={(netflixShowsFilter === 'deleted')} />}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  fetchCountries: PropTypes.func.isRequired,
  getMe: PropTypes.func.isRequired,
};

export default Home;
