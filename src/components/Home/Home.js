import React from 'react';
import PropTypes from 'prop-types';
import NetflixShows from "../NetflixShows";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      netflixShowsFilter:false
    }
  }
  componentDidMount() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.props.history.push('/login');
    }

    this.props.fetchCountries();
    this.props.getMe(userId)
  }

  handleButtonClick(value){
    this.setState({
      netflixShowsFilter:value
    })
  }

  signOut(){
    localStorage.removeItem('user_id');
    this.props.history.push('/login');
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
            <button className="large-square-buttons" onClick={() => this.handleButtonClick("new")}>NEW SHOWS</button>
            <button className="large-square-buttons" onClick={() => this.handleButtonClick("deleted")}>DELETED SHOWS</button>
            <button className="large-square-buttons" onClick={() => this.handleButtonClick("all")}>ALL SHOWS</button>
          </div>
          {this.state.netflixShowsFilter && <NetflixShows fetchDeleted={(this.state.netflixShowsFilter === 'deleted')} />}
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
  countries: PropTypes.array,
  user: PropTypes.object,
  getMe: PropTypes.func
};

export default Home;
