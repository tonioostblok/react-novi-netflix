import React from 'react';
import PropTypes from 'prop-types';
import '../../css/show.css';

// eslint-disable-next-line react/prefer-stateless-function
class Show extends React.Component {
    componentDidMount() {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className={"show-wrapper"} key={this.props.key}>
                <div className={"image"}>
                    <img
                        src={this.props.img ? this.props.img : require('../../assets/deleted.jpg')}
                        alt={this.props.title}/>
                </div>
                <div className={"title"}>
                    <p className={"show-title"}>
                        {this.props.title}
                    </p>
                    <p className={"show-synopsis"}>
                        {this.props.synopsis}
                    </p>
                    {this.props.year &&
                        <p className={"show-year"}>
                            Year: {this.props.year}
                        </p>
                    }
                    {this.props.expireDate &&
                        <p className={"expire-date"}>
                            Expire date: {this.props.expireDate}
                        </p>
                    }
                </div>
            </div>
        );
    }
}

Show.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
    removed: PropTypes.bool,
};

export default Show;
