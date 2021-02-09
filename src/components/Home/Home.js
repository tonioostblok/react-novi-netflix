import React from 'react';
import PropTypes from 'prop-types';
import CountrySelector from '../Countries';
import NetflixShows from "../NetflixShows";

// eslint-disable-next-line react/prefer-stateless-function
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      netflixShowsFilter:false
    }
  }
  componentDidMount() {
    this.props.fetchCountries();

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.props.history.push('/login');
    }
    if(this.props.user.username === ""){
      this.props.getMe(localStorage.getItem('user_id'))
    }else{

    }
  }

  handleButtonClick(value){
    this.setState({
      netflixShowsFilter:value
    })
  }
  render() {
    return (
        <div className={'search-block'}>
        {
          (this.props.user.country)
              ? <div>
                <CountrySelector countries={this.props.countries} />
                <div className="button-wrapper">
                  <button className="large-square-buttons" onClick={() => this.handleButtonClick("new")}>NEW SHOWS</button>
                  <button className="large-square-buttons" onClick={() => this.handleButtonClick("deleted")}>DELETED SHOWS</button>
                  <button className="large-square-buttons" onClick={() => this.handleButtonClick("all")}>ALL SHOWS</button>
                </div>
                {this.state.netflixShowsFilter && <NetflixShows fetchDeleted={(this.state.netflixShowsFilter === 'deleted')} />}
              </div>

              : <CountrySelector countries={this.props.countries} />
        }
      </div>
    );
  }
}

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  history: PropTypes.object,
  fetchCountries: PropTypes.func,
  countries: PropTypes.object,
  user: PropTypes.object,
  getMe: PropTypes.func
};

export default Home;
