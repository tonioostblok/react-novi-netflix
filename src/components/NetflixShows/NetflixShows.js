import React from 'react';
import PropTypes from 'prop-types';
import '../../css/components.css';
import Pagination from "semantic-ui-react/dist/commonjs/addons/Pagination";
import Table from "semantic-ui-react/dist/commonjs/collections/Table";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import Show from "../Shows/Show";

// eslint-disable-next-line react/prefer-stateless-function
class NetflixShows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            perPage: 10,
            paginatedShows: false
        }
    }

    componentDidMount() {
        this.fetchNetflixShows()
    }

    fetchNetflixShows() {
        if (this.props.fetchDeleted) {
            //fetch deleted
            this.props.fetchDeletedShows(0, 10, this.props.user.country)
        } else {
            this.props.fetchActualShows(0, 10, this.props.user.country);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (!this.state.paginatedShows && this.props.shows.length > 0) {
            const shows = this.props.shows
            this.setState({
                paginatedShows: shows
            })
        }
        if (prevProps.fetchDeleted !== this.props.fetchDeleted) {
            this.fetchNetflixShows()
        }

    }

    changePage(data) {
        this.setState({
            page: data.activePage
        })
        const offset = (data.activePage - 1) * this.state.perPage
        if (this.props.fetchDeleted) {
            this.props.fetchDeletedShows(offset, this.state.perPage, this.props.user.country)
        } else {
            this.props.fetchActualShows(offset, this.state.perPage, this.props.user.country)
        }
    }


    render() {
        return (
                <div>
                {this.props.shows && this.props.shows.map((val, key) => {
                    return (
                        <Show
                            title={val.title}
                            img={val.img}
                            synopsis={val.synopsis}
                            year={val.year}
                        />
                    )
                })}
                </div>
        );
    }
}

NetflixShows.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
    user: PropTypes.object,
    shows: PropTypes.array,
    fetchDeleted: PropTypes.bool,
    fetchActualShows: PropTypes.func,
    fetchDeletedShows: PropTypes.func,
    fetching: PropTypes.bool
};

export default NetflixShows;
