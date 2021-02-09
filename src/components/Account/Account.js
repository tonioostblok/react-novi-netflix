import React from 'react';
import '../../css/login.css';
import PropTypes from 'prop-types';

import '../../css/login.css';
// eslint-disable-next-line react/prefer-stateless-function
class Account extends React.Component {
  componentDidMount() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.props.history.push('/login');
    }
    if(this.props.user.username === ""){
      this.props.getMe(localStorage.getItem('user_id'))
    }else{

    }
  }

  render() {
    return (
      <div className={"app-wrapper"}>
       <p onClick={() => {this.props.history.goBack()}}>Go Back</p>
       <h1>Account settings</h1>
        <div className={"form"}>
          <form className="form">
            <div className="form-group">
              <label>Username</label>
              <input className={"form-input"} type="text" value={this.props.user.username} />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
Account.propTypes = {
  user: PropTypes.any,
  getMe: PropTypes.func,
};
export default Account;
