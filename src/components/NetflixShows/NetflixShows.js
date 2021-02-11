import React from 'react';
import PropTypes from 'prop-types';
import '../../css/components.css';
import Show from "../Shows/Show";

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
        if(this.props.searchQuery !== ""){
            this.props.fetchActualShows(0, 10, this.props.user.country, false, this.props.searchQuery)
        }else{
            if (this.props.fetchDeleted) {
                //fetch deleted
                this.props.fetchDeletedShows(0, 10, this.props.user.country)
            } else {
                this.props.fetchActualShows(0, 10, this.props.user.country);
            }
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
        if(prevProps.searchQuery !== this.props.searchQuery){
            this.fetchNetflixShows()
        }
    }

    changePage(goBack = false) {
        let newpage = this.state.page + 1;
        if(goBack){
           newpage = (this.state.page <= 1) ? 1 : this.state.page - 1;
        }
        this.setState({
            page: newpage
        })
        const offset = (newpage - 1) * this.state.perPage
        if (this.props.fetchDeleted) {
            this.props.fetchDeletedShows(offset, this.state.perPage, this.props.user.country)
        } else {
            this.props.fetchActualShows(offset, this.state.perPage, this.props.user.country)
        }
    }


    render() {
        return (
            <div class="shows-container">
                {this.props.shows && this.props.shows.map((val, key) => {
                    return (
                        <Show
                            title={val.title}
                            img={val.img}
                            synopsis={val.synopsis}
                            year={val.year}
                            expireDate={!val.expireDate ? false : val.expireDate}
                        />
                    )
                })}
                <div className={"pagination"} >
                    <button onClick={() => this.changePage(true)}>Previous page</button>
                    <button onClick={() => this.changePage()}>Next page</button>
                </div>
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
