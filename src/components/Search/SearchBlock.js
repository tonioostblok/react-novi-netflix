import React from 'react';
import PropTypes from 'prop-types';
import '../../css/search.css';
import { Search } from 'semantic-ui-react'

// eslint-disable-next-line react/prefer-stateless-function
class SearchBlock extends React.Component {
    componentDidMount() {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className={'search-block'}>
                <Search className={'search-input'} />
            </div>
        );
    }
}

// Home.propTypes = {
//     // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
//     history: PropTypes.object,
// };

export default SearchBlock;
