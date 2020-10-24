import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Home extends React.Component {
  componentDidMount() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div>
        <h1>test1234</h1>
      </div>
    );
  }
}

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  history: PropTypes.object,
};

export default Home;
