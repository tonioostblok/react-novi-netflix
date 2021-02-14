import React from 'react';
import PropTypes from 'prop-types';
import '../../css/components.css';
import Show from '../Shows/Show';

class NetflixShows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perPage: 10,
      paginatedShows: false,
    };
  }

  componentDidMount() {
    this.fetchNetflixShows();
  }

  componentDidUpdate(prevProps) {
    const { paginatedShows } = this.state;
    const { shows, fetchDeleted, searchQuery } = this.props;
    if (!paginatedShows && shows.length > 0) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        paginatedShows: shows,
      });
    }
    if (prevProps.fetchDeleted !== fetchDeleted) {
      this.fetchNetflixShows();
    }
    if (prevProps.searchQuery !== searchQuery) {
      this.fetchNetflixShows();
    }
  }

  fetchNetflixShows() {
    const {
      searchQuery, user, fetchActualShows, fetchDeletedShows, fetchDeleted,
    } = this.props;
    if (searchQuery !== '') {
      fetchActualShows(0, 10, user.country, searchQuery);
    } else if (fetchDeleted) {
      // fetch deleted
      fetchDeletedShows(0, 10, user.country);
    } else {
      fetchActualShows(0, 10, user.country);
    }
  }

  changePage(goBack = false) {
    const {
      fetchDeletedShows,
      fetchDeleted,
      fetchActualShows,
      user,
    } = this.props;
    const { page, perPage } = this.state;
    let newPage = page + 1;
    if (goBack) {
      newPage = (page <= 1) ? 1 : page - 1;
    }
    this.setState({
      page: newPage,
    });
    const offset = (newPage - 1) * perPage;
    if (fetchDeleted) {
      fetchDeletedShows(offset, perPage, user.country);
    } else {
      fetchActualShows(offset, perPage, user.country);
    }
  }

  render() {
    const { shows } = this.props;
    return (
      <div className="shows-container">
        {shows && shows.map((val) => (
          <Show
            title={val.title}
            img={val.img}
            synopsis={val.synopsis}
            year={val.year}
            expireDate={!val.expireDate ? '' : val.expireDate}
          />
        ))}
        <div className="pagination">
          <button type="button" onClick={() => this.changePage(true)}>Previous page</button>
          <button type="button" onClick={() => this.changePage()}>Next page</button>
        </div>
      </div>
    );
  }
}

NetflixShows.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  user: PropTypes.object,
  shows: PropTypes.instanceOf(Array).isRequired,
  fetchDeleted: PropTypes.bool,
  fetchActualShows: PropTypes.func.isRequired,
  fetchDeletedShows: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
};

NetflixShows.defaultProps = {
  searchQuery: '',
  fetchDeleted: false,
};

export default NetflixShows;
