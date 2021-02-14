import React from 'react';
import PropTypes from 'prop-types';
import '../../css/show.css';

// eslint-disable-next-line react/prefer-stateless-function
class Show extends React.Component {
  render() {
    const {
      key, title, img, synopsis, year, expireDate,
    } = this.props;
    const renderHTML = (rawHTML) => React.createElement('span', { dangerouslySetInnerHTML: { __html: rawHTML } });
    return (
      <div className="show-wrapper" key={key}>
        <div className="image">
          <img
            src={img}
            alt={title}
          />
        </div>
        <div className="title">
          <p className="show-title">
            {renderHTML(title)}
          </p>
          <p className="show-synopsis">
            {renderHTML(synopsis)}
          </p>
          {year
            && (
            <p className="show-year">
              Year:
              {' '}
              {year}
            </p>
            )}
          {expireDate
            && (
            <p className="expire-date">
              Expire date:
              {' '}
              {expireDate}
            </p>
            )}
        </div>
      </div>
    );
  }
}

Show.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  key: PropTypes.string,
  title: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  expireDate: PropTypes.string,
};

Show.defaultProps = {
  expireDate: '',
};

export default Show;
