import React from 'react';
import PropTypes from 'prop-types';
import '../../css/show.css';
import {Icon} from 'semantic-ui-react'

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
                        alt={"show-image"}/>
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

                </div>
                {/*<div className={"show-status"}>*/}
                {/*    {*/}
                {/*        this.props.removed ?*/}
                {/*            <span*/}
                {/*                className={"status-wrapper removed"}*/}
                {/*            >*/}
                {/*                <Icon*/}
                {/*                    color={"red"}*/}
                {/*                    size={"large"}*/}
                {/*                    name={'angle double down'}*/}
                {/*                />*/}
                {/*                Recently removed*/}
                {/*            </span>*/}
                {/*            :*/}
                {/*            <span*/}
                {/*                className={"status-wrapper added"}*/}
                {/*            >*/}
                {/*                <Icon*/}
                {/*                    color={"green"}*/}
                {/*                    size={"large"}*/}
                {/*                    name={'angle double up'}*/}
                {/*                />*/}
                {/*                Recently added*/}
                {/*            </span>*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        );
    }
}

Show.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
    removed: PropTypes.bool,
};

export default Show;
