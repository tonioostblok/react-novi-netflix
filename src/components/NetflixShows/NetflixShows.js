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

  changePage(data) {
    const {
      fetchDeletedShows,
      fetchDeleted,
      fetchActualShows,
      user,
    } = this.props;
    if (fetchDeleted) {
      fetchDeletedShows(data.selected * 10, 10, user.country);
    } else {
      fetchActualShows(data.selected * 10, 10, user.country);
    }
    // const {
    //   fetchDeletedShows,
    //   fetchDeleted,
    //   fetchActualShows,
    //   user,
    // } = this.props;
    // const { page, perPage } = this.state;
    // let newPage = page + 1;
    // if (goBack) {
    //   newPage = (page <= 1) ? 1 : page - 1;
    // }
    // this.setState({
    //   page: newPage,
    // });
    // const offset = (newPage - 1) * perPage;
    // if (fetchDeleted) {
    //   fetchDeletedShows(offset, perPage, user.country);
    // } else {
    //   fetchActualShows(offset, perPage, user.country);
    // }
  }

  render() {
    const {
      shows,
      totalShows,
      fetching,
      totalShowsDeleted,
      fetchDeleted,
    } = this.props;
    let pageCount;
    if (fetchDeleted) {
      pageCount = Math.ceil(totalShowsDeleted / 10);
    } else {
      pageCount = Math.ceil(totalShows / 10);
    }

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
              <Show
                title={val.title}
                img={val.img}
                synopsis={val.synopsis}
                year={val.year}
                expireDate={!val.expireDate ? '' : val.expireDate}
              />
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
  fetching: PropTypes.bool,
  fetchActualShows: PropTypes.func.isRequired,
  fetchDeletedShows: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  totalShows: PropTypes.number.isRequired,
  totalShowsDeleted: PropTypes.number.isRequired,
};

NetflixShows.defaultProps = {
  searchQuery: '',
  fetchDeleted: false,
};

export default NetflixShows;
