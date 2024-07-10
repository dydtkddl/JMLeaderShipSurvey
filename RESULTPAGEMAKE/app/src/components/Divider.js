import React from 'react';

const Divider = (width) => {
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

export default Divider;