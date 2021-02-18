import React from 'react';
import PropTypes from 'prop-types';
import '../../css/components.css';
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader-spinner';
import Show from '../Shows/Show';

class NetflixShows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.fetchNetflixShows();
  }

  componentDidUpdate(prevProps) {
    const { fetchDeleted, searchQuery } = this.props;
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

  changePage(data) {
    const {
      fetchDeletedShows,
      fetchDeleted,
      fetchActualShows,
      user,
      searchQuery,
    } = this.props;
    if (searchQuery !== '') {
      fetchActualShows(data.selected * 10, 10, user.country, searchQuery);
    } else if (fetchDeleted) {
      fetchDeletedShows(data.selected * 10, 10, user.country);
    } else {
      fetchActualShows(data.selected * 10, 10, user.country);
    }
  }

  render() {
    const {
      shows,
      totalShows,
      fetching,
    } = this.props;

    const pageCount = Math.ceil(totalShows / 10);

    return (
      <div className="shows-container">
        {
          fetching
            ? (
              <div className="loader-wrapper">
                <Loader type="Bars" color="#e50914" height={80} width={80} />
              </div>
            )
            : shows && shows.map((val) => (
              <div key={val.title} className="wrapping-div">
                <Show
                  title={val.title}
                  img={val.img}
                  synopsis={val.synopsis}
                  year={val.year}
                  expireDate={!val.expireDate ? '' : val.expireDate}
                />
              </div>
            ))
        }
        <div className="pagination">
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(event) => this.changePage(event)}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
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
  fetching: PropTypes.bool.isRequired,
  fetchActualShows: PropTypes.func.isRequired,
  fetchDeletedShows: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  totalShows: PropTypes.number.isRequired,
};

NetflixShows.defaultProps = {
  searchQuery: '',
  fetchDeleted: false,
};

export default NetflixShows;
