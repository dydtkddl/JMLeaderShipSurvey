import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({width}) => {
    console.log(width.width)
  return (
    <hr style={{
      border: 'none',
      borderTop: '2px solid #ccc',
      margin: '20px auto',
      width: width.width,
    }} />
  );
};
Divider.propTypes = {
  width: PropTypes.string.isRequired,
};
export default Divider;