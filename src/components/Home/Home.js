import React from 'react';
import PropTypes from 'prop-types';
import NetflixShows from "../NetflixShows";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      netflixShowsFilter:false,
      searchQuery: ""
    }
  }
  componentDidMount() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.props.history.push('/');
    }

    this.props.fetchCountries();
    this.props.getMe(userId)
  }

  handleButtonClick(value){
    this.setState({
      netflixShowsFilter:value
    })
  }
  handleTitleSearch(event){
    const searchTerm = event.target.value
    this.setState({
      netflixShowsFilter: "search",
      searchQuery: `query=${searchTerm}`,
    })

  }
  signOut(){
    localStorage.removeItem('user_id');
    this.props.history.push('/');
  }
  render() {
    return (
        <div className={'app-wrapper'}>
        {
        <div>
          <div className="menu-bar">
            <p onClick={() => {this.props.history.push("/account")}}>Account settings</p>
            <p onClick={() => this.signOut()}>Sign out</p>
          </div>
          <div className="button-wrapper">
            <div className={"search-wrapper"}>
              <input
                  className={"form-input"}
                  placeholder={"Search for specific shows"}
                  name={"search-shows"}
                  onChange={(e) => this.handleTitleSearch(e)}
              />
            </div>
            <button onClick={() => this.handleButtonClick("new")}>NEW SHOWS</button>
            <button onClick={() => this.handleButtonClick("deleted")}>EXPIRING SHOWS</button>
          </div>
          {this.state.netflixShowsFilter && <NetflixShows searchQuery={this.state.searchQuery} fetchDeleted={(this.state.netflixShowsFilter === 'deleted')} />}
        </div>
        }
      </div>
    );
  }
}

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  history: PropTypes.object,
  fetchCountries: PropTypes.func,
  fetchActualShows: PropTypes.func,
  countries: PropTypes.array,
  user: PropTypes.object,
  getMe: PropTypes.func
};

export default Home;
